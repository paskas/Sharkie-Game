class Sunlight extends MovableObject{
  y = 200;
  x = 0;
  height = 400;
  width = 500

  constructor() {
    super().loadImage('./img/3. Background/Layers/1. Light/1.png');
    this.x = Math.random()*500;
  }
}
