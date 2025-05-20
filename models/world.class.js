class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit(enemy);
          console.log('hurt', Character.life);
        }
      });
    }, 100);
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

    this.ctx.translate(-this.camera_x, 0)

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
