let canvas;
let world;
let keyboard = new Keyboard();

function initGame() {
  showGameMenu();
  initWorld();
}

function initWorld() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}

function playGame() {
  world.gameStarted = true;
  clearOverlayContent();
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


