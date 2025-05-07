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
    this.moveLeft();
  }

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_STAND.length; // 
      let path = this.IMAGES_STAND[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 300);
  }
}

