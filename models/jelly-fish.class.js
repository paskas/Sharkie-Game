class JellyFish extends MovableObject {
  x = 400;
  IMAGES_STAND = [
    './img/2_Enemy/2_JellyFish/RegularDamage/Lila 1.png',
    './img/2_Enemy/2_JellyFish/RegularDamage/Lila 2.png',
    './img/2_Enemy/2_JellyFish/RegularDamage/Lila 3.png',
    './img/2_Enemy/2_JellyFish/RegularDamage/Lila 4.png'
  ];

  constructor() {
    super().loadImage('./img/2_Enemy/2_JellyFish/RegularDamage/Lila 1.png');
    // this.x = 200 + Math.random()*500;
    this.height = 90;
    this.width = 110;
    this.loadImages(this.IMAGES_STAND);
    this.animate();
    this.speed = 0.15 + Math.random()*0.30;
    this.moveLeft();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_STAND)
    }, 300);
  }
}

