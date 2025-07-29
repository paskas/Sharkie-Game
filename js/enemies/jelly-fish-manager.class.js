class JellyFishManager extends MovableObject {
  defaultAnimationInterval = null;
  electricTimerInterval = null;
  electricAnimationInterval = null;
  upAndDownInterval = null;
  currentAnimation = null;
  isElectricActive = false;
  hasStarted = false;

  constructor(world, images, x, speed) {
    super();
    this.world = world;
    this.height = 140;
    this.width = 100;
    this.x = x;

    this.speed = speed;
    this.shock = true;
    this.canDealDmg = true;
    this.shockLife = 2;

    this.IMAGES_DEFAULT = images.default;
    this.IMAGES_ELECTRIC = images.electric;
    this.IMAGES_DEAD = images.defaultDead;

    this.img = new Image();
    this.loadImages(this.IMAGES_DEFAULT);
    this.loadImages(this.IMAGES_ELECTRIC);
    this.loadImages(this.IMAGES_DEAD);
  }

  start() {
    if (this.hasStarted) return;
    this.clearAllIntervals();
    this.hasStarted = true;
    this.animate();
  }

  initPosition() {
    this.y = this.world.gameHelper.findFreeCoordinate(
      this.height + 10, 40, 380, 30,
      EnemyPositionManager.isYAvailable,
      EnemyPositionManager.registerY
    );
  }

  animate() {
    this.runDefaultAnimation();
    this.runElectricInterval();
    this.moveUpAndDown();
  }

  runDefaultAnimation() {
    this.clearDefaultAnimation();
    this.currentAnimation = 'default';
    if (this.defaultAnimationInterval) return;
    this.defaultAnimationInterval = setInterval(() => {
      if (!this.dead && !this.isElectricActive) {
        this.playAnimation(this.IMAGES_DEFAULT);
      }
    }, 200);
  }

  clearDefaultAnimation() {
    if (this.defaultAnimationInterval) {
      clearInterval(this.defaultAnimationInterval);
      this.defaultAnimationInterval = null;
    }
  }

  runElectricInterval() {
    if (this.electricTimerInterval) return;
    this.electricTimerInterval = setInterval(() => {
      if (this.dead || this.isElectricActive) return;
      this.triggerElectricAnimation();
    }, 4000);
  }

  clearElectricTimerInterval() {
    if (this.electricTimerInterval) {
      clearInterval(this.electricTimerInterval);
      this.electricTimerInterval = null;
    }
  }

  triggerElectricAnimation() {
    if (this.electricAnimationInterval) return;
    this.isElectricActive = true;
    this.clearDefaultAnimation();
    let frames = this.IMAGES_ELECTRIC.length;
    let loops = 0;
    this.currentAnimation = 'electric';
    this.electricAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ELECTRIC);
      loops++;
      if (loops >= 5 * frames) {
        clearInterval(this.electricAnimationInterval);
        this.electricAnimationInterval = null;
        this.isElectricActive = false;
        this.runDefaultAnimation();
      }
    }, 200);
  }

  clearElectricAnimation() {
    if (this.electricAnimationInterval) {
      clearInterval(this.electricAnimationInterval);
      this.electricAnimationInterval = null;
    }
  }

  moveUpAndDown() {
    if (this.upAndDownInterval) return;
    this.upAndDownInterval = setInterval(() => {
      if (this.upwards) {
        this.moveUp();
        if (this.y <= this.minY) {
          this.upwards = false;
        }
      } else {
        this.moveDown();
        if (this.y >= this.maxY) {
          this.upwards = true;
        }
      }
    }, 1000 / 60);
  }

  clearUpAndDownInterval() {
    if (this.upAndDownInterval) {
      clearInterval(this.upAndDownInterval);
      this.upAndDownInterval = null;
    }
  }

  clearJellyIntervals() { this.clearAllIntervals(); }

  clearAllIntervals() {
    this.clearDefaultAnimation();
    this.clearElectricAnimation();
    this.clearElectricTimerInterval();
    this.clearUpAndDownInterval();
    this.hasStarted = false;
  }

  continueAllIntervals() {
    this.clearAllIntervals();
    this.runDefaultAnimation();
    this.triggerElectricAnimation();
    this.runElectricInterval();
    this.moveUpAndDown();
  }
}