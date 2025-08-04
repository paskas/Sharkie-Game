/**
 * Utility class for game-specific calculations like hitbox collision,
 * object classification, and free coordinate generation.
 */
class GameHelper {

  static offsetClassMap = {
    PoisenFlask: {
      left: 'PoisenFlaskLeft',
      right: 'PoisenFlaskRight',
      animated: 'PoisenFlask'
    }
  };

  /**
   * Creates an instance of GameHelper.
   * @param {World} world - The game world context.
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Returns the resolved class name for a given object,
   * accounting for special variants (e.g., left/right flasks).
   * @param {Object} obj - The object to evaluate.
   * @returns {string} - Resolved class name string.
   */
  static resolveOffsetClassName(obj) {
    let className = obj.constructor.name;
    if (this.offsetClassMap[className] && obj.variant) {
      return this.offsetClassMap[className][obj.variant] || className;
    }
    return className;
  }

  /**
   * Checks if a character at a target position collides with any object in a given list.
   * @param {number} targetX - Target X position of the character.
   * @param {number} targetY - Target Y position of the character.
   * @param {Object[]} objectsToCheck - List of objects to check collision with.
   * @returns {boolean} - True if a collision is detected, otherwise false.
   */
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

  /**
   * Calculates the character's hitbox based on offsets and target position.
   * @param {number} targetX - X position of the character.
   * @param {number} targetY - Y position of the character.
   * @returns {{x: number, y: number, width: number, height: number}} - Character's hitbox.
   */
  calculateCharacterHitbox(targetX, targetY) {
    const offset = DrawableObject.offsets.Character;
    return {
      x: targetX + offset.left,
      y: targetY + offset.top,
      width: this.world.character.width - offset.left - offset.right,
      height: this.world.character.height - offset.top - offset.bottom
    };
  }

  /**
   * Retrieves one or more hitboxes from an object.
   * @param {Object} obj - Game object that has a hitbox.
   * @returns {Array} - An array of hitbox objects.
   */
  getHitboxes(obj) {
    return obj.getObjectHitboxes?.() || [obj.getObjectHitbox()];
  }

  /**
   * Checks if a player hitbox collides with any of the given target hitboxes.
   * @param {Object} playerBox - The character's hitbox.
   * @param {Object[]} targetBoxes - Array of target hitboxes.
   * @returns {boolean} - True if a collision is detected.
   */
  hitboxCollidesWithAny(playerBox, targetBoxes) {
    return targetBoxes.some(targetBox => this.areHitboxesColliding(playerBox, targetBox));
  }

  /**
   * Determines if two hitboxes are colliding.
   * @param {{x: number, y: number, width: number, height: number}} a - First hitbox.
   * @param {{x: number, y: number, width: number, height: number}} b - Second hitbox.
   * @returns {boolean} - True if the hitboxes overlap.
   */
  areHitboxesColliding(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
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
}