/**
 * Displays the number of collected poison flasks in the UI.
 * Inherits from DrawableObject.
 */
class PoisenFlaskCounter extends DrawableObject {

  /**
   * Initializes the poison flask counter with default position and image.
   */
  constructor() {
    super();
    this.x = -10;
    this.y = 100;
    this.width = 100;
    this.height = 90;

    this.textOffsetX = 80;
    this.textOffsetY = 70;

    this.img = new Image();
    this.loadImage('./img/UI/status/status_poisonFlask.png');
  }
  
  /**
   * Draws the poison flask icon and count text on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   * @param {number} count - The number of poison flasks to display.
   */
  draw(ctx, count) {
    this.drawIcon(ctx);
    this.drawText(ctx, count);
  }

  /**
   * Draws the flask icon image at the specified position.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   */
  drawIcon(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws the flask count as text next to the icon.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   * @param {number} count - The number of poison flasks.
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
}
