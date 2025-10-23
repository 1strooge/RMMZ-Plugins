// ============================================================================
// 1strooge_BSToggle.js
// ============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.0.0] Adds an in-game Option to toggle between "Wait" and "Active" battle modes for Time Progress Battles (TPB).
 * @author 1strooge
 * @url https://github.com/1strooge/RMMZ-Plugins
 * @license CC BY-SA 4.0
 * @see https://creativecommons.org/licenses/by-sa/4.0/
 * @version 1.0.0
 *
 * @help
 * ============================================================================
 * 🧩 Description
 * ============================================================================
 * This plugin adds a new option in the in-game Options menu that allows
 * the player to switch between "Wait" and "Active" modes in the Time Progress
 * Battle (TPB) system.
 *
 * It is designed to make battles more comfortable for players who may find
 * the Active mode too fast or stressful in later stages of the game.
 * 
 * The setting persists across save files and can be changed at any time.
 *
 * ============================================================================
 * ⚙️ Details
 * ============================================================================
 * - Appears automatically if the current battle system is TPB (Active or Wait)
 * - "Active" = faster-paced mode requiring quick decisions
 * - "Wait" = pauses the gauge when menus are open for easier planning
 * - Changes take effect immediately in ongoing battles
 * - Fully compatible with both new games and saved games
 *
 * ============================================================================
 * 🧠 Developer Notes
 * ============================================================================
 * Default RPG Maker MZ does not allow changing TPB mode in-game.
 * This plugin introduces that flexibility, giving players direct control
 * over battle pacing and reducing frustration during long encounters.
 *
 * =========================================================================
 * 🧱 NEW in v1.0.0
 * ========================================================================= 
 * - Final stable version based on v0.9.0. 
 * 
 * ============================================================================
 * 📘 Terms of Use
 * ============================================================================
 * © 1strooge 2025 — Released under the license: CC BY-SA 4.0
 * Free for commercial and non-commercial use with attribution. 
 * Modification is allowed with attribution.
 * ============================================================================
 *
 * @cs-cz
 * @plugindesc [v1.0.0] Přidá do menu Option přepínač mezi "Wait" a "Active" pro časově progresivní bitvy.
 * @author 1strooge
 * @url https://github.com/1strooge/RMMZ-Plugins
 * @license CC BY-SA 4.0
 * @see https://creativecommons.org/licenses/by-sa/4.0/
 * @version 1.0.0
 *
 * @help
 * ============================================================================
 * 🧩 Popis
 * ============================================================================
 * Tento plugin přidává do nabídky Option nový přepínač, který umožní hráči
 * během hry změnit režim časově progresivního bojového systému (TPB) mezi
 * „Wait“ a „Active“.
 *
 * Cílem je zpřístupnit bojový systém i hráčům, kteří dávají přednost
 * pomalejšímu, taktičtějšímu tempu, a umožnit jim pokračovat bez frustrace
 * i v pozdějších, obtížnějších fázích hry.
 *
 * ============================================================================
 * ⚙️ Detaily
 * ============================================================================
 * - Přepínač se zobrazí automaticky, pokud je aktuální bojový systém typu TPB
 * - „Active“ = dynamický režim vyžadující rychlá rozhodnutí
 * - „Wait“ = měřidla se pozastaví při otevření menu (snazší plánování)
 * - Změna se projeví okamžitě i během probíhající bitvy
 * - Nastavení se ukládá do uložené pozice
 *
 * ============================================================================
 * 🧠 Poznámka
 * ============================================================================
 * Výchozí nastavení RPG Maker MZ neumožňuje změnu režimu TPB ve hře.
 * Tento plugin zavádí tuto flexibilitu, dávající hráčům přímou kontrolu nad
 * tempem bitvy a snižuje frustraci během obtížnějších střetnutí s nepřáteli
 * v pozdní fázi hry.
 *
 * =========================================================================
 * 🧱 Nově ve v1.0.0
 * ========================================================================= 
 * - Finální stabilní verze založená na v0.9.0. 
 * 
 * ============================================================================
 * 📘 Podmínky použití
 * ============================================================================
 * © 1strooge 2025 — Vydáno v rámci licence: CC BY-SA 4.0
 * Zdarma pro komerční i nekomerční použití s ​​uvedením zdroje. 
 * Úprava je povolena s uvedením zdroje.
 * ============================================================================
 *
 */

