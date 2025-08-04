/**
 * Represents the final boss enemy (killer whale) with advanced behavior including spawning,
 * attacking, movement, damage handling, and animations.
 * Inherits from MovableObject.
 */
class Endboss extends MovableObject {
  height = 530;
  width = 500;

  checkInterval = null;
  currentAnimation = null;
  animationFrameId = null;

  lastFrameTime = 0;
  combatFrameId = null;

  lastAttackTime = 0;
  attackCooldown = 1500;

  isHurtByBubble = 0.5;
  isHurtByPoisenbubble = 0.5;

  hadFirstContact = false;
  canTakeDmg = false;
  isCombatLoopRunning = false;
  dead = false;

  followSpeed = 80;
  static life = 5;

  IMAGES_SPAWNING = [
    './img/enemies/killer_whale_endboss/incoming/1.png',
    './img/enemies/killer_whale_endboss/incoming/2.png',
    './img/enemies/killer_whale_endboss/incoming/3.png',
    './img/enemies/killer_whale_endboss/incoming/4.png',
    './img/enemies/killer_whale_endboss/incoming/5.png',
    './img/enemies/killer_whale_endboss/incoming/6.png',
    './img/enemies/killer_whale_endboss/incoming/7.png',
    './img/enemies/killer_whale_endboss/incoming/8.png',
    './img/enemies/killer_whale_endboss/incoming/9.png',
    './img/enemies/killer_whale_endboss/incoming/10.png'
  ];

  IMAGES_FLOATING = [
    './img/enemies/killer_whale_endboss/idle/1.png',
    './img/enemies/killer_whale_endboss/idle/2.png',
    './img/enemies/killer_whale_endboss/idle/3.png',
    './img/enemies/killer_whale_endboss/idle/4.png',
    './img/enemies/killer_whale_endboss/idle/5.png',
    './img/enemies/killer_whale_endboss/idle/6.png',
    './img/enemies/killer_whale_endboss/idle/7.png',
    './img/enemies/killer_whale_endboss/idle/8.png',
    './img/enemies/killer_whale_endboss/idle/9.png',
    './img/enemies/killer_whale_endboss/idle/10.png',
    './img/enemies/killer_whale_endboss/idle/11.png',
    './img/enemies/killer_whale_endboss/idle/12.png',
    './img/enemies/killer_whale_endboss/idle/13.png'
  ];

  IMAGES_ATTACK = [
    './img/enemies/killer_whale_endboss/attack/1.png',
    './img/enemies/killer_whale_endboss/attack/2.png',
    './img/enemies/killer_whale_endboss/attack/3.png',
    './img/enemies/killer_whale_endboss/attack/4.png',
    './img/enemies/killer_whale_endboss/attack/5.png',
    './img/enemies/killer_whale_endboss/attack/6.png'
  ];

  IMAGES_HURT = [
    './img/enemies/killer_whale_endboss/hurt/1.png',
    './img/enemies/killer_whale_endboss/hurt/2.png',
    './img/enemies/killer_whale_endboss/hurt/3.png',
    './img/enemies/killer_whale_endboss/hurt/4.png'
  ];

  IMAGES_DEAD = [
    './img/enemies/killer_whale_endboss/dead/1.png',
    './img/enemies/killer_whale_endboss/dead/2.png',
    './img/enemies/killer_whale_endboss/dead/3.png',
    './img/enemies/killer_whale_endboss/dead/4.png',
    './img/enemies/killer_whale_endboss/dead/5.png',
    './img/enemies/killer_whale_endboss/dead/6.png'
  ];

  /**
   * Initializes the endboss, sets position, loads image assets, and starts first contact check.
   * 
   * @param {World} world - The game world reference.
   * @param {HTMLCanvasElement} canvas - The canvas element for calculating boundaries.
   */
  constructor(world, canvas) {
    super();
    this.world = world;
    this.x = 4300;
    this.y = 30;

    this.poisoned = true;
    this.canDealDmg = true;
    this.setMovementRange(-275, canvas.height + 110);

    this.img = new Image();
    this.loadImages(this.IMAGES_SPAWNING);
    this.loadImages(this.IMAGES_FLOATING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);

    this.checkForFirstContact();
  }

