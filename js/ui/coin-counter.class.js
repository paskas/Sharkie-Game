class CoinCounter extends DrawableObject {
  lastCount = null;

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
    if (this.lastCount === count) return;
    this.lastCount = count;
    if (count >= 30) {
      this.setGlowingCoinImage();
      soundManager.playSound('../assets/audio/character/collectCoinMax.wav')
    } else {
      this.setNormalCoinImage();
    }
  }

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

  setNormalCoinImage() {
    if (this.img.src !== './img/UI/status/status_coin.png') {
      this.loadImage('./img/UI/status/status_coin.png');
    }
  }
}