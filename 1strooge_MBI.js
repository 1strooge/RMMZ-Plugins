/*:
 * @target MZ
 * @plugindesc [v1.3.7] Shows up to 4 state/buff icons with turn counters above each actor (default battle layout only).
 * @author 1strooge
 * @url https://github.com/1strooge/RMMZ-Plugins
 * @license CC BY-SA 4.0
 * @version 1.3.7
 *
 * @help
 * =========================================================================
 * 🧩 Description
 * =========================================================================
 * Extends the default RPG Maker MZ battle status window to display up to
 * 4 state/buff icons per actor above the face image. Remaining turns are
 * drawn directly on the icons. Works with the **default battle layout**.
 *
 * Standalone — no base plugin required.
 * The icon count is fixed to 4 to keep the layout stable.
 *
 * =========================================================================
 * 🧭 Notes
 * =========================================================================
 * - This plugin is designed for default RPG Maker MZ's HUD Battle Layout.
 * - Affects only the battle status window.
 * - Does not modify menu or field layouts.
 * - Inspired by the NUUN_StateIconSideBySide plugin by NUUN (MIT).
 * - This plugin je an independent and simplified implementation written 
 * from scratch (1strooge_MBI is primarily intended as plug&play).
 *
 * =========================================================================
 * 🧱 NEW in v1.3.7
 * ========================================================================= 
 * - CRITICAL FIX: Icon Cycling/Pagination.
 *   Overrides Sprite_StateIcon.prototype.update to ensure the internal
 *   frame counter (`this._animationIndex`) is correctly incremented,
 *   allowing for cycling through pages of icons when more than 4 are active.
 * =========================================================================
 * ⚙️ Parameters
 * =========================================================================
 * Frame Wait:
 * If a character is affected by more than 4 States & Buffs icons,
 * set a time delay before the next page with the remaining icons loads.
 *
 * Offset X:
 * If necessary, you can move the icon block horizontally.
 *
 * Offset Y:
 * If necessary, you can move the icon block vertically.
 *
 *
 * @param FrameWait
 * @text Frame Wait
 * @type number
 * @min 10
 * @max 120
 * @default 40
 * @desc Number of frames before switching to the next page of icons (min = 10 / max = 120).
 *
 * @param OffsetX
 * @text Offset X
 * @type number
 * @min -64
 * @max 64
 * @default 0
 * @desc Horizontal offset for the icon block (0 = auto-calibrated to center).
 *
 * @param OffsetY
 * @text Offset Y
 * @type number
 * @min -32
 * @max 32
 * @default 0
 * @desc Vertical offset for the icon block (0 = auto-calibrated to -4 internally).
 * * =========================================================================
 * @cs-CZ
 *
 * @plugindesc [v1.3.7] Zobrazuje 4 ikony stavů/buffů s počítadly tahů nad každou postavou party (pouze pro výchozí rozvržení bitvy RPG MAKER MZ).
 * * @help
 * =========================================================================
 * 🧩 Popis
 * =========================================================================
 * Plugin 1strooge_MBI rozšiřuje výchozí okno stavu bitvy v RPG Maker MZ tak,
 * aby zobrazovalo až 4 ikony stavů/buffů u horního okraje obrázku obličeje
 * postavy, které se změny parametrů boje týkají. Zbývají tahy do ukončení
 * efektu State/Buff jsou pak na jednotlivých ikonách číselně zobrazeny.
 * Plugin je určen pro **výchozí rozvržení bitvy** v RPG Maker MZ.
 *
 * Plugin pracuje samostatně a nevyžaduje pro fungování žádný další plugin.
 * Počet ikon je pevně stanoven na 4, aby se zachovala stabilita rozvržení.
 *
 * =========================================================================
 * 🧭 Poznámky
 * =========================================================================
 * - Tento plugin je navržen pro výchozí rozvržení HUD Battle Layout v MZ.
 * - Ovlivňuje pouze okno se stavem bitvy (okno s HP/MP/TP členů party).
 * - Nemění rozvržení žádných menu a oken.
 * - Inspirováno pluginem NUUN_StateIconSideBySide od NUUN (MIT).
 * - Tento plugin je nezávislá a zjednodušená implementace napsaná od nuly
 * (1strooge_MBI je primárně určen jako plug&play).
 *
 * =========================================================================
 * 🧱 NOVĚ ve v1.3.7
 * ========================================================================= 
 * - KRITICKÁ OPRAVA: Cyklování Ikon.
 *   Přepisuje Sprite_StateIcon.prototype.update, aby zajistil správné  
 *   navyšování interního čítače snímků (`this._animationIndex`), což 
 *   umožňuje cyklení stránek ikon, pokud jich je aktivních více než 4.
 * =========================================================================
 * ⚙️ Parametry
 * =========================================================================
 * Frame Wait:
 * Pokud je postava ovlivněna více než 4 ikonami Stavů a ​​Buffů, nastavte
 * časové zpoždění před načtením další stránky se zbývajícími ikonami.
 *
 * Offset X:
 * V případě potřeby můžete blok ikon vodorovně přesunout.
 *
 * Offset Y:
 * V případě potřeby můžete blok ikon přesunout svisle.
 *
 * 
 * @param FrameWait
 * @text Frame Wait
 * @type number
 * @min 10
 * @max 120
 * @default 40
 * @desc Počet snímků (frames) před přepnutím na další stránku ikon (min = 10 / max = 120).
 *
 * @param OffsetX
 * @text Offset X
 * @type number
 * @min -64
 * @max 64
 * @default 0
 * @desc Horizontální posunutí bloku ikon (0 = automaticky kalibrováno na střed).
 *
 * @param OffsetY
 * @text Offset Y
 * @type number
 * @min -32
 * @max 32
 * @default 0
 * @desc Vertikální posunutí bloku ikon (0 = automaticky kalibrováno interně na -4).
 *
 * =========================================================================
 */

