class ShootingObject extends MovableObject {

  IMAGES_BUBBLE = [
    './img/UI/bubbles/default/default_b1.png',
    './img/UI/bubbles/default/default_b2.png',
    './img/UI/bubbles/default/default_b3.png',
    './img/UI/bubbles/default/default_b4.png',
    './img/UI/bubbles/default/default_b5.png'
  ];

  IMAGES_POISENBUBBLE = [
    './img/UI/bubbles/poisen/poisen_b1.png',
    './img/UI/bubbles/poisen/poisen_b2.png',
    './img/UI/bubbles/poisen/poisen_b3.png',
    './img/UI/bubbles/poisen/poisen_b4.png',
    './img/UI/bubbles/poisen/poisen_b5.png',
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

    this.initBubbleImages(isPoisend);
    this.loadImages(this.IMAGES_SPLASHBUBBLE);

    this.shoot();
    this.animate();
  }

  shoot() {
    this.interval = setInterval(() => {
      this.x += this.otherDirection ? -8 : 8;
    }, 1000 / 60);
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.getBubbleImages())
    }, 120);
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