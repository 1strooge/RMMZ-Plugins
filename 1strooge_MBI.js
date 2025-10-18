/*:
 * @target MZ
 * @plugindesc [v1.0.0] Displays multiple state/buff icons (up to 4) in the battle status window with stable centered positioning. Self-contained.
 * @author 1strooge
 * @url https://github.com/1strooge
 * @version 1.0.0
 * @license CC BY-SA 4.0
 *
 * @help
 * ============================================================================
 * 🧩 Description
 * ============================================================================
 * Removes the default 1-icon limit in RPG Maker MZ battle status window.
 * Now multiple state/buff icons (default: 4) can be displayed simultaneously
 * above the actor portrait with a fixed anchor and centering.
 *
 * The plugin is fully standalone – it works without the need for an additional
 * (base) plugin. However, NUUN offers a much more comprehensive solution with 
 * his NUUN_StateIconSideBySide plugin. Check is https://github.com/nuun888/MZ.
 * ============================================================================
 * ⚙️ Parameters
 * ============================================================================
 *
 * @param MaxIcons
 * @text Maximum Icons
 * @type number
 * @min 1
 * @max 10
 * @default 4
 * @desc Number of icons displayed simultaneously for each actor.
 *
 * @param FrameWait
 * @text Frame Wait
 * @type number
 * @min 10
 * @max 120
 * @default 40
 * @desc Number of frames before switching to the next page of icons.
 *
 * @param OffsetX
 * @text Offset X
 * @type number
 * @min -64
 * @max 64
 * @default 0
 * @desc Horizontal offset for the icon block (0 = auto-calibrated to -28 internally).
 *
 * @param OffsetY
 * @text Offset Y
 * @type number
 * @min -32
 * @max 32
 * @default 0
 * @desc Vertical offset for the icon block (0 = auto-calibrated to -4 internally).
 *
 * ============================================================================
 * 🧭 Notes
 * ============================================================================
 * - Affects only the battle status window.
 * - Does not modify menu or field layouts.
 * - Place below other plugins that adjust battle UI for proper layering.
 * - Inspired by the NUUN_StateIconSideBySide plugin by plugin creator NUUN.
 * - This plugin is an independent implementation written from scratch, 
 *   without using any of NUUN's code.
 *
 * ============================================================================
 * 🧱 Version History
 * ============================================================================
 * v1.0.0 (Stable Core)
 *   - Stable release with multi-icon support.
 *   - Auto-calibrated centered positioning.
 *   - Fully self-contained (no external dependencies).
 *
 * ============================================================================
 * @cs-CZ
 * @help
 * ============================================================================
 * 🧩 Popis
 * ============================================================================
 * Odstraňuje omezení RPG Makeru MZ, kdy se během bitvy zobrazovala pouze jedna
 * ikona stavu/buffu a toto řešení činilo výsledný efekt velmi nepřehledný. 
 * Nyní lze zobrazit více ikon současně (výchozí 4) nad portrétem postavy s 
 * pevným ukotvením a vycentrováním.
 *
 * Plugin je plně samostatný – pracuje bez potřeby dodatečného (base) pluginu.
 * NUUN však nabízí daleko komplexnější řešení s NUUN_StateIconSideBySide.
 * Jeho pluginy jsou k dispozici na https://github.com/nuun888/MZ.
 * ============================================================================
 * ⚙️ Parametry
 * ============================================================================
 * @param MaxIcons
 * @text Maximální počet ikon
 * @default 4
 * @desc Počet ikon zobrazených současně pro jednu postavu.
 *
 * @param FrameWait
 * @text Délka zobrazení
 * @default 40
 * @desc Počet snímků (frameů), po kterých se ikony přepnou, pokud jich má postava více než MaxIcons.
 *
 * @param OffsetX
 * @text Posun X
 * @default 0
 * @desc Vodorovný posun bloku ikon (0 = automaticky přepočteno na -28).
 *
 * @param OffsetY
 * @text Posun Y
 * @default 0
 * @desc Svislý posun bloku ikon (0 = automaticky přepočteno na -4).
 *
 * ============================================================================
 * 🧭 Poznámky
 * ============================================================================
 * - Plugin ovlivňuje pouze rozložení stavových ikon v bitvě.
 * - Nezasahuje do menu nebo do polí.
 * - Umístěte ho do Plugin Manageru pod ostatní pluginy upravující UI bitvy.
 * - Inspirováno pluginem NUUN_StateIconSideBySide od autora NUUN.
 * - Tento plugin je nezávislá implementace napsaná od nuly, bez použití kódu 
 * - z pluginů od NUUN.
 *
 * ============================================================================
 * 🧱 Historie verzí
 * ============================================================================
 * v1.0.0 (Stabilní jádro)
 *   - Stabilní verze s podporou více ikon.
 *   - Automaticky vycentrovaná pozice ikon.
 *   - Plně samostatný, bez závislostí.
 * ============================================================================
 */

