class Coin extends MovableObject {

  static setCoin = 0;
  static coinCount = 0;

  static positionXcoin = [
    500, 600, 1200, 1300, 2500, 2600, 2700, 3600, 3700, 3800
  ];

  static coinArcs = [
    { x: 700, y: 350, count: 5 },
    { x: 1600, y: 270, count: 7 },
    { x: 2950, y: 350, count: 5 }
  ];

  IMAGES_COIN = [
    './img/UI/coins/coin_1.png',
    './img/UI/coins/coin_2.png',
    './img/UI/coins/coin_3.png',
    './img/UI/coins/coin_4.png'
  ];

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

  animate() {
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 1000 / 8);
  }

  setSingleCoinX() {
    this.setCoin++;
    return this.positionXcoin[this.setCoin - 1];
  }

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
}