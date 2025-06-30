class PufferFishOrange extends MovableObject {
  height = 110;
  width = 140;
  poisend = true;

  IMAGES_SWIM = [
    './img/enemies/puffer_fish(3_options)/swim/swim_orange1.png',
    './img/enemies/puffer_fish(3_options)/swim/swim_orange2.png',
    './img/enemies/puffer_fish(3_options)/swim/swim_orange3.png',
    './img/enemies/puffer_fish(3_options)/swim/swim_orange4.png',
    './img/enemies/puffer_fish(3_options)/swim/swim_orange5.png'
  ];

  IMAGES_BUBBLESWIM = [
    './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_orange1.png',
    './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_orange2.png',
    './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_orange3.png',
    './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_orange4.png',
    './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_orange5.png'
  ];

  IMAGES_TRANSITION = [
    './img/enemies/puffer_fish(3_options)/transition/transition_orange1.png',
    './img/enemies/puffer_fish(3_options)/transition/transition_orange2.png',
    './img/enemies/puffer_fish(3_options)/transition/transition_orange3.png',
    './img/enemies/puffer_fish(3_options)/transition/transition_orange4.png',
    './img/enemies/puffer_fish(3_options)/transition/transition_orange5.png'
  ];

  IMAGES_DEAD = [
    './img/enemies/puffer_fish(3_options)/dead/dead_orange1.png',
    './img/enemies/puffer_fish(3_options)/dead/dead_orange2.png',
    './img/enemies/puffer_fish(3_options)/dead/dead_orange3.png'
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
    this.speed = 0.25 + Math.random() * 0.5;

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
    setTimeout(() => {
      setInterval(() => {
        if (this.dead) {
          this.playAnimation(this.IMAGES_DEAD)
          this.ifDeadMoveUp();
        }
      }, 1000 / 5);
    }, 50);
  }
}