class World {
  character = new Character();
  gameStarted = false;
  level = new Level({ green: 5, red: 3, orange: 2 }, { purple: 3, yellow: 3 }, 1, 1, new Endboss());
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthBarCharacter = new HealthBarCharacter();
  shootingObject = [];
  lastBubbleTime = Date.now();

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.startWorldLoop();
  }

  startWorldLoop() {
    setInterval(() => {
      this.checkCharacterEnemyCollisions();
      this.checkShootingObject();
      this.removeOffScreenBubbles();
      this.level.sunlights.forEach(s => s.animate());
    }, 1000 / 60);
  }

  checkShootingObject() {
    if (this.canShootBubble()) {
      const bubble = this.createBubble();
      this.shootingObject.push(bubble);
      this.lastBubbleTime = Date.now();
    }
  }

  canShootBubble() {
    const now = Date.now();
    const shootPressed = this.keyboard.SHOOT;
    const enoughTimePassed = now - this.lastBubbleTime > 1500;
    return shootPressed && !this.otherDirection && enoughTimePassed;
  }

  createBubble() {
    const x = this.character.otherDirection
      ? this.character.x
      : this.character.x + this.character.width - 50;
    const y = this.character.y + this.character.height / 2;
    return new ShootingObject(this.character, x, y, this.character.otherDirection);
  }
  
  removeOffScreenBubbles() {
    this.level.enemies = this.level.enemies.filter(enemy => enemy.y <= 1000);
  }

  checkCharacterEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit(enemy);
      }
    });
  }

  isCollidingWithObject(targetX, targetY, objectsToCheck) {
    const charHitbox = this.calculateCharacterHitbox(targetX, targetY);
    for (let obj of objectsToCheck) {
      const hitboxes = this.getHitboxes(obj);
      if (this.hitboxCollidesWithAny(charHitbox, hitboxes)) {
        return true;
      }
    }
    return false;
  }

  calculateCharacterHitbox(targetX, targetY) {
    const offset = DrawableObject.offsets.Character;
    return {
      x: targetX + offset.left,
      y: targetY + offset.top,
      width: this.character.width - offset.left - offset.right,
      height: this.character.height - offset.top - offset.bottom
    };
  }

  getHitboxes(obj) {
    return obj.getObjectHitboxes?.() || [obj.getObjectHitbox()];
  }

  hitboxCollidesWithAny(playerBox, targetBoxes) {
    return targetBoxes.some(targetBox => this.areHitboxesColliding(playerBox, targetBox));
  }

  areHitboxesColliding(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.sunlights);
    this.addObjectsToMap(this.level.barrier);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.shootingObject);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.healthBarCharacter);

    requestAnimationFrame(() => this.draw());
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o)
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    if (mo instanceof Sunlight) {
      this.flickerSunlight(this.ctx, mo)
    } else if (mo instanceof Character && mo.rotationAngle !== 0) {
      this.rotatedCharacter(this.ctx, mo)
    } else {
      mo.draw(this.ctx);
      mo.drawHitbox(this.ctx);
    }
    if (mo.otherDirection) {
      this.restoreImgae(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  restoreImgae(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  drawImageAtAngle(ctx, mo) {
    ctx.save();
    ctx.translate(mo.x + mo.width / 2, mo.y + mo.height / 2);
    ctx.rotate(mo.rotationAngle * Math.PI / 180);
    ctx.drawImage(mo.img, -mo.width / 2, -mo.height / 2, mo.width, mo.height);
    ctx.restore();
  }

  rotatedCharacter(ctx, character) {
    this.drawImageAtAngle(ctx, character);
    character.drawHitbox(ctx);
  }

  flickerSunlight(ctx, sunlight) {
    ctx.save();
    ctx.globalAlpha = sunlight.currentOpacity;
    sunlight.draw(ctx);
    ctx.restore();
  }

}
