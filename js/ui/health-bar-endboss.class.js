/**
 * Displays the endboss's health bar in the UI.
 * Automatically updates the image based on the Endboss.life value.
 * Inherits from DrawableObject.
 */
class HealthBarEndboss extends DrawableObject {
  updateInterval = null;
  visible = false;

  IMAGES_HEALTH = [
    './img/UI/healthbar/healthbar_boss_0.png',
    './img/UI/healthbar/healthbar_boss_20.png',
    './img/UI/healthbar/healthbar_boss_40.png',
    './img/UI/healthbar/healthbar_boss_60.png',
    './img/UI/healthbar/healthbar_boss_80.png',
    './img/UI/healthbar/healthbar_boss_100.png'
  ];

  /**
   * Initializes the endboss health bar and starts the update interval.
   */
  constructor() {
    super();
    this.x = 650;
    this.y = -15;
    this.width = 300;
    this.height = 70

    this.img = new Image();
    this.loadImages(this.IMAGES_HEALTH);
    this.updatingHealthBar();
  }

  /**
   * Starts an interval to update the health bar image.
   * Prevents multiple intervals from running.
   */
  updatingHealthBar() {
    if (this.updateInterval) return;
    this.updateInterval = setInterval(() => this.updateImagesHealth(), 1000 / 60);
  }

  /**
   * Updates the health bar image based on the current life of the endboss.
   */
  updateImagesHealth() {
    let image = this.imageCache[this.IMAGES_HEALTH[Endboss.life]];
    if (image) {
      this.img = image;
    }
  }

  /**
   * Stops the interval that updates the endboss health bar.
   */
  clearAllIntervals() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  /**
   * Restarts the interval that updates the endboss health bar.
   */
  continueAllIntervals() {
    this.clearAllIntervals();
    this.updatingHealthBar();
  }
}