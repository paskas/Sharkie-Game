/**
 * Represents a background image in the game world.
 * Inherits from MovableObject.
 */
class BackgroundObject extends MovableObject {
  width = 960;
  height = 540;

  /**
   * Creates a background object at the given X position.
   * The Y position is calculated to align it with the top.
   * @param {string} imagePath - Path to the background image.
   * @param {number} x - Horizontal position of the background.
   * @param {number} y - (Unused) Vertical position, overwritten by `calculate()`.
   */
  constructor(imagePath, x, y) {
    super();
    this.loadImage(imagePath)
    this.x = x;
    this.y = y;
    this.y = this.calculate();
  }
  
  /**
   * Calculates the Y position for the background (top-aligned).
   * @returns {number} The Y coordinate (usually 0).
   */
  calculate() {
    return this.height - this.height;
  }
}