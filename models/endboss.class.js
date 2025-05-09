class Endboss extends MovableObject {

  IMAGES_FLOATING = [
    './img/2_Enemy/3_FinalEnemy/2_floating/1.png',
    './img/2_Enemy/3_FinalEnemy/2_floating/2.png',
    './img/2_Enemy/3_FinalEnemy/2_floating/3.png',
    './img/2_Enemy/3_FinalEnemy/2_floating/4.png',
    './img/2_Enemy/3_FinalEnemy/2_floating/5.png',
    './img/2_Enemy/3_FinalEnemy/2_floating/6.png',
    './img/2_Enemy/3_FinalEnemy/2_floating/7.png',
    './img/2_Enemy/3_FinalEnemy/2_floating/8.png',
    './img/2_Enemy/3_FinalEnemy/2_floating/9.png',
    './img/2_Enemy/3_FinalEnemy/2_floating/10.png',
    './img/2_Enemy/3_FinalEnemy/2_floating/11.png',
    './img/2_Enemy/3_FinalEnemy/2_floating/12.png',
    './img/2_Enemy/3_FinalEnemy/2_floating/13.png',
  ];

  constructor() {
    super().loadImage(this.IMAGES_FLOATING[0]);
    this.loadImages(this.IMAGES_FLOATING);
    this.x = 700 + Math.random() * 500;
    this.height = 280;
    this.width = 350;
    this.animate();
  }
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_FLOATING)
    }, 200);
  }
}