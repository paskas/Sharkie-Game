class Endboss extends MovableObject {
  constructor() {
    super().loadImage('./img/2.Enemy/3 Final Enemy/2.floating/1.png');
    this.x = 200 + Math.random()*500;
    this.height = 280;
    this.width = 350;
  }
}