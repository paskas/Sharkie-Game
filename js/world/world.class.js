/**
 * Manages the entire game world including character, level, UI elements, and loops.
 * Handles drawing, collisions, intervals, and object lifecycle management.
 */
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

  /**
   * Creates a new World instance.
   * @param {HTMLCanvasElement} canvas - The canvas element used for rendering.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.keyboard = keyboard;
    this.drawHandler = new DrawHandler(this);
    // this.setHitbox(); // Show hitboxes (debug only)
  }

  /**
   * Initializes core world objects including character, level, UI, and handlers.
   */
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

  /**
   * Initializes the level manager if not already present.
   */
  setLevelManager() {
    if (!this.levelManager) {
      this.levelManager = new LevelManager(this, this.canvas);
    }
  }

  /**
   * Displays hitboxes for debugging purposes.
   */
  setHitbox() {
    this.character.showHitbox = true;
    this.level.enemies.forEach(enemy => enemy.showHitbox = true);
    this.level.sunlights.forEach(obj => obj.showHitbox = true);
    this.level.barrier.forEach(obj => obj.showHitbox = true);
    this.level.coins.forEach(obj => obj.showHitbox = true);
    this.level.poisonFlasks.forEach(obj => obj.showHitbox = true);
  }

  /**
   * Returns the currently active level.
   * @returns {Level|undefined}
   */
  get level() {
    if (!this.levelManager) return undefined;
    return this.levelManager.getCurrentLevel();
  }

  /**
   * Starts the main world logic loop using requestAnimationFrame.
   */
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

  /**
   * Stops the world logic loop.
   */
  stopWorldLoop() {
    this.isWorldLoopActive = false;
    if (this.worldLoopId) {
      cancelAnimationFrame(this.worldLoopId);
      this.worldLoopId = null;
    }
  }

  /**
   * Clears the world state and intervals.
   */
  clearWorld() {
    this.stopAllIntervals();
    this.resetWorldReferences();
  }

  /**
   * Stops all running intervals and animations in the world.
   */
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
    }
  }

  /**
   * Resets references to world components for cleanup.
   */
  resetWorldReferences() {
    this.character = null;
    this.healthBarCharacter = null;
    this.healthBarEndboss = null;
    this.coinCounter = null;
    this.poisonFlaskCounter = null;
    this.gameHelper = null;
    this.collisionHandler = null;
    this.bubbleHandler = null;
    this.shootingObject = [];
  }

  /**
   * Continues the world logic and drawing after being paused.
   */
  continueWorld() {
    this.startWorldLoop();
    this.drawHandler.startDrawLoop();
    this.character?.continueAllIntervals?.();
    this.levelManager?.getCurrentLevel?.()?.continueAllIntervals?.();
    this.healthBarCharacter?.continueAllIntervals?.();
    this.healthBarEndboss?.continueAllIntervals?.();
    if (Array.isArray(this.shootingObject)) {
      this.shootingObject.forEach(b => b?.continueAllIntervals?.());
    }
    this.keyboard.disabled = false;
  }

  /**
   * Determines whether the endboss health bar should be visible.
   * @returns {boolean} - True if the bar should be shown.
   */
  checkTriggerEndbossHealthBar() {
    const endboss = this.level.enemies.find(e => e instanceof Endboss);
    let isVisible = false;
    if (endboss && endboss.hadFirstContact && !endboss.dead) isVisible = true;
    if (this.healthBarEndboss) this.healthBarEndboss.visible = isVisible;
    return isVisible;
  }

  /**
   * Draws the endboss health bar if visible using the provided draw callback.
   * @param {function} addToMapFn - Callback to add the health bar to draw map.
   */
  drawEndbossHealthbar(addToMapFn) {
    if (this.healthBarEndboss?.visible) {
      addToMapFn(this.healthBarEndboss);
    }
  }

  /**
   * Updates animation states for all sunlight objects in the level.
   */
  handleSunlightAnimate() {
    this.level.sunlights.forEach(s => s.animate());
  }

  /**
   * Checks if poison flask count allows poisoned shots and updates the character status.
   */
  checkPoisenShootStatus() {
    if (PoisenFlask.flaskCount >= 1) {
      this.character.shootPoisend = true;
    } else {
      this.character.shootPoisend = false;
    }
  }

  /**
   * Schedules removal of a defeated enemy after a delay.
   * @param {DrawableObject} enemy - The enemy to remove.
   */
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
