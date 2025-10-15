/*:
 * @target MZ
 * @plugindesc v1.2.0 Allows for simplified movement route scripting.
 * @author 1strooge
 * @version 1.2.0
 *
 * @help
 * 1strooge_EnhancedMovementRoute.js
 *
 * This plugin allows you to simplify the creation of movement routes in
 * RPG Maker MZ. Instead of adding the same movement command multiple times,
 * you can use a single "Script" command.
 *
 * How to Use:
 * 1. In the "Set Movement Route" event command, add a "Script" command.
 * 2. In the script input field, type `move:` followed by the direction
 * and the number of steps.
 *
 * Format:
 * move: [direction] [steps]
 *
 * Example:
 * To make a character move 5 tiles up and to the right, use:
 * move: UR 5
 *
 * To make a character move 10 tiles down, use:
 * move: DOWN 10
 *
 * Available Directions:
 * D, DOWN    - Move Down
 * L, LEFT    - Move Left
 * R, RIGHT   - Move Right
 * U, UP      - Move Up
 * DL, LD     - Move Lower Left
 * DR, RD     - Move Lower Right
 * UL, LU     - Move Upper Left
 * UR, RU     - Move Upper Right
 *
 * Note:
 * The script command is not case-sensitive. "move: up 5" is the same as
 * "MOVE: UP 5".
 *
 * Version History:
 * 1.0.0 - Initial release.
 * 1.1.0 - Fixed an issue where movement was instant instead of gradual.
 * 1.2.0 - Fixed a bug that caused incorrect movement when the same event
 *         was run multiple times.
 *
 * ----------------------------------------------------------------------------
 * © 1strooge 2025 — License: CC BY-SA 4.0
 * https://creativecommons.org/licenses/by-sa/4.0/
 * ============================================================================
 *
 * @cs_CZ
 *
 * @plugindesc Umožňuje zjednodušené skriptování tras pohybu.
 * @author 1strooge
 *
 * @help
 * 1strooge_EnhancedMovementRoute.js
 *
 * Tento plugin vám umožní zjednodušit tvorbu tras pohybu v
 * RPG Maker MZ. Místo opakovaného přidávání stejného příkazu pohybu
 * můžete použít jediný příkaz "Script".
 *
 * Jak použít:
 * 1. V příkazu události "Set Movement Route" přidejte příkaz "Script".
 * 2. Do vstupního pole pro skript napište `move:` následované směrem
 *    a počtem kroků.
 *
 * Formát:
 * move: [směr] [kroky]
 *
 * Příklad:
 * Chcete-li, aby se postava posunula o 5 políček nahoru a doprava, použijte:
 * move: UR 5
 *
 * Chcete-li, aby se postava posunula o 10 políček dolů, použijte:
 * move: DOWN 10
 *
 * Dostupné směry:
 * D, DOWN    - Pohyb dolů
 * L, LEFT    - Pohyb vlevo
 * R, RIGHT   - Pohyb vpravo
 * U, UP      - Pohyb nahoru
 * DL, LD     - Pohyb vlevo dolů
 * DR, RD     - Pohyb vpravo dolů
 * UL, LU     - Pohyb vlevo nahoru
 * UR, RU     - Pohyb vpravo nahoru
 *
 * Poznámka:
 * Příkaz ve skriptu nerozlišuje velikost písmen. "move: up 5" je stejné jako
 * "MOVE: UP 5".
 *
 * Historie verzí:
 * 1.0.0 - První vydání.
 * 1.1.0 - Opraven problém, kdy byl pohyb okamžitý místo plynulého.
 * 1.2.0 - Opravena chyba, která způsobovala nesprávný pohyb při opakovaném
 *         spuštění stejné události.
 * 
 * ----------------------------------------------------------------------------
 * © 1strooge 2025 — Licence: CC BY-SA 4.0
 * https://creativecommons.org/licenses/by-sa/4.0/
 * ============================================================================
 */

