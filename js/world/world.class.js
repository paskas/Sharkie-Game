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

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.keyboard = keyboard;

    this.initGameObjects();
    this.setHitbox();
    this.setWorld();

    this.startDrawLoop();
    this.startWorldLoop();
  }

  initGameObjects() {
    this.character = new Character();
    this.healthBarCharacter = new HealthBarCharacter();
    this.healthBarEndboss = new HealthBarEndboss();
    this.coinCounter = new CoinCounter();
    this.poisonFlaskCounter = new PoisenFlaskCounter();
    this.gameHelper = new GameHelper(this);
    this.levelManager = new LevelManager(this, this.canvas);
    this.collisionHandler = new CollisionHandler(this);
    this.bubbleHandler = new BubbleHandler(this);
    this.drawHandler = new DrawHandler(this);
  }

  setWorld() {
    this.character.world = this;
    this.level.world = this;
    this.level.enemies.forEach(enemy => {
      enemy.world = this;
      if (enemy.initPosition) {
        enemy.initPosition();
      }
    });
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
    setInterval(() => {
      this.collisionHandler.checkCharacterEnemyCollisions();
      this.collisionHandler.checkBubbleEnemyCollisions();
      this.collisionHandler.checkCoinCollisions();
      this.collisionHandler.checkPoisenFlasksCollisions();
      this.handleLevelProgress();
      this.handleSunlightAnimate();
      this.checkPoisenShootStatus();
    }, 1000 / 60);
  }

  handleSunlightAnimate() {
    this.level.sunlights.forEach(s => s.animate());
  }

  handleLevelProgress() {
    const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
    if (endboss?.dead) {
      if (!this.levelManager.isLastLevel()) {
        this.levelManager.loadNextLevel();
      } else {
        this.levelManager.resetLevels();
      }
      this.character.world = this;
    }
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
