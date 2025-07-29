class Character extends MovableObject {
  x = 0;
  y = 200;
  height = 260;
  width = 240;
  rotationAngle = 0;
  speed = 300;
  cameraStepPerSecond = 300;
  world;

  characterLoopId = null;
  animationInterval = null;
  currentAnimation = null;
  lastFrameTime = 0;

  untilSleep = 8000;
  sleepStartTime = Date.now();
  isSleeping = false;
  sleepTimeout = null;

  isShooting = false;
  shootPoisend = false;
  shootKeyReleased = true;
  poisonShootKeyReleased = true;
  currentShotPoisoned = false;
  shootTimeout = null;

  isPoisendByHit = false;
  isShockByHit = false;
  lastShootTime = Date.now();
  dmgTimeout = null;

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
  }

  startCharacterLoop() {
    if (!this.world) return;
    this.lastFrameTime = 0;
    const loop = (time) => {
      if (!this.world || this.dead) return;
      const frameTime = CharacterHelper.calculateDeltaTime(this, time);
      this.updateFrameState(frameTime);
      this.characterLoopId = requestAnimationFrame(loop);
    };
    this.characterLoopId = requestAnimationFrame(loop);
  }

  updateFrameState(frameTime) {
    this.updateMovement(frameTime);
    this.updateShoot();
    this.resolveAnimationStatus();
    CharacterCamMove.moveCamera(this, this.world, frameTime);
  }

  resolveAnimationStatus() {
    if (this.dead) return;
    if (this.isInDamagePhase()) {
      this.startDamageAnimation();
      return;
    }
    if (this.isShooting) {
      CharacterHelper.setAnimationIfNew(this, 'shoot', () => this.shootAnimation());
      return;
    }
    if (CharacterHelper.isMoving(this, this.world.keyboard)) {
      CharacterHelper.setAnimationIfNew(this, 'swim', () => this.swimAnimation());
      return;
    }
    if (CharacterHelper.startSleepTimer(this.sleepStartTime, this.untilSleep)) {
      this.startSleepAnimation();
    } else {
      CharacterHelper.setAnimationIfNew(this, 'idle', () => this.idleAnimation());
    }
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

  startDamageAnimation() {
    this.setAnimation('damage', () => {
      if (this.isShockByHit) this.shockAnimation();
      else if (this.isPoisendByHit) this.poisonedAnimation();
    }, 140);
    this.dmgTimeout = setTimeout(() => {
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

  updateMovement(frameTime) {
    const kb = this.world.keyboard;
    if (CharacterHelper.isMoving(this, kb)) CharacterHelper.resetSleepStatus(this);
    const { targetX, targetY } = this.updateNextPosition(kb, frameTime);
    this.handleCollisionAndMove(targetX, targetY);
    this.updateRotationAngle(kb);
  }

  updateNextPosition(kb, frameTime) {
    const w = this.world;
    let targetX = this.x;
    let targetY = this.y;
    let distance = this.speed * frameTime;
    if (kb.RIGHT && this.x + this.width < w.level.level_end_x) targetX += distance;
    if (kb.LEFT && this.x > 0) targetX -= distance;
    if (kb.UP && this.y > w.level.level_top_y) targetY -= distance;
    if (kb.DOWN && this.y < w.level.level_bottom_y) targetY += distance;
    return { targetX, targetY };
  }

  handleCollisionAndMove(targetX, targetY) {
    const blockingObjects = CharacterHelper.getBlockingObjects(this.world);
    if (!this.world.gameHelper.isCollidingWithObject(targetX, targetY, blockingObjects)) {
      this.x = targetX;
      this.y = targetY;
    }
  }

  updateRotationAngle(kb) {
    if (kb.UP || kb.DOWN) {
      this.rotationAngle = kb.UP ? -15 : 15;
    } else {
      this.rotationAngle = 0;
    }
  }

  updateShoot() {
    const kb = this.world.keyboard;
    if (!this.isInDamagePhase()) {
      this.triggerBubbleShoot(kb);
      this.triggerPoisenBubbleShoot(kb);
    }
  }

  triggerBubbleShoot(kb) {
    if (!kb.SHOOT) this.shootKeyReleased = true;
    if (kb.SHOOT && this.shootKeyReleased && !this.isShooting) {
      this.shootKeyReleased = false;
      CharacterHelper.resetSleepStatus(this);
      this.startShootingSequence(false);
    }
  }

  triggerPoisenBubbleShoot(kb) {
    if (!kb.POISENSHOOT) this.poisonShootKeyReleased = true;
    if (kb.POISENSHOOT && this.poisonShootKeyReleased && !this.isShooting && this.shootPoisend) {
      this.poisonShootKeyReleased = false;
      CharacterHelper.resetSleepStatus(this);
      this.startShootingSequence(true);
    }
  }

  startShootingSequence(isPoisendShoot) {
    this.isShooting = true;
    this.currentShotPoisoned = isPoisendShoot;
    const shootFrames = isPoisendShoot ? this.IMAGES_SHOOTPOISEN.length : this.IMAGES_SHOOT.length;
    const frameDuration = 120;
    const duration = shootFrames * frameDuration;
    this.shootTimeout = setTimeout(() => {
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

  clearAnimationInterval() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  clearAllIntervals() {
    this.clearAnimationInterval();
    if (this.characterLoopId) {
      cancelAnimationFrame(this.characterLoopId);
      this.characterLoopId = null;
    }
    if (this.sleepTimeout) {
      clearTimeout(this.sleepTimeout);
      this.sleepTimeout = null;
    }
    if (this.dmgTimeout) {
      clearTimeout(this.dmgTimeout);
      this.dmgTimeout = null;
    }
    if (this.shootTimeout) {
      clearTimeout(this.shootTimeout);
      this.shootTimeout = null;
    }
  }

  continueAllIntervals() {
    this.clearAllIntervals();
    this.startCharacterLoop();
  }
}