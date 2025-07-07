class Endboss extends MovableObject {
  height = 530;
  width = 500;
  hadFirstContact = false;
  dead = false;
  static life = 5;

  currentAnimation = null;
  animationInterval = null;
  combatLoopInterval = null;
  lastAttackTime = 0;
  attackCooldown = 1500;

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

  constructor(canvas) {
    super();
    this.x = 4300;
    this.y = 30;

    this.speed = 3;
    this.poisend = true;
    this.canDealDmg = true;
    this.setMovementRange(-275, canvas.height + 110);

    this.img = new Image();
    this.loadImages(this.IMAGES_SPAWNING);
    this.loadImages(this.IMAGES_FLOATING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);

    this.animate();
  }

  animate() {
    this.triggerEndboss();
  }

  triggerEndboss() {
    this.animationInterval = setInterval(() => {
      if (!this.hadFirstContact && this.world.character.x > 3950) {
        this.hadFirstContact = true;
        this.clearAnimationInterval();
        this.startSpawnAnimation();
      }
    }, 150);
  }

  startSpawnAnimation() {
    this.currentAnimation = 'spawn';
    this.playAnimationOnce(this.IMAGES_SPAWNING, () => {
      this.initCombatPhase();
    }, 150);
  }

  initCombatPhase() {
    this.setAnimationLoop(this.IMAGES_FLOATING, 'idle');
    this.startCombatLoop();
  }

  startCombatLoop() {
    this.combatLoopInterval = setInterval(() => {
      if (this.dead || !this.world?.character) return;
      let { distanceX, distanceY } = this.getDistanceToCharacter();
      this.otherDirection = distanceX > 0;
      if (this.isInAttackRange(distanceX, distanceY)) {
        this.lastAttackTime = Date.now();
        this.initAttackPhase();
      }
      if (this.currentAnimation !== 'attack') {
        this.moveTowardCharacter(distanceX, distanceY);
      }
    }, 1000 / 30);
  }

  initAttackPhase() {
    if (this.dead) return;
    this.clearAnimationInterval();
    let { distanceX, distanceY } = this.getDistanceToCharacter();
    let { directionX, directionY } = this.getMoveDirection(distanceX, distanceY);
    this.moveIntoAttackPosition(distanceX, distanceY, directionX, directionY);
    this.startAttackAnimation();
  }

  startAttackAnimation() {
    this.playAnimationOnce(this.IMAGES_ATTACK, () => {
      this.setAnimationLoop(this.IMAGES_FLOATING, 'idle');
    }, 100);
  }

  isInAttackRange(x, y) {
    let offsetX = 260 + 55;
    let offsetY = 90 + 35;
    return Math.abs(x) < offsetX && Math.abs(y) < offsetY &&
      Date.now() - this.lastAttackTime > this.attackCooldown;
  }

  moveTowardCharacter(x, y) {
    let collidingChar = this.isColliding(this.world.character);
    if (Math.abs(x) > 310) {
      x > 0 ? this.moveRight() : this.moveLeft();
    } else if (Math.abs(x) > 5 && !collidingChar) {
      this.x += x > 0 ? 2 : -2;
    }
    if (Math.abs(y) > 140) {
      y > 0 ? this.bossMoveDown() : this.bossMoveUp();
    } else if (Math.abs(y) > 5 && !collidingChar) {
      this.y += y > 0 ? 2 : -2;
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

  clearAnimationInterval() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  setAnimationLoop(images, status) {
    this.clearAnimationInterval();
    this.animationInterval = setInterval(() => {
      if (this.dead) return;
      this.playAnimation(images);
      this.currentAnimation = status;
    }, 200);
  }

  bossMoveUp() {
    if (this.y > this.minY) {
      this.y -= this.speed;
    } else {
      this.y = this.minY;
    }
  }

  bossMoveDown() {
    if (this.y < this.maxY) {
      this.y += this.speed;
    } else {
      this.y = this.maxY;
    }
  }
}