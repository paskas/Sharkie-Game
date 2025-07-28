function setGameOverlay(container, content) {
  const gameOverlay = document.getElementById(container);
  if (gameOverlay) {
    gameOverlay.innerHTML = content;
  }
}

function showGameMenu() {
  setGameOverlay('gameOverlay', mainMenuOverlayHTML());
}

function fadeOutMenuOverlay() {
  const menuOverlay = document.getElementById('overlayContainer');
  if (menuOverlay) {
    menuOverlay.classList.add('overlay-fade-out');
    clearOverlay = setTimeout(() => {
      clearOverlayContent();
      clearOverlay = null;
    }, 500);
  }
}

function clearOverlayContent() {
  setGameOverlay('gameOverlay', '');
}

function showEndscreen(status = 'complete') {
  if (status === 'gameOver') {
    setGameOverlay('gameOverlay', gameOverOverlayHTML());
  } else {
    setGameOverlay('gameOverlay', levelCompleteOverlayHTML());
  }
}

function showControlHelp() {
  clearOverlayContent();
  setGameOverlay('gameOverlay', controlHelpOverlayHTML());
}

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
    <button class="game-overlay-btn info-btn"></button>
  </div>
  `
}

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

function levelCompleteOverlayHTML() {
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
        <button class="game-overlay-btn next-btn" onclick="nextLevel()"></button>
      </div>
    </div>
  </div>
  `
}

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
</div>
`
}