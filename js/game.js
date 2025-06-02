let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  initLevel();
  world = new World(canvas, keyboard);
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


