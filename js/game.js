let canvas;
let world;
let keyboard = new Keyboard();

function initGame() {
  showGameMenu();
}

function playGame() {
  startWorldFresh();
  world.gameStarted = true;
  fadeOutMenuOverlay();
}

function restartLevel() {
  resetGameState();
  startWorldFresh();
  reloadLevel();
  clearOverlayContent();
  showInGameNav();
}

function nextLevel() {
  resetGameState();
  startWorldFresh();
  loadNextLevel();
  clearOverlayContent();
  showInGameNav();
}

function backToMenu() {
  if (world) {
    world.clearWorld();
    world = null;
  }
  resetGameState();
  showGameMenu();
}

function resetGameState() {
  resetGlobalStats();
  clearWorldCanvas();
}

function startWorldFresh() {
  if (!world) {
    initWorld(true);
  } else {
    world.clearWorld();
    world.initWorldObjects();
  }
  initWorldLoops();
}

function initWorld(initLevels = false) {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  world.initWorldObjects();
  if (initLevels) {
    world.levelManager.generateLevels();
  }
}

function initWorldLoops() {
  world.drawHandler.startDrawLoop();
  world.startWorldLoop();
}

function reloadLevel() {
  if (!world?.levelManager) return;
  world.levelManager.reloadCurrentLevel();
  world.camera_x = 0;
}

function loadNextLevel() {
  world.levelManager.loadNextLevel();
  const newLevel = world.levelManager.getCurrentLevel();
  newLevel.initLevel();
  world.camera_x = 0;
}

function resetGlobalStats() {
  Character.life = 5;
  Endboss.life = 5;
  Coin.coinCount = 0;
  Coin.setCoin = 0;
  PoisenFlask.flaskCount = 0;
}

function clearWorldCanvas() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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