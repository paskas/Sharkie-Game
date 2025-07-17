class Character extends MovableObject {
  x = 0;
  y = 200;
  height = 260;
  width = 240;
  rotationAngle = 0;
  speed = 6;
  world;

  animationInterval = null;
  currentAnimation = null;
  untilSleep = 8000;
  sleepStartTime = Date.now();
  isSleeping = false;
  sleepTimeout = null;

  isShooting = false;
  shootPoisend = false;
  shootKeyReleased = true;
  poisonShootKeyReleased = true;
  currentShotPoisoned = false;
  isPoisendByHit = false;
  isShockByHit = false;
  lastShootTime = Date.now();

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

  IMAGES_INITSLEEP = [
    './img/character/long_idle/1.png',
    './img/character/long_idle/2.png',
    './img/character/long_idle/3.png',
    './img/character/long_idle/4.png',
    './img/character/long_idle/5.png',
    './img/character/long_idle/6.png',
    './img/character/long_idle/7.png',
    './img/character/long_idle/8.png',
    './img/character/long_idle/9.png',
    './img/character/long_idle/10.png',
    './img/character/long_idle/11.png',
    './img/character/long_idle/12.png',
    './img/character/long_idle/13.png',
    './img/character/long_idle/14.png'
  ];

  IMAGES_SLEEP = [
    './img/character/long_idle/11.png',
    './img/character/long_idle/12.png',
    './img/character/long_idle/13.png',
    './img/character/long_idle/14.png'
  ];

  IMAGES_SHOOT = [
    './img/character/attack/bubble_trap/attack_bubbles/1.png',
    './img/character/attack/bubble_trap/attack_bubbles/2.png',
    './img/character/attack/bubble_trap/attack_bubbles/3.png',
    './img/character/attack/bubble_trap/attack_bubbles/4.png',
    './img/character/attack/bubble_trap/attack_bubbles/5.png',
    './img/character/attack/bubble_trap/attack_bubbles/6.png',
    './img/character/attack/bubble_trap/attack_bubbles/7.png',
    './img/character/attack/bubble_trap/attack_bubbles/8.png'
  ];

  IMAGES_SHOOTPOISEN = [
    './img/character/attack/bubble_trap/attack_poison_bubbles/1.png',
    './img/character/attack/bubble_trap/attack_poison_bubbles/2.png',
    './img/character/attack/bubble_trap/attack_poison_bubbles/3.png',
    './img/character/attack/bubble_trap/attack_poison_bubbles/4.png',
    './img/character/attack/bubble_trap/attack_poison_bubbles/5.png',
    './img/character/attack/bubble_trap/attack_poison_bubbles/6.png',
    './img/character/attack/bubble_trap/attack_poison_bubbles/7.png',
    './img/character/attack/bubble_trap/attack_poison_bubbles/8.png'
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

  constructor(world) {
    super();
    this.world = world;
    this.loadImages(this.IMAGES_FLOATING);
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_INITSLEEP);
    this.loadImages(this.IMAGES_SLEEP);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_POISEND);
    this.loadImages(this.IMAGES_SHOCK);
    this.loadImages(this.IMAGES_SHOOT);
    this.loadImages(this.IMAGES_SHOOTPOISEN);

    this.img = this.imageCache[this.IMAGES_FLOATING[0]];

    this.runAnimate();
    this.runMovement();
    this.runShoot();
  }

  runAnimate() {
    setInterval(() => {
      this.resolveAnimationStatus();
    }, 1000 / 60);
  }

  resolveAnimationStatus() {
    if (this.dead) return;
    if (this.isInDamagePhase()) {
      if (this.currentAnimation !== 'damage') this.startDamageAnimation();
      return;
    }
    if (this.isShooting) {
      if (this.currentAnimation !== 'shoot') this.startShootAnimation();
      return;
    }
    if (this.isMoving()) {
      if (this.currentAnimation !== 'swim') this.startSwimAnimation();
      return;
    }
    if (this.startSleepTimer()) {
      if (this.currentAnimation !== 'sleep') this.startSleepAnimation();
    } else {
      if (this.currentAnimation !== 'idle') this.startIdleAnimation();
    }
  }

  startSleepTimer() {
    return Date.now() - this.sleepStartTime > this.untilSleep;
  }

  resetSleepStatus() {
    this.sleepStartTime = Date.now();
    if (this.sleepTimeout) {
      clearTimeout(this.sleepTimeout)
      this.sleepTimeout = null;
    }
    if (this.isSleeping) {
      this.isSleeping = false;
    }
  }

  startIdleAnimation() {
    this.setAnimation('idle', () => this.idleAnimation(), 140);
  }

  startSwimAnimation() {
    this.setAnimation('swim', () => this.swimAnimation(), 100);
  }

  startSleepAnimation() {
    if (this.sleepTimeout || this.isSleeping) return;
    this.setAnimation('initSleep', () => this.initSleepAnimation(), 140);
    this.sleepTimeout = setTimeout(() => {
      this.isSleeping = true;
      this.setAnimation('sleep', () => this.sleepAnimation(), 200);
      this.sleepTimeout = null;
    }, this.IMAGES_INITSLEEP.length * 140);
  }

  startShootAnimation() {
    this.setAnimation('shoot', () => this.shootAnimation(), 100);
  }

  startDamageAnimation() {
    this.setAnimation('damage', () => {
      if (this.isShockByHit) this.shockAnimation();
      else if (this.isPoisendByHit) this.poisonedAnimation();
    }, 140);
    setTimeout(() => {
      this.isShockByHit = false;
      this.isPoisendByHit = false;
    }, 800);
  }

  idleAnimation() {
    this.playAnimation(this.IMAGES_FLOATING);
  }

  swimAnimation() {
    this.playAnimation(this.IMAGES_SWIM);
  }

  initSleepAnimation() {
    this.playAnimation(this.IMAGES_INITSLEEP);
  }

  sleepAnimation() {
    this.playAnimation(this.IMAGES_SLEEP);
  }

  shootAnimation() {
    const images = this.currentShotPoisoned ? this.IMAGES_SHOOTPOISEN : this.IMAGES_SHOOT;
    this.playAnimation(images);
  }

  poisonedAnimation() {
    this.playAnimation(this.IMAGES_POISEND);
  }

  shockAnimation() {
    this.playAnimation(this.IMAGES_SHOCK);
  }

  setAnimation(mode, animationStep, animationSpeed) {
    if (this.currentAnimation === mode) return;
    this.clearAnimationInterval();
    this.currentImage = 0;
    this.currentAnimation = mode;
    this.animationInterval = setInterval(animationStep, animationSpeed);
  }

  clearAnimationInterval() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  runMovement() {
    setInterval(() => {
      if (!this.world || this.dead) return;
      const kb = this.world.keyboard;
      if (kb.RIGHT || kb.LEFT || kb.UP || kb.DOWN) this.resetSleepStatus();
      const { targetX, targetY } = this.updateNextPosition(kb);
      this.handleCollisionAndMove(targetX, targetY);
      this.updateRotationAngle(kb);
      this.moveCamera();
    }, 1000 / 60);
  }

  isMoving() {
    const kb = this.world.keyboard;
    if (kb.LEFT) this.otherDirection = true;
    if (kb.RIGHT) this.otherDirection = false;
    return kb.RIGHT || kb.LEFT || kb.UP || kb.DOWN;
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
    if (!this.world.gameHelper.isCollidingWithObject(targetX, targetY, blockingObjects)) {
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

  runShoot() {
    setInterval(() => {
      if (!this.world || this.dead || this.isInDamagePhase()) return;
      const kb = this.world.keyboard;
      this.triggerBubbleShoot(kb);
      this.triggerPoisenBubbleShoot(kb);
    }, 1000 / 60);
  }

  triggerBubbleShoot(kb) {
    if (!kb.SHOOT) this.shootKeyReleased = true;
    if (kb.SHOOT && this.shootKeyReleased && !this.isShooting) {
      this.shootKeyReleased = false;
      this.resetSleepStatus();
      this.startShootingSequence(false);
    }
  }

  triggerPoisenBubbleShoot(kb) {
    if (!kb.POISENSHOOT) this.poisonShootKeyReleased = true;
    if (kb.POISENSHOOT && this.poisonShootKeyReleased && !this.isShooting && this.shootPoisend) {
      this.poisonShootKeyReleased = false;
      this.resetSleepStatus();
      this.startShootingSequence(true);
    }
  }

  startShootingSequence(isPoisendShoot) {
    this.isShooting = true;
    this.currentShotPoisoned = isPoisendShoot;
    const shootFrames = isPoisendShoot ? this.IMAGES_SHOOTPOISEN.length : this.IMAGES_SHOOT.length;
    const duration = shootFrames * 120;
    setTimeout(() => {
      this.shootBubble(isPoisendShoot);
      this.lastShootTime = Date.now();
      this.isShooting = false;
    }, duration);
  }

  shootBubble(isPoisendShoot) {
    if (!this.world || !this.world.shootingObject) return;
    const x = this.otherDirection ? this.x : this.x + this.width - 50;
    const y = this.y + this.height / 2;
    const bubble = new ShootingObject(this, x, y, this.otherDirection, isPoisendShoot);
    this.world.shootingObject.push(bubble);
  }
}