(() => {
  "use strict";

  const PLUGIN_NAME = "1strooge_MBI";
  const params = PluginManager.parameters(PLUGIN_NAME);

  const MAX_ICONS  = Number(params["MaxIcons"]  || 4);
  const FRAME_WAIT = Number(params["FrameWait"] || 40);

  // Internally recalibrate offsets: 0 becomes -28 / -4
  const rawOffsetX = Number(params["OffsetX"]);
  const rawOffsetY = Number(params["OffsetY"]);
  const OFFSET_X   = rawOffsetX === 0 ? -28 : rawOffsetX;
  const OFFSET_Y   = rawOffsetY === 0 ? -4  : rawOffsetY;

  // --- Extend Sprite_StateIcon to draw multiple icons at once ---
  const _SSI_initMembers = Sprite_StateIcon.prototype.initMembers;
  Sprite_StateIcon.prototype.initMembers = function() {
    _SSI_initMembers.call(this);
    this._iconCols       = MAX_ICONS;
    this._waitDuration   = FRAME_WAIT;
    this._iconIndexArray = [];
  };

  const _SSI_updateIcon = Sprite_StateIcon.prototype.updateIcon;
  Sprite_StateIcon.prototype.updateIcon = function() {
    _SSI_updateIcon.call(this);
    this._iconIndexArray = this._battler ? this._battler.allIcons() : [];
  };

  Sprite_StateIcon.prototype.updateFrame = function() {
    const iconsArr = this._iconIndexArray || [];
    if (iconsArr.length === 0) {
      this.setFrame(0, 0, 0, 0);
      return;
    }

    const page  = Math.floor(this._animationIndex / this._waitDuration);
    const start = page * this._iconCols;
    const end   = start + this._iconCols;
    const current = iconsArr.slice(start, end);
    if (current.length === 0) {
      this._animationIndex = 0;
      return;
    }

    const iconset = ImageManager.loadSystem("IconSet");
    if (!iconset.isReady()) return;

    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const totalW = current.length * pw;

    const temp = new Bitmap(totalW, ph);
    for (let i = 0; i < current.length; i++) {
      const id = current[i];
      const sx = (id % 16) * pw;
      const sy = Math.floor(id / 16) * ph;
      const dx = i * pw;
      temp.blt(iconset, sx, sy, pw, ph, dx, 0);
    }

    this.bitmap = temp;
    this.setFrame(0, 0, totalW, ph);
    this.anchor.x = 0.5;
  };

  // --- Late hook: override battle status icon placement after window creation ---
  const _Scene_Battle_createStatusWindow = Scene_Battle.prototype.createStatusWindow;
  Scene_Battle.prototype.createStatusWindow = function() {
    _Scene_Battle_createStatusWindow.call(this);
    const win = this._statusWindow;
    if (!win) return;

    win.placeStateIcon = function(actor, x, y) {
      const key = `actor${actor.index()}-stateIcon`;
      const sprite = this.createInnerSprite(key, Sprite_StateIcon);
      sprite.setup(actor);

      const rect  = this.itemRect(actor.index());
      const baseY = Math.floor(rect.y + this.lineHeight() * 0.6 + OFFSET_Y);

      // ✅ Centered X position (your tuned formula, includes +22 correction)
      const baseX = Math.floor(rect.x + rect.width - (ImageManager.iconWidth * (MAX_ICONS / 2)) + OFFSET_X + 22);

      sprite.move(baseX, baseY);
      sprite.z = 1;
      sprite.visible = true;
    };
  };
})();
