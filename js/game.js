let canvas;
let world;
let keyboard = new Keyboard();

function initGame() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}

function playGame() {
  world.gameStarted = true;
  removeOverlay();
}

function removeOverlay() {
  const ifaceContainer = document.getElementById('iface');
  if (ifaceContainer) {
    ifaceContainer.classList.add('d-none');
  }
}

function fullscreen() {
  let fullscreen = document.getElementById('gameContainer');
  let canvas = document.getElementById('canvas');
  enterFullscreen(fullscreen, canvas);
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


