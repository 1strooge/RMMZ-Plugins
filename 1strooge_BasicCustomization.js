//=============================================================================
// 1strooge_BasicCustomization.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.5.2(EN) – Basic customization of core RPG Maker MZ features
 * @author 1strooge
 * @url https://raw.githubusercontent.com/1strooge/RMMZ-Plugins/main/1strooge_BasicCustomization.js
 * @contact https://forums.rpgmakerweb.com/index.php?members/rooge.85756/
 * @version 1.5.2
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
 * Universal plugin combining practical RPG Maker MZ customizations into one
 * clean, modular system. Each feature can be toggled independently.
 *
 * ============================================================================ 
 * ⚙️ Features
 * ============================================================================ 
 * - Disable cursor blinking
 * - Auto-hide mouse cursor when idle
 * - Remove Touch UI (Menu/Cancel buttons)
 * - Disable actor slide-in during battle start
 * - Disable red flash on Floor Damage tiles
 * - Floor Damage animations (player & events)
 * - Remove Always Dash option
 * - Dynamic Options window height (auto/fixed rows)
 * - Merge BGS/ME/SE into one SFX option
 * - Custom Fade In/Out with color + wait support
 *
 * ============================================================================ 
 * 📘 Installation and usage
 * ============================================================================ 
 * 1. Copy the file to:  js/plugins/
 * 2. Enable it in the Plugin Manager.
 * 3. Adjust parameters as needed.
 * 4. Plugin commands:  
 *    • Set Fade Settings  
 *    • Reset Fade Settings  
 *    • Execute Fade In / Fade Out
 * 5. Floor Damage Animation:  
 *    • Works only if "Disable Floor Damage Flash" = true.  
 *    • Triggers animation on player & events stepping on Floor Damage tiles.  
 *    • Immunity tags:  
 *       - <noDMA> for States  
 *       - <noEDMA> for Events  
 *
 * ============================================================================ 
 * 🧠 Compatibility
 * ============================================================================ 
 * - Place below UI/layout modifiers.
 * - Compatible with post-processing/fade shaders.
 * - Fade Wait & Floor Damage use alias-safe overrides.
 *
 * ============================================================================ 
 * 🧩 Changelog
 * ============================================================================ 
 * v1.0  – basic Options adjustments  
 * v1.1  – Touch UI removal  
 * v1.2  – Always Dash & Floor Damage disable  
 * v1.3  – Fade In/Out + Wait  
 * v1.4  – colored fade  
 * v1.4.1 – final (CZ/EN), CC BY-NC 4.0 license  
 * v1.5   – Floor Damage animations + immunity tags  
 * v1.5.1 – License changed to CC BY-SA 4.0  
 * v1.5.2 – Removed obsolete Option Window Width parameter  
 *           • Simplified and cleaned window layout  
 *           • Retains dynamic height logic  
 *           • Verified stable (RMMZ v1.9.1+)
 *
 * ============================================================================ 
 * © 1strooge 2025  
 * License: CC BY-SA 4.0  
 * (https://creativecommons.org/licenses/by-sa/4.0/)
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
    const floorDamageAnimation = Number(p["floorDamageAnimation"] || 0);
    const floorDamageDelay = Number(p["floorDamageDelay"] || 15);
    const optionWindowRows = Number(p["optionWindowRows"] || 0);
    const mergeSfx = p["mergeSfx"] === "true";
    const removeDash = p["removeDash"] === "true";

    //======================================================================
    // Disable Cursor Blink
    //======================================================================
    if (disableCursorBlink) {
        Window.prototype._makeCursorAlpha = function() {
            return this.contentsOpacity / 255;
        };
    }

    //======================================================================
    // Auto-hide Mouse Cursor
    //======================================================================
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

    //======================================================================
    // Remove Touch UI
    //======================================================================
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

    //======================================================================
    // Disable Slide Entry Motion in Battle
    //======================================================================
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

    //======================================================================
    // Disable Floor Damage Flash
    //======================================================================
    if (noFloorDamageFlash) {
        Game_Screen.prototype.startFlashForDamage = function() {};
    }

    //======================================================================
    // Notetag Immunity
    //======================================================================
    Game_Actor.prototype.hasNoDamageAnimState = function() {
        return this.states().some(state => state && state.note && state.note.includes("<noDMA>"));
    };
    Game_Event.prototype.hasNoEventDamageAnimTag = function() {
        const data = this.event();
        return data && data.note && data.note.includes("<noEDMA>");
    };

    //======================================================================
    // Floor Damage Animations
    //======================================================================
    const _Game_Actor_executeFloorDamage = Game_Actor.prototype.executeFloorDamage;
    Game_Actor.prototype.executeFloorDamage = function() {
        _Game_Actor_executeFloorDamage.call(this);
        if (noFloorDamageFlash && floorDamageAnimation > 0 && !$gameParty.leader().hasNoDamageAnimState()) {
            const delayMs = Math.max(0, floorDamageDelay|0) * (1000 / 60);
            setTimeout(() => {
                if ($gameTemp && $gamePlayer) {
                    $gameTemp.requestAnimation([$gamePlayer], floorDamageAnimation);
                }
            }, delayMs);
        }
    };

    const _Game_Event_update = Game_Event.prototype.update;
    Game_Event.prototype.update = function() {
        _Game_Event_update.call(this);
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
            } else if (!isOnDamage) {
                this._floorDamageAnimPlayed = false;
            }
        }
    };

    //======================================================================
    // Dynamic Options Window Height
    //======================================================================
    const _Window_Options_windowHeight = Window_Options.prototype.windowHeight;
    Window_Options.prototype.windowHeight = function() {
        const rows = Number(optionWindowRows || 0);
        if (rows > 0) return this.fittingHeight(rows);
        const items = this.maxItems ? this.maxItems() : 0;
        return this.fittingHeight(Math.min(items, 12));
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

    //======================================================================
    // Merge SFX Volumes
    //======================================================================
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

    //======================================================================
    // Remove Always Dash
    //======================================================================
    if (removeDash) {
        const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
        Window_Options.prototype.addGeneralOptions = function() {
            _Window_Options_addGeneralOptions.call(this);
            const idx = this._list.findIndex(i => i.symbol === "alwaysDash");
            if (idx !== -1) this._list.splice(idx, 1);
        };
    }

    //======================================================================
    // Fade Commands
    //======================================================================
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

    function getFadeColorArray() {
        const type = $gameSystem._customFadeColor ?? 0;
        const rgb = $gameSystem._customFadeRGB || [0, 0, 0];
        switch (type) {
            case 1: return [255, 255, 255, 255];
            case 2: return [255, 0, 0, 255];
            case 3: return [rgb[0], rgb[1], rgb[2], 255];
            default: return [0, 0, 0, 255];
        }
    }

    PluginManager.registerCommand(pluginName, "doFadeIn", () => {
        const dur = $gameSystem._customFadeIn ?? 30;
        const rgba = getFadeColorArray();
        const wait = $gameSystem._fadeWait;
        $gameSystem._fadeColor = [rgba[0], rgba[1], rgba[2]];
        const scene = SceneManager._scene;
        if (!scene || !scene.startFadeIn) return;
        scene.startFadeIn(dur, false);
        if (wait && $gameMap && $gameMap._interpreter) $gameMap._interpreter.setWaitMode("fade");
    });

    PluginManager.registerCommand(pluginName, "doFadeOut", () => {
        const dur = $gameSystem._customFadeOut ?? 30;
        const rgba = getFadeColorArray();
        const wait = $gameSystem._fadeWait;
        $gameSystem._fadeColor = [rgba[0], rgba[1], rgba[2]];
        const scene = SceneManager._scene;
        if (!scene || !scene.startFadeOut) return;
        scene.startFadeOut(dur, false);
        if (wait && $gameMap && $gameMap._interpreter) $gameMap._interpreter.setWaitMode("fade");
    });

    const _Scene_Base_updateColorFilter = Scene_Base.prototype.updateColorFilter;
    Scene_Base.prototype.updateColorFilter = function() {
        _Scene_Base_updateColorFilter.call(this);
        try {
            const rgb = $gameSystem._fadeColor || [0, 0, 0];
            const blend = [rgb[0], rgb[1], rgb[2], this._fadeOpacity || 0];
            if (this._colorFilter && typeof this._colorFilter.setBlendColor === "function") {
                this._colorFilter.setBlendColor(blend);
            }
        } catch (e) {
            console.error("1strooge_BasicCustomization: updateColorFilter error", e);
        }
    };

    const _updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        if (this._waitMode === "fade") {
            if (SceneManager._scene && SceneManager._scene._fadeDuration > 0) {
                return true;
            } else {
                this._waitMode = "";
                return false;
            }
        }
        return _updateWaitMode.call(this);
    };

})();
