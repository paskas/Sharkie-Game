class PufferFishRed extends MovableObject {
  height = 110;
  width = 140;
  poisend = true;

  IMAGES_SWIM = [
    './img/enemies/puffer_fish(3_options)/swim/swim_red1.png',
    './img/enemies/puffer_fish(3_options)/swim/swim_red2.png',
    './img/enemies/puffer_fish(3_options)/swim/swim_red3.png',
    './img/enemies/puffer_fish(3_options)/swim/swim_red4.png',
    './img/enemies/puffer_fish(3_options)/swim/swim_red5.png'
  ];

  IMAGES_BUBBLESWIM = [
    './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_red1.png',
    './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_red2.png',
    './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_red3.png',
    './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_red4.png',
    './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_red5.png'
  ];

  IMAGES_TRANSITION = [
    './img/enemies/puffer_fish(3_options)/transition/transition_red1.png',
    './img/enemies/puffer_fish(3_options)/transition/transition_red2.png',
    './img/enemies/puffer_fish(3_options)/transition/transition_red3.png',
    './img/enemies/puffer_fish(3_options)/transition/transition_red4.png',
    './img/enemies/puffer_fish(3_options)/transition/transition_red5.png'
  ];

  IMAGES_DEAD = [
    './img/enemies/puffer_fish(3_options)/dead/dead_red1.png',
    './img/enemies/puffer_fish(3_options)/dead/dead_red2.png',
    './img/enemies/puffer_fish(3_options)/dead/dead_red3.png'
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
    this.speed = 0.30 + Math.random() * 0.5;

    this.loadImage('./img/enemies/puffer_fish(3_options)/swim/swim_green1.png');
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }

  animate() {
    this.animationLoop();
    this.movePuffer();
    this.ifDead();
  }

  animationLoop() {
    this.swimPuffer();
  }

  movePuffer() {
    setInterval(() => {
      if (!this.dead) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  swimPuffer() {
    setInterval(() => {
      if (!this.dead) {
        this.playAnimation(this.IMAGES_SWIM);
      }
    }, 200);
  }

  ifDead() {
    this.playAnimationOnce(this.IMAGES_DEAD, () => {
      this.ifDeadMoveUp();
    }, 100);
  }
}