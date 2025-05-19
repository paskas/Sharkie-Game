class Character extends MovableObject {
  x = 0;
  y = 200;
  height = 260;
  width = 240;
  speed = 10;
  rotationAngle = 0;
  world;
  static life = 5;

  IMAGES_STAND = [
    './img/1_Sharkie/1_IDLE/1.png',
    './img/1_Sharkie/1_IDLE/2.png',
    './img/1_Sharkie/1_IDLE/3.png',
    './img/1_Sharkie/1_IDLE/4.png',
    './img/1_Sharkie/1_IDLE/5.png',
    './img/1_Sharkie/1_IDLE/6.png',
    './img/1_Sharkie/1_IDLE/7.png',
    './img/1_Sharkie/1_IDLE/8.png',
    './img/1_Sharkie/1_IDLE/9.png',
    './img/1_Sharkie/1_IDLE/10.png',
    './img/1_Sharkie/1_IDLE/11.png',
    './img/1_Sharkie/1_IDLE/12.png',
    './img/1_Sharkie/1_IDLE/13.png',
    './img/1_Sharkie/1_IDLE/14.png',
    './img/1_Sharkie/1_IDLE/15.png',
    './img/1_Sharkie/1_IDLE/16.png',
    './img/1_Sharkie/1_IDLE/17.png',
    './img/1_Sharkie/1_IDLE/18.png'
  ];
  IMAGES_SWIM = [
    './img/1_Sharkie/3_Swim/1.png',
    './img/1_Sharkie/3_Swim/2.png',
    './img/1_Sharkie/3_Swim/3.png',
    './img/1_Sharkie/3_Swim/4.png',
    './img/1_Sharkie/3_Swim/5.png',
    './img/1_Sharkie/3_Swim/6.png'
  ];
  IMAGES_DEAD = [
    './img/1_Sharkie/6_dead/1_Poisoned/1.png',
    './img/1_Sharkie/6_dead/1_Poisoned/2.png',
    './img/1_Sharkie/6_dead/1_Poisoned/3.png',
    './img/1_Sharkie/6_dead/1_Poisoned/4.png',
    './img/1_Sharkie/6_dead/1_Poisoned/5.png',
    './img/1_Sharkie/6_dead/1_Poisoned/6.png',
    './img/1_Sharkie/6_dead/1_Poisoned/7.png',
    './img/1_Sharkie/6_dead/1_Poisoned/8.png',
    './img/1_Sharkie/6_dead/1_Poisoned/9.png',
    './img/1_Sharkie/6_dead/1_Poisoned/10.png',
    './img/1_Sharkie/6_dead/1_Poisoned/11.png',
    './img/1_Sharkie/6_dead/1_Poisoned/12.png',
  ];

  constructor() {
    super();
    this.hasDied = false;
    this.loadImage('./img/1_Sharkie/1_IDLE/1.png');
    this.loadImages(this.IMAGES_STAND);
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_DEAD);
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
      if (this.isDead && !this.hasDied) {
        this.deadAnimation();
        this.hasDied = true;
      } else if (!this.isDead() && this.isMoving()) {
        this.swimAnimation();
      } else if (!this.isDead()) {
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