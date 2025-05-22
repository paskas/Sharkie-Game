class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  TAILWHIP = false;
  SHOOT = false;

  constructor() {
    this.initKeyboardControl();
  }

  initKeyboardControl() {
    window.addEventListener("keydown", (e)=>this.initKeyBindings(e, true));
    window.addEventListener("keyup", (e)=>this.initKeyBindings(e, false));
  }

  initKeyBindings(e, isPressed) {
    if (canvas) {
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
          this.LEFT = isPressed;
          break;
        case 'ArrowRight':
        case 'd':
          this.RIGHT = isPressed;
          break;
        case 'ArrowUp':
        case 'w':
          this.UP = isPressed;
          break;
        case 'ArrowDown':
        case 's':
          this.DOWN = isPressed;
          break;
        case 'e':
          this.SHOOT = isPressed;
          break;
        case 'space':
          this.TAILWHIP = isPressed;
          break;
      }
    }
  }
}