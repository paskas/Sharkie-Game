/**
 * Represents any movable game object with position, movement logic, and collision handling.
 * Inherits from DrawableObject.
 */
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

  /**
   * Loops through a given image array to create an animation.
   * 
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Plays an animation once, then runs a callback.
   * 
   * @param {string[]} images - Array of image paths.
   * @param {Function} [callback] - Function to execute after animation ends.
   * @param {number} framerate - Interval delay in milliseconds between frames.
   */
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

  /**
   * Moves the object to the right based on its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left based on its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Moves the object upwards based on its speed.
   */
  moveUp() {
    this.y -= this.speed;
  }

  /**
   * Moves the object downwards based on its speed.
   */
  moveDown() {
    this.y += this.speed;
  }

  /**
   * Defines the vertical movement boundaries for the object.
   * 
   * @param {number} minY - Minimum Y coordinate.
   * @param {number} maxY - Maximum Y coordinate.
   */
  setMovementRange(minY, maxY) {
    this.minY = minY;
    this.maxY = maxY;
  }

  /**
   * Calculates the X and Y distance from the object to the character.
   * 
   * @returns {{distanceX: number, distanceY: number}} Distance to character.
   */
  getDistanceToCharacter() {
    let char = this.world.character.getMainHitbox();
    let object = this.getMainHitbox();
    return {
      distanceX: char.x - object.x,
      distanceY: char.y - object.y
    };
  }

  /**
   * Returns normalized direction based on input values.
   * 
   * @param {number} x - X distance or delta.
   * @param {number} y - Y distance or delta.
   * @returns {{directionX: number, directionY: number}} Normalized direction vector.
   */
  getMoveDirection(x, y) {
    return {
      directionX: x !== 0 ? x / Math.abs(x) : 0,
      directionY: y !== 0 ? y / Math.abs(y) : 0
    };
  }

  /**
   * Starts an arc-like movement using gravity and direction.
   * Clears any previous gravity intervals.
   */
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

  /**
   * Checks if the object is currently above the ground.
   * 
   * @returns {boolean} True if above ground, otherwise false.
   */
  isAboveGround() {
    return this.y + this.height < 540;
  }

  /**
   * Starts a loop that moves the object upward continuously if it's dead.
   */
  ifDeadMoveUp() {
    if (this.deadMoveInterval) clearInterval(this.deadMoveInterval);
    this.deadMoveInterval = setInterval(() => {
      if (this.dead) {
        this.y -= 2.5;
      }
    }, 1000 / 60);
  }

  /**
   * Clears all movement and animation-related intervals and timeouts.
   */
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

  /**
   * Checks if the current object collides with another movable object.
   * 
   * @param {MovableObject} mo - The other object to check against.
   * @returns {boolean} True if objects collide, false otherwise.
   */
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

  /**
   * Handles logic when the character gets hit by an enemy.
   * Applies damage and effects depending on the enemy state.
   * 
   * @param {object} enemy - The enemy object causing the hit.
   */
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

  /**
   * Applies damage to the character based on the enemy type and state.
   * 
   * @param {object} enemy - The enemy object.
   */
  charakterDamage(enemy) {
    if (enemy instanceof JellyFishManager && enemy.isElectricActive) {
      Character.life -= 2;
    } else {
      Character.life--;
    }
  }

  /**
   * Checks if the character's life has reached zero and triggers death sequence.
   */
  checkCharDeath() {
    if (Character.life <= 0 && !this.dead) {
      this.die();
    }
  }

  /**
   * Determines whether the character is currently invulnerable due to recent hit.
   * 
   * @returns {boolean} True if in damage cooldown, false otherwise.
   */
  isInDamagePhase() {
    let timeSinceLastHit = new Date().getTime() - this.lastHit;
    return timeSinceLastHit < 1000;
  }

  /**
   * Applies poison hit effects to the character.
   * 
   * @param {object} enemy - The enemy that inflicted poison.
   */
  poisonHit(enemy) {
    if (enemy.poisoned) {
      this.isPoisendByHit = true;
      this.isShockByHit = false;
      soundManager.playSound('../assets/audio/enemies/hurt_char_poisen.wav')
    }
  }

  /**
   * Applies electric shock effects to the character.
   * 
   * @param {object} enemy - The enemy that inflicted shock.
   */
  shockHit(enemy) {
    if (enemy.shock) {
      this.isPoisendByHit = false;
      this.isShockByHit = true;
      this.losePoisonFlask();
      soundManager.playSound('../assets/audio/enemies/electricShock.mp3')
    }
  }

  /**
   * Handles losing a poison flask when shocked, spawning a falling flask in the world.
   */
  losePoisonFlask() {
    if (PoisenFlask.flaskCount <= 0) return;
    PoisenFlask.flaskCount--;
    let flask = new PoisenFlask(this.x, this.y, 'animated');
    flask.isLost = true;
    flask.world = this.world;
    flask.startFallingFlask();
    this.world.level.poisonFlasks.push(flask);
    soundManager.playSound('../assets/audio/character/lose_poisonFlask.mp3')
  }

  /**
   * Triggers the death sequence for the object, including animations and end screen display.
   */
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