(() => {
    'use strict';

    // When a move route is forced, it can be from an event's command list.
    // To prevent permanently modifying the event data, we make a shallow copy
    // of the move route object and its command list.
    const _Game_Character_forceMoveRoute = Game_Character.prototype.forceMoveRoute;
    Game_Character.prototype.forceMoveRoute = function(moveRoute) {
        const newMoveRoute = { ...moveRoute };
        newMoveRoute.list = moveRoute.list.slice(); // Create a copy of the command list
        _Game_Character_forceMoveRoute.call(this, newMoveRoute);
    };

    const _Game_Character_processMoveCommand = Game_Character.prototype.processMoveCommand;
    Game_Character.prototype.processMoveCommand = function(command) {
        if (command.code === Game_Character.ROUTE_SCRIPT) {
            const script = command.parameters[0].trim().toLowerCase();
            if (script.startsWith("move:")) {
                try {
                    const parts = script.substring(5).trim().split(/\s+/);
                    const direction = parts[0].toUpperCase();
                    const steps = parseInt(parts[1], 10);

                    if (!isNaN(steps) && steps > 0) {
                        const moveCommand = this.getMoveCommand(direction);
                        if (moveCommand) {
                            // When processing a script like "move: R 5", this script command
                            // is one item in the move route list. We will now process the
                            // first step, and inject the other 4 steps into the list right after
                            // this one, so the engine processes them sequentially.
                            if (steps > 1) {
                                const commands = [];
                                for (let i = 0; i < steps - 1; i++) {
                                    // We need to create a new object for each command.
                                    commands.push({ code: moveCommand.code, parameters: moveCommand.parameters || [] });
                                }
                                // Splice the rest of the commands into the move route list
                                this._moveRoute.list.splice(this._moveRouteIndex + 1, 0, ...commands);
                            }
                            // Execute just the first step of the movement by calling the original method
                            _Game_Character_processMoveCommand.call(this, moveCommand);
                        } else {
                            console.warn("1strooge_EnhancedMovementRoute: Unknown direction '" + direction + "'");
                            _Game_Character_processMoveCommand.call(this, command);
                        }
                    } else {
                         console.warn("1strooge_EnhancedMovementRoute: Invalid number of steps '" + parts[1] + "'");
                         _Game_Character_processMoveCommand.call(this, command);
                    }
                } catch (e) {
                    console.error("1strooge_EnhancedMovementRoute: Error parsing script command.", e);
                    _Game_Character_processMoveCommand.call(this, command);
                }
            } else {
                _Game_Character_processMoveCommand.call(this, command);
            }
        } else {
            _Game_Character_processMoveCommand.call(this, command);
        }
    };

    Game_Character.prototype.getMoveCommand = function(direction) {
        const gc = Game_Character;
        const directions = {
            'D': { code: gc.ROUTE_MOVE_DOWN },
            'DOWN': { code: gc.ROUTE_MOVE_DOWN },
            'L': { code: gc.ROUTE_MOVE_LEFT },
            'LEFT': { code: gc.ROUTE_MOVE_LEFT },
            'R': { code: gc.ROUTE_MOVE_RIGHT },
            'RIGHT': { code: gc.ROUTE_MOVE_RIGHT },
            'U': { code: gc.ROUTE_MOVE_UP },
            'UP': { code: gc.ROUTE_MOVE_UP },
            'DL': { code: gc.ROUTE_MOVE_LOWER_L },
            'LD': { code: gc.ROUTE_MOVE_LOWER_L },
            'DR': { code: gc.ROUTE_MOVE_LOWER_R },
            'RD': { code: gc.ROUTE_MOVE_LOWER_R },
            'UL': { code: gc.ROUTE_MOVE_UPPER_L },
            'LU': { code: gc.ROUTE_MOVE_UPPER_L },
            'UR': { code: gc.ROUTE_MOVE_UPPER_R },
            'RU': { code: gc.ROUTE_MOVE_UPPER_R },
            'RANDOM': { code: gc.ROUTE_MOVE_RANDOM },
            'TOWARD': { code: gc.ROUTE_MOVE_TOWARD },
            'AWAY': { code: gc.ROUTE_MOVE_AWAY },
            'FORWARD': { code: gc.ROUTE_MOVE_FORWARD },
            'BACKWARD': { code: gc.ROUTE_MOVE_BACKWARD }
        };
        return directions[direction] || null;
    };

})();
