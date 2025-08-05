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
  <button class="game-overlay-btn f-screen-btn f-screen-menu-btn hide-on-mobile" onclick="fullscreen('menu');"></button>
  <button class="game-overlay-btn play-btn" onclick="playGame()"></button>
  <div class="controls">
    <button class="game-overlay-btn control-btn" onclick="showControlHelp()"></button>
    <button class="game-overlay-btn info-btn" onclick="showInfo()"></button>
  </div>
  <div class="legal-container" onclick="showLegalNotice()">
  <span class="legal-link">Legal notice </span>
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
 * Includes pause and sound toggle buttons.
 * @returns {string} In-game menu HTML
 */
function inGameNavOverlayHTML() {
  return `
<div class="game-menu">
  <button tabindex="-1" id="gameplayBtn" class="game-overlay-btn game-play-btn play" onclick="toggleGameplay();"></button>
  <button tabindex="-1" id="soundToggleBtn" class="game-overlay-btn sound-btn" onclick="toogleSound();"></button>
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
    <button class="dpad-btn up-btn touch-btn" ontouchstart="setMobileKey('UP', true)" ontouchend="setMobileKey('UP', false)">
      <img src="./img/interface/mobile/mobile_up.svg" alt="Up">
    </button>
    <button class="dpad-btn down-btn touch-btn" ontouchstart="setMobileKey('DOWN', true)"
      ontouchend="setMobileKey('DOWN', false)">
      <img src="./img/interface/mobile/mobile_down.svg" alt="Down">
    </button>
    <button class="dpad-btn left-btn touch-btn" ontouchstart="setMobileKey('LEFT', true)"
      ontouchend="setMobileKey('LEFT', false)">
      <img src="./img/interface/mobile/mobile_left.svg" alt="Left">
    </button>
    <button class="dpad-btn right-btn touch-btn" ontouchstart="setMobileKey('RIGHT', true)"
      ontouchend="setMobileKey('RIGHT', false)">
      <img src="./img/interface/mobile/mobile_right.svg" alt="Right">
    </button>
  </div>
  <div class="action-pad">
    <button class="shoot-btn touch-btn" ontouchstart="setMobileKey('SHOOT', true)" ontouchend="setMobileKey('SHOOT', false)">
      <img src="./img/interface/mobile/mobile_shot.svg" alt="Shoot">
    </button>
    <button class="poison-btn touch-btn" ontouchstart="setMobileKey('POISENSHOOT', true)"
      ontouchend="setMobileKey('POISENSHOOT', false)">
      <img src="./img/interface/mobile/mobile_poisenShot.svg" alt="Poison">
    </button>
  </div>
</div>
`
}

/**
 * Returns the HTML content for the legal notice (Datenschutzerklärung) overlay.
 * 
 * This overlay includes GDPR-related information such as:
 * - Responsible contact (Responsible)
 * - User rights under DSGVO (e.g. data access, deletion, objection)
 * - Link to the supervisory authority
 * - Legal sources and change notice
 * 
 * @returns {string} HTML markup string for displaying the legal notice overlay.
 */
function legalNoticeOverlayHTML() {
  return `
<div class="game-overlay content-column">
  <button class="game-overlay-btn repeat-btn control-back-btn" onclick="showGameMenu()"></button>
  <div class="legal-content scrollbox">
    <div class="story-text legal-text">
      <h1>Datenschutzhinweise</h1>
      <h2>Verantwortlicher</h2>
      <p>Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutz-Grundverordnung (DSGVO), ist:
      </p>
      <p class='generator_user_input'>Pascal Kasbeitzer</p>
      <h2>Ihre Betroffenenrechte</h2>
      <p>Unter den angegebenen Kontaktdaten können Sie gemäß EU-Datenschutz-Grundverordnung (DSGVO) jederzeit folgende
        Rechte ausüben:</p>
      <ul>
        <li>Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung (Art. 15 DSGVO),</li>
        <li>Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO),</li>
        <li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO),</li>
        <li>Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher Pflichten noch nicht
          löschen dürfen (Art. 18 DSGVO),</li>
        <li>Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21 DSGVO) und</li>
        <li>Datenübertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt haben oder einen Vertrag mit uns
          abgeschlossen haben (Art. 20 DSGVO).</li>
      </ul>
      <p>Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese jederzeit mit Wirkung für die Zukunft
        widerrufen.</p>
      <p>Sie können sich jederzeit mit einer Beschwerde an eine Aufsichtsbehörde wenden, z. B. an die zuständige
        Aufsichtsbehörde des Bundeslands Ihres Wohnsitzes oder an die für uns als verantwortliche Stelle zuständige
        Behörde.</p>
      <p>Eine Liste der Aufsichtsbehörden (für den nichtöffentlichen Bereich) mit Anschrift finden Sie unter: <a
          href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html">https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html</a>.
      </p>
      <h2>Verarbeitungstätigkeiten</h2>
      <h2>Information über Ihr Widerspruchsrecht nach Art. 21 DSGVO</h2>
      <h3>Einzelfallbezogenes Widerspruchsrecht</h3>
      <p>Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die
        Verarbeitung Sie betreffender personenbezogener Daten, die aufgrund Art. 6 Abs. 1 lit. f DSGVO
        (Datenverarbeitung auf der Grundlage einer Interessenabwägung) erfolgt, Widerspruch einzulegen; dies gilt auch
        für ein auf diese Bestimmung gestütztes Profiling im Sinne von Art. 4 Nr. 4 DSGVO.</p>
      <p>Legen Sie Widerspruch ein, werden wir Ihre personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir
        können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und
        Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von
        Rechtsansprüchen.</p>
      <h3>Empfänger eines Widerspruchs</h3>
      <p class='generator_user_input'>Pascal Kasbeitzer</p>
      <h2>Änderung unserer Datenschutzerklärung</h2>
      <p>Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen
        Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei
        der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.</p>
      <h2>Fragen zum Datenschutz</h2>
      <p>Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail an den oben genannten
        Verantwortlichen.</p>
      <h2>Urheberrechtliche Hinweise</h2>
      <p><em>Diese Datenschutzerklärung wurde mit Hilfe der activeMind AG erstellt – den Experten für <a
            href="https://www.activemind.de/datenschutz/datenschutzbeauftragter/" target="_blank"
            rel="noopener dofollow">externe Datenschutzbeauftragte</a> (Version #2024-10-25).</em></p>
    </div>
  </div>
  <div class="game-credit">
    <span>by Pascal K. - 2025</span>
  </div>
</div>
`
}

/**
 * Creates an HTML string for a single animated bubble element.
 *
 * The bubble is positioned randomly along the horizontal axis (`left`)
 * and given a random size between 48 and 112 pixels. The animation duration
 * is controlled by the provided `duration` parameter.
 *
 * @param {number} duration - The duration in seconds for the bubble animation.
 * @returns {string} HTML string of the animated bubble image element.
 */
function createBubbleMenuHTML(duration) {
  const left = Math.random() * 100;
  const size = Math.random() * 64 + 48;
  const style = `
    left: ${left}%;
    width: ${size}px;
    animation-duration: ${duration}s;
  `;
  return `<img src="./img/UI/bubbles/default/default_b1.png" class="bubble-animated" style="${style}">`;
}