class PufferFish extends MovableObject {
  static usedX = [];
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
    this.x = this.generateXWithDistance();
    this.y = 240;
    this.speed = 0.15 + Math.random() * 0.3;

    this.loadImage('./img/enemies/puffer_fish(3_options)/swim/swim_green1.png');
    this.loadImages(this.IMAGES_SWIM);
    this.animate();
  }

  animate() {
    this.animationLoop();
    this.movePuffer();
  }

  /**
   * Generates a random x-position within a defined range that keeps a minimum distance
   * from all previously used positions to avoid overlapping enemies.
   *
   * @param {number} [minDistance=this.width + 250] - Minimum distance to maintain from existing positions.
   * @param {number} [minX=500] - Minimum x-coordinate allowed.
   * @param {number} [maxX=3640] - Maximum x-coordinate allowed.
   * @returns {number} - A valid x-position that respects spacing constraints.
   */
  generateXWithDistance(minDistance = this.width + 250, minX = 500, maxX = 3640) {
    const step = 50;
    const enemy = [];
    for (let x = minX; x <= maxX; x += step) {
      const tooClose = PufferFish.usedX.some(existingX => Math.abs(existingX - x) < minDistance);
      if (!tooClose) {
        enemy.push(x);
      }
    }
    if (enemy.length === 0) {
      return maxX;
    }
    const x = enemy[Math.floor(Math.random() * enemy.length)];
    PufferFish.usedX.push(x);
    return x;
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