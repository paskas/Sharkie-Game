class PufferFishManager extends MovableObject {
  currentAnimation = null;
  animationInterval = null;
  animationLoopInterval = null;
  movePufferInterval = null;
  isTransition = false;
  isBubbleActive = false;
  hasStarted = false;

  constructor(world, images, speed) {
    super();
    this.world = world;
    this.height = 110;
    this.width = 140;

    this.speed = speed;
    this.poisoned = true;
    this.canDealDmg = true;
    this.bubbleLife = 2;

    this.IMAGES_SWIM = images.swim;
    this.IMAGES_BUBBLESWIM = images.bubbleswim;
    this.IMAGES_TRANSITION = images.transition;
    this.IMAGES_DEAD = images.dead;

    this.img = new Image();
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_BUBBLESWIM);
    this.loadImages(this.IMAGES_TRANSITION);
  }

  start() {
    if (this.hasStarted) return;
    this.clearAllIntervals();
    this.hasStarted = true;
    this.animate();
  }

  initPosition() {
    this.x = this.world.gameHelper.findFreeCoordinate(
      this.width + 250, 500, 3640, 50,
      EnemyPositionManager.isXAvailable,
      EnemyPositionManager.registerX
    );
    this.y = this.world.gameHelper.findFreeCoordinate(
      this.height + 10, 40, 380, 30,
      EnemyPositionManager.isYAvailable,
      EnemyPositionManager.registerY
    );
  }

  animate() {
    this.animationLoop();
    this.movePuffer();
  }

  movePuffer() {
    if (this.movePufferInterval) return;
    this.movePufferInterval = setInterval(() => {
      if (!this.dead) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  clearMovePufferInterval() {
    if (this.movePufferInterval) {
      clearInterval(this.movePufferInterval);
      this.movePufferInterval = null;
    }
  }

  animationLoop() {
    if (this.animationLoopInterval) return;
    this.animationLoopInterval = setInterval(() => {
      if (this.dead || !this.world?.character) return;
      let distance = Math.abs(this.x - this.world.character.x);
      if (distance < 500 && this.currentAnimation !== 'bubbleswim') {
        this.startTransitionAndBubbleswim();
      } else if (distance >= 500 && this.currentAnimation !== 'transition-back' && this.currentAnimation !== 'swim') {
        this.startTransitionBackToSwim();
      }
    }, 200);
  }

  clearAnimationLoopInterval() {
    if (this.animationLoopInterval) {
      clearInterval(this.animationLoopInterval);
      this.animationLoopInterval = null;
    }
  }

  startTransitionAndBubbleswim() {
    if (this.dead || this.isTransition || this.currentAnimation === 'bubbleswim') return;
    this.clearAnimationInterval();
    this.currentAnimation = 'bubbleswim';
    this.isTransition = true;
    this.playAnimationOnce(this.IMAGES_TRANSITION, () => {
      if (this.dead) return;
      this.isTransition = false;
      this.isBubbleActive = true;
      this.setAnimationLoop(this.IMAGES_BUBBLESWIM, 'bubbleswim');
    }, 100);
  }

  startTransitionBackToSwim() {
    if (this.dead || this.isTransition) return;
    this.clearAnimationInterval();
    this.currentAnimation = 'transition-back';
    this.isTransition = true;
    const reversedTransition = this.IMAGES_TRANSITION.slice().reverse();
    this.playAnimationOnce(reversedTransition, () => {
      if (this.dead) return;
      this.isTransition = false;
      this.isBubbleActive = false;
      this.currentAnimation = 'swim';
      this.setAnimationLoop(this.IMAGES_SWIM, 'swim');
    }, 100);
  }

  setAnimationLoop(images, status) {
    if (this.animationInterval) return;
    this.animationInterval = setInterval(() => {
      if (this.dead) return;
      this.playAnimation(images);
      this.currentAnimation = status;
    }, 200);
  }

  clearAnimationInterval() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  clearAllIntervals() {
    this.clearAnimationInterval();
    this.clearAnimationLoopInterval();
    this.clearMovePufferInterval();
    this.hasStarted = false;
  }

  continueAllIntervals() {
    this.clearAllIntervals();
    this.animationLoop();
    this.movePuffer();
  }
}