/**
 * Displays the character's health bar in the UI.
 * Automatically updates the displayed health image based on character life.
 * Inherits from DrawableObject.
 */
class HealthBarCharacter extends DrawableObject {
  updateInterval = null;

  IMAGES_HEALTH = [
    './img/UI/healthbar/healthbar_char_0.png',
    './img/UI/healthbar/healthbar_char_20.png',
    './img/UI/healthbar/healthbar_char_40.png',
    './img/UI/healthbar/healthbar_char_60.png',
    './img/UI/healthbar/healthbar_char_80.png',
    './img/UI/healthbar/healthbar_char_100.png'
  ];
  
  /**
   * Initializes the health bar UI for the given character.
   * 
   * @param {Character} character - The character whose health is tracked.
   */
  constructor(character) {
    super();
    this.character = character;
    this.x = 0;
    this.y = -15;
    this.width = 290;
    this.height = 70;

    this.img = new Image();
    this.loadImages(this.IMAGES_HEALTH);
    this.updatingHealthBar();
  }

  /**
   * Starts the interval that updates the health bar image based on character life.
   * Prevents duplicate intervals from being created.
   */
  updatingHealthBar() {
    if (this.updateInterval) return;
    this.updateInterval = setInterval(() => this.updateImagesHealth(), 1000 / 60);
  }

  /**
   * Updates the current health bar image based on the character’s remaining life.
   */
  updateImagesHealth() {
    let image = this.imageCache[this.IMAGES_HEALTH[Character.life]];
    if (image) {
      this.img = image;
    }
  }

  /**
   * Stops the health bar update interval.
   */
  clearAllIntervals() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  /**
   * Restarts the health bar update interval.
   */
  continueAllIntervals() {
    this.clearAllIntervals();
    this.updatingHealthBar();
  }
}