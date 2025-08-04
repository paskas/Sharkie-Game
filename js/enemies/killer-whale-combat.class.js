/**
 * Handles combat and movement behavior for the killer whale endboss.
 */
class EndbossCombat {

  /**
 * Updates boss behavior: movement and attacks per frame.
 * @param {Endboss} boss
 * @param {number} frameTime
 */
  static updateCombatState(boss, frameTime) {
    if (boss.dead) return;
    const { distanceX, distanceY } = boss.getDistanceToCharacter();
    boss.otherDirection = distanceX > 0;
    EndbossCombat.moveTowardCharacter(boss, distanceX, distanceY, frameTime);
    EndbossCombat.tryAttack(boss, distanceX, distanceY, performance.now());
  }

  /**
   * Attempts to attack if character is in range and cooldown passed.
   * @param {Endboss} boss
   * @param {number} distanceX
   * @param {number} distanceY
   * @param {number} currentTime
   */
  static tryAttack(boss, distanceX, distanceY, currentTime) {
    if (!boss.isInAttackRange(distanceX, distanceY)) return;
    if (currentTime - boss.lastAttackTime <= boss.attackCooldown) return;
    boss.lastAttackTime = currentTime;
    EndbossCombat.initAttackPhase(boss);
  }

  /**
   * Prepares and executes the attack sequence.
   * @param {Endboss} boss
   */
  static initAttackPhase(boss) {
    if (boss.dead || boss.isInDamagePhase()) return;
    boss.clearAnimationFrameId();
    const { distanceX, distanceY } = boss.getDistanceToCharacter();
    const { directionX, directionY } = boss.getMoveDirection(distanceX, distanceY);
    EndbossCombat.moveIntoAttackPosition(boss, distanceX, distanceY, directionX, directionY);
    boss.startAttackAnimation();
  }

  /**
   * Moves the boss toward the character using follow speed.
   * @param {Endboss} boss
   * @param {number} x
   * @param {number} y
   * @param {number} frameTime
   */
  static moveTowardCharacter(boss, x, y, frameTime) {
    const collidingChar = boss.isColliding(boss.world.character);
    const moveStepX = boss.followSpeed * frameTime;
    const moveStepY = boss.followSpeed * frameTime;

    if (Math.abs(x) > 310) {
      x > 0 ? boss.bossMoveRight(moveStepX) : boss.bossMoveLeft(moveStepX);
    } else if (Math.abs(x) > 5 && !collidingChar) {
      boss.x += x > 0 ? moveStepX : -moveStepX;
    }

    if (Math.abs(y) > 140) {
      y > 0 ? boss.bossMoveDown(moveStepY) : boss.bossMoveUp(moveStepY);
    } else if (Math.abs(y) > 5 && !collidingChar) {
      boss.y += y > 0 ? moveStepY : -moveStepY;
    }
  }

  /**
   * Moves boss directly into attack position using offsets.
   * @param {Endboss} boss
   * @param {number} x
   * @param {number} y
   * @param {number} directionX
   * @param {number} directionY
   */
  static moveIntoAttackPosition(boss, x, y, directionX, directionY) {
    const offsetX = 260;
    const offsetY = 90;
    const moveX = Math.max(Math.abs(x) - offsetX, 0);
    const moveY = Math.abs(y) > offsetY ? Math.max(Math.abs(y) - offsetY, 0) : 0;
    boss.x += directionX * moveX;
    boss.y += directionY * moveY;
    boss.currentAnimation = 'attack';
  }
}