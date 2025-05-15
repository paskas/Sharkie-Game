class JellyFish extends MovableObject {
  x = 400;
  height = 110;
  width = 80;

  IMAGES_STAND = [
    './img/2_Enemy/2_JellyFish/RegularDamage/Lila 1.png',
    './img/2_Enemy/2_JellyFish/RegularDamage/Lila 2.png',
    './img/2_Enemy/2_JellyFish/RegularDamage/Lila 3.png',
    './img/2_Enemy/2_JellyFish/RegularDamage/Lila 4.png'
  ];

  constructor() {
    super().loadImage('./img/2_Enemy/2_JellyFish/RegularDamage/Lila 1.png');
    // this.x = 200 + Math.random()*500;
    this.loadImages(this.IMAGES_STAND);
    this.animate();
    this.speed = 0.15 + Math.random() * 0.30;
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    setInterval(() => {
      this.playAnimation(this.IMAGES_STAND)
    }, 300);
  }
}

