/**
 * Represents a projectile bubble shot by the character.
 * Can be a regular or poison bubble with animation and movement logic.
 */
class ShootingObject extends MovableObject {
  shootInterval = null;
  animationInterval = null;

  IMAGES_BUBBLE = [
    './img/UI/bubbles/default/default_b1.png',
    './img/UI/bubbles/default/default_b2.png',
    './img/UI/bubbles/default/default_b3.png',
    './img/UI/bubbles/default/default_b4.png',
    './img/UI/bubbles/default/default_b5.png'
  ];

  IMAGES_POISENBUBBLE = [
    './img/UI/bubbles/poison/poison_b1.png',
    './img/UI/bubbles/poison/poison_b2.png',
    './img/UI/bubbles/poison/poison_b3.png',
    './img/UI/bubbles/poison/poison_b4.png',
    './img/UI/bubbles/poison/poison_b5.png',
  ];

  IMAGES_SPLASHBUBBLE = [
    './img/UI/bubbles/splash/default_splash_b1.png',
    './img/UI/bubbles/splash/default_splash_b2.png',
    './img/UI/bubbles/splash/default_splash_b3.png'
  ];

  /**
   * Creates a new shooting bubble object.
   * 
   * @param {Character} character - The character who shoots the bubble.
   * @param {number} x - Starting X position.
   * @param {number} y - Starting Y position.
   * @param {boolean} otherDirection - Whether the bubble moves left.
   * @param {boolean} [isPoisend=false] - Whether the bubble is a poison type.
   */
  constructor(character, x, y, otherDirection, isPoisend = false) {
    super();
    this.character = character;
    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;
    this.width = 60;
    this.height = 60;

    this.isUsed = false;
    this.isPoisenBubble = isPoisend;

    this.initBubbleImages(isPoisend);
    this.loadImages(this.IMAGES_SPLASHBUBBLE);

    this.shoot();
    this.animate();
  }

  /**
   * Starts the movement of the bubble in horizontal direction using intervals.
   */
  shoot() {
    if (this.shootInterval) return;
    this.shootInterval = setInterval(() => {
      this.x += this.otherDirection ? -8 : 8;
    }, 1000 / 60);
  }

  /**
   * Starts the bubble's animation loop using image frames.
   */
  animate() {
    if (this.animationInterval) return;
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.getBubbleImages())
    }, 120);
  }

  /**
   * Stops all intervals related to the bubble's behavior (movement and animation).
   */
  clearAllIntervals() {
    if (this.shootInterval) {
      clearInterval(this.shootInterval);
      this.shootInterval = null;
    }
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  /**
   * Resumes all previously cleared intervals for movement and animation.
   */
  continueAllIntervals() {
    this.clearAllIntervals();
    this.shoot();
    this.animate();
  }

  /**
   * Returns the correct set of images based on poison state.
   * 
   * @returns {string[]} Array of image paths.
   */
  getBubbleImages() {
    return this.isPoisend ? this.IMAGES_POISENBUBBLE : this.IMAGES_BUBBLE;
  }

  /**
   * Initializes bubble image set and sets the starting image.
   * 
   * @param {boolean} isPoisend - Whether the bubble should be poisoned.
   */
  initBubbleImages(isPoisend) {
    this.checkAndSetPoison(isPoisend);
    const images = this.getBubbleImages();
    this.loadImages(images);
    this.img = this.imageCache[images[0]];
  }

  /**
   * Determines if the bubble can be poisoned based on flask count and sets the state.
   * 
   * @param {boolean} isPoisend - Whether the poison mode was requested.
   */
  checkAndSetPoison(isPoisend) {
    if (isPoisend && PoisenFlask.flaskCount > 0) {
      this.isPoisend = true;
      PoisenFlask.flaskCount--;
    } else {
      this.isPoisend = false;
    }
  }

  /**
   * Triggers splash animation and sound for the bubble, then executes callback.
   * 
   * @param {Function} callback - Function to execute after animation ends.
   */
  splashBubble(callback) {
    this.width = 100;
    this.height = 100;
    this.playAnimationOnce(this.IMAGES_SPLASHBUBBLE, callback, 30)
    soundManager.playSound('./assets/audio/character/bubble_splash.wav');
  }
}