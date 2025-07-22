let canvas;
let world;
let keyboard = new Keyboard();

function initGame() {
  showGameMenu();
}

function initWorld() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}

function playGame() {
  initWorld();
  world.gameStarted = true;
  fadeOutOverlay();
}

function restartLevel() {
  stopRunningWorld();
  resetGameState();
  reloadLevel();
  startWorldFresh();
  clearOverlayContent();
}

function backToMenu() {
  stopRunningWorld();
  resetGameState();
  reloadLevel();
  startWorldFresh();
  showGameMenu();
  world.gameStarted = false;
}

function stopRunningWorld() {
  if (world) {
    world.clearWorld();
  }
}

function resetGameState() {
  resetGlobalStats();
  clearWorldCanvas();
}

function reloadLevel() {
  world.levelManager.reloadCurrentLevel();
  world.camera_x = 0;
}

function startWorldFresh() {
  world.initWorldObjects();
  world.startDrawLoop();
  world.startWorldLoop();
}

function clearWorldCanvas() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resetGlobalStats() {
  Character.life = 5;
  Endboss.life = 5;
  Coin.coinCount = 0;
  Coin.setCoin = 0;
  PoisenFlask.flaskCount = 0;
}

function pause() {
  world.clearWorld();
}

function resume() {
  world.continueWorld();
}

function fullscreen(mode = 'game') {
  let container;
  let canvas = document.getElementById('canvas');
  if (mode === 'menu') {
    container = document.getElementById('overlayContainer');
  } else {
    container = document.getElementById('gameContainer');
  }
  enterFullscreen(container, canvas);
}

function enterFullscreen(container, canvas) {
  if (container.requestFullscreen) {
    container.requestFullscreen();
    canvas.classList.add('fullscreen-canvas');
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

document.addEventListener('fullscreenchange', () => {
  let canvas = document.getElementById('canvas');
  if (!document.fullscreenElement) {
    canvas.classList.remove('fullscreen-canvas');
  }
});


