let canvas;
let world;
let keyboard = new Keyboard();
let isPaused = false;

window.soundManager = new SoundManager();

function initGame() {
  showGameMenu();
  if (!soundManager.isMusicPlaying()) {
    soundManager.playMusic('./assets/audio/interface/gameUiLoopMusic.mp3');
    soundManager.toggleMute('./assets/audio/interface/gameUiLoopMusic.mp3');
  }
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

function toggleGameplay() {
  const btn = document.getElementById('gameplayBtn');
  const isPlaying = btn.classList.contains('play');
  if (isPlaying) {
    world.stopAllIntervals();
    btn.classList.remove('play');
    btn.classList.add('pause');
    isPaused = true;
  } else {
    world.continueWorld();
    btn.classList.remove('pause');
    btn.classList.add('play');
    isPaused = false;
  }
}

function toogleSound() {
  soundManager.toggleMute();
  const btn = document.getElementById('soundToggleBtn');
  btn.classList.remove('play-sound', 'mute-sound');
  if (soundManager.isMuted) {
    btn.classList.add('mute-sound');
  } else {
    btn.classList.add('play-sound');
  }
}

function fullscreen(mode = 'game') {
  const canvas = document.getElementById('canvas');
  const container = (mode === 'menu')
    ? document.getElementById('overlayContainer')
    : document.getElementById('gameContainer');

  if (!document.fullscreenElement) {
    container.requestFullscreen?.();
    canvas.classList.add('fullscreen-canvas');
  } else {
    document.exitFullscreen?.();
  }
}

document.addEventListener('fullscreenchange', () => {
  const canvas = document.getElementById('canvas');
  if (!document.fullscreenElement) {
    canvas.classList.remove('fullscreen-canvas');
  }
});