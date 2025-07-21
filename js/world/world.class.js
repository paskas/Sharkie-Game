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
  animationFrameId = null;

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.keyboard = keyboard;

    this.initWorldObjects();
    this.setHitbox();

    this.startDrawLoop();
    this.startWorldLoop();
  }

  initWorldObjects() {
    this.character = new Character(this);
    this.healthBarCharacter = new HealthBarCharacter(this.character);
    this.healthBarEndboss = new HealthBarEndboss();
    this.coinCounter = new CoinCounter();
    this.poisonFlaskCounter = new PoisenFlaskCounter();
    this.gameHelper = new GameHelper(this);
    this.levelManager = new LevelManager(this, this.canvas);
    this.collisionHandler = new CollisionHandler(this);
    this.bubbleHandler = new BubbleHandler(this);
    this.drawHandler = new DrawHandler(this);
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
    return this.levelManager.getCurrentLevel();
  }

  startDrawLoop() {
    this.drawHandler.draw();
  }

  startWorldLoop() {
    this.worldLoop = setInterval(() => {
      this.collisionHandler.checkCharacterEnemyCollisions();
      this.collisionHandler.checkBubbleEnemyCollisions();
      this.collisionHandler.checkCoinCollisions();
      this.collisionHandler.checkPoisenFlasksCollisions();
      this.handleSunlightAnimate();
      this.checkPoisenShootStatus();
    }, 1000 / 60);
  }

  clearWorld() {
    if (this.worldLoop) {
      clearInterval(this.worldLoop)
      this.worldLoop = null;
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.character && typeof this.character.clearAllIntervals === 'function') {
      this.character.clearAllIntervals();
    }
    if (world.level && typeof world.level.clearAllIntervals === 'function') {
      world.level.clearAllIntervals();
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
    setTimeout(() => {
      let enemyIndex = this.level.enemies.indexOf(enemy);
      if (enemyIndex !== -1) {
        this.level.enemies.splice(enemyIndex, 1);
      }
    }, 3000);
  }
}
