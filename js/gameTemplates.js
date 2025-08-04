/**
 * Returns the HTML string for the main menu overlay.
 * @returns {string} Main menu HTML
 */
function mainMenuOverlayHTML() {
  return `
<div id="overlayContainer" class="game-overlay">
  <div class="title-sign">
    <h1>Sharkie</h1>
  </div>
  <button class="game-overlay-btn f-screen-btn f-screen-menu-btn" onclick="fullscreen('menu');"></button>
  <button class="game-overlay-btn play-btn" onclick="playGame()"></button>
  <div class="controls">
    <button class="game-overlay-btn control-btn" onclick="showControlHelp()"></button>
    <button class="game-overlay-btn info-btn" onclick="showInfo()"></button>
  </div>
  <div class="volume-container">
    <input type="range" min="0" max="1" step="0.01" value="0.5" onchange="soundManager.setVolume(this.value)">
  </div>
  `
}

/**
 * Returns the HTML string for the game over overlay.
 * @returns {string} Game over screen HTML
 */
function gameOverOverlayHTML() {
  return `
<div id="endscreenOverlay">
  <div class="game-overlay ">
    <div class="end-title-control">
      <div class="title-sign end-title">
        <h1>Game Over</h1>
      </div>
      <div class="end-control-btn">
        <button class="game-overlay-btn repeat-btn" onclick="restartLevel()"></button>
        <button class="game-overlay-btn back-menu-btn" onclick="backToMenu()"></button>
      </div>
    </div>
  </div>
  `
}

/**
 * Returns the HTML string for the level complete overlay.
 * Adds a "Next Level" button if not at the last level.
 * @returns {string} Victory screen HTML
 */
function levelCompleteOverlayHTML() {
  const showNext = world && world.levelManager && !world.levelManager.isLastLevel();
  return `
<div id="endscreenOverlay">
  <div class="game-overlay ">
    <div class="end-title-control">
      <div class="title-sign end-title">
        <h1>Victory</h1>
      </div>
      <div class="end-control-btn">
        <button class="game-overlay-btn repeat-btn" onclick="restartLevel()"></button>
        <button class="game-overlay-btn back-menu-btn" onclick="backToMenu()"></button>
        ${showNext ? '<button id="nextLevelBtn" class="game-overlay-btn next-btn" onclick="nextLevel()"></button>' : ''}
      </div>
    </div>
  </div>
  `
}

/**
 * Returns the HTML string for the controls help overlay.
 * Shows key mappings for movement and actions.
 * @returns {string} Controls help HTML
 */
function controlHelpOverlayHTML() {
  return `
<div class="game-overlay controls-help">
  <div class="controls-space">
    <button class="game-overlay-btn repeat-btn control-back-btn" onclick="showGameMenu()"></button>
    <div class="controls-row">
      <span class="controls-label">Move Up</span>
      <div class="controls-keyCaps">
        <span class="keyCap"><span class="keyCap-label">W</span></span>
        <span class="keyCap"><span class="keyCap-label">↑</span></span>
      </div>
    </div>
    <div class="controls-row">
      <span class="controls-label">Move Left</span>
      <div class="controls-keyCaps">
        <span class="keyCap"><span class="keyCap-label">A</span></span>
        <span class="keyCap"><span class="keyCap-label">←</span></span>
      </div>
    </div>
    <div class="controls-row">
      <span class="controls-label">Move Down</span>
      <div class="controls-keyCaps">
        <span class="keyCap"><span class="keyCap-label">S</span></span>
        <span class="keyCap"><span class="keyCap-label">↓</span></span>
      </div>
    </div>
    <div class="controls-row">
      <span class="controls-label">Move Right</span>
      <div class="controls-keyCaps">
        <span class="keyCap"><span class="keyCap-label">D</span></span>
        <span class="keyCap"><span class="keyCap-label">→</span></span>
      </div>
    </div>
    <div class="controls-row">
      <span class="controls-label">BubbleShoot</span>
      <div class="controls-keyCaps">
        <span class="keyCap"><span class="keyCap-label">E</span></span>
      </div>
    </div>
    <div class="controls-row">
      <span class="controls-label">PoisenShoot</span>
      <div class="controls-keyCaps">
        <span class="keyCap keyCap-space"><span class="keyCap-label">SPACEBAR</span></span>
      </div>
    </div>
  </div>
  <div class="mobile-hint">
      <span class="tipp-label">Tipp:</span>
      <span class="tipp-label">Control buttons are displayed on touch devices.</span>
    </div>
</div>
`
}

/**
 * Returns the HTML string for the in-game navigation overlay.
 * Includes pause, fullscreen, and sound toggle buttons.
 * @returns {string} In-game menu HTML
 */
