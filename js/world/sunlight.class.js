class Sunlight extends MovableObject {
  y = 0;
  x = 230;
  height = 400;
  width = 500

  constructor() {
    super().loadImage('./img/backgrounds/light/1.png');
    this.animte();
  }

  animte() {
    this.moveLeft();
  }
}

