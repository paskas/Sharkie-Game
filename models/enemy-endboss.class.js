class Endboss extends MovableObject {
  x = 400;
  y = 30;
  height = 400;
  width = 380;

  IMAGES_FLOATING = [
    './img/enemies/killer_whale_endboss/idle/1.png',
    './img/enemies/killer_whale_endboss/idle/2.png',
    './img/enemies/killer_whale_endboss/idle/3.png',
    './img/enemies/killer_whale_endboss/idle/4.png',
    './img/enemies/killer_whale_endboss/idle/5.png',
    './img/enemies/killer_whale_endboss/idle/6.png',
    './img/enemies/killer_whale_endboss/idle/7.png',
    './img/enemies/killer_whale_endboss/idle/8.png',
    './img/enemies/killer_whale_endboss/idle/9.png',
    './img/enemies/killer_whale_endboss/idle/10.png',
    './img/enemies/killer_whale_endboss/idle/11.png',
    './img/enemies/killer_whale_endboss/idle/12.png',
    './img/enemies/killer_whale_endboss/idle/13.png'
  ];

  constructor() {
    super().loadImage(this.IMAGES_FLOATING[0]);
    this.loadImages(this.IMAGES_FLOATING);
    this.x = 2200 + Math.random() * 500;
    this.animate();
  }
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_FLOATING)
    }, 200);
  }
}