function inGameNavOverlayHTML() {
  return `
<div class="game-menu">
  <button tabindex="-1" id="gameplayBtn" class="game-overlay-btn game-play-btn play" onclick="toggleGameplay();"></button>
  <button tabindex="-1" class="game-overlay-btn f-screen-game-btn" onclick="fullscreen('game');"></button>
  <button tabindex="-1" id="soundToggleBtn" class="game-overlay-btn sound-btn play-sound" onclick="toogleSound();"></button>
</div>
`
}

/**
 * Returns the HTML string for the info/story overlay.
 * Displays Sharkie's game story and game credits.
 * @returns {string} Story and info HTML
 */
function infoOverlayHTML() {
  return `
<div class="game-overlay content-column">
  <button class="game-overlay-btn repeat-btn control-back-btn" onclick="showGameMenu()"></button>
  <div class="story-content scrollbox">
    <p class="story-text">
      <strong>Die Tiefen erwachen</strong><br><br>
      Tief unten, wo das Sonnenlicht längst vergessen wurde, beginnt dein Abenteuer, Sharkie!<br>
      Du bist nicht irgendein Fisch. Du bist Sharkie – flink, entschlossen und bereit, dem Ozean zu zeigen, wer
      hier wirklich die Flossen in der Hand hat.<br>

      Aber Obacht, Held der Tiefe:<br>
      🐡 <strong>Pufferfische</strong> sehen vielleicht aus wie platzende Ballons, aber wehe du kommst zu nah!
      Dann fahren sie ihre Stacheln aus und BAM! – <strong>Poison-Schaden</strong> direkt auf die Kiemen!<br>
      ⚡ <strong>Jellyfische</strong>? Funkende Glibberbomben! Ein Stromschlag von ihnen kostet dich deine
      wertvollen <strong>Poison-Flasks</strong>. Und ohne die bist du im Endkampf nur noch ein planschender
      Tunfisch.<br>

      💡 Und als wär’s nicht schon schwer genug: Wenn sich diese Biester verwandeln, wird’s ernst. Dann musst du
      sie <strong>mehrfach treffen</strong>, bevor sie endlich kapitulieren.<br>

      💰 Gut, dass es Münzen gibt – sie sehen nicht nur hübsch aus, sondern helfen dir, deine
      <strong>Poison-Flasks</strong> schrittweise wieder aufzufüllen. Aber Vorsicht: Du kannst nicht unendlich
      viele tragen – Sharkie ist schließlich kein Einkaufswagen.<br>

      🐋 <strong>Und dann ... der Moment der Wahrheit:</strong><br>
      Am dunklen Abgrund wartet <strong>der Killerwal</strong> – riesig, wütend, fast schon unfair.<br>
      – Normale Bubbles machen ihm Kratzer.<br>
      – <strong>Poison-Schüsse</strong> hingegen? Die bringen den Riesen zum Zittern.<br>

      Also schnapp dir deine Flaschen, spitz deine Zähne und mach dich bereit.<br>
      Die Tiefsee hat auf dich gewartet – jetzt zeig ihr, was in dir steckt, Sharkie!
    </p>
  </div>
  <div class="legal-container">
    <a href="impressum.html" class="legal-link">👉 Legal notice </a>
  </div>
  <div class="game-credit">
  <span>by Pascal K. - 2025</span>
</div>
</div>
`
}

/**
 * Returns the HTML string for the mobile controls overlay.
 * Includes virtual d-pad and action buttons.
 * @returns {string} Mobile touch controls HTML
 */
function mobileKeyOverlayHTML() {
  return `
<div id="mobileControls" class="mobile-controls">
  <div class="dpad">
    <button class="dpad-btn up-btn" ontouchstart="setMobileKey('UP', true)" ontouchend="setMobileKey('UP', false)">
      <img src="./img/interface/mobile/mobile_up.svg" alt="Up">
    </button>
    <button class="dpad-btn down-btn" ontouchstart="setMobileKey('DOWN', true)"
      ontouchend="setMobileKey('DOWN', false)">
      <img src="./img/interface/mobile/mobile_down.svg" alt="Down">
    </button>
    <button class="dpad-btn left-btn" ontouchstart="setMobileKey('LEFT', true)"
      ontouchend="setMobileKey('LEFT', false)">
      <img src="./img/interface/mobile/mobile_left.svg" alt="Left">
    </button>
    <button class="dpad-btn right-btn" ontouchstart="setMobileKey('RIGHT', true)"
      ontouchend="setMobileKey('RIGHT', false)">
      <img src="./img/interface/mobile/mobile_right.svg" alt="Right">
    </button>
  </div>
  <div class="action-pad">
    <button class="shoot-btn" ontouchstart="setMobileKey('SHOOT', true)" ontouchend="setMobileKey('SHOOT', false)">
      <img src="./img/interface/mobile/mobile_shot.svg" alt="Shoot">
    </button>
    <button class="poison-btn" ontouchstart="setMobileKey('POISENSHOOT', true)"
      ontouchend="setMobileKey('POISENSHOOT', false)">
      <img src="./img/interface/mobile/mobile_poisenShot.svg" alt="Poison">
    </button>
  </div>
</div>
`
}