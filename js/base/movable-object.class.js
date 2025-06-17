class MovableObject extends DrawableObject {
  speed = 0;
  otherDirection = false;
  acceleratiion = 1.5;
  energy = 100;
  lastHit = 0;

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
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

  hit(enemy) {
    if (!this.isInDamagePhase()) {
      if (enemy.poisend) {
        this.poisenHit(enemy);
      } else if (enemy.shock) {
        this.shockHit(enemy);
      }
      this.lastHit = new Date().getTime();
      Character.life--;
    }
  }

  isInDamagePhase() {
    let timeSinceLastHit = new Date().getTime() - this.lastHit;
    return timeSinceLastHit < 1000;
  }

  poisenHit(enemy) {
    if (enemy.poisend) {
      this.poisend = true;
      this.shock = false;
    }
  }

  shockHit(enemy) {
    if (enemy.shock) {
      this.poisend = false;
      this.shock = true;
    }
  }

  isDead() {
    return Character.life == 0;
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