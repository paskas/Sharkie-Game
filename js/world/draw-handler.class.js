/**
 * Handles drawing all game objects using requestAnimationFrame.
 * Optimized to prevent redundant draw calls and handle camera translation.
 */
class DrawHandler {

  animationFrameId = null;
  isDrawing = false;
  isActive = false;

  /**
   * Creates a new DrawHandler instance.
   * @param {World} world - The game world reference.
   */
  constructor(world) {
    this.world = world;
    this.ctx = world.ctx;
  }

  /**
   * Starts the continuous draw loop using requestAnimationFrame.
   * Prevents duplicate starts if already active.
   */
  startDrawLoop() {
    if (this.isActive) return;
    this.isActive = true;
    const loop = () => {
      if (!this.isActive) return;
      this.draw();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }
  
  /**
   * Stops the draw loop and cancels the animation frame.
   */
  stopDrawLoop() {
    this.isActive = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Renders the current frame: background, objects, character, UI.
   */
  draw() {
    if (this.isDrawing) return;
    this.isDrawing = true;

    this.ctx.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
    this.ctx.translate(this.world.camera_x, 0);

    this.addObjectsToMap(this.world.level.backgroundObjects);
    this.addObjectsToMap(this.world.level.sunlights);
    this.addObjectsToMap(this.world.level.barrier);
    this.addObjectsToMap(this.world.level.coins);
    this.addObjectsToMap(this.world.level.poisonFlasks);
    this.addObjectsToMap(this.world.level.enemies);
    this.addObjectsToMap(this.world.shootingObject);
    this.addToMap(this.world.character);

    this.ctx.translate(-this.world.camera_x, 0);
    this.addToMap(this.world.healthBarCharacter);
    this.world.drawEndbossHealthbar((obj) => this.addToMap(obj));
    this.world.coinCounter.draw(this.ctx, Coin.coinCount);
    this.world.poisonFlaskCounter.draw(this.ctx, PoisenFlask.flaskCount);

    this.isDrawing = false;
  }

  /**
   * Returns the current health of the Endboss if present.
   * @returns {number|string} - Life value or '-' if no boss is found.
   */
  getEndbossLife() {
    const boss = this.world.level.enemies.find(e => e instanceof Endboss);
    return boss ? boss.life : '-';
  }

  /**
   * Draws an array of objects to the canvas.
   * @param {DrawableObject[]} objects - Objects to render.
   */
  addObjectsToMap(objects) {
    objects.forEach(obj => this.addToMap(obj));
  }

  /**
   * Draws a single object, handling flipping and special cases like rotation.
   * @param {DrawableObject} mo - The object to draw.
   */
  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    if (mo instanceof Sunlight) {
      this.flickerSunlight(this.ctx, mo);
    } else if (mo instanceof Character && mo.rotationAngle !== 0) {
      this.rotatedCharacter(this.ctx, mo);
    } else {
      // mo.drawFrame(this.ctx); // Show frame (debug only)
      mo.draw(this.ctx);
      if (mo.showHitbox) mo.drawHitbox(this.ctx);
    }
    if (mo.otherDirection) this.restoreImage(mo);
  }

  /**
   * Flips the context horizontally and adjusts object position.
   * @param {DrawableObject} mo - The object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the flipped context and reverts object position.
   * @param {DrawableObject} mo - The object to restore.
   */
  restoreImage(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Draws the character with rotation applied.
   * @param {CanvasRenderingContext2D} ctx - The rendering context.
   * @param {Character} character - The character to draw.
   */
  rotatedCharacter(ctx, character) {
    ctx.save();
    ctx.translate(character.x + character.width / 2, character.y + character.height / 2);
    ctx.rotate(character.rotationAngle * Math.PI / 180);
    ctx.drawImage(character.img, -character.width / 2, -character.height / 2, character.width, character.height);
    ctx.restore();
  }

  /**
   * Applies flickering effect and draws the sunlight object.
   * @param {CanvasRenderingContext2D} ctx - The rendering context.
   * @param {Sunlight} sunlight - The sunlight object to draw.
   */
  flickerSunlight(ctx, sunlight) {
    ctx.save();
    ctx.globalAlpha = sunlight.currentOpacity;
    sunlight.draw(ctx);
    ctx.restore();
  }
}