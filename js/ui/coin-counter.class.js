class CoinCounter extends DrawableObject {

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

  updateImage(count) {
    if (count >= 30) {
      this.x = 0;
      this.y = 40;
      this.width = 80;
      this.height = 80;
      this.textOffsetX = 75;
      this.textOffsetY = 50;
      this.loadImage('./img/UI/status/status_coin_glowing.png');
    } else {
      this.loadImage('./img/UI/status/status_coin.png');
    }
  }

}