  /**
   * Returns the animation speed in ms for the given animation status.
   * 
   * @param {string} status - Animation type (e.g., 'idle', 'attack').
   * @returns {number} Speed in milliseconds.
   */
  getAnimationSpeed(status) {
    const speeds = {
      idle: 200,
      attack: 120,
      hurt: 120,
      spawn: 120
    };
    return speeds[status];
  }

  /**
   * Sets an interval to monitor when the character reaches the endboss trigger zone.
   */
  checkForFirstContact() {
    this.checkInterval = setInterval(() => {
      this.canDealDmg = false;
      if (this.world.character.x > 3950 && !this.hadFirstContact) {
        clearInterval(this.checkInterval);
        this.hadFirstContact = true;
        this.triggerEndboss();
      }
    }, 250);
  }

  /**
   * Starts the endboss spawn animation once contact is made.
   */
  triggerEndboss() {
    this.clearAnimationFrameId();
    this.startSpawnAnimation();
  }

  /**
   * Plays the initial spawn animation and sound, then starts combat phase.
   */
  startSpawnAnimation() {
    if (this.animationFrameId || this.currentAnimation === 'spawn') return;
    this.currentAnimation = 'spawn';
    soundManager.playSound('./assets/audio/endboss/endboss_spawn.mp3');
    this.playAnimationOnce(this.IMAGES_SPAWNING, () => {
      this.initCombatPhase();
    }, 120);
  }

  /**
   * Initializes idle animation and starts combat loop.
   */
  initCombatPhase() {
    this.startAnimationLoop(this.IMAGES_FLOATING, 'idle');
    this.startCombatLoop();
    this.canDealDmg = true;
    this.canTakeDmg = true;
  }

  /**
   * Starts the requestAnimationFrame loop for the boss's combat behavior.
   */
  startCombatLoop() {
    if (this.isCombatLoopRunning) return;
    this.isCombatLoopRunning = true;
    this.lastFrameTime = 0;
    const loop = (time) => {
      if (this.dead) return;
      if (!this.isCombatLoopRunning) return;
      const frameTime = this.calculateDeltaTime(time);
      EndbossCombat.updateCombatState(this, frameTime);
      this.combatFrameId = requestAnimationFrame(loop);
    };
    this.combatFrameId = requestAnimationFrame(loop);
  }

  /**
   * Calculates frame time difference for combat loop logic.
   * 
   * @param {number} time - High-resolution timestamp.
   * @returns {number} Frame time in seconds.
   */
  calculateDeltaTime(time) {
    if (!this.lastFrameTime) {
      this.lastFrameTime = time;
      return 0;
    }
    const delta = (time - this.lastFrameTime) / 1000;
    this.lastFrameTime = time;
    return delta;
  }

  /**
   * Plays attack animation and returns to idle afterwards.
   */
  startAttackAnimation() {
    this.clearAnimationFrameId();
    soundManager.playSound('./assets/audio/endboss/killer_whale_bite.wav');
    this.playAnimationOnce(this.IMAGES_ATTACK, () => {
      this.startAnimationLoop(this.IMAGES_FLOATING, 'idle');
    }, 120);
  }

  /**
   * Plays hurt animation and resumes idle afterwards.
   */
  startHurtAnimation() {
    this.lastHit = Date.now();
    this.playAnimationOnce(this.IMAGES_HURT, () => {
      this.startAnimationLoop(this.IMAGES_FLOATING, 'idle');
    }, 120);
  }

  /**
   * Checks if the character is within melee range.
   * 
   * @param {number} x - Horizontal distance.
   * @param {number} y - Vertical distance.
   * @returns {boolean} True if within range.
   */
  isInAttackRange(x, y) {
    let offsetX = 260 + 55;
    let offsetY = 90 + 35;
    return Math.abs(x) < offsetX && Math.abs(y) < offsetY &&
      Date.now() - this.lastAttackTime > this.attackCooldown;
  }