(() => {
  "use strict";

  const PLUGIN_NAME = "1strooge_MBI";
  const params = PluginManager.parameters(PLUGIN_NAME);

  const MAX_ICONS  = 4; // fixed
  const FRAME_WAIT = Number(params["FrameWait"] || 40);
  const rawOffsetX = Number(params["OffsetX"]);
  const rawOffsetY = Number(params["OffsetY"]);
  
  const OFFSET_X   = rawOffsetX; 
  const OFFSET_Y   = rawOffsetY === 0 ? -4  : rawOffsetY; 

  // =========================================================================
  // Sprite_StateIcon – multi icons + turn counters
  // =========================================================================
  const _SSI_initMembers = Sprite_StateIcon.prototype.initMembers;
  Sprite_StateIcon.prototype.initMembers = function() {
    _SSI_initMembers.call(this);
    this._iconCols     = MAX_ICONS;
    this._waitDuration = FRAME_WAIT;
    this._iconIndexArray = [];
    // this._animationIndex je inicializováno voláním _SSI_initMembers (super)
  };

  // 💡 NOVÝ KÓD: Zajišťuje, že čítač snímků (frames) je inkrementován
  Sprite_StateIcon.prototype.update = function() {
    // 1. Zavolá základní aktualizaci Spritu
    Sprite.prototype.update.call(this); 
    
    // 2. Inkrementuje čítač animace (KLÍČOVÉ pro cyklování stránek)
    this._animationIndex++; 
    
    // 3. Spustí mou vlastní logiku
    this.updateIcon();
    this.updateFrame();
  };

  Sprite_StateIcon.prototype.updateIcon = function() {
    this._iconIndexArray = [];
    if (this._battler) {
      this._battler.states().forEach(state => {
        if (state.iconIndex > 0) {
          this._iconIndexArray.push({
            id: state.iconIndex,
            turns: this._battler._stateTurns[state.id] || 0
          });
        }
      });
      for (let i = 0; i < this._battler._buffs.length; i++) {
        const buffLevel = this._battler._buffs[i];
        if (buffLevel !== 0) {
          this._iconIndexArray.push({
            id: this._battler.buffIconIndex(buffLevel, i),
            turns: this._battler._buffTurns[i] || 0
          });
        }
      }
    }
  };

  Sprite_StateIcon.prototype.updateFrame = function() {
    const iconsArr = this._iconIndexArray || [];
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    if (iconsArr.length === 0) {
      this.setFrame(0, 0, 0, 0);
      this.bitmap = null;
      return;
    }

    const page  = Math.floor(this._animationIndex / this._waitDuration);
    const pageCount = Math.ceil(iconsArr.length / this._iconCols);
    if (page >= pageCount) { 
        this._animationIndex = 0; 
        // V tomto bodě se sprite nevrací, pouze se index resetuje a cyklus pokračuje
        // Není potřeba 'return;', aby se vykreslila alespoň první stránka
    }

    const start = page * this._iconCols;
    const current = iconsArr.slice(start, start + this._iconCols);
    const iconset = ImageManager.loadSystem("IconSet");
    if (!iconset.isReady()) return;

    const totalW = current.length * pw;
    const temp = new Bitmap(totalW, ph);
    temp.fontFace = "GameFont";
    temp.fontSize = 20;

    for (let i = 0; i < current.length; i++) {
      const { id, turns } = current[i];
      const sx = (id % 16) * pw;
      const sy = Math.floor(id / 16) * ph;
      const dx = i * pw;
      temp.blt(iconset, sx, sy, pw, ph, dx, 0);

      if (turns > 0) {
        const text = String(turns);
        const textW = temp.measureTextWidth(text);
        const textX = dx + pw - textW - 1; 
        const textY = ph - temp.fontSize + 1; 
        const color = (turns <= 3) ? '#FF8888' : '#FFFFFF';
        temp.textColor = '#000000';
        temp.drawText(text, textX + 1, textY + 1, textW + 1, temp.fontSize, 'left');
        temp.textColor = color; 
        temp.drawText(text, textX, textY, textW + 1, temp.fontSize, 'left');
      }
    }

    this.bitmap = temp;
    this.setFrame(0, 0, totalW, ph);
    this.anchor.x = 0.5;
  };

  // =========================================================================
  // Window_BattleStatus – FIX: Aggressive Centering Logic
  // =========================================================================
  
  const refreshIconPosition = function(win, actor) {
      const key = `actor${actor.index()}-stateIcon`;
      let sprite = win._innerChildren.find(c => c._battler === actor && c.constructor === Sprite_StateIcon);
      if (!sprite) {
          sprite = win.createInnerSprite(key, Sprite_StateIcon);
          sprite.setup(actor);
      }
      
      const rect  = win.itemRect(actor.index());
      
      const baseY = Math.floor(rect.y + win.lineHeight() * 0.6 + OFFSET_Y);
      
      const centerX = rect.x + rect.width / 2;
      const baseX = Math.floor(centerX + OFFSET_X);
      
      sprite.move(baseX, baseY);
      sprite.z = 1;
      sprite.visible = true;
  };
  
  const _WBS_drawItemStatus = Window_BattleStatus.prototype.drawItemStatus;
  Window_BattleStatus.prototype.drawItemStatus = function(index) {
      _WBS_drawItemStatus.call(this, index);
      const actor = $gameParty.battleMembers()[index];
      if (actor) {
          refreshIconPosition(this, actor);
      }
  };
})();
