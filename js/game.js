let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  initLevel();
  world = new World(canvas, keyboard);
}

function fullscreen(){
  let fullscreen = document.getElementById('gameContainer');
  enterFullscreen(fullscreen);
}

function enterFullscreen(container) {
  if(container.requestFullscreen) {
    container.requestFullscreen();
  } else if(container.msRequestFullscreen) {
    container.msRequestFullscreen();
  } else if(container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}