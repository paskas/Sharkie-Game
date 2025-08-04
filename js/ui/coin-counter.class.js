/**
 * Displays the current coin count in the game UI.
 * Shows a glowing icon when a threshold is reached and handles drawing the counter.
 * Inherits from DrawableObject.
 */
class CoinCounter extends DrawableObject {
  lastCount = null;

  /**
   * Initializes the coin counter with default position, size, and image.
   */
  constructor() {
    super();
    this.x = 10;
    this.y = 50;
    this.width = 60;
    this.height = 60;

    this.textOffsetX = 60;
    this.textOffsetY = 40;

    this.img = new Image();
    this.loadImage('./img/UI/status/status_coin.png');
  }
  
  /**
   * Draws the coin icon and the current coin count.
   * 
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @param {number} count - The current number of collected coins.
   */
  draw(ctx, count) {
    this.drawIcon(ctx);
    this.drawText(ctx, count);
  }

  /**
   * Draws the coin icon at the predefined position.
   * 
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawIcon(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws the numeric coin count next to the icon.
   * 
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @param {number} count - The coin count to display.
   */
  drawText(ctx, count) {
    ctx.font = '32px luckiest-guy-regular';
    ctx.fillStyle = '#ffe066';
    ctx.strokeStyle = '#a84902';
    let textX = this.x + this.textOffsetX;
    let textY = this.y + this.textOffsetY;
    ctx.fillText(`${count}`, textX, textY);
    ctx.strokeText(`${count}`, textX, textY);
  }

  /**
   * Updates the coin image depending on the coin count.
   * Switches to glowing image and plays a sound if a threshold is reached.
   * 
   * @param {number} count - The current coin count.
   */
  updateImage(count) {
    if (this.lastCount === count) return;
    this.lastCount = count;
    if (count >= 30) {
      this.setGlowingCoinImage();
      soundManager.playSound('../assets/audio/character/collectCoinMax.wav')
    } else {
      this.setNormalCoinImage();
    }
  }

  /**
   * Switches the coin icon to a glowing version and adjusts layout.
   */
  setGlowingCoinImage() {
    if (this.img.src !== './img/UI/status/status_coin_glowing.png') {
      this.loadImage('./img/UI/status/status_coin_glowing.png');
    }
    this.x = 0;
    this.y = 40;
    this.width = 80;
    this.height = 80;
    this.textOffsetX = 75;
    this.textOffsetY = 50;
  }

  /**
   * Reverts the coin icon to the normal version if it was glowing.
   */
  setNormalCoinImage() {
    if (this.img.src !== './img/UI/status/status_coin.png') {
      this.loadImage('./img/UI/status/status_coin.png');
    }
  }
}