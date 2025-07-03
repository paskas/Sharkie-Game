class PufferFishGreen extends MovableObject {
  height = 110;
  width = 140;
  poisend = true;
  currentAnimation = null;
  animationInterval = null;

  IMAGES_SWIM = [
    './img/enemies/puffer_fish(3_options)/swim/swim_green1.png',
    './img/enemies/puffer_fish(3_options)/swim/swim_green2.png',
    './img/enemies/puffer_fish(3_options)/swim/swim_green3.png',
    './img/enemies/puffer_fish(3_options)/swim/swim_green4.png',
    './img/enemies/puffer_fish(3_options)/swim/swim_green5.png'
  ];

  IMAGES_BUBBLESWIM = [
    './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_green1.png',
    './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_green2.png',
    './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_green3.png',
    './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_green4.png',
    './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_green5.png'
  ];

  IMAGES_TRANSITION = [
    './img/enemies/puffer_fish(3_options)/transition/transition_green1.png',
    './img/enemies/puffer_fish(3_options)/transition/transition_green2.png',
    './img/enemies/puffer_fish(3_options)/transition/transition_green3.png',
    './img/enemies/puffer_fish(3_options)/transition/transition_green4.png',
    './img/enemies/puffer_fish(3_options)/transition/transition_green5.png'
  ];

  IMAGES_DEAD = [
    './img/enemies/puffer_fish(3_options)/dead/dead_green2.png',
    './img/enemies/puffer_fish(3_options)/dead/dead_green3.png'
  ];

  constructor() {
    super();
    this.x = this.findFreeCoordinate(
      this.width + 250,
      500,
      3640,
      50,
      EnemyPositionManager.isXAvailable,
      EnemyPositionManager.registerX
    );

    this.y = this.findFreeCoordinate(
      this.height + 10,
      40,
      380,
      30,
      EnemyPositionManager.isYAvailable,
      EnemyPositionManager.registerY
    );
    this.speed = 0.25;

    this.loadImage('./img/enemies/puffer_fish(3_options)/swim/swim_green1.png');
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_BUBBLESWIM);
    this.loadImages(this.IMAGES_TRANSITION);
    this.animate();
  }

  animate() {
    this.animationLoop();
    this.movePuffer();
  }

  movePuffer() {
    setInterval(() => {
      if (!this.dead) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  animationLoop() {
    setInterval(() => {
      if (this.dead || !this.world?.character) return;
      let distance = Math.abs(this.x - this.world.character.x);
      if (distance < 500 && this.currentAnimation !== 'bubbleswim') {
        this.startTransitionAndBubbleswim();
      } else if (distance >= 500 && this.currentAnimation !== 'transition-back' && this.currentAnimation !== 'swim') {
        this.startTransitionBackToSwim();
      }
    }, 200);
  }

  startTransitionAndBubbleswim() {
    this.clearAnimationInterval();
    this.currentAnimation = 'bubbleswim';
    this.playAnimationOnce(this.IMAGES_TRANSITION, () => {
      this.animationInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_BUBBLESWIM);
      }, 200);
    }, 100);
  }

  startTransitionBackToSwim() {
    this.clearAnimationInterval();
    this.currentAnimation = 'transition-back';
    const reversedTransition = this.IMAGES_TRANSITION.slice().reverse();
    this.playAnimationOnce(reversedTransition, () => {
      this.currentAnimation = 'swim';
      this.animationInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_SWIM);
      }, 200);
    }, 100);
  }

  clearAnimationInterval() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  ifDead() {
    if (this.dead) {
      this.clearAnimationInterval();
      this.playAnimationOnce(this.IMAGES_DEAD, () => {
        this.ifDeadMoveUp();
      }, 100);
    }
  }
}