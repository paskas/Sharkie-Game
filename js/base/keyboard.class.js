/**
 * Handles keyboard input and mobile control mapping for player actions.
 * Supports direction keys and shooting actions.
 */
class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SHOOT = false;
  POISENSHOOT = false;

  /**
   * Initializes the keyboard controls by setting up event listeners.
   */
  constructor() {
    this.initKeyboardControl();
  }

  /**
   * Sets up event listeners for keydown and keyup events to handle keyboard input.
   */
  initKeyboardControl() {
    window.addEventListener("keydown", (e) => this.initKeyBindings(e, true));
    window.addEventListener("keyup", (e) => this.initKeyBindings(e, false));
  }

  /**
   * Updates the corresponding key state based on the event and key type.
   * 
   * @param {KeyboardEvent} e - The keyboard event.
   * @param {boolean} isPressed - Whether the key is being pressed or released.
   */
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
        case ' ':
          this.POISENSHOOT = isPressed;
          break;
      }
    }
  }

  /**
   * Updates the key state from mobile touch input.
   * 
   * @param {string} key - The key name to update (e.g., 'LEFT', 'SHOOT').
   * @param {boolean} state - The new state of the key.
   */
  setMobileKey(key, state) {
    if (key in this) {
      this[key] = state;
    }
  }
}