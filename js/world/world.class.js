class World {
  character = new Character();
  levelManager = new LevelManager();
  get level() {
    return this.levelManager.getCurrentLevel();
  }
  gameStarted = false;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthBarCharacter = new HealthBarCharacter();
  shootingObject = [];
  lastBubbleHit = 0;

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
      this.checkBubbleEnemyCollisions();
      this.handleLevelProgress();
      this.handleSunlightAnimate();
    }, 1000 / 60);
  }

  handleSunlightAnimate() {
    this.level.sunlights.forEach(s => s.animate());
  }

  checkBubbleEnemyCollisions() {
    this.shootingObject.forEach(bubble => {
      this.level.enemies.forEach(enemy => {
        if (bubble.isColliding(enemy) && !(enemy instanceof Endboss)) {
          this.handleBubbleCollisionWithEnemy(bubble, enemy);
        }
        if (bubble.isColliding(enemy) && this.character.shootPoisend && enemy instanceof Endboss) {
          this.handleBubbleCollisionWithEndboss(bubble, enemy);
        }
      });
    });
  }

  handleBubbleCollisionWithEnemy(bubble, enemy) {
    this.handleBubbleHit(bubble);
    enemy.dead = true;
    enemy.canDealDmg = false;
    enemy.ifDead();
    this.removeEnemy(enemy);
  }

  handleBubbleCollisionWithEndboss(bubble, enemy) {
    this.handleBubbleHit(bubble);
    enemy.bossHit();
  }

  handleBubbleHit(bubble) {
    if (this.lastBubbleHit < (Date.now() - 1000 / 5)) {
      this.lastBubbleHit = Date.now();
      clearInterval(bubble.interval);
      this.setOffsetBubble(bubble);
      bubble.splashBubble(() => {
        this.removeBubble(bubble);
      });
    }
  }

  removeBubble(bubble) {
    let bubbleIndex = this.shootingObject.indexOf(bubble);
    if (bubbleIndex !== -1) {
      this.shootingObject.splice(bubbleIndex, 1);
    }
  }

  removeEnemy(enemy) {
    setTimeout(() => {
      let enemyIndex = this.level.enemies.indexOf(enemy);
      if (enemyIndex !== -1) {
        this.level.enemies.splice(enemyIndex, 1);
      }
    }, 2500);
  }

  setOffsetBubble(bubble) {
    let offset = -40
    bubble.x += bubble.otherDirection ? -offset : offset;
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

  checkCharacterEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.canDealDmg && this.character.isColliding(enemy)) {
        this.character.charHitt(enemy);
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
    this.level.enemies.forEach(enemy => {
      enemy.world = this;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.sunlights);
    this.addObjectsToMap(this.level.barrier);
    this.addObjectsToMap(this.level.coin);
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
