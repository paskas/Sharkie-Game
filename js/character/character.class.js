/**
 * Represents the player character with all its movement, shooting, sleep, and animation behavior.
 * Inherits from MovableObject.
 */
class Character extends MovableObject {
  x = 0;
  y = 200;
  height = 260;
  width = 240;
  rotationAngle = 0;
  speed = 300;
  cameraStepPerSecond = 300;
  world;

  characterLoopId = null;
  animationInterval = null;
  currentAnimation = null;
  lastFrameTime = 0;

  untilSleep = 8000;
  sleepStartTime = Date.now();
  isSleeping = false;
  sleepTimeout = null;

  isShooting = false;
  shootPoisend = false;
  shootKeyReleased = true;
  poisonShootKeyReleased = true;
  currentShotPoisoned = false;
  shootTimeout = null;

  isPoisendByHit = false;
  isShockByHit = false;
  lastShootTime = Date.now();
  dmgTimeout = null;

  static life = 5;

  IMAGES_FLOATING = [
    './img/character/idle/1.png',
    './img/character/idle/2.png',
    './img/character/idle/3.png',
    './img/character/idle/4.png',
    './img/character/idle/5.png',
    './img/character/idle/6.png',
    './img/character/idle/7.png',
    './img/character/idle/8.png',
    './img/character/idle/9.png',
    './img/character/idle/10.png',
    './img/character/idle/11.png',
    './img/character/idle/12.png',
    './img/character/idle/13.png',
    './img/character/idle/14.png',
    './img/character/idle/15.png',
    './img/character/idle/16.png',
    './img/character/idle/17.png',
    './img/character/idle/18.png'
  ];

  IMAGES_SWIM = [
    './img/character/swim/1.png',
    './img/character/swim/2.png',
    './img/character/swim/3.png',
    './img/character/swim/4.png',
    './img/character/swim/5.png',
    './img/character/swim/6.png'
  ];

  IMAGES_INITSLEEP = [
    './img/character/long_idle/1.png',
    './img/character/long_idle/2.png',
    './img/character/long_idle/3.png',
    './img/character/long_idle/4.png',
    './img/character/long_idle/5.png',
    './img/character/long_idle/6.png',
    './img/character/long_idle/7.png',
    './img/character/long_idle/8.png',
    './img/character/long_idle/9.png',
    './img/character/long_idle/10.png',
    './img/character/long_idle/11.png',
    './img/character/long_idle/12.png',
    './img/character/long_idle/13.png',
    './img/character/long_idle/14.png'
  ];

  IMAGES_SLEEP = [
    './img/character/long_idle/11.png',
    './img/character/long_idle/12.png',
    './img/character/long_idle/13.png',
    './img/character/long_idle/14.png'
  ];

  IMAGES_SHOOT = [
    './img/character/attack/bubble_trap/attack_bubbles/1.png',
    './img/character/attack/bubble_trap/attack_bubbles/2.png',
    './img/character/attack/bubble_trap/attack_bubbles/3.png',
    './img/character/attack/bubble_trap/attack_bubbles/4.png',
    './img/character/attack/bubble_trap/attack_bubbles/5.png',
    './img/character/attack/bubble_trap/attack_bubbles/6.png',
    './img/character/attack/bubble_trap/attack_bubbles/7.png',
    './img/character/attack/bubble_trap/attack_bubbles/8.png'
  ];

  IMAGES_SHOOTPOISEN = [
    './img/character/attack/bubble_trap/attack_poison_bubbles/1.png',
    './img/character/attack/bubble_trap/attack_poison_bubbles/2.png',
    './img/character/attack/bubble_trap/attack_poison_bubbles/3.png',
    './img/character/attack/bubble_trap/attack_poison_bubbles/4.png',
    './img/character/attack/bubble_trap/attack_poison_bubbles/5.png',
    './img/character/attack/bubble_trap/attack_poison_bubbles/6.png',
    './img/character/attack/bubble_trap/attack_poison_bubbles/7.png',
    './img/character/attack/bubble_trap/attack_poison_bubbles/8.png'
  ];

  IMAGES_POISEND = [
    './img/character/hurt/poisoned/1.png',
    './img/character/hurt/poisoned/2.png',
    './img/character/hurt/poisoned/3.png',
    './img/character/hurt/poisoned/4.png',
    './img/character/hurt/poisoned/5.png'
  ];

