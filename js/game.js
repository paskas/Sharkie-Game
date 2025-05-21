let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

function handleKeyDown(e) {
  if (canvas) {
    switch (e.key) {
      case 'ArrowLeft':
      case 'a':
        keyboard.LEFT = true;
        break;
      case 'ArrowRight':
      case 'd':
        keyboard.RIGHT = true;
        break;
      case 'ArrowUp':
      case 'w':
        keyboard.UP = true;
        break;
      case 'ArrowDown':
      case 's':
        keyboard.DOWN = true;
        break;
      case 'e':
        keyboard.SHOOT = true;
        break;
      case 'space':
        keyboard.TAILWHIP = true;
        break;
    }
  }
}

function handleKeyUp(e) {
  if (canvas) {
    switch (e.key) {
      case 'ArrowLeft':
      case 'a':
        keyboard.LEFT = false;
        break;
      case 'ArrowRight':
      case 'd':
        keyboard.RIGHT = false;
        break;
      case 'ArrowUp':
      case 'w':
        keyboard.UP = false;
        break;
      case 'ArrowDown':
      case 's':
        keyboard.DOWN = false;
        break;
      case 'e':
        keyboard.SHOOT = false;
        break;
      case ' ':
        keyboard.TAILWHIP = false;
        break;
    }
  }
}