//=============================================================================
// 1strooge_BasicCustomization.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.5(EN) – Basic customization of core RPG Maker MZ features
 * @author 1strooge
 * @url https://raw.githubusercontent.com/1strooge/RMMZ-Plugins/main/1strooge_BasicCustomization.js
 * @contact https://forums.rpgmakerweb.com/index.php?members/rooge.85756/
 * @version 1.5.1
 *
 * @param disableCursorBlink
 * @text Disable Cursor Blink
 * @type boolean
 * @default false
 * @desc If true, disables the blinking animation of the window cursor.
 *
 * @param autoHideMouse
 * @text Auto-hide Mouse Cursor
 * @type boolean
 * @default false
 * @desc Automatically hides the mouse cursor when inactive or when using keyboard/gamepad input.
 *
 * @param removeTouchUI
 * @text Remove Touch UI
 * @type boolean
 * @default false
 * @desc Permanently removes on-screen Touch UI buttons (Menu/Cancel).
 *
 * @param noStartMove
 * @text Disable Battle Slide Entry
 * @type boolean
 * @default false
 * @desc If true, actors appear immediately in their battle positions (no walk-in animation).
 *
 * @param noFloorDamageFlash
 * @text Disable Floor Damage Flash
 * @type boolean
 * @default false
 * @desc When true, red screen flash effect on Floor Damage tiles is disabled.
 *
 * @param floorDamageAnimation
 * @text Floor Damage Animation
 * @type animation
 * @default 0
 * @desc Animation ID to play on the player/event stepping on a floor damage tile (0 = disabled).
 *
 * @param floorDamageDelay
 * @text Animation Delay (frames)
 * @type number
 * @min 0
 * @max 60
 * @default 15
 * @desc Delay before the animation plays after stepping on a floor damage tile.
 *
 * @param optionWindowWidth
 * @text Options Window Width (px)
 * @type number
 * @min 0
 * @default 0
 * @desc Sets a custom width for the Options window. 0 = default width.
 *
 * @param optionWindowRows
 * @text Options Window Rows
 * @type number
 * @min 0
 * @default 0
 * @desc 0 = dynamic height (auto), >0 = fixed number of visible rows.
 *
 * @param mergeSfx
 * @text Merge SFX Volumes
 * @type boolean
 * @default false
 * @desc Merges BGS, ME, and SE volume controls into a single SFX option.
 *
 * @param removeDash
 * @text Remove "Always Dash"
 * @type boolean
 * @default false
 * @desc Removes the Always Dash setting from the Options menu.
 *
 * -----------------------------------------------------------------------------
 * @command setFadeSettings
 * @text Set Fade Settings
 * @desc Defines duration, color, and wait behavior for fade-in/out effects.
 *
 * @arg fadeIn
 * @text Fade In Duration (frames)
 * @type number
 * @min 0
 * @default 30
 *
 * @arg fadeOut
 * @text Fade Out Duration (frames)
 * @type number
 * @min 0
 * @default 30
 *
 * @arg fadeColor
 * @text Fade Color
 * @desc Select the fade color: 0=Black, 1=White, 2=Red, 3=Custom RGB.
 * @type select
 * @option Black
 * @value 0
 * @option White
 * @value 1
 * @option Red
 * @value 2
 * @option Custom (RGB)
 * @value 3
 * @default 0
 *
 * @arg red
 * @text Custom Color - Red (R)
 * @desc Used only if "Custom (RGB)" is selected.
 * @type number
 * @min 0
 * @max 255
 * @default 0
 *
 * @arg green
 * @text Custom Color - Green (G)
 * @type number
 * @min 0
 * @max 255
 * @default 0
 *
 * @arg blue
 * @text Custom Color - Blue (B)
 * @type number
 * @min 0
 * @max 255
 * @default 0
 *
 * @arg wait
 * @text Wait for Completion
 * @type boolean
 * @default false
 * @desc If true, the event will wait until the fade animation is finished.
 *
 * -----------------------------------------------------------------------------
 *
 * @command resetFadeSettings
 * @text Reset Fade Settings
 * @desc Resets fade duration and color to default (30 frames, black).
 *
 * @command doFadeIn
 * @text Execute Fade In
 * @desc Performs a fade-in using the current settings (duration, color, wait).
 *
 * @command doFadeOut
 * @text Execute Fade Out
 * @desc Performs a fade-out using the current settings (duration, color, wait).
 *
 * -----------------------------------------------------------------------------
 * @help
 * ============================================================================
 * 🧩 Description
 * ============================================================================
 *
 * A universal plugin combining common RPG Maker MZ tweaks into a single,
 * clean, modular file for better project clarity and maintainability.
 *
 * Each component can be individually disabled through parameters to reduce
 * plugin conflicts.
 *
 * ============================================================================
 * ⚙️ Features
 * ============================================================================
 * - Disable cursor blinking
 * - Auto-hide mouse cursor when idle 
 * - Remove Touch UI (Menu/Cancel buttons)
 * - Disable actor battle entry motion (actors already in position)
 * - Disable red flash on Floor Damage tiles
 * - Optional Floor Damage animation (on player & events) 
 * - Remove Always Dash
 * - Adjust Options window width and height 
 * - Merge BGS/ME/SE volumes into a single SFX option
 * - Colored Fade In / Fade Out effects (black, white, red, custom RGB)
 * - Optional Wait mode to pause events until fade completes
 *
 * ============================================================================
 * 📘 Installation and usage
 * ============================================================================ 
 * 1. Copy the file to:  js/plugins/
 * 2. Enable it in the Plugin Manager.
 * 3. Adjust parameters as needed.
 * ----------------------------------------------------------------------------
 * 4. Use plugin commands under "Advanced → Plugin Command":
 *    • Set Fade Settings
 *    • Reset Fade Settings
 *    • Execute Fade In / Out
 * ----------------------------------------------------------------------------
 * 5. Floor Damage Animations
 *    • Animations will only trigger if the plugin parameter 
 *     “Disable Floor Damage Flash” is set to **true**.
 *    • The animation is shown on the player and all events 
 *      when stepping on tiles with the "Floor Damage" flag.
 *    • To prevent specific cases:
 *        - Add the notetag <noDMA> to any **State's Note** 
 *         (no Damage Floor Animation for player/party members).
 *        - Add the notetag <noEDMA> to an **Event's Note**
 *         (no Damage Floor Animation for that specific event).
 *    • Example:  
 *        State → Note box → <noDMA>  
 *        Event → Note box → <noEDMA>
 *    • Animation plays once per tile entry, delayed by 
 *      the value set in “Animation Delay” (frames).
 * 
 * ============================================================================
 * 🧠 Compatibility
 * ============================================================================
 * - Place below any UI layout modifiers.
 * - If using lighting or post-processing filters, test fade effects.
 * - Wait mode (in fade) and floor damage animations use alias-safe methods.
 *
 * ============================================================================
 * 🧩 Changelog
 * ============================================================================
 * v1.0  – basic Options adjustments
 * v1.1  – added Touch UI removal
 * v1.2  – added Always Dash & Floor Damage disable
 * v1.3  – implemented Fade In/Out commands with Wait
 * v1.4  – colored fade via ColorFilter shader
 * v1.4.1 – final release (CZ/EN), CC BY-NC 4.0 license, stabilization
 * v1.5   – Added Floor Damage animations for player & events
 *           • Optional immunity via <noDMA> and <noEDMA> notetags
 *           • Works with “Disable Floor Damage Flash” = true
 *           • Includes animation delay control
 * v1.5.1 - License changed from CC BY-NC 4.0 to CC BY-SA 4.0
 * 
 * ============================================================================
 * © 1strooge 2025
 * ============================================================================
 * 1strooge_BasicCustomization.js – Version 1.5 (EN)
 * Author: 1strooge
 * Contact: https://forums.rpgmakerweb.com/index.php?members/rooge.85756/
 * ----------------------------------------------------------------------------
 * Note:
 * Recommended RPG Maker MZ version: 1.9.1+ (minimum 1.6.2) *
 * ============================================================================
 * License: CC BY-SA 4.0  (https://creativecommons.org/licenses/by-sa/4.0/)
 * ============================================================================
 */

(() => {
    const pluginName = "1strooge_BasicCustomization";
    const p = PluginManager.parameters(pluginName);

    const disableCursorBlink = p["disableCursorBlink"] === "true";
    const autoHideMouse = p["autoHideMouse"] === "true";
    const removeTouchUI = p["removeTouchUI"] === "true";
    const noStartMove = p["noStartMove"] === "true";
    const noFloorDamageFlash = p["noFloorDamageFlash"] === "true";
    const optionWindowWidth = Number(p["optionWindowWidth"] || 0);
    const optionWindowRows = Number(p["optionWindowRows"] || 0);
    const mergeSfx = p["mergeSfx"] === "true";
    const removeDash = p["removeDash"] === "true";

    //=========================================================================
    //  Cursor blink
    //=========================================================================
    if (disableCursorBlink) {
        Window.prototype._makeCursorAlpha = function() {
            return this.contentsOpacity / 255;
        };
    }

    //=========================================================================
    //  Auto hide mouse
    //=========================================================================
    if (autoHideMouse) {
        const _Input_update = Input.update;
        Input.update = function() {
            const prev = this.date;
            _Input_update.apply(this, arguments);
            if (this.date !== prev) Graphics.setHiddenPointer(true);
        };

        const _TouchInput__onMouseMove = TouchInput._onMouseMove;
        TouchInput._onMouseMove = function(e) {
            _TouchInput__onMouseMove.apply(this, arguments);
            Graphics.setHiddenPointer(false);
        };

        Graphics.setHiddenPointer = function(value) {
            document.body.style.cursor = value ? "none" : "";
        };
    }

    //=========================================================================
    //  Remove Touch UI + menu layout fixes
    //=========================================================================
    if (removeTouchUI) {
        const _Scene_Boot_start = Scene_Boot.prototype.start;
        Scene_Boot.prototype.start = function() {
            _Scene_Boot_start.call(this);
            ConfigManager.touchUI = false;
        };

        const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
        Window_Options.prototype.addGeneralOptions = function() {
            _Window_Options_addGeneralOptions.call(this);
            const idx = this._list.findIndex(i => i.symbol === "touchUI");
            if (idx !== -1) this._list.splice(idx, 1);
        };

        Scene_MenuBase.prototype.mainAreaHeight = function() {
            return Graphics.boxHeight - this.helpAreaHeight();
        };
        Scene_MenuBase.prototype.mainAreaTop = function() {
            return this.isBottomHelpMode() ? 0 : this.helpAreaHeight();
        };
        Scene_MenuBase.prototype.helpAreaTop = function() {
            return !this.isBottomHelpMode() ? 0 : this.mainAreaHeight();
        };
        Scene_Map.prototype.createButtons = function() {};
        Scene_MenuBase.prototype.createButtons = function() {};
        Scene_Battle.prototype.createButtons = function() {};
    }

    //=========================================================================
    //  No start move in battle
    //=========================================================================
    if (noStartMove) {
        Sprite_Actor.prototype.startEntryMotion = function() {
            if (this._actor && this._actor.canMove()) {
                this.startMotion("walk");
                this.startMove(0, 0, 0);
            } else if (!this.isMoving()) {
                this.refreshMotion();
                this.startMove(0, 0, 0);
            }
        };
    }

    //=========================================================================
    //  No floor damage flash
    //=========================================================================
    if (noFloorDamageFlash) {
        Game_Screen.prototype.startFlashForDamage = function() {};
    }

    //=========================================================================
    // Notetag immunity checks
    //=========================================================================

    // Hráč - kontrola <noDMA> v aktivních statech
    Game_Actor.prototype.hasNoDamageAnimState = function() {
        return this.states().some(state => state && state.note && state.note.includes("<noDMA>"));
    };

    // Event - kontrola <noEDMA> v poznámce eventu
    Game_Event.prototype.hasNoEventDamageAnimTag = function() {
        const data = this.event();
        return data && data.note && data.note.includes("<noEDMA>");
    };
	
	//=========================================================================
    // Floor Damage Animation Extension
    //=========================================================================

    // Načtení parametrů (navazuje na proměnnou `p` z tvého pluginu)
    const floorDamageAnimation = Number(p["floorDamageAnimation"] || 0);
    const floorDamageDelay     = Number(p["floorDamageDelay"] || 15);

    const _Game_Actor_executeFloorDamage = Game_Actor.prototype.executeFloorDamage;
    Game_Actor.prototype.executeFloorDamage = function() {
        _Game_Actor_executeFloorDamage.call(this);

        // Pokud je vypnutý flash a máme nastavenou animaci > 0
        if (noFloorDamageFlash && floorDamageAnimation > 0 && !$gameParty.leader().hasNoDamageAnimState()) {
            const delayMs = Math.max(0, floorDamageDelay|0) * (1000 / 60); // frames → ms
            setTimeout(() => {
                // V MZ se animace na mapě spouští přes $gameTemp.requestAnimation
                if ($gameTemp && $gamePlayer) {
                    $gameTemp.requestAnimation([$gamePlayer], floorDamageAnimation);
                }
            }, delayMs);
        }
    };

    //=========================================================================
    // Floor Damage Animation for Events (plně funkční verze)
    //=========================================================================

    const _Game_Event_update = Game_Event.prototype.update;
    Game_Event.prototype.update = function() {
        _Game_Event_update.call(this);

        // Podmínky: vypnutý flash, nastavená animace, event není erased
        if (!this._erased && noFloorDamageFlash && floorDamageAnimation > 0 && !this.hasNoEventDamageAnimTag()) {
            const isOnDamage = $gameMap.isDamageFloor(this.x, this.y);

            if (isOnDamage && !this._floorDamageAnimPlayed) {
                this._floorDamageAnimPlayed = true;

                const delayMs = Math.max(0, floorDamageDelay|0) * (1000 / 60);
                setTimeout(() => {
                    if ($gameTemp) {
                        $gameTemp.requestAnimation([this], floorDamageAnimation);
                    }
                }, delayMs);
            } 
            else if (!isOnDamage) {
                 // Reset flagu po opuštění dlaždice
                this._floorDamageAnimPlayed = false;
            }
        }
    };

    //=========================================================================
    //  Options window sizing and centering
    //=========================================================================
    const _Window_Options_windowWidth = Window_Options.prototype.windowWidth;
    Window_Options.prototype.windowWidth = function() {
        return optionWindowWidth > 0 ? optionWindowWidth : _Window_Options_windowWidth.call(this);
    };

    const _Window_Options_windowHeight = Window_Options.prototype.windowHeight;
    Window_Options.prototype.windowHeight = function() {
        const rows = Number(optionWindowRows || 0);
        if (rows > 0) return this.fittingHeight(rows);
        const items = this.maxItems ? this.maxItems() : 0;
        return this.fittingHeight(Math.min(items, 12));
    };

    const _Scene_Options_optionWindowRect = Scene_Options.prototype.optionWindowRect;
    Scene_Options.prototype.optionWindowRect = function() {
        const rect = _Scene_Options_optionWindowRect.call(this);
        if (optionWindowWidth > 0) rect.width = optionWindowWidth;
        const temp = new Window_Options(new Rectangle());
        rect.height = temp.windowHeight();
        temp.destroy();
        rect.y = Math.floor((Graphics.boxHeight - rect.height) / 2);
        return rect;
    };

    const _Scene_Options_createOptionsWindow = Scene_Options.prototype.createOptionsWindow;
    Scene_Options.prototype.createOptionsWindow = function() {
        _Scene_Options_createOptionsWindow.call(this);
        const win = this._optionsWindow;
        win.height = win.windowHeight();
        win.x = Math.floor((Graphics.boxWidth - win.width) / 2);
        win.y = Math.floor((Graphics.boxHeight - win.height) / 2);
        win.refresh();
    };

    //=========================================================================
    //  Merge SFX
    //=========================================================================
    if (mergeSfx) {
        const _ConfigManager_load = ConfigManager.load;
        ConfigManager.load = function() {
            _ConfigManager_load.call(this);
            if (this.sfxVolume !== undefined) {
                this.bgmVolume = this.sfxVolume;
                this.bgsVolume = this.sfxVolume;
                this.meVolume = this.sfxVolume;
                this.seVolume = this.sfxVolume;
            } else {
                this.sfxVolume = this.bgmVolume;
            }
        };
        const _ConfigManager_save = ConfigManager.save;
        ConfigManager.save = function() {
            this.sfxVolume = this.bgmVolume;
            _ConfigManager_save.call(this);
        };
        Window_Options.prototype.addVolumeOptions = function() {
            this.addCommand(TextManager.bgmVolume, "bgmVolume");
            this.addCommand("SFX Volume", "sfxVolume");
        };
        Window_Options.prototype.sfxVolume = function() {
            return ConfigManager.sfxVolume;
        };
        Window_Options.prototype.setSfxVolume = function(v) {
            ConfigManager.sfxVolume = v.clamp(0, 100);
            ConfigManager.bgsVolume = v;
            ConfigManager.meVolume = v;
            ConfigManager.seVolume = v;
            this.redrawItem(this.findSymbol("sfxVolume"));
        };
        const _Window_Options_changeValueBy = Window_Options.prototype.changeValueBy;
        Window_Options.prototype.changeValueBy = function(symbol, change) {
            if (symbol === "sfxVolume") this.setSfxVolume(this.sfxVolume() + change);
            else _Window_Options_changeValueBy.call(this, symbol, change);
        };
    }

    //=========================================================================
    //  Remove Always Dash
    //=========================================================================
    if (removeDash) {
        const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
        Window_Options.prototype.addGeneralOptions = function() {
            _Window_Options_addGeneralOptions.call(this);
            const idx = this._list.findIndex(i => i.symbol === "alwaysDash");
            if (idx !== -1) this._list.splice(idx, 1);
        };
    }

    //=========================================================================
    //  Fade commands registration (set/reset/do)
    //=========================================================================

    PluginManager.registerCommand(pluginName, "setFadeSettings", args => {
        $gameSystem._customFadeIn = Number(args.fadeIn || 30);
        $gameSystem._customFadeOut = Number(args.fadeOut || 30);
        $gameSystem._customFadeColor = Number(args.fadeColor || 0);
        $gameSystem._customFadeRGB = [
            Number(args.red || 0),
            Number(args.green || 0),
            Number(args.blue || 0)
        ];
        $gameSystem._fadeWait = args.wait === "true";
    });

    PluginManager.registerCommand(pluginName, "resetFadeSettings", () => {
        $gameSystem._customFadeIn = null;
        $gameSystem._customFadeOut = null;
        $gameSystem._customFadeColor = null;
        $gameSystem._customFadeRGB = null;
        $gameSystem._fadeWait = false;
    });

    // helper: get RGBA (0-255)
    function getFadeColorArray() {
        const type = $gameSystem._customFadeColor ?? 0;
        const rgb = $gameSystem._customFadeRGB || [0, 0, 0];
        switch (type) {
            case 1: return [255, 255, 255, 255]; // white
            case 2: return [255, 0, 0, 255];     // red
            case 3: return [rgb[0], rgb[1], rgb[2], 255]; // custom
            default: return [0, 0, 0, 255];      // black
        }
    }

    //=========================================================================
    //  doFadeIn / doFadeOut commands
    //  — set $gameSystem._fadeColor, call native scene.startFadeIn/Out
    //=========================================================================

    PluginManager.registerCommand(pluginName, "doFadeIn", () => {
        const dur = $gameSystem._customFadeIn ?? 30;
        const rgba = getFadeColorArray();
        const wait = $gameSystem._fadeWait;

        // store rgb in gameSystem for filter usage
        $gameSystem._fadeColor = [rgba[0], rgba[1], rgba[2]];

        const scene = SceneManager._scene;
        if (!scene || !scene.startFadeIn) return;

        scene.startFadeIn(dur, false);

        if (wait && $gameMap && $gameMap._interpreter) {
            $gameMap._interpreter.setWaitMode("fade");
            // interpreter will check scene._fadeDuration via updateWaitMode
        }
    });

    PluginManager.registerCommand(pluginName, "doFadeOut", () => {
        const dur = $gameSystem._customFadeOut ?? 30;
        const rgba = getFadeColorArray();
        const wait = $gameSystem._fadeWait;

        $gameSystem._fadeColor = [rgba[0], rgba[1], rgba[2]];

        const scene = SceneManager._scene;
        if (!scene || !scene.startFadeOut) return;

        scene.startFadeOut(dur, false);

        if (wait && $gameMap && $gameMap._interpreter) {
            $gameMap._interpreter.setWaitMode("fade");
        }
    });

    //=========================================================================
    //  Use ColorFilter approach — call original updateColorFilter then set blend
    //  This mirrors Hakuen's approach and guarantees full RGB blending.
    //=========================================================================
    const _Scene_Base_updateColorFilter = Scene_Base.prototype.updateColorFilter;
    Scene_Base.prototype.updateColorFilter = function() {
        // call original so other behavior remains
        _Scene_Base_updateColorFilter.call(this);

        // apply our fade color as blendColor using current scene fade opacity
        try {
            const rgb = $gameSystem._fadeColor || [0, 0, 0];
            const blend = [rgb[0], rgb[1], rgb[2], this._fadeOpacity || 0];
            if (this._colorFilter && typeof this._colorFilter.setBlendColor === "function") {
                this._colorFilter.setBlendColor(blend);
            }
        } catch (e) {
            // swallow errors to avoid breaking game — nothing fatal
            console.error("1strooge_BasicCustomization: updateColorFilter error", e);
        }
    };

    //=========================================================================
    //  Wait mode "fade" — interpreter waits while scene fade duration > 0
    //=========================================================================
    var _1strooge_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        if (this._waitMode === "fade") {
            if (SceneManager._scene && SceneManager._scene._fadeDuration > 0) {
                return true;
            } else {
                this._waitMode = "";
                return false;
            }
        }
        return _1strooge_updateWaitMode.call(this);
    };

    // Clean-up: ensure we didn't leave older conflicting overrides in this file
    // (we intentionally DO NOT override Scene_Base.startFadeIn/startFadeOut,
    // SceneManager.updateFade, Graphics._updateFadeSprite, or similar
    // — we rely on native fade + color filter above)

})(); 
