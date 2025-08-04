/**
 * Handles all interactions between bubbles and enemies, including collision logic, damage application,
 * and removing used bubbles from the world.
 */
class BubbleHandler {

  /**
   * @param {World} world - The current game world instance used for manipulating objects.
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Handles collision of a bubble with a regular enemy.
   * Marks the bubble as used, plays the splash animation, and applies damage logic.
   *
   * @param {Bubble} bubble - The bubble that collided.
   * @param {MovableObject} enemy - The enemy that was hit.
   */
  handleBubbleCollisionWithEnemy(bubble, enemy) {
    if (bubble.isUsed) return;
    bubble.isUsed = true;
    this.handleBubbleHit(bubble);
    this.handleBubbleDamage(enemy);
  }

  /**
   * Handles collision of a bubble with the Endboss.
   * Differentiates between poison and normal bubbles and applies damage accordingly.
   *
   * @param {Bubble} bubble - The bubble that collided.
   * @param {Endboss} enemy - The Endboss instance.
   */
  handleBubbleCollisionWithEndboss(bubble, enemy) {
    if (bubble.isUsed || !enemy.canTakeDmg) return;
    bubble.isUsed = true;
    this.handleBubbleHit(bubble);
    if (Endboss.life <= 0 || enemy.dead) return;
    if (bubble.isPoisenBubble) {
      enemy.handlePoisenBubbleHit();
    } else {
      enemy.handleBubbleHit();
    }
  }

  /**
   * Determines the correct damage method based on enemy type and state (electric, bubble, etc.).
   *
   * @param {MovableObject} enemy - The enemy that was hit.
   */
  handleBubbleDamage(enemy) {
    if (!enemy.canDealDmg) return;
    if (enemy instanceof JellyFishManager && enemy.isElectricActive) {
      this.damageElectricJelly(enemy);
      return;
    }
    if (enemy instanceof PufferFishManager && enemy.isBubbleActive) {
      this.damageBubblePuffer(enemy);
      return;
    }
    this.handleEnemyKill(enemy);
  }

  /**
   * Reduces shockLife from electric jellyfish and handles its death if depleted.
   *
   * @param {JellyFishManager} enemy - Electric jellyfish enemy.
   */
  damageElectricJelly(enemy) {
    enemy.shockLife--;
    if (enemy.shockLife <= 0) {
      enemy.clearJellyIntervals();
      this.handleEnemyKill(enemy);
    }
  }

  /**
   * Reduces bubbleLife from a PufferFish in active bubble state and handles death if life reaches zero.
   *
   * @param {PufferFishManager} enemy - PufferFish enemy.
   */
  damageBubblePuffer(enemy) {
    enemy.bubbleLife--;
    if (enemy.bubbleLife <= 0) {
      enemy.clearAnimationInterval();
      this.handleEnemyKill(enemy);
    }
  }

  /**
   * Handles enemy death by preventing further damage and removing it from the world.
   *
   * @param {MovableObject} enemy - The enemy to kill.
   */
  handleEnemyKill(enemy) {
    enemy.canDealDmg = false;
    enemy.die();
    this.world.removeEnemy(enemy);
  }

  /**
   * Stops the bubble's movement and triggers its splash animation.
   * Removes it from the world afterward.
   *
   * @param {Bubble} bubble - The bubble that hit an enemy.
   */
  handleBubbleHit(bubble) {
    clearInterval(bubble.interval);
    this.setOffsetBubble(bubble);
    bubble.splashBubble(() => {
      this.removeBubble(bubble);
    });
  }

  /**
   * Removes the bubble from the world's active shooting objects array.
   *
   * @param {Bubble} bubble - The bubble to remove.
   */
  removeBubble(bubble) {
    let bubbleIndex = this.world.shootingObject.indexOf(bubble);
    if (bubbleIndex !== -1) {
      this.world.shootingObject.splice(bubbleIndex, 1);
    }
  }

  /**
   * Offsets the bubble’s x-position based on its direction for visual effect before splash.
   *
   * @param {Bubble} bubble - The bubble to adjust.
   */
  setOffsetBubble(bubble) {
    let offset = -40
    bubble.x += bubble.otherDirection ? -offset : offset;
  }
}