class Character extends MovableObject {
  x = 0;
  y = 200;
  height = 260;
  width = 240;
  speed = 6;
  rotationAngle = 0;
  world;
  isShooting = false;
  lastShootTime = Date.now();
  canShootAgain = true;
  shootPoisend = false;
  isPoisendByHit = false;
  isShockByHit = false;
  static life = 5;

  IMAGES_FLOATING = [
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

  IMAGES_SHOOT = [
    './img/character/attack/bubble_trap/attack_bubbles/1.png',
    './img/character/attack/bubble_trap/attack_bubbles/2.png',
    './img/character/attack/bubble_trap/attack_bubbles/3.png',
    './img/character/attack/bubble_trap/attack_bubbles/4.png',
    './img/character/attack/bubble_trap/attack_bubbles/5.png',
    './img/character/attack/bubble_trap/attack_bubbles/6.png',
    './img/character/attack/bubble_trap/attack_bubbles/7.png',
    './img/character/attack/bubble_trap/attack_bubbles/8.png',
  ];

  IMAGES_SHOOTPOISEN = [
    './img/character/attack/bubble_trap/attack_poisen_bubbles/1.png',
    './img/character/attack/bubble_trap/attack_poisen_bubbles/2.png',
    './img/character/attack/bubble_trap/attack_poisen_bubbles/3.png',
    './img/character/attack/bubble_trap/attack_poisen_bubbles/4.png',
    './img/character/attack/bubble_trap/attack_poisen_bubbles/5.png',
    './img/character/attack/bubble_trap/attack_poisen_bubbles/6.png',
    './img/character/attack/bubble_trap/attack_poisen_bubbles/7.png',
    './img/character/attack/bubble_trap/attack_poisen_bubbles/8.png',
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

  IMAGES_DEAD = [
    './img/character/dead/default_options/animated_horizontal/1.png',
    './img/character/dead/default_options/animated_horizontal/2.png',
    './img/character/dead/default_options/animated_horizontal/3.png',
    './img/character/dead/default_options/animated_horizontal/4.png',
    './img/character/dead/default_options/animated_horizontal/5.png',
    './img/character/dead/default_options/animated_horizontal/6.png'
  ];

  constructor() {
    super();
    
    this.img = new Image();
    this.loadImages(this.IMAGES_FLOATING);
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_POISEND);
    this.loadImages(this.IMAGES_SHOCK);
    this.loadImages(this.IMAGES_SHOOT);
    this.loadImages(this.IMAGES_SHOOTPOISEN);

    this.animate();
    // this.applyGravity();
  }

  animate() {
    this.runMovement();
    this.runAnimation();
    this.runShoot()
  }

  runMovement() {
    setInterval(() => {
      if (!this.world) return;
      const kb = this.world.keyboard;
      const { targetX, targetY } = this.updateNextPosition(kb);
      this.handleCollisionAndMove(targetX, targetY);
      this.updateRotationAngle(kb);
      this.moveCamera();
    }, 1000 / 60);
  }

  updateNextPosition(kb) {
    const w = this.world;
    let targetX = this.x;
    let targetY = this.y;
    if (kb.RIGHT && this.x + this.width < w.level.level_end_x) targetX += this.speed;
    if (kb.LEFT && this.x > 0) targetX -= this.speed;
    if (kb.UP && this.y > w.level.level_top_y) targetY -= this.speed;
    if (kb.DOWN && this.y < w.level.level_bottom_y) targetY += this.speed;
    return { targetX, targetY };
  }

  handleCollisionAndMove(targetX, targetY) {
    const blockingObjects = this.getBlockingObjects();
    if (!this.world.isCollidingWithObject(targetX, targetY, blockingObjects)) {
      this.x = targetX;
      this.y = targetY;
    }
  }

  getBlockingObjects() {
    if (!this.world || !this.world.level) return [];
    return [
      ...this.world.level.barrier,
    ];
  }

  updateRotationAngle(kb) {
    if (kb.UP || kb.DOWN) {
      this.rotationAngle = kb.UP ? -15 : 15;
    } else {
      this.rotationAngle = 0;
    }
  }

  moveCamera() {
    let cameraTargetX = this.calcCameraX();
    let distance = cameraTargetX - this.world.camera_x;
    let step = this.calcCameraSteps(distance);
    this.updateCameraPosition(distance, step);
  }

  calcCameraX() {
    let cameraTargetX = -this.x + 100;
    let minCameraX = -this.world.level.level_end_x + this.world.canvas.width;
    cameraTargetX = Math.max(minCameraX, Math.min(cameraTargetX, 0));
    return cameraTargetX;
  }

  calcCameraSteps(distance) {
    let maxStep = 15;
    let absDistance = Math.abs(distance);
    let t = Math.min(absDistance / 100, 1);
    t = t * t * (3 - 2 * t);
    return maxStep * t;
  }

  updateCameraPosition(distance, step) {
    let minCameraX = -this.world.level.level_end_x + this.world.canvas.width;
    this.world.camera_x += Math.sign(distance) * step;
    this.world.camera_x = Math.round(this.world.camera_x);
    this.world.camera_x = Math.max(minCameraX, Math.min(this.world.camera_x, 0));
  }

  runAnimation() {
    setInterval(() => {
      if (this.isShooting) return;
      if (this.isDead()) {
        this.deadAnimation();
      } else if (this.isInDamagePhase() && this.isPoisendByHit) {
        this.poisendAnimation();
      } else if (this.isInDamagePhase() && this.isShockByHit) {
        this.shockAnimation();
      } else if (this.isMoving()) {
        this.swimAnimation();
      } else {
        this.idleAnimation();
      }
    }, 100);
  }

  runShoot() {
    let shootKeyReleased = true;
    setInterval(() => {
      if (!this.world) return;
      const kb = this.world.keyboard;
      if (!kb.SHOOT) {
        shootKeyReleased = true;
      }
      if (kb.SHOOT && shootKeyReleased && !this.isShooting) {
        shootKeyReleased = false;
        this.startShootingSequence();
      }
    }, 1000 / 60);
  }

  startShootingSequence() {
    this.isShooting = true;
    const images = this.poisend ? this.IMAGES_SHOOTPOISEN : this.IMAGES_SHOOT;
    const duration = images.length * 100;
    this.overrideAnimation(images);
    setTimeout(() => {
      this.shootBubble();
      this.lastShootTime = Date.now();
      this.isShooting = false;
    }, duration);
  }

  overrideAnimation(images) {
    let i = 0;
    const interval = setInterval(() => {
      this.img = this.imageCache[images[i]];
      i++;
      if (i >= images.length) {
        clearInterval(interval);
      }
    }, 100);
  }

  shootBubble() {
    if (!this.world || !this.world.shootingObject) return;
    const x = this.otherDirection ? this.x : this.x + this.width - 50;
    const y = this.y + this.height / 2;
    const bubble = new ShootingObject(this, x, y, this.otherDirection, this.shootPoisend);
    this.world.shootingObject.push(bubble);
  }

  idleAnimation() {
    this.playAnimation(this.IMAGES_FLOATING);
  }

  swimAnimation() {
    this.playAnimation(this.IMAGES_SWIM);
  }

  shootAnimation() {
    this.playAnimation(this.IMAGES_SHOOT);
  }

  shootPoisenAnimation() {
    this.playAnimation(this.IMAGES_SHOOT);
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