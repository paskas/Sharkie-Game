/**
 * Represents a visual coral reef barrier in the background.
 * Extends DrawableObject and supports animated opacity.
 */
class BarrierReef extends DrawableObject {

  IMAGE_BARRIER = [
    './img/backgrounds/barrier_reef/1.png',
  ];

  /**
   * Initializes the BarrierReef with position, size and image.
   * Also sets up values for animated opacity.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGE_BARRIER);
    this.x = 1440;
    this.y = 0;
    this.width = 960;
    this.height = 540;

    this.baseOpacity = 0.7;
    this.opacityFluctuation = 0.3;
    this.currentOpacity = this.baseOpacity;
  }

  /**
   * Animates the opacity of the reef using a sine wave over time.
   * Creates a subtle glowing effect.
   */
  animate() {
    let time = Date.now() / 500;
    this.currentOpacity = this.baseOpacity + Math.sin(time) * this.opacityFluctuation;
  }
}

