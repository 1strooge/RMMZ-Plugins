
//=============================================================================
// 1strooge_BasicCustomization.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.6.0 (EN) – Basic customization of core RPG Maker MZ features + Damage Animations + Vehicle QoL
 * @author 1strooge
 * @url https://raw.githubusercontent.com/1strooge/RMMZ-Plugins/main/1strooge_BasicCustomization.js
 * @contact https://forums.rpgmakerweb.com/index.php?members/rooge.85756/
 * @version 1.6.0-pre
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
 * @text Floor Damage Animation Delay (frames)
 * @type number
 * @min 0
 * @max 60
 * @default 15
 * @desc Delay before the animation plays after stepping on a floor damage tile.
 *
 * @param poisonDamageAnimation
 * @text Poison Damage Animation
 * @type animation
 * @default 0
 * @desc Animation ID to play when an actor takes poison damage (0 = disabled).
 *
 * @param poisonDamageDelay
 * @text Poison Damage Animation Delay (frames)
 * @type number
 * @min 0
 * @max 60
 * @default 15
 * @desc Delay before the poison animation plays after HP loss from poison.
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
 * @param disableMouseDash
 * @text Disable Dash on Mouse/Touch
 * @type boolean
 * @default true
 * @desc When ON, click/tap movement will not auto-dash; dash only via Shift/Always Dash.
 *
 * @param disableDashInVehicles
 * @text Disable Dash in Vehicles
 * @type boolean
 * @default true
 * @desc When ON, dashing is disabled while riding any vehicle.
 *
 * @param vehicleSpeedOverride
 * @text Enable Vehicle Speed Override
 * @type boolean
 * @default true
 * @desc If ON, apply speeds below (and via plugin commands).
 *
 * @param vehicleBoatSpeed
 * @text Boat Speed (1-6)
 * @type number
 * @min 0
 * @max 6
 * @default 0
 * @desc 0 = keep default; otherwise set Boat speed (1..6).
 *
 * @param vehicleShipSpeed
 * @text Ship Speed (1-6)
 * @type number
 * @min 0
 * @max 6
 * @default 0
 * @desc 0 = keep default; otherwise set Ship speed (1..6).
 *
 * @param vehicleAirshipSpeed
 * @text Airship Speed (1-6)
 * @type number
 * @min 0
 * @max 6
 * @default 0
 * @desc 0 = keep default; otherwise set Airship speed (1..6).
 *
 * ----------------------------------------------------------------------------
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
 * ---------------------------------------------------------------------------- 
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
 * ---------------------------------------------------------------------------- 
 * @command setVehicleSpeed
 * @text Set Vehicle Speed
 * @desc Set Boat/Ship/Airship (or all) speed at runtime.
 *
 * @arg vehicle
 * @text Vehicle
 * @type select
 * @option Boat
 * @value boat
 * @option Ship
 * @value ship
 * @option Airship
 * @value airship
 * @option All
 * @value all
 * @default boat
 *
 * @arg speed
 * @text Speed (1-6)
 * @type number
 * @min 1
 * @max 6
 * @default 4
 *
 * ---------------------------------------------------------------------------- 
 * @command resetVehicleSpeeds
 * @text Reset Vehicle Speeds
 * @desc Restore all vehicle speeds to their original values (dtb/map defaults).
 *
 * ---------------------------------------------------------------------------- 
 * @help
 * ============================================================================
 * 🧩 Description
 * ============================================================================
 * A unified plugin combining small but essential RPG Maker MZ customizations:
 * interface tweaks, quality-of-life settings, visual effects control, and now
 * vehicle QoL (dash handling + speed control).
 *
 * Modular system, each feature can be toggled independently for compatibility.
 *
 * ============================================================================
 * ⚙️ Features (new in this build)
 * ============================================================================
 * - Disable auto-dash on mouse/touch pathing
 * - Disable dash in vehicles (no Shift/Always Dash sprint while riding)
 * - Vehicle speed override (Boat/Ship/Airship), incl. runtime plugin commands
 *
 * ============================================================================
 * 📘 Installation and Usage
 * ============================================================================
 * 1. Copy the file to:  js/plugins/
 * 2. Enable it in the Plugin Manager.
 * 3. Adjust parameters as needed.
 *
 * ============================================================================
 * 4. Floor Damage Animation:  
 *    • Works only if "Disable Floor Damage Flash" = true.  
 *    • Triggers animation on player & events stepping on Floor Damage tiles.  
 *    • Immunity notetags (the animation will not trigger):  
 *       - <noDMA> for States  
 *       - <noEDMA> for Events
 *
 * ============================================================================
 * 5. Poison Damage Animation:  
 *    • Works only if "Disable Floor Damage Flash" = true.  
 *    • Triggers an animation on the player if a Poison state is applied.  
 *      Note: no notetag, the animation will not trigger when the Poison 
 *            resistance ability is applied.
 *
 * ============================================================================
 * 6. Enable Vehicle Speed Override (Boat/Ship/Airship):
 *    - Turn ON to apply new global speed defaults from parameters.
 *    - "0" keep default MZ speed, but speeds can be changed with commands.
 *
 * ============================================================================
 * 7. Plugin commands for Vehicle Speed Override:
 *    • "Set Vehicle Speed" changes the stored speed for Boat/Ship/Airship.
 *      
 *      Note: Changes apply on the next map load (e.g., after Transfer Player). 
 *            This follows how RPG Maker MZ initializes vehicles per map.
 *
 *      Example: In an event, call plugin command: 
 *               Set Vehicle Speed → Ship → 6 
 *               then transfer the player to another map. The new speed takes 
 *               effect immediately.
 *      -
 *      Engine note: RPG Maker MZ supports only one Boat, one Ship, and one 
 *                   Airship globally.
 *      -----------------------------------------------------------------------
 *    • "Reset Vehicle Speeds" restore all vehicle speeds to their original
 *                             values (database/map defaults).
 *
 * ============================================================================
 * 8. Plugin commands for Fade (custom colors + fade duration in frames):
 *    • Set Fade Settings
 *    • Execute Fade In / Fade Out
 *    • Reset Fade Settings  
 *
 * ============================================================================
 * 🧠 Compatibility
 * ============================================================================
 * - Recommended RPG Maker MZ version: 1.9.1+ (minimum 1.6.2)
 * - Place below UI layout plugins or Options menu overhauls.
 * - Dash handling preserves vanilla logic first; then applies min. overrides.
 *
 * ============================================================================
 * 🧩 Changelog
 * ============================================================================
 * v1.0  – Basic Options adjustments  
 * v1.1  – Added Touch UI removal  
 * v1.2  – Added Always Dash & Floor Damage disable  
 * v1.3  – Implemented Fade In/Out commands with Wait  
 * v1.4  – Added colored fade via ColorFilter  
 * v1.4.1 – Final CZ/EN release, CC BY-SA 4.0  
 * v1.5  – Added Floor Damage animations (player & events), +delay, +notetags  
 * v1.6.0 – Added Poison Damage animations; Mouse/Touch dash fix; Vehicle QoL:
 *          • Disable dash in vehicles
 *          • Vehicle speed override (params)
 *          • Plugin commands to set/reset speeds (apply on next map load)
 *
 * ============================================================================
 * © 1strooge 2025 — License: CC BY-SA 4.0
 * https://creativecommons.org/licenses/by-sa/4.0/
 * ============================================================================
 */

