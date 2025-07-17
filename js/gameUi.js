function setGameOverlay(container, content) {
  const gameOverlay = document.getElementById(container);
  if (gameOverlay) {
    gameOverlay.innerHTML = content;
  }
}

function showGameMenu() {
  setGameOverlay('gameOverlay', mainMenuOverlayHTML());
}

function clearOverlayContent() {
  setGameOverlay('gameOverlay', '');
}

function showEndscreen(){
  setGameOverlay('gameOverlay', gameOverOverlayHTML());
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
    <button class="game-overlay-btn control-btn"></button>
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