(() => {
    'use strict';

    // *** Odstraněny parametry a jejich načítání ***

    // Kontrola, zda výchozí bojový systém není tahový (0).
    const isTimeProgressBattle = () => {
        // Zobrazí se, pokud je BattleSystem 1 (Active) nebo 2 (Wait).
        return $dataSystem.battleSystem === 1 || $dataSystem.battleSystem === 2;
    };

    // --- Game_System Metody pro Ukládání a Inicializaci ---
    
    // Alias pro inicializaci Game_System.
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        
        // Zde inicializujeme hodnoty pro ukládání/načítání.
        this._currentBattleSystem = $dataSystem.battleSystem;
        this._currentBattleTpbWait = $dataSystem.battleTpbWait;

        // Uložíme defaultní hodnotu při prvním spuštění hry.
        this._initialBattleSystem = $dataSystem.battleSystem;
    };
    
    // Alias pro načtení hry (Load Game)
    const _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _DataManager_extractSaveContents.call(this, contents);
        
        if (typeof $gameSystem._currentBattleSystem !== 'undefined') {
            $dataSystem.battleSystem = $gameSystem._currentBattleSystem;
        }
        if (typeof $gameSystem._currentBattleTpbWait !== 'undefined') {
            $dataSystem.battleTpbWait = $gameSystem._currentBattleTpbWait;
        }
    };
    
    // Alias pro ukládání hry (Save Game)
    const _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        // Aktualizujeme hodnoty v $gameSystem těsně před uložením.
        $gameSystem._currentBattleSystem = $dataSystem.battleSystem;
        $gameSystem._currentBattleTpbWait = $dataSystem.battleTpbWait;
        
        return _DataManager_makeSaveContents.call(this);
    };

    // --- Window_Options Metody ---

    // 1. Alias pro přidání příkazu do okna Options.
    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.call(this);
        // *** Kontrola 'enableToggle' je odstraněna ***
        if (isTimeProgressBattle()) {
            this.addCommand("Battle Style", "battleStyleToggle");
        }
    };

    // 2. Metoda pro čtení nastavení.
    Window_Options.prototype.battleStyleToggle = function() {
        return $dataSystem.battleSystem === 2; // 2 = Wait, 1 = Active
    };

    // 3. Funkce pro získání názvu položky.
    const _Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function(index) {
        const symbol = this.commandSymbol(index);
        if (symbol === "battleStyleToggle") {
            return this.battleStyleToggle() ? "WAIT" : "ACTIVE";
        }
        return _Window_Options_statusText.call(this, index);
    };

    // 4. Alias pro zápis nastavení.
    const _Window_Options_changeValue = Window_Options.prototype.changeValue;
    Window_Options.prototype.changeValue = function(symbol, value) {
        if (symbol === "battleStyleToggle") {
            const currentValueIsWait = this.battleStyleToggle();
            
            // Přepínání mezi 1 (Active) a 2 (Wait)
            const newBattleSystemValue = currentValueIsWait ? 1 : 2; 

            // Aplikace nové hodnoty a synchronizace battleTpbWait
            $dataSystem.battleSystem = newBattleSystemValue;
            $dataSystem.battleTpbWait = (newBattleSystemValue === 2);
            
            // Synchronizace BattleManageru, pokud bitva probíhá.
            if (SceneManager._scene instanceof Scene_Battle) {
                BattleManager._tpbMode = (newBattleSystemValue === 2) ? "wait" : "active";
            }
            
            this.redrawItem(this.findSymbol("battleStyleToggle"));
			return;
        }
        _Window_Options_changeValue.call(this, symbol, value);
    };
    
})();
