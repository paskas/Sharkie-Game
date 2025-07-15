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

function mainMenuOverlayHTML() {
  return `
<div class="game-overlay">
  <div class="title-sign">
    <h1>Sharkie</h1>
  </div>
  <button id="toggleFullScreen" class="game-overlay-btn f-screen-btn" onclick="fullscreen()"></button>
  <button class="game-overlay-btn play-btn" onclick="playGame()"></button>
  <div class="controls">
    <button class="game-overlay-btn control-btn"></button>
    <button class="game-overlay-btn info-btn"></button>
  </div>
  `
}
