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

  getAnimationSpeed(status) {
    const speeds = {
      idle: 200,
      attack: 120,
      hurt: 120,
      spawn: 120
    };
    return speeds[status];
  }

  checkForFirstContact() {
    this.checkInterval = setInterval(() => {
      if (this.world.character.x > 3950 && !this.hadFirstContact) {
        clearInterval(this.checkInterval);
        this.hadFirstContact = true;
        this.triggerEndboss();
      }
    }, 250);
  }

  triggerEndboss() {
    this.clearAnimationFrameId();
    this.startSpawnAnimation();
  }

  startSpawnAnimation() {
    if (this.animationFrameId || this.currentAnimation === 'spawn') return;
    this.currentAnimation = 'spawn';
    this.playAnimationOnce(this.IMAGES_SPAWNING, () => {
      this.initCombatPhase();
    }, 120);
  }

  initCombatPhase() {
    this.startAnimationLoop(this.IMAGES_FLOATING, 'idle');
    this.startCombatLoop();
  }

  startCombatLoop() {
    if (this.isCombatLoopRunning) return;
    this.isCombatLoopRunning = true;
    this.lastFrameTime = 0;
    const loop = (time) => {
      if (this.dead) return;
      if (!this.isCombatLoopRunning) return;
      const frameTime = this.calculateDeltaTime(time);
      this.updateCombatState(frameTime);
      this.combatFrameId = requestAnimationFrame(loop);
    };
    this.combatFrameId = requestAnimationFrame(loop);
  }

  calculateDeltaTime(time) {
    if (!this.lastFrameTime) {
      this.lastFrameTime = time;
      return 0;
    }
    const delta = (time - this.lastFrameTime) / 1000;
    this.lastFrameTime = time;
    return delta;
  }

  updateCombatState(frameTime) {
    if (this.dead) return;
    const { distanceX, distanceY } = this.getDistanceToCharacter();
    this.otherDirection = distanceX > 0;
    this.moveTowardCharacter(distanceX, distanceY, frameTime);
    this.tryAttack(distanceX, distanceY, performance.now());
  }

  tryAttack(distanceX, distanceY, currentTime) {
    if (!this.isInAttackRange(distanceX, distanceY)) return;
    if (currentTime - this.lastAttackTime <= this.attackCooldown) return;
    this.lastAttackTime = currentTime;
    this.initAttackPhase();
  }

  initAttackPhase() {
    if (this.dead || this.isInDamagePhase()) return;
    this.clearAnimationFrameId();
    let { distanceX, distanceY } = this.getDistanceToCharacter();
    let { directionX, directionY } = this.getMoveDirection(distanceX, distanceY);
    this.moveIntoAttackPosition(distanceX, distanceY, directionX, directionY);
    this.startAttackAnimation();
  }

  startAttackAnimation() {
    this.clearAnimationFrameId();
    this.playAnimationOnce(this.IMAGES_ATTACK, () => {
      this.startAnimationLoop(this.IMAGES_FLOATING, 'idle');
    }, 120);
  }

  startHurtAnimation() {
    this.lastHit = Date.now();
    this.playAnimationOnce(this.IMAGES_HURT, () => {
      this.startAnimationLoop(this.IMAGES_FLOATING, 'idle');
    }, 120);
  }

  isInAttackRange(x, y) {
    let offsetX = 260 + 55;
    let offsetY = 90 + 35;
    return Math.abs(x) < offsetX && Math.abs(y) < offsetY &&
      Date.now() - this.lastAttackTime > this.attackCooldown;
  }

  moveTowardCharacter(x, y, frameTime) {
    let collidingChar = this.isColliding(this.world.character);
    let moveStepX = this.followSpeed * frameTime;
    let moveStepY = this.followSpeed * frameTime;
    if (Math.abs(x) > 310) {
      x > 0 ? this.bossMoveRight(moveStepX) : this.bossMoveLeft(moveStepX);
    } else if (Math.abs(x) > 5 && !collidingChar) {
      this.x += x > 0 ? moveStepX : -moveStepX;
    }
    if (Math.abs(y) > 140) {
      y > 0 ? this.bossMoveDown(moveStepY) : this.bossMoveUp(moveStepY);
    } else if (Math.abs(y) > 5 && !collidingChar) {
      this.y += y > 0 ? moveStepY : -moveStepY;
    }
  }

  moveIntoAttackPosition(x, y, directionX, directionY) {
    let offsetX = 260;
    let offsetY = 90;
    let moveX = Math.max(Math.abs(x) - offsetX, 0);
    let moveY = Math.abs(y) > offsetY ? Math.max(Math.abs(y) - offsetY, 0) : 0;
    this.x += directionX * moveX;
    this.y += directionY * moveY;
    this.currentAnimation = 'attack';
  }

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

  bossMoveRight(moveStepX) {
    this.x += moveStepX;
  }

  bossMoveLeft(moveStepX) {
    this.x -= moveStepX;
  }

  bossMoveUp(moveStepY) {
    if (this.y > this.minY) {
      this.y -= moveStepY;
    } else {
      this.y = this.minY;
    }
  }

  bossMoveDown(moveStepY) {
    if (this.y < this.maxY) {
      this.y += moveStepY;
    } else {
      this.y = this.maxY;
    }
  }

  handlePoisenBubbleHit() {
    this.isHurtByPoisenbubble++;
    if (this.isHurtByPoisenbubble >= 1) {
      if (Endboss.life > 0 && !this.isInDamagePhase()) {
        this.lastHit = new Date().getTime();
        this.loseLife();
      }
      this.isHurtByPoisenbubble = 0;
    }
  }

  handleBubbleHit() {
    this.isHurtByBubble++;
    if (this.isHurtByBubble >= 3) {
      if (Endboss.life > 0 && !this.isInDamagePhase()) {
        this.lastHit = new Date().getTime();
        this.loseLife();
      }
      this.isHurtByBubble = 0;
    }
  }

  loseLife() {
    if (Endboss.life > 0) {
      Endboss.life--;
      this.startHurtAnimation();
      if (Endboss.life <= 0) {
        this.die();
      }
    }
  }

  clearAnimationFrameId() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  clearAllIntervals() {
    this.isCombatLoopRunning = false;
    this.clearAnimationFrameId();
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  continueAllIntervals() {
    if (!this.hadFirstContact && !this.dead) {
      this.checkForFirstContact();
    } else if (!this.dead) {
      this.startAnimationLoop(this.IMAGES_FLOATING, 'idle');
      this.startCombatLoop();
    }
  }
}
