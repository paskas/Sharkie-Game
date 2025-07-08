class PoisenFlaskCounter extends DrawableObject {

  constructor() {
    super();
    this.x = -10;
    this.y = 100;
    this.width = 100;
    this.height = 90;

    this.textOffsetX = 80;
    this.textOffsetY = 70;

    this.img = new Image();
    this.loadImage('./img/UI/status/status_poisenFlask.png');
  }

  draw(ctx, count) {
    this.drawIcon(ctx);
    this.drawText(ctx, count);
  }

  drawIcon(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

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
