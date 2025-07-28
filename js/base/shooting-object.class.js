class ShootingObject extends MovableObject {
  shootInterval = null;
  animationInterval = null;

  IMAGES_BUBBLE = [
    './img/UI/bubbles/default/default_b1.png',
    './img/UI/bubbles/default/default_b2.png',
    './img/UI/bubbles/default/default_b3.png',
    './img/UI/bubbles/default/default_b4.png',
    './img/UI/bubbles/default/default_b5.png'
  ];

  IMAGES_POISENBUBBLE = [
    './img/UI/bubbles/poison/poison_b1.png',
    './img/UI/bubbles/poison/poison_b2.png',
    './img/UI/bubbles/poison/poison_b3.png',
    './img/UI/bubbles/poison/poison_b4.png',
    './img/UI/bubbles/poison/poison_b5.png',
  ];

  IMAGES_SPLASHBUBBLE = [
    './img/UI/bubbles/splash/default_splash_b1.png',
    './img/UI/bubbles/splash/default_splash_b2.png',
    './img/UI/bubbles/splash/default_splash_b3.png'
  ];

  constructor(character, x, y, otherDirection, isPoisend = false) {
    super();
    this.character = character;
    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;
    this.width = 60;
    this.height = 60;

    this.isUsed = false;
    this.isPoisenBubble = isPoisend;

    this.initBubbleImages(isPoisend);
    this.loadImages(this.IMAGES_SPLASHBUBBLE);

    this.shoot();
    this.animate();
  }

  shoot() {
    if (this.shootInterval) return;
    this.shootInterval = setInterval(() => {
      this.x += this.otherDirection ? -8 : 8;
    }, 1000 / 60);
  }

  animate() {
    if (this.animationInterval) return;
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.getBubbleImages())
    }, 120);
  }

  clearAllIntervals() {
    if (this.shootInterval) {
      clearInterval(this.shootInterval);
      this.shootInterval = null;
    }
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  continueAllIntervals() {
    this.clearAllIntervals();
    this.shoot();
    this.animate();
  }

  getBubbleImages() {
    return this.isPoisend ? this.IMAGES_POISENBUBBLE : this.IMAGES_BUBBLE;
  }

  initBubbleImages(isPoisend) {
    this.checkAndSetPoison(isPoisend);
    const images = this.getBubbleImages();
    this.loadImages(images);
    this.img = this.imageCache[images[0]];
  }

  checkAndSetPoison(isPoisend) {
    if (isPoisend && PoisenFlask.flaskCount > 0) {
      this.isPoisend = true;
      PoisenFlask.flaskCount--;
    } else {
      this.isPoisend = false;
    }
  }

  splashBubble(callback) {
    this.width = 100;
    this.height = 100;
    this.playAnimationOnce(this.IMAGES_SPLASHBUBBLE, callback, 30)
  }
}