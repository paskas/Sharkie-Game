class MovableObject extends DrawableObject {
  speed = 0;
  speedY = 0;
  speedX = 0;
  minY = 30;
  maxY = 400;
  upwards = true;
  otherDirection = false;
  acceleration = 1.5;
  playOnceInterval = null;
  gravityInterval = null;
  deadMoveInterval = null;
  endScreenTimeout = null;

  lastHit = 0;
  dead = false;

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playAnimationOnce(images, callback, framerate) {
    if (this.playOnceInterval) clearInterval(this.playOnceInterval);
    let i = 0;
    this.playOnceInterval = setInterval(() => {
      this.img = this.imageCache[images[i]];
      i++;
      if (i >= images.length) {
        clearInterval(this.playOnceInterval);
        this.playOnceInterval = null;
        if (callback) callback();
      }
    }, framerate);
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveUp() {
    this.y -= this.speed;
  }

  moveDown() {
    this.y += this.speed;
  }

  setMovementRange(minY, maxY) {
    this.minY = minY;
    this.maxY = maxY;
  }

  getDistanceToCharacter() {
    let char = this.world.character.getMainHitbox();
    let object = this.getMainHitbox();
    return {
      distanceX: char.x - object.x,
      distanceY: char.y - object.y
    };
  }

  getMoveDirection(x, y) {
    return {
      directionX: x !== 0 ? x / Math.abs(x) : 0,
      directionY: y !== 0 ? y / Math.abs(y) : 0
    };
  }

  startArcMovement() {
    if (this.gravityInterval) clearInterval(this.gravityInterval);
    this.speedX = this.otherDirection ? -5.5 : 5.5;
    this.speedY = -12;
    this.gravityInterval = setInterval(() => {
      this.x += this.speedX;
      this.y += this.speedY;
      this.speedY += this.acceleration;
      if (!this.isAboveGround()) {
        clearInterval(this.gravityInterval);
        this.gravityInterval = null;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y + this.height < 540;
  }

  ifDeadMoveUp() {
    if (this.deadMoveInterval) clearInterval(this.deadMoveInterval);
    this.deadMoveInterval = setInterval(() => {
      if (this.dead) {
        this.y -= 2.5;
      }
    }, 1000 / 60);
  }

  clearAllIntervals() {
    if (this.playOnceInterval) {
      clearInterval(this.playOnceInterval);
      this.playOnceInterval = null;
    }
    if (this.gravityInterval) {
      clearInterval(this.gravityInterval);
      this.gravityInterval = null;
    }
    if (this.deadMoveInterval) {
      clearInterval(this.deadMoveInterval);
      this.deadMoveInterval = null;
    }
    if (this.endScreenTimeout) {
      clearTimeout(this.endScreenTimeout);
      this.endScreenTimeout = null;
    }
  }

  isColliding(mo) {
    let char = this.getObjectHitbox();
    let enemy = mo.getObjectHitbox();
    if (!char || !enemy) return false;
    return (
      char.x < enemy.x + enemy.width &&
      char.x + char.width > enemy.x &&
      char.y < enemy.y + enemy.height &&
      char.y + char.height > enemy.y
    );
  }

  charHitt(enemy) {
    if (!this.isInDamagePhase()) {
      if (enemy.poisoned) {
        this.poisonHit(enemy);
      } else if (enemy.shock) {
        this.shockHit(enemy);
      }
      this.lastHit = new Date().getTime();
      this.charakterDamage(enemy)
      this.checkCharDeath();
    }
  }

  charakterDamage(enemy) {
    if (enemy instanceof JellyFishManager && enemy.isElectricActive) {
      Character.life -= 2;
    } else {
      Character.life--;
    }
  }

  checkCharDeath() {
    if (Character.life <= 0 && !this.dead) {
      this.die();
    }
  }

  isInDamagePhase() {
    let timeSinceLastHit = new Date().getTime() - this.lastHit;
    return timeSinceLastHit < 1000;
  }

  poisonHit(enemy) {
    if (enemy.poisoned) {
      this.isPoisendByHit = true;
      this.isShockByHit = false;
    }
  }

  shockHit(enemy) {
    if (enemy.shock) {
      this.isPoisendByHit = false;
      this.isShockByHit = true;
      this.losePoisonFlask();
    }
  }

  losePoisonFlask() {
    if (PoisenFlask.flaskCount <= 0) return;
    PoisenFlask.flaskCount--;
    let flask = new PoisenFlask(this.x, this.y, 'animated');
    flask.isLost = true;
    flask.world = this.world;
    flask.startFallingFlask();
    this.world.level.poisonFlasks.push(flask);
  }

  die() {
    if (this.dead) return;
    this.dead = true;
    if (this.animationInterval) clearInterval(this.animationInterval);
    if (this.playAnimationOnce) {
      this.playAnimationOnce(this.IMAGES_DEAD, () => {
        this.ifDeadMoveUp();
        if (this instanceof Character || this instanceof Endboss) {
          this.endScreenTimeout = setTimeout(() => {
            showEndscreen(this instanceof Character ? 'gameOver' : 'complete');
          }, 1000);
        }
      }, 100);
    }
  }
}