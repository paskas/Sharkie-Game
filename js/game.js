let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  initLevel();
  world = new World(canvas, keyboard);
}
