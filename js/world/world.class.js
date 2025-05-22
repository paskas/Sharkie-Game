class World {
  character = new Character();
  level = level1;
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
      this.checkCollisions();
      this.checkShootingObject();
      this.removeOffScreenBubbles();
    }, 1000 / 60);
  }

  checkShootingObject() {
    let now = Date.now();
    if (!this.otherDirection && this.keyboard.SHOOT && now - this.lastBubbleTime > 1500) {
      let directionX;
      if (this.character.otherDirection) {
        directionX = this.character.x;
      } else {
        directionX = this.character.x + this.character.width - 50;
      }
      let bubble = new ShootingObject(
        this.character,
        directionX,
        this.character.y + this.character.height / 2,
        this.character.otherDirection
      );
      this.shootingObject.push(bubble);
      this.lastBubbleTime = now;
    }
  }

  removeOffScreenBubbles() {
    this.level.enemies = this.level.enemies.filter(enemy => enemy.y <= 1000);
  }

  checkCollisions() {
    this.checkCharacterEnemyCollisions();
  }

  checkCharacterEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit(enemy);
      }
    });
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.translate(this.camera_x, 0)

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.sunlights);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.shootingObject);

    this.ctx.translate(-this.camera_x, 0)

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
    if (mo instanceof Character && mo.rotationAngle !== 0) {
      this.drawImageAtAngle(mo);
      mo.drawFrame(this.ctx);
      mo.drawHitbox(this.ctx);
    } else {
      mo.draw(this.ctx);
      mo.drawFrame(this.ctx);
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

  drawImageAtAngle(mo) {
    this.ctx.save();
    this.ctx.translate(mo.x + mo.width / 2, mo.y + mo.height / 2);
    this.ctx.rotate(mo.rotationAngle * Math.PI / 180);
    this.ctx.drawImage(mo.img, -mo.width / 2, -mo.height / 2, mo.width, mo.height);
    this.ctx.restore();
  }
}
