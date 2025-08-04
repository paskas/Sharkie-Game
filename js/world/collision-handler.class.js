/**
 * Handles all collision detection and response logic in the game,
 * including character interactions with enemies, bubbles, coins, and poison flasks.
 */
class CollisionHandler {

  /**
   * Initializes the CollisionHandler with a reference to the game world.
   * 
   * @param {World} world - The main game world instance.
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Checks for collisions between the character and any enemy that can deal damage.
   * Triggers character hit logic if a collision occurs.
   */
  checkCharacterEnemyCollisions() {
    this.world.level.enemies.forEach((enemy) => {
      if (enemy.canDealDmg && this.world.character.isColliding(enemy)) {
        this.world.character.charHitt(enemy);
      }
    });
  }

  /**
   * Checks for collisions between bubbles and enemies.
   * Delegates the handling to the BubbleHandler depending on whether it's a normal enemy or the Endboss.
   */
  checkBubbleEnemyCollisions() {
    this.world.shootingObject.forEach(bubble => {
      this.world.level.enemies.forEach(enemy => {
        if (!bubble.isColliding(enemy)) return;
        if (enemy instanceof Endboss) {
          this.world.bubbleHandler.handleBubbleCollisionWithEndboss(bubble, enemy);
        } else {
          this.world.bubbleHandler.handleBubbleCollisionWithEnemy(bubble, enemy);
        }
      });
    });
  }

  /**
   * Checks for collisions between the character and coins.
   * Increases the coin count and potentially the flask count.
   * Removes collected coins and plays a sound.
   */
  checkCoinCollisions() {
    this.world.level.coins.forEach((coin, index) => {
      if (this.world.character.isColliding(coin)) {
        Coin.coinCount++;
        this.world.level.coins.splice(index, 1);
        if ([10, 20, 30].includes(Coin.coinCount)) {
          PoisenFlask.flaskCount++;
        }
        this.world.coinCounter.updateImage(Coin.coinCount);
        soundManager.playSound('../assets/audio/character/collectCoin.wav')
      }
    });
  }

  /**
   * Checks for collisions between the character and poison flasks.
   * Increases the flask count if collected and not lost.
   * Removes collected flasks and plays a sound.
   */

  checkPoisenFlasksCollisions() {
    this.world.level.poisonFlasks.forEach((flask, index) => {
      if (flask.isLost) return;
      if (this.world.character.isColliding(flask)) {
        PoisenFlask.flaskCount++;
        this.world.level.poisonFlasks.splice(index, 1);
        soundManager.playSound('../assets/audio/character/flaskBottle.wav')
      }
    });
  }
}