/**
 * Controls the behavior and animation of electric jellyfish enemies.
 * Handles idle animation, electric attack phases, and vertical movement.
 * Inherits from MovableObject.
 */
class JellyFishManager extends MovableObject {
  defaultAnimationInterval = null;
  electricTimerInterval = null;
  electricAnimationInterval = null;
  upAndDownInterval = null;
  currentAnimation = null;
  isElectricActive = false;
  hasStarted = false;

  /**
   * Initializes a jellyfish with given position, speed, and animation frames.
   * 
   * @param {World} world - The game world reference.
   * @param {{default: string[], electric: string[], defaultDead: string[]}} images - Object containing animation image sets.
   * @param {number} x - Initial horizontal position.
   * @param {number} speed - Movement speed of the jellyfish.
   */
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

  /**
   * Starts the jellyfish logic if not already running.
   * Clears any previous intervals and begins animation behavior.
   */
  start() {
    if (this.hasStarted) return;
    this.clearAllIntervals();
    this.hasStarted = true;
    this.animate();
  }

  /**
   * Finds and sets a free vertical position for the jellyfish using EnemyPositionManager.
   */
  initPosition() {
    this.y = this.world.gameHelper.findFreeCoordinate(
      this.height + 10, 40, 380, 30,
      EnemyPositionManager.isYAvailable,
      EnemyPositionManager.registerY
    );
  }

  /**
   * Starts the default animation, electric interval timer, and vertical movement.
   */
  animate() {
    this.runDefaultAnimation();
    this.runElectricInterval();
    this.moveUpAndDown();
  }

  /**
   * Begins the idle animation loop for the jellyfish if not in electric mode.
   */
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

  /**
   * Clears the idle animation interval.
   */
  clearDefaultAnimation() {
    if (this.defaultAnimationInterval) {
      clearInterval(this.defaultAnimationInterval);
      this.defaultAnimationInterval = null;
    }
  }

  /**
   * Starts a repeating timer that occasionally triggers the electric attack animation.
   */
  runElectricInterval() {
    if (this.electricTimerInterval) return;
    this.electricTimerInterval = setInterval(() => {
      if (this.dead || this.isElectricActive) return;
      this.triggerElectricAnimation();
    }, 4000);
  }

  /**
   * Clears the electric trigger interval.
   */
  clearElectricTimerInterval() {
    if (this.electricTimerInterval) {
      clearInterval(this.electricTimerInterval);
      this.electricTimerInterval = null;
    }
  }

  /**
   * Triggers the electric shock animation sequence and returns to idle when done.
   */
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

  /**
   * Stops the electric animation interval if active.
   */
  clearElectricAnimation() {
    if (this.electricAnimationInterval) {
      clearInterval(this.electricAnimationInterval);
      this.electricAnimationInterval = null;
    }
  }

  /**
   * Starts a loop to move the jellyfish up and down within a set vertical range.
   */
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

  /**
   * Stops the vertical movement interval.
   */
  clearUpAndDownInterval() {
    if (this.upAndDownInterval) {
      clearInterval(this.upAndDownInterval);
      this.upAndDownInterval = null;
    }
  }

  /**
   * Alias method to clear all jellyfish-related intervals.
   */
  clearJellyIntervals() { this.clearAllIntervals(); }

  /**
   * Clears all animation, movement, and attack intervals for the jellyfish.
   */
  clearAllIntervals() {
    this.clearDefaultAnimation();
    this.clearElectricAnimation();
    this.clearElectricTimerInterval();
    this.clearUpAndDownInterval();
    this.hasStarted = false;
  }

  /**
   * Restarts all jellyfish behaviors (idle, electric, movement) after clearing.
   */
  continueAllIntervals() {
    this.clearAllIntervals();
    this.runDefaultAnimation();
    this.triggerElectricAnimation();
    this.runElectricInterval();
    this.moveUpAndDown();
  }
}