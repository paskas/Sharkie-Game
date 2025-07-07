class MovableObject extends DrawableObject {
  speed = 0;
  minY = 30;
  maxY = 400;
  upwards = true;
  otherDirection = false;
  acceleratiion = 1.5;
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
    this.y -= this.speed
  }

  moveDown() {
    this.y += this.speed
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

  ifDeadMoveUp() {
    setInterval(() => {
      if (this.dead) {
        this.y -= 0.5;
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
      if (enemy.poisend) {
        this.poisenHit(enemy);
      } else if (enemy.shock) {
        this.shockHit(enemy);
      }
      this.lastHit = new Date().getTime();
      Character.life--;
      if (this.world && this.world.handleDeath) {
        this.world.handleDeath();
      }
    }
  }

  bossHit() {
    if (!this.isInDamagePhase()) {
      this.lastHit = new Date().getTime();
      Endboss.life--;
      if (this.world && this.world.handleDeath) {
        this.world.handleDeath();
      }
    }
  }

  isInDamagePhase() {
    let timeSinceLastHit = new Date().getTime() - this.lastHit;
    return timeSinceLastHit < 1000;
  }

  poisenHit(enemy) {
    if (enemy.poisend) {
      this.isPoisendByHit = true;
      this.isShockByHit = false;
    }
  }

  shockHit(enemy) {
    if (enemy.shock) {
      this.isPoisendByHit = false;
      this.isShockByHit = true;
    }
  }

  die() {
    this.dead = true;
    if (this.playAnimationOnce) {
      this.playAnimationOnce(this.IMAGES_DEAD, () => {
        if (!(this instanceof Character) && !(this instanceof Endboss)) {
          this.ifDeadMoveUp();
        }
      }, 100);
    }
  }

  /**
  * Finds a free coordinate along a given axis (x or y), ensuring a minimum distance to existing values.
  * Falls back to a random value if no suitable position is found.
  *
  * @param {number} minDistance - Minimum distance required from other coordinates.
  * @param {number} min - Minimum allowed coordinate value.
  * @param {number} max - Maximum allowed coordinate value.
  * @param {number} interval - Step size between tested coordinate values.
  * @param {function(number, number): boolean} isAvailableFn - Function that checks if a value is available.
  * @param {function(number): void} registerFn - Function to register the chosen coordinate value.
  * @returns {number} A valid coordinate that does not violate the minimum distance rule.
  */
  findFreeCoordinate(minDistance, min, max, interval, isAvailableFn, registerFn) {
    const candidates = [];
    for (let v = min; v <= max; v += interval) {
      if (isAvailableFn.call(EnemyPositionManager, v, minDistance)) {
        candidates.push(v);
      }
    }
    const value = candidates.length > 0
      ? candidates[Math.floor(Math.random() * candidates.length)]
      : min + Math.floor(Math.random() * (max - min));
    registerFn.call(EnemyPositionManager, value);
    return value;
  }

  // applyGravity() {
  //   setInterval(() => {
  //     if (this.isAboveGround()) {
  //       this.y -= this.speedY;
  //       this.speedY -= this.acceleratiion;
  //     }
  //   }, 1000 / 25);
  // }

  // isAboveGround() {
  //   if (this instanceof ShootingObject) {
  //     return true;
  //   } else {
  //     return this.y < 140;
  //   }
  // }
}