(() => {
    const pluginName = "1strooge_BasicCustomization";
    const p = PluginManager.parameters(pluginName);

    const disableCursorBlink     = p["disableCursorBlink"] === "true";
    const autoHideMouse          = p["autoHideMouse"] === "true";
    const removeTouchUI          = p["removeTouchUI"] === "true";
    const noStartMove            = p["noStartMove"] === "true";

    const noFloorDamageFlash     = p["noFloorDamageFlash"] === "true";
    const floorDamageAnimation   = Number(p["floorDamageAnimation"] || 0);
    const floorDamageDelay       = Number(p["floorDamageDelay"] || 15);
    const poisonDamageAnimation  = Number(p["poisonDamageAnimation"] || 0);
    const poisonDamageDelay      = Number(p["poisonDamageDelay"] || 15);

    const optionWindowRows       = Number(p["optionWindowRows"] || 0);
    const mergeSfx               = p["mergeSfx"] === "true";
    const removeDash             = p["removeDash"] === "true";

    const disableMouseDash       = p["disableMouseDash"] === "true";
    const disableDashInVehicles  = p["disableDashInVehicles"] === "true";

    const vehicleSpeedOverride   = p["vehicleSpeedOverride"] === "true";
    const vehicleBoatSpeedParam  = Number(p["vehicleBoatSpeed"] || 0);
    const vehicleShipSpeedParam  = Number(p["vehicleShipSpeed"] || 0);
    const vehicleAirshipSpeedParam = Number(p["vehicleAirshipSpeed"] || 0);

    // -----------------------------------------------------------------------
    // Cursor blink off
    // -----------------------------------------------------------------------
    if (disableCursorBlink) {
        Window.prototype._makeCursorAlpha = function() {
            return this.contentsOpacity / 255;
        };
    }

    // -----------------------------------------------------------------------
    // Auto hide mouse
    // -----------------------------------------------------------------------
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
        Graphics.setHiddenPointer = v => document.body.style.cursor = v ? "none" : "";
    }

    // -----------------------------------------------------------------------
    // Remove Touch UI
    // -----------------------------------------------------------------------
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
        Scene_Map.prototype.createButtons = function() {};
        Scene_MenuBase.prototype.createButtons = function() {};
        Scene_Battle.prototype.createButtons = function() {};
    }

    // -----------------------------------------------------------------------
    // Disable battle slide entry
    // -----------------------------------------------------------------------
    if (noStartMove) {
        Sprite_Actor.prototype.startEntryMotion = function() {
            if (this._actor && this._actor.canMove()) this.startMotion("walk");
            this.startMove(0, 0, 0);
        };
    }

    // -----------------------------------------------------------------------
    // Disable floor damage flash
    // -----------------------------------------------------------------------
    if (noFloorDamageFlash) {
        Game_Screen.prototype.startFlashForDamage = function() {};
    }

    // -----------------------------------------------------------------------
    // Notetag immunity (Floor Damage only)
    // -----------------------------------------------------------------------
    Game_Actor.prototype.hasNoDamageAnimState = function() {
        return this.states().some(state => state?.note?.includes("<noDMA>"));
    };
    Game_Event.prototype.hasNoEventDamageAnimTag = function() {
        return this.event()?.note?.includes("<noEDMA>");
    };

    // -----------------------------------------------------------------------
    // Floor Damage animation (Player)
    // -----------------------------------------------------------------------
    const _Game_Actor_executeFloorDamage = Game_Actor.prototype.executeFloorDamage;
    Game_Actor.prototype.executeFloorDamage = function() {
        _Game_Actor_executeFloorDamage.call(this);
        if (noFloorDamageFlash && floorDamageAnimation > 0 && !$gameParty.leader().hasNoDamageAnimState()) {
            setTimeout(() => {
                $gameTemp?.requestAnimation([$gamePlayer], floorDamageAnimation);
            }, floorDamageDelay * 1000 / 60);
        }
    };

    // -----------------------------------------------------------------------
    // Floor Damage animation (Events)
    // -----------------------------------------------------------------------
    const _Game_Event_update = Game_Event.prototype.update;
    Game_Event.prototype.update = function() {
        _Game_Event_update.call(this);
        if (!this._erased && noFloorDamageFlash && floorDamageAnimation > 0 && !this.hasNoEventDamageAnimTag()) {
            const isOnDamage = $gameMap.isDamageFloor(this.x, this.y);
            if (isOnDamage && !this._floorDamageAnimPlayed) {
                this._floorDamageAnimPlayed = true;
                setTimeout(() => {
                    $gameTemp?.requestAnimation([this], floorDamageAnimation);
                }, floorDamageDelay * 1000 / 60);
            } else if (!isOnDamage) {
                this._floorDamageAnimPlayed = false;
            }
        }
    };

    // -----------------------------------------------------------------------
    // Poison Damage animation (Actor)
    // -----------------------------------------------------------------------
    const _Game_Battler_regenerateHp = Game_Battler.prototype.regenerateHp;
    Game_Battler.prototype.regenerateHp = function() {
        const prevHp = this.hp;
        _Game_Battler_regenerateHp.call(this);
        const dmg = prevHp - this.hp;
        if (dmg > 0 && noFloorDamageFlash && poisonDamageAnimation > 0 && this.isActor()) {
            setTimeout(() => {
                $gameTemp?.requestAnimation([$gamePlayer], poisonDamageAnimation);
            }, poisonDamageDelay * 1000 / 60);
        }
    };

    // -----------------------------------------------------------------------
    // Options window dynamic height + centered
    // -----------------------------------------------------------------------
    Window_Options.prototype.windowHeight = function() {
        if (optionWindowRows > 0) return this.fittingHeight(optionWindowRows);
        const items = this.maxItems ? this.maxItems() : 0;
        return this.fittingHeight(Math.min(items, 12));
    };
    const _Scene_Options_createOptionsWindow = Scene_Options.prototype.createOptionsWindow;
    Scene_Options.prototype.createOptionsWindow = function() {
        _Scene_Options_createOptionsWindow.call(this);
        const w = this._optionsWindow;
        w.height = w.windowHeight();
        w.x = Math.floor((Graphics.boxWidth - w.width) / 2);
        w.y = Math.floor((Graphics.boxHeight - w.height) / 2);
        w.refresh();
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

    // -----------------------------------------------------------------------
    // Remove Always Dash
    // -----------------------------------------------------------------------
    if (removeDash) {
        const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
        Window_Options.prototype.addGeneralOptions = function() {
            _Window_Options_addGeneralOptions.call(this);
            const idx = this._list.findIndex(i => i.symbol === "alwaysDash");
            if (idx !== -1) this._list.splice(idx, 1);
        };
    }

    // -----------------------------------------------------------------------
    // Dash handling: keep vanilla update, then clamp (mouse/vehicle rules)
    // -----------------------------------------------------------------------
    if (disableMouseDash || disableDashInVehicles) {
        const _Game_Player_updateDashing = Game_Player.prototype.updateDashing;
        Game_Player.prototype.updateDashing = function() {
            _Game_Player_updateDashing.call(this);

            // Vehicle clamp
            if (disableDashInVehicles && this.isInVehicle()) {
                this._dashing = false;
                return;
            }
            // Mouse/touch auto-dash clamp: allow only if Shift (or Always Dash)
            if (disableMouseDash) {
                const autoPathing = $gameTemp.isDestinationValid?.() || false;
                const shift = Input.isPressed("shift");
                if (autoPathing && !shift && !ConfigManager.alwaysDash) {
                    this._dashing = false;
                }
            }
        };
    }

    // -----------------------------------------------------------------------
    // Vehicle Speed Override (apply on map start + plugin command changes)
    // -----------------------------------------------------------------------
    function captureOriginalVehicleSpeeds() {
        if (!$gameSystem._vehicleSpeedsOriginal) {
            const b = $gameMap.boat(), s = $gameMap.ship(), a = $gameMap.airship();
            $gameSystem._vehicleSpeedsOriginal = {
                boat: b ? b._moveSpeed : 4,
                ship: s ? s._moveSpeed : 5,
                airship: a ? a._moveSpeed : 6
            };
        }
    }

    function ensureVehicleOverridesInit() {
        if (!$gameSystem._vehicleSpeeds) {
            $gameSystem._vehicleSpeeds = { boat: null, ship: null, airship: null };
            // seed from params
            if (vehicleBoatSpeedParam > 0)   $gameSystem._vehicleSpeeds.boat = vehicleBoatSpeedParam;
            if (vehicleShipSpeedParam > 0)   $gameSystem._vehicleSpeeds.ship = vehicleShipSpeedParam;
            if (vehicleAirshipSpeedParam > 0)$gameSystem._vehicleSpeeds.airship = vehicleAirshipSpeedParam;
        }
    }

    function applyVehicleSpeeds() {
        if (!vehicleSpeedOverride) return;
        captureOriginalVehicleSpeeds();
        ensureVehicleOverridesInit();
        const b = $gameMap.boat(), s = $gameMap.ship(), a = $gameMap.airship();
        if (b && $gameSystem._vehicleSpeeds.boat) b.setMoveSpeed($gameSystem._vehicleSpeeds.boat);
        if (s && $gameSystem._vehicleSpeeds.ship) s.setMoveSpeed($gameSystem._vehicleSpeeds.ship);
        if (a && $gameSystem._vehicleSpeeds.airship) a.setMoveSpeed($gameSystem._vehicleSpeeds.airship);
    }

    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        try { applyVehicleSpeeds(); } catch(e) { console.warn(e); }
    };

    // -----------------------------------------------------------------------
    // Plugin Commands – vehicle speeds
    // -----------------------------------------------------------------------
    PluginManager.registerCommand(pluginName, "setVehicleSpeed", args => {
        ensureVehicleOverridesInit();
        const v = String(args.vehicle || "boat");
        const sp = Number(args.speed || 4).clamp ? Number(args.speed || 4).clamp(1,6) : Math.max(1, Math.min(6, Number(args.speed || 4)));
        if (v === "all" || v === "boat")   $gameSystem._vehicleSpeeds.boat = sp;
        if (v === "all" || v === "ship")   $gameSystem._vehicleSpeeds.ship = sp;
        if (v === "all" || v === "airship")$gameSystem._vehicleSpeeds.airship = sp;
        applyVehicleSpeeds();
    });

    PluginManager.registerCommand(pluginName, "resetVehicleSpeeds", () => {
        captureOriginalVehicleSpeeds();
        const orig = $gameSystem._vehicleSpeedsOriginal || {boat:4, ship:5, airship:6};
        const b = $gameMap.boat(), s = $gameMap.ship(), a = $gameMap.airship();
        if (b) b.setMoveSpeed(orig.boat);
        if (s) s.setMoveSpeed(orig.ship);
        if (a) a.setMoveSpeed(orig.airship);
        $gameSystem._vehicleSpeeds = { boat: null, ship: null, airship: null };
    });

    // -----------------------------------------------------------------------
    // Fade system (unchanged)
    // -----------------------------------------------------------------------
    PluginManager.registerCommand(pluginName, "setFadeSettings", args => {
        $gameSystem._customFadeIn   = Number(args.fadeIn || 30);
        $gameSystem._customFadeOut  = Number(args.fadeOut || 30);
        $gameSystem._customFadeColor= Number(args.fadeColor || 0);
        $gameSystem._customFadeRGB  = [Number(args.red||0),Number(args.green||0),Number(args.blue||0)];
        $gameSystem._fadeWait       = args.wait === "true";
    });
    PluginManager.registerCommand(pluginName, "resetFadeSettings", () => {
        $gameSystem._customFadeIn = $gameSystem._customFadeOut = null;
        $gameSystem._customFadeColor = $gameSystem._customFadeRGB = null;
        $gameSystem._fadeWait = false;
    });
    function getFadeColorArray() {
        const t = $gameSystem._customFadeColor ?? 0;
        const rgb = $gameSystem._customFadeRGB || [0,0,0];
        switch(t){
            case 1: return [255,255,255,255];
            case 2: return [255,0,0,255];
            case 3: return [rgb[0],rgb[1],rgb[2],255];
            default: return [0,0,0,255];
        }
    }
    PluginManager.registerCommand(pluginName,"doFadeIn",()=>{
        const dur=$gameSystem._customFadeIn??30;const rgba=getFadeColorArray();const wait=$gameSystem._fadeWait;
        $gameSystem._fadeColor=[rgba[0],rgba[1],rgba[2]];
        const s=SceneManager._scene;if(!s||!s.startFadeIn)return;s.startFadeIn(dur,false);
        if(wait&&$gameMap?._interpreter)$gameMap._interpreter.setWaitMode("fade");
    });
    PluginManager.registerCommand(pluginName,"doFadeOut",()=>{
        const dur=$gameSystem._customFadeOut??30;const rgba=getFadeColorArray();const wait=$gameSystem._fadeWait;
        $gameSystem._fadeColor=[rgba[0],rgba[1],rgba[2]];
        const s=SceneManager._scene;if(!s||!s.startFadeOut)return;s.startFadeOut(dur,false);
        if(wait&&$gameMap?._interpreter)$gameMap._interpreter.setWaitMode("fade");
    });
    const _updateColorFilter=Scene_Base.prototype.updateColorFilter;
    Scene_Base.prototype.updateColorFilter=function(){
        _updateColorFilter.call(this);
        try{
            const rgb=$gameSystem._fadeColor||[0,0,0];
            const blend=[rgb[0],rgb[1],rgb[2],this._fadeOpacity||0];
            this._colorFilter?.setBlendColor(blend);
        }catch(e){console.error("FadeColor error",e);}
    };
    const _updateWait=Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode=function(){
        if(this._waitMode==="fade"){
            if(SceneManager._scene?._fadeDuration>0)return true;
            this._waitMode="";return false;
        }
        return _updateWait.call(this);
    };
})();
