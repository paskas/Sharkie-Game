class PufferFish extends MovableObject {
  height = 110;
  width = 140;
  poisend = true;
  static usedX = [];
  static usedY = [];

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
    this.y = this.generateYWithDistance();
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
    const interval = 50;
    const enemiesX = [];
    for (let x = minX; x <= maxX; x += interval) {
      const tooClose = PufferFish.usedX.some(existingX => Math.abs(existingX - x) < minDistance);
      if (!tooClose) {
        enemiesX.push(x);
      }
    }
    if (enemiesX.length === 0) {
      return maxX;
    }
    const x = enemiesX[Math.floor(Math.random() * enemiesX.length)];
    PufferFish.usedX.push(x);
    return x;
  }

  /**
   * Generates a random y-position within a defined vertical range while maintaining
   * a minimum distance from all previously used y-positions to prevent overlapping enemies.
   *
   * @param {number} [minDistance=this.height + 20] - Minimum vertical distance from existing y-positions.
   * @param {number} [minY=80] - Minimum y-coordinate allowed.
   * @param {number} [maxY=320] - Maximum y-coordinate allowed.
   * @returns {number} - A valid y-position that satisfies the spacing constraint.
   */
  generateYWithDistance(minDistance = this.height + 20, minY = 80, maxY = 320) {
    const interval = 50;
    const enemiesY = [];
    for (let y = minY; y <= maxY; y += interval) {
      const tooClose = PufferFish.usedY.some(existingY => Math.abs(existingY - y) < minDistance);
      if (!tooClose) {
        enemiesY.push(y);
      }
    }
    if (enemiesY.length === 0) {
      return maxY;
    }
    const y = enemiesY[Math.floor(Math.random() * enemiesY.length)];
    PufferFish.usedY.push(y);
    return y;
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