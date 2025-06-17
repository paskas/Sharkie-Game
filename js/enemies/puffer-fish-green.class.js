class PufferFishGreen extends MovableObject {
  height = 110;
  width = 140;
  poisend = true;

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
    './img/enemies/puffer_fish(3_options)/dead/dead_green1.png',
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
    this.speed = 0.15 + Math.random() * 0.3;

    this.loadImage('./img/enemies/puffer_fish(3_options)/swim/swim_green1.png');
    this.loadImages(this.IMAGES_SWIM);
    this.animate();
  }

  animate() {
    this.animationLoop();
    this.movePuffer();
  }

  movePuffer() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  animationLoop() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_SWIM)
    }, 200);
  }

  checkIfDead() {

  }
}