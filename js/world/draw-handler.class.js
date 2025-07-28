class DrawHandler {

  animationFrameId = null;
  isDrawing = false;
  isActive = false;

  constructor(world) {
    this.world = world;
    this.ctx = world.ctx;
  }

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

  stopDrawLoop() {
    this.isActive = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

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

  getEndbossLife() {
    const boss = this.world.level.enemies.find(e => e instanceof Endboss);
    return boss ? boss.life : '-';
  }

  addObjectsToMap(objects) {
    objects.forEach(obj => this.addToMap(obj));
  }

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

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  restoreImage(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  rotatedCharacter(ctx, character) {
    ctx.save();
    ctx.translate(character.x + character.width / 2, character.y + character.height / 2);
    ctx.rotate(character.rotationAngle * Math.PI / 180);
    ctx.drawImage(character.img, -character.width / 2, -character.height / 2, character.width, character.height);
    ctx.restore();
  }

  flickerSunlight(ctx, sunlight) {
    ctx.save();
    ctx.globalAlpha = sunlight.currentOpacity;
    sunlight.draw(ctx);
    ctx.restore();
  }
}