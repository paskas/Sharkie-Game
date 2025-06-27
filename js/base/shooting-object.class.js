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

  constructor(character, x, y, otherDirection, isPoisend = false) {
    super();
    this.character = character;
    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;
    this.width = 60;
    this.height = 60;
    this.isPoisend = isPoisend;
    this.loadImages(this.IMAGES_BUBBLE);
    this.img = this.imageCache[this.IMAGES_BUBBLE[0]];
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

}