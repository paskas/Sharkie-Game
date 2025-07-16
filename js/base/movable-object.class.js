class MovableObject extends DrawableObject {
  speed = 0;
  speedY = 0;
  speedX = 0;
  minY = 30;
  maxY = 400;
  upwards = true;
  otherDirection = false;
  acceleration = 1.5;
  gravityInterval = null;

  energy = 100;
  lastHit = 0;
  dead = false;

  blocking_objects = [];

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playAnimationOnce(images, callback, framerate) {
    clearInterval(this.interval);
    let i = 0;
    let interval = setInterval(() => {
      this.img = this.imageCache[images[i]];
      i++;
      if (i >= images.length) {
        clearInterval(interval);
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

  moveUpAndDown() {
    setInterval(() => {
      if (this.upwards) {
        this.moveUp();
        if (this.y <= this.minY) {
          this.upwards = false;
        }
      } else {
        this.moveDown();
        if (this.y >= this.maxY) {
          this.upwards = true;
        }
      }
    }, 1000 / 60);
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
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y + this.height < 540;
  }

  ifDeadMoveUp() {
    setInterval(() => {
      if (this.dead) {
        this.y -= 2.5;
      }
    }, 1000 / 60);
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
        if (this instanceof Character) setTimeout(showEndscreen, 1000);
      }, 100);
    }
  }
}