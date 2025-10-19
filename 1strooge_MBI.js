/*:
 * @target MZ
 * @plugindesc [v1.1.0] Displays 4 battle state/buff icons with stable centered positioning and adjustable cycling. Preparation for future turn counters.
 * @author 1strooge
 * @url https://github.com/1strooge
 * @license CC BY-SA 4.0
 *
 * @help
 * ============================================================================
 * 🧩 Description
 * ============================================================================
 * This plugin replaces the default single-state icon display during battles
 * with up to four visible icons per actor.
 *
 * If an actor has more than four states or buffs, the icons will cycle after
 * a specified number of frames (configurable via parameter).
 *
 * The layout is fixed and stable — icons will never overlap adjacent actors.
 * This version serves as the groundwork for a future v2.0.0 release which
 * will include per-icon turn counters.
 *
 * The plugin is fully standalone – it works without the need for an additional
 * (base) plugin. However, NUUN offers a much more comprehensive solution with
 * his NUUN_StateIconSideBySide plugin. Check it at:
 * https://github.com/nuun888/MZ
 *
 * This plugin is an independent implementation written from scratch,
 * without using any of NUUN's code.
 *
 * ============================================================================
 * ⚙️ Parameters
 * ============================================================================
 *
 * @param FrameWait
 * @text Frame Wait
 * @type number
 * @min 10
 * @max 120
 * @default 40
 * @desc Number of frames before switching icon pages when more than 4 states/buffs are active.
 *
 * @param OffsetX
 * @text Offset X
 * @type number
 * @min -64
 * @max 64
 * @default 0
 * @desc Horizontal offset (0 = auto-calibrated to -28).
 *
 * @param OffsetY
 * @text Offset Y
 * @type number
 * @min -32
 * @max 32
 * @default 0
 * @desc Vertical offset (0 = auto-calibrated to -4).
 *
 * ============================================================================
 * 🧱 Version History
 * ============================================================================
 * v1.1.0
 *  - Fixed icon count to 4 for stability and visual consistency.
 *  - Added cycling parameter (FrameWait).
 *  - Cleaned up layout calculations.
 *  - Prepared internal structure for future turn counters (v2.0.0).
 *
 * v1.0.0
 *  - Initial stable release with dynamic icon count.
 *  - Fixed centered layout and standalone operation.
 *
 * ============================================================================
 * @cs-CZ
 * @help
 * ============================================================================
 * 🧩 Popis
 * ============================================================================
 * Tento plugin nahrazuje výchozí zobrazení jedné ikony stavu/buffu během bitvy
 * čtyřmi viditelnými ikonami pro každého člena party.
 *
 * Pokud má postava více než čtyři stavy, ikony se po nastaveném čase
 * automaticky cyklují (viz parametr).
 *
 * Rozložení je pevné a stabilní — ikony se nepřekrývají mezi postavami.
 * Tato verze je základem pro budoucí vydání v2.0.0, které přidá číselné
 * ukazatele zbývajících tahů přímo na ikonách.
 *
 * Plugin je zcela samostatný – nevyžaduje žádný základní (base) plugin.
 * Autor NUUN však nabízí propracovanější řešení pomocí svého pluginu
 * **NUUN_StateIconSideBySide**:
 * https://github.com/nuun888/MZ
 *
 * Tento plugin je plně nezávislá implementace napsaná od nuly,
 * bez použití kódu autora NUUN.
 *
 * ============================================================================
 * ⚙️ Parametry
 * ============================================================================
 *
 * @param FrameWait
 * @text Délka zobrazení
 * @default 40
 * @desc Počet snímků (frameů), po kterých se při více než 4 stavech ikony přepnou.
 *
 * @param OffsetX
 * @text Posun X
 * @default 0
 * @desc Vodorovný posun (0 = automaticky přepočteno na -28).
 *
 * @param OffsetY
 * @text Posun Y
 * @default 0
 * @desc Svislý posun (0 = automaticky přepočteno na -4).
 *
 * ============================================================================
 * 🧱 Historie verzí
 * ============================================================================
 * v1.1.0
 *  - Počet ikon pevně stanoven na 4 pro vyšší stabilitu a přehlednost.
 *  - Přidán parametr pro cyklování ikon (FrameWait).
 *  - Vyčištěno výpočtové rozložení ikon.
 *  - Připravena struktura pro čítače tahů (v2.0.0).
 *
 * v1.0.0
 *  - Původní stabilní vydání s volitelným počtem ikon.
 *  - Vycentrováno rozložení, samostatný provoz bez závislostí.
 * ============================================================================
 */

(() => {
  "use strict";

  const PLUGIN_NAME = "1strooge_MBI";
  const params = PluginManager.parameters(PLUGIN_NAME);

  const FRAME_WAIT = Number(params["FrameWait"] || 40);
  const rawOffsetX = Number(params["OffsetX"]);
  const rawOffsetY = Number(params["OffsetY"]);
  const OFFSET_X = rawOffsetX === 0 ? -28 : rawOffsetX;
  const OFFSET_Y = rawOffsetY === 0 ? -4  : rawOffsetY;

  const MAX_ICONS = 4; // Fixed for layout stability

  const _SSI_initMembers = Sprite_StateIcon.prototype.initMembers;
  Sprite_StateIcon.prototype.initMembers = function() {
    _SSI_initMembers.call(this);
    this._iconCols = MAX_ICONS;
    this._waitDuration = FRAME_WAIT;
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

    const page = Math.floor(this._animationIndex / this._waitDuration);
    const start = page * MAX_ICONS;
    const visibleIcons = iconsArr.slice(start, start + MAX_ICONS);

    const iconset = ImageManager.loadSystem("IconSet");
    if (!iconset.isReady()) return;

    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const totalW = visibleIcons.length * pw;
    const temp = new Bitmap(totalW, ph);

    for (let i = 0; i < visibleIcons.length; i++) {
      const id = visibleIcons[i];
      const sx = (id % 16) * pw;
      const sy = Math.floor(id / 16) * ph;
      const dx = i * pw;
      temp.blt(iconset, sx, sy, pw, ph, dx, 0);
      // Future use (v2.0.0): drawTurnCounter(temp, dx, ph, id);
    }

    this.bitmap = temp;
    this.setFrame(0, 0, totalW, ph);
    this.anchor.x = 0.5;
  };

  // Reserved for future use (v2.0.0)
  Sprite_StateIcon.prototype.drawTurnCounter = function(bitmap, dx, ph, stateId) {
    // const turns = this._battler._stateTurns[stateId];
    // if (turns > 0) bitmap.drawText(turns, dx + 20, ph - 18, 24, 24, "right");
  };

  const _Scene_Battle_createStatusWindow = Scene_Battle.prototype.createStatusWindow;
  Scene_Battle.prototype.createStatusWindow = function() {
    _Scene_Battle_createStatusWindow.call(this);
    const win = this._statusWindow;
    if (!win) return;

    win.placeStateIcon = function(actor, x, y) {
      const key = `actor${actor.index()}-stateIcon`;
      const sprite = this.createInnerSprite(key, Sprite_StateIcon);
      sprite.setup(actor);

      const rect = this.itemRect(actor.index());
      const baseY = Math.floor(rect.y + this.lineHeight() * 0.6 + OFFSET_Y);
      const baseX = Math.floor(rect.x + rect.width - (ImageManager.iconWidth * (MAX_ICONS / 2)) + OFFSET_X + 22);

      sprite.move(baseX, baseY);
      sprite.z = 1;
      sprite.visible = true;
    };
  };
})();
