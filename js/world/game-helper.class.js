class GameHelper {

  static offsetClassMap = {
    PoisenFlask: {
      left: 'PoisenFlaskLeft',
      right: 'PoisenFlaskRight',
      animated: 'PoisenFlask'
    }
  };

  static resolveOffsetClassName(obj) {
    let className = obj.constructor.name;
    if (this.offsetClassMap[className] && obj.variant) {
      return this.offsetClassMap[className][obj.variant] || className;
    }
    return className;
  }

  constructor(world) {
    this.world = world;
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
      width: this.world.character.width - offset.left - offset.right,
      height: this.world.character.height - offset.top - offset.bottom
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