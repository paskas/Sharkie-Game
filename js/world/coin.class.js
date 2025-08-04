/**
 * Represents a collectible coin in the game.
 * Handles animation, positioning, and optional arc formation.
 */
class Coin extends MovableObject {

  animationInterval = null;
  static setCoin = 0;
  static coinCount = 0;

  static positionXcoin = [
    400, 500, 600, 1200, 1300, 2500, 2600, 2700, 2800, 3500, 3600, 3700, 3800
  ];

  static coinArcs = [
    { x: 700, y: 350, count: 5 },
    { x: 1600, y: 300, count: 7 },
    { x: 2950, y: 350, count: 5 }
  ];

  IMAGES_COIN = [
    './img/UI/coins/coin_1.png',
    './img/UI/coins/coin_2.png',
    './img/UI/coins/coin_3.png',
    './img/UI/coins/coin_4.png'
  ];

  /**
   * Creates a new Coin instance at the given position or chooses the next predefined x position.
   *
   * @param {number|null} x - The x-position of the coin. If null, uses next available predefined value.
   * @param {number} [y=440] - The y-position of the coin.
   */
  constructor(x = null, y = 440) {
    super()
    this.x = x !== null ? x : this.setSingleCoinX();
    this.y = y;
    this.width = 50;
    this.height = 50;

    this.img = new Image();
    this.loadImages(this.IMAGES_COIN);
    this.animate();
  }

  /**
   * Starts the coin animation loop, cycling through coin images.
   */
  animate() {
    if (this.animationInterval) return;
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 1000 / 5);
  }

  /**
   * Retrieves the next x-position from the predefined positionXcoin array.
   *
   * @returns {number} - The next predefined x-position for a coin.
   */
  setSingleCoinX() {
    this.setCoin++;
    return this.positionXcoin[this.setCoin - 1];
  }

  /**
   * Generates a set of coin objects in a curved arc shape.
   *
   * @param {number} startX - The x-coordinate of the arc’s start.
   * @param {number} startY - The y-coordinate baseline for the arc.
   * @param {number} count - Total number of coins in the arc.
   * @param {number} [spread=100] - Horizontal spacing between the coins.
   * @returns {Coin[]} - Array of Coin instances forming an arc.
   */
  static setArcCoinPositions(startX, startY, count, spread = 100) {
    let arcCoins = [];
    for (let i = 0; i < count; i++) {
      DrawableObject.setCoin++;
      let x = startX + i * spread;
      let y = startY - Math.sin((i / (count - 1)) * Math.PI) * 100;
      arcCoins.push(new Coin(x, y));
    }
    return arcCoins;
  }

  /**
   * Clears the animation interval of the coin to stop image cycling.
   */
  clearAllIntervals() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  /**
   * Restarts the coin animation by reinitializing the interval.
   */
  continueAllIntervals() {
    this.clearAllIntervals();
    this.animate();
  }
}