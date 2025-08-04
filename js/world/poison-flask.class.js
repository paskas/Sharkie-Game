/**
 * Represents a poison flask object in the game.
 * Can appear in different variants: left, right, or animated (falling/flashing).
 */
class PoisenFlask extends MovableObject {
  isLost = false;
  animationInterval = null;
  flaskDropTimeout = null;
  static flaskCount = 0;

  IMAGES_FLASKS = [
    './img/UI/poison_flasks/poison_flask_animated/1.png',
    './img/UI/poison_flasks/poison_flask_animated/2.png',
    './img/UI/poison_flasks/poison_flask_animated/3.png',
    './img/UI/poison_flasks/poison_flask_animated/4.png',
    './img/UI/poison_flasks/poison_flask_animated/5.png',
    './img/UI/poison_flasks/poison_flask_animated/6.png',
    './img/UI/poison_flasks/poison_flask_animated/7.png',
    './img/UI/poison_flasks/poison_flask_animated/8.png'
  ];

  IMAGES_FLASKLEFT = [
    './img/UI/poison_flasks/poison_flask_left_right/poison_flask_dark_left.png',
  ];

  IMAGES_FLASKRIGHT = [
    './img/UI/poison_flasks/poison_flask_left_right/poison_flask_dark_right.png',
  ];

  /**
   * Creates a new PoisenFlask instance.
   * @param {number} x - The horizontal position of the flask.
   * @param {number} y - The vertical position of the flask.
   * @param {'left'|'right'|'animated'} variant - The flask variant (static left/right or animated drop).
   */
  constructor(x, y, variant) {
    super()
    this.x = x;
    this.y = y;
    this.variant = variant;
    this.width = 70;
    this.height = 95;

    this.img = new Image();
    this.initFlaskImage();
  }
  
  /**
   * Loads the appropriate flask image(s) based on its variant.
   */
  initFlaskImage() {
    if (this.variant === 'left') {
      this.loadImage(this.IMAGES_FLASKLEFT);
    } else if (this.variant === 'right') {
      this.loadImage(this.IMAGES_FLASKRIGHT);
    } else if (this.variant === 'animated') {
      this.loadImages(this.IMAGES_FLASKS);
    }
  }

  /**
   * Starts the animation for animated flasks.
   * Does nothing if the interval is already running.
   */
  startAnimationFlask() {
    if (this.animationInterval) return;
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_FLASKS);
    }, 1000 / 8);
  }

  /**
   * Triggers the drop animation for animated flasks
   * and removes the flask from the level after a timeout.
   */
  animateFlaskDrop() {
    if (this.variant === 'animated') {
      this.startAnimationFlask();
      this.flaskDropTimeout = setTimeout(() => {
        clearInterval(this.animationInterval);
        this.world.level.poisonFlasks = this.world.level.poisonFlasks.filter(f => f !== this);
      }, 1500);
    }
  }

  /**
   * Starts both the arc movement and the animation for a falling flask.
   */
  startFallingFlask() {
    this.animateFlaskDrop();
    this.startArcMovement();
  }

  /**
   * Draws the flask on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Clears all active timeouts and animation intervals for the flask.
   */
  clearAllIntervals() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
    if (this.flaskDropTimeout) {
      clearTimeout(this.flaskDropTimeout);
      this.flaskDropTimeout = null;
    }
  }

  /**
   * Restarts the animation interval if the flask is animated.
   */
  continueAllIntervals() {
    this.clearAllIntervals();
    if (this.variant === 'animated') {
      if (!this.img || !this.img.complete) {
        this.loadImages(this.IMAGES_FLASKS);
      }
      this.startAnimationFlask();
    }
  }
}