  IMAGES_SHOCK = [
    './img/character/hurt/electric_shock/01.png',
    './img/character/hurt/electric_shock/02.png'
  ];

  IMAGES_DEAD = [
    './img/character/dead/default_options/animated_horizontal/1.png',
    './img/character/dead/default_options/animated_horizontal/2.png',
    './img/character/dead/default_options/animated_horizontal/3.png',
    './img/character/dead/default_options/animated_horizontal/4.png',
    './img/character/dead/default_options/animated_horizontal/5.png',
    './img/character/dead/default_options/animated_horizontal/6.png'
  ];

  /**
   * Creates a new Character instance, loads all required animations, and sets the default image.
   * 
   * @param {World} world - The game world instance the character belongs to.
   */
  constructor(world) {
    super();
    this.world = world;
    this.loadImages(this.IMAGES_FLOATING);
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_INITSLEEP);
    this.loadImages(this.IMAGES_SLEEP);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_POISEND);
    this.loadImages(this.IMAGES_SHOCK);
    this.loadImages(this.IMAGES_SHOOT);
    this.loadImages(this.IMAGES_SHOOTPOISEN);

    this.img = this.imageCache[this.IMAGES_FLOATING[0]];
  }

  /**
   * Starts the main character animation and movement loop using requestAnimationFrame.
   */
  startCharacterLoop() {
    if (!this.world) return;
    this.lastFrameTime = 0;
    const loop = (time) => {
      if (!this.world || this.dead) return;
      const frameTime = CharacterHelper.calculateDeltaTime(this, time);
      this.updateFrameState(frameTime);
      this.characterLoopId = requestAnimationFrame(loop);
    };
    this.characterLoopId = requestAnimationFrame(loop);
  }

  /**
   * Updates movement, shooting, animation state, and camera for the current frame.
   * 
   * @param {number} frameTime - Time elapsed since last frame.
   */
  updateFrameState(frameTime) {
    this.updateMovement(frameTime);
    CharacterShoot.updateShoot(this);
    this.resolveAnimationStatus();
    CharacterCamMove.moveCamera(this, this.world, frameTime);
  }

  /**
   * Decides which animation to play based on the character's state (damage, shooting, idle, sleep).
   */
  resolveAnimationStatus() {
    if (this.dead) return;
    if (this.isInDamagePhase()) {
      this.startDamageAnimation();
      return;
    }
    if (this.isShooting) {
      CharacterHelper.setAnimationIfNew(this, 'shoot', () => this.shootAnimation());
      return;
    }
    if (CharacterHelper.isMoving(this, this.world.keyboard)) {
      CharacterHelper.setAnimationIfNew(this, 'swim', () => this.swimAnimation());
      return;
    }
    if (CharacterHelper.startSleepTimer(this.sleepStartTime, this.untilSleep)) {
      this.startSleepAnimation();
    } else {
      CharacterHelper.setAnimationIfNew(this, 'idle', () => this.idleAnimation());
    }
  }

  /**
   * Initiates the sleep sequence after inactivity using two phases: initSleep and sleep.
   */
  startSleepAnimation() {
    if (this.sleepTimeout || this.isSleeping) return;
    this.setAnimation('initSleep', () => this.initSleepAnimation(), 140);
    this.sleepTimeout = setTimeout(() => {
      this.isSleeping = true;
      this.setAnimation('sleep', () => this.sleepAnimation(), 200);
      this.sleepTimeout = null;
    }, this.IMAGES_INITSLEEP.length * 140);
  }

  /**
  * Plays the shock or poison animation when the character is hurt and resets status after a delay.
  */
  startDamageAnimation() {
    this.setAnimation('damage', () => {
      if (this.isShockByHit) this.shockAnimation();
      else if (this.isPoisendByHit) this.poisonedAnimation();
    }, 140);
    this.dmgTimeout = setTimeout(() => {
      this.isShockByHit = false;
      this.isPoisendByHit = false;
    }, 800);
  }

  /**
   * Plays the idle floating animation.
   */
  idleAnimation() {
    this.playAnimation(this.IMAGES_FLOATING);
  }

  /**
   * Plays the swim animation when movement keys are pressed.
   */
  swimAnimation() {
    this.playAnimation(this.IMAGES_SWIM);
  }

  /**
   * Plays the animation before entering full sleep mode and plays sleep sound.
   */
  initSleepAnimation() {
    this.playAnimation(this.IMAGES_INITSLEEP);
    soundManager.playSound('./assets/audio/character/sleep.wav')
  }

  /**
   * Plays the looping sleep animation.
   */
  sleepAnimation() {
    this.playAnimation(this.IMAGES_SLEEP);
  }

  /**
   * Plays the shoot animation based on whether it's a poison shot or regular bubble.
   */
  shootAnimation() {
    const images = this.currentShotPoisoned ? this.IMAGES_SHOOTPOISEN : this.IMAGES_SHOOT;
    this.playAnimation(images);
  }

  /**
   * Plays the poison damage animation.
   */
  poisonedAnimation() {
    this.playAnimation(this.IMAGES_POISEND);
  }

  /**
   * Plays the electric shock damage animation.
   */
  shockAnimation() {
    this.playAnimation(this.IMAGES_SHOCK);
  }

  /**
   * Sets and starts a new animation mode with given callback and speed.
   * 
   * @param {string} mode - Name of the animation mode.
   * @param {Function} animationStep - Animation function to call per frame.
   * @param {number} animationSpeed - Interval in ms between frames.
   */
  setAnimation(mode, animationStep, animationSpeed) {
    if (this.currentAnimation === mode) return;
    this.clearAnimationInterval();
    this.currentImage = 0;
    this.currentAnimation = mode;
    this.animationInterval = setInterval(animationStep, animationSpeed);
  }

  /**
   * Handles character movement based on keyboard input, including collision and camera updates.
   * 
   * @param {number} frameTime - Elapsed time for current frame.
   */
  updateMovement(frameTime) {
    if (this.world.keyboard.disabled) return;
    const kb = this.world.keyboard;
    if (CharacterHelper.isMoving(this, kb)) CharacterHelper.resetSleepStatus(this);
    const { targetX, targetY } = this.updateNextPosition(kb, frameTime);
    this.handleCollisionAndMove(targetX, targetY);
    this.updateRotationAngle(kb);
  }

  /**
   * Calculates next potential position based on input and frame time.
   * 
   * @param {Keyboard} kb - The keyboard input handler.
   * @param {number} frameTime - Elapsed time since last frame.
   * @returns {{targetX: number, targetY: number}} Calculated next coordinates.
   */
  updateNextPosition(kb, frameTime) {
    const w = this.world;
    let targetX = this.x;
    let targetY = this.y;
    let distance = this.speed * frameTime;
    if (kb.RIGHT && this.x + this.width < w.level.level_end_x) targetX += distance;
    if (kb.LEFT && this.x > 0) targetX -= distance;
    if (kb.UP && this.y > w.level.level_top_y) targetY -= distance;
    if (kb.DOWN && this.y < w.level.level_bottom_y) targetY += distance;
    return { targetX, targetY };
  }

  /**
   * Moves the character to the target position if no collision is detected.
   * 
   * @param {number} targetX - Proposed X coordinate.
   * @param {number} targetY - Proposed Y coordinate.
   */
  handleCollisionAndMove(targetX, targetY) {
    const blockingObjects = CharacterHelper.getBlockingObjects(this.world);
    if (!this.world.gameHelper.isCollidingWithObject(targetX, targetY, blockingObjects)) {
      this.x = targetX;
      this.y = targetY;
    }
  }

  /**
   * Sets the rotation angle of the character based on vertical input (up/down).
   * 
   * @param {Keyboard} kb - The keyboard input handler.
   */
  updateRotationAngle(kb) {
    if (kb.UP || kb.DOWN) {
      this.rotationAngle = kb.UP ? -15 : 15;
    } else {
      this.rotationAngle = 0;
    }
  }

  /**
   * Stops any currently running character animation interval.
   */
  clearAnimationInterval() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  /**
   * Stops all timeouts and animation loops related to the character.
   */
  clearAllIntervals() {
    this.clearAnimationInterval();
    if (this.characterLoopId) cancelAnimationFrame(this.characterLoopId);
    if (this.sleepTimeout) clearTimeout(this.sleepTimeout);
    if (this.dmgTimeout) clearTimeout(this.dmgTimeout);
    if (this.shootTimeout) clearTimeout(this.shootTimeout);
    this.characterLoopId = null;
    this.sleepTimeout = null;
    this.dmgTimeout = null;
    this.shootTimeout = null;
  }

  /**
   * Clears and then restarts the character loop.
   */
  continueAllIntervals() {
    this.clearAllIntervals();
    this.startCharacterLoop();
  }
}