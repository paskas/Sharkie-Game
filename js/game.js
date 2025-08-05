let canvas;
let world;
let keyboard = new Keyboard();
let isPaused = false;
let bubbleMenuInterval = null;

window.soundManager = new SoundManager();

/**
 * Proxy method to set a mobile key state on the keyboard instance.
 * Used by touch controls to simulate key press behavior.
 *
 * @param {string} key - The name of the virtual key (e.g., 'UP', 'LEFT', 'SHOOT').
 * @param {boolean} state - The desired key state (true = pressed, false = released).
 */
window.setMobileKey = (key, state) => {
  if (keyboard && typeof keyboard.setMobileKey === 'function') {
    keyboard.setMobileKey(key, state);
  }
};

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
 * Initializes the sound button based on the current mute state.
 * Adds the appropriate CSS class to reflect whether sound is on or muted.
 */
function initSoundButton() {
  const btn = document.getElementById('soundToggleBtn');
  if (!btn) return;
  btn.classList.remove('play-sound', 'mute-sound');
  if (soundManager.isMuted) {
    btn.classList.add('mute-sound');
  } else {
    btn.classList.add('play-sound');
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

/**
 * Prevents the default context menu from opening on right-click anywhere in the window.
 */
window.addEventListener('contextmenu', e => e.preventDefault());

/**
 * Prevents the context menu specifically on the mobile controls container.
 * This ensures long presses on touch devices don't trigger the context menu.
 */
document.addEventListener('DOMContentLoaded', () => {
  const mobileControls = document.getElementById('mobileControls');
  if (mobileControls) {
    mobileControls.addEventListener('contextmenu', e => e.preventDefault());
  }
});

/**
 * Starts the infinite bubble loop by spawning bubbles at random intervals.
 * Uses a recursive `setTimeout` to simulate variable timing between spawns.
 */
function startBubbleMenuLoop() {
  spawnAnimatedBubble();
  const delay = Math.random() * 1000 + 500;
  bubbleMenuInterval = setTimeout(startBubbleMenuLoop, delay);
}

/**
 * Spawns a single animated bubble into the #bubbleOverlay element.
 * Sets its animation duration and removes it after the duration ends.
 */
function spawnAnimatedBubble() {
  const overlay = document.getElementById('bubbleOverlay');
  const duration = Math.random() * 4 + 5;
  overlay.insertAdjacentHTML('beforeend', createBubbleMenuHTML(duration));
  const bubble = overlay.lastElementChild;
  animateBubbleFrames(bubble);
  setTimeout(() => {
    bubble.remove();
  }, duration * 1000);
}

/**
 * Animates the bubble sprite by cycling through frames using setInterval.
 * Clears the interval after 6 seconds.
 *
 * @param {HTMLElement} bubble - The bubble element to animate.
 */
function animateBubbleFrames(bubble) {
  let frame = 1;
  const totalFrames = 5;
  const frameInterval = setInterval(() => {
    frame = frame % totalFrames + 1;
    bubble.src = `./img/UI/bubbles/default/default_b${frame}.png`;
  }, 150);
  setTimeout(() => clearInterval(frameInterval), 7000);
}

/**
 * Stops the interval for the menu bubble animation if it's running.
 * Ensures that no further bubbles are spawned in the menu.
 */
function clearBubbleMenuLoop() {
  if (bubbleMenuInterval) {
    clearInterval(bubbleMenuInterval);
    bubbleMenuInterval = null;
  }
}

