class Endboss extends MovableObject {
  height = 530;
  width = 500;
  hadFirstContact = false;
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

  constructor() {
    super();
    this.x = 4300;
    this.y = 30;

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
      if (!this.hadFirstContact && world.character.x > 3950) {
        this.hadFirstContact = true;
        this.clearAnimationInterval();
        this.startSpawnAnimation();
      }
    }, 150);
  }

  startSpawnAnimation() {
    this.clearAnimationInterval();
    this.currentAnimation = 'spawn';
    this.playAnimationOnce(this.IMAGES_SPAWNING, () => {
      this.setAnimationLoop(this.IMAGES_FLOATING, 'idle');
      this.startCombatLoop();
    }, 150);
  }

  startCombatLoop() {
    this.combatLoopInterval = setInterval(() => {
      if (this.dead || !this.world?.character) return;
      let distance = Math.abs(this.x - this.world.character.x);
      let now = Date.now();
      if (distance < 250 && now - this.lastAttackTime > this.attackCooldown) {
        this.startAttackAnimation();
        this.lastAttackTime = now;
      }
    }, 150);
  }

  startAttackAnimation() {
    if (this.dead) return;
    this.clearAnimationInterval();
    let direction = this.world.character.x < this.x ? -1 : 1;
    this.x += direction * 50;
    this.currentAnimation = 'attack';
    this.playAnimationOnce(this.IMAGES_ATTACK, () => {
      this.setAnimationLoop(this.IMAGES_FLOATING, 'idle');
    }, 100);
  }

  clearAnimationInterval() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  setAnimationLoop(images, status) {
    this.animationInterval = setInterval(() => {
      if (this.dead) return;
      this.playAnimation(images);
      this.currentAnimation = status;
    }, 200);
  }
}