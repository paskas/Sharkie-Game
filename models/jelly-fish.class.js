class JellyFish extends MovableObject {
  constructor() {
    super().loadImage('./img/2_Enemy/2_JellyFish/RegularDamage/Lila 1.png');
    this.x = 200 + Math.random()*500;
    this.height = 90;
    this.width = 110;
  }
}