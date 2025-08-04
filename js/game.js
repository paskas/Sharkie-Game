let canvas;
let world;
let keyboard = new Keyboard();
let isPaused = false;

window.soundManager = new SoundManager();

/**
 * Initializes the main menu and background music.
 */
function initGame() {
  showGameMenu();
  if (!soundManager.isMusicPlaying()) {
    soundManager.playMusic('./assets/audio/interface/adventurecalls.mp3');
  }
}

/**
 * Starts a fresh world, sets gameStarted flag, plays loop music and hides menu overlay.
 */
function playGame() {
  startWorldFresh();
  world.gameStarted = true;
  soundManager.playMusic('./assets/audio/interface/adventuresLoopMusic.mp3');
  fadeOutMenuOverlay();
}

/**
 * Restarts the current level from scratch and reinitializes all world components.
 */
function restartLevel() {
  resetGameState();
  startWorldFresh();
  reloadLevel();
  clearOverlayContent();
  showInGameNav();
}

/**
 * Loads the next level, resets state, and shows in-game navigation.
 */
function nextLevel() {
  resetGameState();
  startWorldFresh();
  loadNextLevel();
  clearOverlayContent();
  showInGameNav();
}

/**
 * Returns to the main menu, resets state, and restarts menu music.
 */
function backToMenu() {
  if (world) {
    world.clearWorld();
    world = null;
  }
  resetGameState();
  soundManager.playMusic('./assets/audio/interface/adventurecalls.mp3');
  showGameMenu();
}

/**
 * Resets all global stats and clears the canvas.
 */
function resetGameState() {
  resetGlobalStats();
  clearWorldCanvas();
}

/**
 * Initializes or reinitializes the world object and its loops.
 */
function startWorldFresh() {
  if (!world) {
    initWorld(true);
  } else {
    world.clearWorld();
    world.initWorldObjects();
  }
  initWorldLoops();
}

/**
 * Creates a new World instance and generates levels if specified.
 * @param {boolean} initLevels - Whether to generate level data.
 */
function initWorld(initLevels = false) {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  world.initWorldObjects();
  if (initLevels) {
    world.levelManager.generateLevels();
  }
}

/**
 * Starts drawing and world logic loops.
 */
function initWorldLoops() {
  world.drawHandler.startDrawLoop();
  world.startWorldLoop();
}

/**
 * Reloads the current level and resets camera position.
 */

function reloadLevel() {
  if (!world?.levelManager) return;
  world.levelManager.reloadCurrentLevel();
  world.camera_x = 0;
}

/**
 * Loads the next level, initializes it and resets camera position.
 */
function loadNextLevel() {
  world.levelManager.loadNextLevel();
  const newLevel = world.levelManager.getCurrentLevel();
  newLevel.initLevel();
  world.camera_x = 0;
}

/**
 * Resets core game statistics to initial values.
 */
function resetGlobalStats() {
  Character.life = 5;
  Endboss.life = 5;
  Coin.coinCount = 0;
  Coin.setCoin = 0;
  PoisenFlask.flaskCount = 0;
}

/**
 * Clears the game canvas completely.
 */
function clearWorldCanvas() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Toggles game pause state and updates button visuals.
 */
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

/**
 * Toggles mute state in SoundManager and updates sound button visuals.
 */
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

/**
 * Enters or exits fullscreen mode based on current state.
 * @param {string} mode - 'game' or 'menu' to determine which container to use.
 */
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

/**
 * Handles the fullscreenchange event and removes canvas class if exited.
 */
document.addEventListener('fullscreenchange', () => {
  const canvas = document.getElementById('canvas');
  if (!document.fullscreenElement) {
    canvas.classList.remove('fullscreen-canvas');
  }
});