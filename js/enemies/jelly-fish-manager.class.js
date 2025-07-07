class JellyFishManager extends MovableObject {
  animationInterval = null;

  constructor(world, images, x, speed) {
    super();
    this.world = world;
    this.height = 140;
    this.width = 100;
    this.x = x;

    this.speed = speed;
    this.shock = true;
    this.canDealDmg = true;

    this.IMAGES_DEFAULT = images.default;
    this.IMAGES_DEAD = images.defaultDead;

    this.img = new Image();
    this.loadImages(this.IMAGES_DEFAULT);
    this.loadImages(this.IMAGES_DEAD);

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
    this.animationLoop();
    this.moveUpAndDown();
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
}