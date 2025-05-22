class Character extends MovableObject {
  x = 0;
  y = 200;
  height = 260;
  width = 240;
  speed = 6;
  rotationAngle = 0;
  world;
  static life = 5;

  IMAGES_STAND = [
    './img/character/idle/1.png',
    './img/character/idle/2.png',
    './img/character/idle/3.png',
    './img/character/idle/4.png',
    './img/character/idle/5.png',
    './img/character/idle/6.png',
    './img/character/idle/7.png',
    './img/character/idle/8.png',
    './img/character/idle/9.png',
    './img/character/idle/10.png',
    './img/character/idle/11.png',
    './img/character/idle/12.png',
    './img/character/idle/13.png',
    './img/character/idle/14.png',
    './img/character/idle/15.png',
    './img/character/idle/16.png',
    './img/character/idle/17.png',
    './img/character/idle/18.png'

  ];
  IMAGES_SWIM = [
    './img/character/swim/1.png',
    './img/character/swim/2.png',
    './img/character/swim/3.png',
    './img/character/swim/4.png',
    './img/character/swim/5.png',
    './img/character/swim/6.png'
  ];
  IMAGES_DEAD = [
    './img/character/dead/default_options/animated_horizontal/1.png',
    './img/character/dead/default_options/animated_horizontal/2.png',
    './img/character/dead/default_options/animated_horizontal/3.png',
    './img/character/dead/default_options/animated_horizontal/4.png',
    './img/character/dead/default_options/animated_horizontal/5.png',
    './img/character/dead/default_options/animated_horizontal/6.png'
  ];
  IMAGES_POISEND = [
    './img/character/hurt/poisoned/1.png',
    './img/character/hurt/poisoned/2.png',
    './img/character/hurt/poisoned/3.png',
    './img/character/hurt/poisoned/4.png',
    './img/character/hurt/poisoned/5.png'
  ];
  IMAGES_SHOCK = [
    './img/character/hurt/electric_shock/01.png',
    './img/character/hurt/electric_shock/02.png'
  ];

  constructor() {
    super();
    this.loadImage('./img/character/idle/1.png');
    this.loadImages(this.IMAGES_STAND);
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_POISEND);
    this.loadImages(this.IMAGES_SHOCK);
    this.animate();
    // this.applyGravity();
  }

  animate() {
    this.runMovement();
    this.runAnimation();
  }

  runMovement() {
    setInterval(() => {
      const kb = this.world.keyboard;
      if (kb.RIGHT && this.x < this.world.level.level_end_x) this.x += this.speed;
      if (kb.LEFT && this.x > 0) this.x -= this.speed;
      if (kb.UP && this.y > this.world.level.level_top_y) {
        this.y -= this.speed;
        this.rotationAngle = -15;
      } else if (kb.DOWN && this.y < this.world.level.level_bottom_y) {
        this.y += this.speed;
        this.rotationAngle = 15;
      } else {
        this.rotationAngle = 0;
      }
      this.world.camera_x = -this.x + 40;
    }, 1000 / 60);
  }

  runAnimation() {
    setInterval(() => {
      if (this.isDead()) {
        this.deadAnimation();
      } else if (this.isInDamagePhase() && this.poisend) {
        this.poisendAnimation();
      } else if (this.isInDamagePhase() && this.shock) {
        this.shockAnimation();
      } else if (this.isMoving()) {
        this.swimAnimation();
      } else {
        this.idleAnimation();
      }
    }, 100);
  }

  idleAnimation() {
    this.playAnimation(this.IMAGES_STAND);
  }

  swimAnimation() {
    this.playAnimation(this.IMAGES_SWIM);
  }

  poisendAnimation() {
    this.playAnimation(this.IMAGES_POISEND);
  }

  shockAnimation() {
    this.playAnimation(this.IMAGES_SHOCK);
  }

  deadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
  }


  isMoving() {
    const kb = this.world.keyboard;
    if (kb.LEFT) this.otherDirection = true;
    if (kb.RIGHT) this.otherDirection = false;
    return kb.RIGHT || kb.LEFT || kb.UP || kb.DOWN;
  }
}