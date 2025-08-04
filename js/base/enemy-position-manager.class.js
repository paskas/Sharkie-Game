/**
 * Manages and tracks enemy positions on the X and Y axes.
 * Prevents overlapping or too-close spawning by storing and validating used coordinates.
 */
class EnemyPositionManager {
  /**
   * Stores all used X positions to prevent overlap.
   * @type {number[]}
   */
  static usedX = [];

  /**
   * Stores all used Y positions to prevent overlap.
   * @type {number[]}
   */
  static usedY = [];

  /**
   * Checks if a given X position is available based on minimum distance to used X positions.
   * 
   * @param {number} x - The X position to check.
   * @param {number} minDistance - The minimum required distance from other X positions.
   * @returns {boolean} True if available, false if too close to a used position.
   */
  static isXAvailable(x, minDistance) {
    return !this.usedX.some(used => Math.abs(used - x) < minDistance);
  }

  /**
   * Checks if a given Y position is available based on minimum distance to used Y positions.
   * 
   * @param {number} y - The Y position to check.
   * @param {number} minDistance - The minimum required distance from other Y positions.
   * @returns {boolean} True if available, false if too close to a used position.
   */
  static isYAvailable(y, minDistance) {
    return !this.usedY.some(used => Math.abs(used - y) < minDistance);
  }

  /**
   * Registers an X position as used.
   * 
   * @param {number} x - The X coordinate to store.
   */
  static registerX(x) {
    this.usedX.push(x);
  }

  /**
   * Registers a Y position as used.
   * 
   * @param {number} y - The Y coordinate to store.
   */
  static registerY(y) {
    this.usedY.push(y);
  }

  /**
   * Clears all stored X and Y positions.
   */
  static reset() {
    this.usedX = [];
    this.usedY = [];
  }
}