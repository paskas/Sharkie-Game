class JellyFishManager extends MovableObject {
  animationInterval = null;

  constructor(images, x, speed) {
    super();
    this.height = 140;
    this.width = 100;
    this.x = x;
    this.y = this.findFreeCoordinate(
      this.height + 10, 40, 380, 30,
      EnemyPositionManager.isYAvailable,
      EnemyPositionManager.registerY
    );

    this.shock = true;
    this.speed = speed;

    this.IMAGES_DEFAULT = images.default;
    this.IMAGES_DEFAULTDEAD = images.defaultDead;

    this.img = new Image();
    this.loadImages(this.IMAGES_DEFAULT);
    this.loadImages(this.IMAGES_DEFAULTDEAD);

    this.animate();
  }

  animate() {
    this.animationLoop();
    this.moveUpAndDown();
    this.ifDead();
  }

  animationLoop() {
    this.animationInterval = setInterval(() => {
      if (!this.dead) {
        this.playAnimation(this.IMAGES_DEFAULT)
      }
    }, 200);
  }
  
  clearAnimationInterval() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  ifDead() {
    setInterval(() => {
      if (this.dead) {
        this.playAnimation(this.IMAGES_DEFAULTDEAD)
        this.ifDeadMoveUp();
      }
    }, 200);
  }
}