  /**
   * Starts a looped animation using requestAnimationFrame.
   * 
   * @param {string[]} images - Image frames for animation.
   * @param {string} status - Animation mode name (e.g., 'idle').
   */
  startAnimationLoop(images, status) {
    this.clearAnimationFrameId();
    this.currentAnimation = status;
    this.animationSpeed = this.getAnimationSpeed(status);
    this.lastAnimationFrameTime = 0;
    const loop = (time) => {
      if (this.dead || this.currentAnimation !== status) return;
      if (!this.lastAnimationFrameTime) this.lastAnimationFrameTime = time;
      const frameTime = time - this.lastAnimationFrameTime;
      if (frameTime >= this.animationSpeed) {
        this.playAnimation(images);
        this.lastAnimationFrameTime = time;
      }
      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }

  /**
   * Moves boss right by the given step.
   * 
   * @param {number} moveStepX - Distance to move.
   */
  bossMoveRight(moveStepX) {
    this.x += moveStepX;
  }

  /**
   * Moves boss left by the given step.
   * 
   * @param {number} moveStepX - Distance to move.
   */
  bossMoveLeft(moveStepX) {
    this.x -= moveStepX;
  }

  /**
   * Moves boss upward within minY bounds.
   * 
   * @param {number} moveStepY - Distance to move.
   */
  bossMoveUp(moveStepY) {
    if (this.y > this.minY) {
      this.y -= moveStepY;
    } else {
      this.y = this.minY;
    }
  }

  /**
   * Moves boss downward within maxY bounds.
   * 
   * @param {number} moveStepY - Distance to move.
   */
  bossMoveDown(moveStepY) {
    if (this.y < this.maxY) {
      this.y += moveStepY;
    } else {
      this.y = this.maxY;
    }
  }

  /**
   * Handles logic for poison bubble hits including damage buildup and applying life loss.
   */
  handlePoisenBubbleHit() {
    if (!this.hadFirstContact) return;
    this.isHurtByPoisenbubble++;
    if (this.isHurtByPoisenbubble >= 1) {
      if (Endboss.life > 0 && !this.isInDamagePhase()) {
        this.lastHit = new Date().getTime();
        this.loseLife();
      }
      this.isHurtByPoisenbubble = 0;
    }
  }

  /**
   * Handles logic for regular bubble hits including damage buildup and applying life loss.
   */
  handleBubbleHit() {
    if (!this.hadFirstContact) return;
    this.isHurtByBubble++;
    if (this.isHurtByBubble >= 3) {
      if (Endboss.life > 0 && !this.isInDamagePhase()) {
        this.lastHit = new Date().getTime();
        this.loseLife();
      }
      this.isHurtByBubble = 0;
    }
  }

  /**
 * Reduces the boss's life by one, plays a hurt animation and sound,
 * and checks if the boss should die. Also updates follow speed at specific life thresholds.
 */
  loseLife() {
    if (Endboss.life > 0) {
      Endboss.life--;
      this.startHurtAnimation();
      soundManager.playSound('./assets/audio/endboss/hurt_boss.wav')
      this.checkLifeUpdate();
      if (Endboss.life <= 0) {
        this.die();
      }
    }
  }
  
  /**
   * Adjusts the boss's follow speed based on current life.
   * At 3 life: speed increases moderately.
   * At 1 life: speed increases significantly.
   */
  checkLifeUpdate() {
    if (Endboss.life === 3) this.followSpeed = 120;
    if (Endboss.life === 1) this.followSpeed = 160;
  }

  /**
   * Cancels any active animation frame request.
   */
  clearAnimationFrameId() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Stops all intervals and animation loops (e.g., check interval, animation loop).
   */
  clearAllIntervals() {
    this.isCombatLoopRunning = false;
    this.clearAnimationFrameId();
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  /**
   * Restarts either first contact logic or combat animations depending on state.
   */
  continueAllIntervals() {
    if (!this.hadFirstContact && !this.dead) {
      this.checkForFirstContact();
    } else if (!this.dead) {
      this.startAnimationLoop(this.IMAGES_FLOATING, 'idle');
      this.startCombatLoop();
    }
  }
}
