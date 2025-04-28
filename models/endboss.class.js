class Endboss extends MovableObject {
  constructor() {
    super().loadImage('./img/2_Enemy/3_FinalEnemy/2_floating/1.png');
    this.x = 200 + Math.random()*500;
    this.height = 280;
    this.width = 350;
  }
}