class Endboss extends MovableObject {
  x = 400;
  y = 30;
  height = 400;
  width = 380;
  hadFirstContact = false;

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
  IMAGES_SPAWNING = [
    './img/enemies/killer_whale_endboss/incoming/1.png',
    './img/enemies/killer_whale_endboss/incoming/2.png',
    './img/enemies/killer_whale_endboss/incoming/3.png',
    './img/enemies/killer_whale_endboss/incoming/4.png',
    './img/enemies/killer_whale_endboss/incoming/5.png',
    './img/enemies/killer_whale_endboss/incoming/6.png',
    './img/enemies/killer_whale_endboss/incoming/7.png',
    './img/enemies/killer_whale_endboss/incoming/8.png',
    './img/enemies/killer_whale_endboss/incoming/9.png',
    './img/enemies/killer_whale_endboss/incoming/10.png'
  ];

  /**
   * Creates an instance of the Endboss.
   * 
   * - Loads floating and spawning images into the image cache
   * - Initializes with an empty image to stay invisible at first
   * - Sets a random spawn position on the x-axis
   * - Starts the animation logic to wait for character trigger
   * 
   * @constructor
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_FLOATING);
    this.loadImages(this.IMAGES_SPAWNING);
    this.img = new Image();
    this.x = 2200 + Math.random() * 500;
    this.animate();
  }

  animate() {
    this.triggerEndboss();
  }

  triggerEndboss() {
    let triggerAnimation = setInterval(() => {
      if (world.character.x > 2000 && !this.hadFirstContact) {
        this.hadFirstContact = true;
        clearInterval(triggerAnimation);
        this.bossSpawnAnimation();
      }
    }, 150);
  }

  bossSpawnAnimation() {
    let i = 0;
    let spwanAnimation = setInterval(() => {
      this.img = this.imageCache[this.IMAGES_SPAWNING[i]];
      i++;
      if (i >= this.IMAGES_SPAWNING.length) {
        clearInterval(spwanAnimation)
        this.startIdleAnimation();
      }
    }, 150);
  }

  startIdleAnimation() {
    let i = 0;
    setInterval(() => {
      this.img = this.imageCache[this.IMAGES_FLOATING[i]];
      i = (i + 1) % this.IMAGES_FLOATING.length;
    }, 150);
  }
}