class World {
  canvas;
  ctx;
  keyboard;
  character;
  levelManager;
  camera_x = 0;
  healthBarCharacter;
  gameStarted = false;
  shootingObject = [];
  worldLoop = null;
  isWorldLoopActive = null;
  removeTimeouts = [];


  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.keyboard = keyboard;
    this.drawHandler = new DrawHandler(this);
    // this.setHitbox(); // Show hitboxes (debug only)
  }

  initWorldObjects() {
    this.setLevelManager();
    this.character = new Character(this);
    this.healthBarCharacter = new HealthBarCharacter(this.character);
    this.healthBarEndboss = new HealthBarEndboss();
    this.coinCounter = new CoinCounter();
    this.poisonFlaskCounter = new PoisenFlaskCounter();
    this.bubbleHandler = new BubbleHandler(this);
    this.collisionHandler = new CollisionHandler(this);
    this.gameHelper = new GameHelper(this);
  }

  setLevelManager() {
    if (!this.levelManager) {
      this.levelManager = new LevelManager(this, this.canvas);
    }
  }

  setHitbox() {
    this.character.showHitbox = true;
    this.level.enemies.forEach(enemy => enemy.showHitbox = true);
    this.level.sunlights.forEach(obj => obj.showHitbox = true);
    this.level.barrier.forEach(obj => obj.showHitbox = true);
    this.level.coins.forEach(obj => obj.showHitbox = true);
    this.level.poisonFlasks.forEach(obj => obj.showHitbox = true);
  }

  get level() {
    if (!this.levelManager) return undefined;
    return this.levelManager.getCurrentLevel();
  }

  startWorldLoop() {
    if (this.isWorldLoopActive) return;
    this.isWorldLoopActive = true;
    const loop = () => {
      if (!this.isWorldLoopActive) return;
      this.collisionHandler.checkCharacterEnemyCollisions();
      this.collisionHandler.checkBubbleEnemyCollisions();
      this.collisionHandler.checkCoinCollisions();
      this.collisionHandler.checkPoisenFlasksCollisions();
      this.checkTriggerEndbossHealthBar();
      this.handleSunlightAnimate();
      this.checkPoisenShootStatus();
      this.worldLoopId = requestAnimationFrame(loop);
    };
    this.worldLoopId = requestAnimationFrame(loop);
  }

  stopWorldLoop() {
    this.isWorldLoopActive = false;
    if (this.worldLoopId) {
      cancelAnimationFrame(this.worldLoopId);
      this.worldLoopId = null;
    }
  }

  clearWorld() {
    this.stopAllIntervals();
    this.resetWorldReferences();
  }

  stopAllIntervals() {
    this.stopWorldLoop();
    if (this.drawHandler) {
      this.drawHandler.stopDrawLoop();
    }
    if (this.removeTimeouts?.length) {
      this.removeTimeouts.forEach(timeout => clearTimeout(timeout));
      this.removeTimeouts = [];
    }
    this.character?.clearAllIntervals?.();
    this.levelManager?.getCurrentLevel?.()?.clearAllIntervals?.();
    this.healthBarCharacter?.clearAllIntervals?.();
    this.healthBarEndboss?.clearAllIntervals?.();
    if (Array.isArray(this.shootingObject)) {
      this.shootingObject.forEach(b => b?.clearAllIntervals?.());
      this.shootingObject = [];
    }
  }

  resetWorldReferences() {
    this.character = null;
    this.healthBarCharacter = null;
    this.healthBarEndboss = null;
    this.coinCounter = null;
    this.poisonFlaskCounter = null;
    this.gameHelper = null;
    this.collisionHandler = null;
    this.bubbleHandler = null;
  }

  continueWorld() {
    this.startWorldLoop();
    this.drawHandler.startDrawLoop();
    this.character?.continueIntervals?.();
    this.levelManager?.getCurrentLevel?.()?.continueIntervals?.();
    this.healthBarCharacter?.continueIntervals?.();
    this.healthBarEndboss?.continueIntervals?.();
    if (Array.isArray(this.shootingObject)) {
      this.shootingObject.forEach(b => b?.continueIntervals?.());
    }
  }

  checkTriggerEndbossHealthBar() {
    const endboss = this.level.enemies.find(e => e instanceof Endboss);
    let isVisible = false;
    if (endboss && endboss.hadFirstContact && !endboss.dead) isVisible = true;
    if (this.healthBarEndboss) this.healthBarEndboss.visible = isVisible;
    return isVisible;
  }

  drawEndbossHealthbar(addToMapFn) {
    if (this.healthBarEndboss?.visible) {
      addToMapFn(this.healthBarEndboss);
    }
  }

  handleSunlightAnimate() {
    this.level.sunlights.forEach(s => s.animate());
  }

  checkPoisenShootStatus() {
    if (PoisenFlask.flaskCount >= 1) {
      this.character.shootPoisend = true;
    } else {
      this.character.shootPoisend = false;
    }
  }

  removeEnemy(enemy) {
    const timeout = setTimeout(() => {
      let enemyIndex = this.level.enemies.indexOf(enemy);
      if (enemyIndex !== -1) {
        this.level.enemies.splice(enemyIndex, 1);
      }
    }, 3000);
    this.removeTimeouts.push(timeout);
  }
}
