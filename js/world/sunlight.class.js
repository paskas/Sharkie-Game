/**
 * Represents a sunlight beam overlay in the background.
 * Its opacity fluctuates over time to simulate shimmering light.
 */
class Sunlight extends DrawableObject {

  IMAGE_LIGHT = [
    './img/backgrounds/light/complete.png',
  ];

  /**
   * Initializes the sunlight object with image, position, and animation properties.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGE_LIGHT);
    this.x = 960;
    this.y = 0;
    this.width = 1920;
    this.height = 360;

    this.baseOpacity = 0.7;
    this.opacityFluctuation = 0.3;
    this.currentOpacity = this.baseOpacity;
  }

  /**
   * Updates the current opacity based on a sine wave animation.
   * Should be called on each frame to animate the sunlight.
   */
  animate() {
    let time = Date.now() / 500;
    this.currentOpacity = this.baseOpacity + Math.sin(time) * this.opacityFluctuation;
  }
}

