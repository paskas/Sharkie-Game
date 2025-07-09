class CollisionHandler {

  constructor(world) {
    this.world = world;
  }

  checkCharacterEnemyCollisions() {
    this.world.level.enemies.forEach((enemy) => {
      if (enemy.canDealDmg && this.world.character.isColliding(enemy)) {
        this.world.character.charHitt(enemy);
      }
    });
  }

  checkBubbleEnemyCollisions() {
    this.world.shootingObject.forEach(bubble => {
      this.world.level.enemies.forEach(enemy => {
        if (!bubble.isColliding(enemy)) return;
        if (bubble.isColliding(enemy) && !(enemy instanceof Endboss)) {
          this.world.bubbleHandler.handleBubbleCollisionWithEnemy(bubble, enemy);
        }
        if (bubble.isColliding(enemy) && this.world.character.shootPoisend && enemy instanceof Endboss) {
          this.world.bubbleHandler.handleBubbleCollisionWithEndboss(bubble, enemy);
        }
      });
    });
  }

  checkCoinCollisions() {
    this.world.level.coins.forEach((coin, index) => {
      if (this.world.character.isColliding(coin)) {
        Coin.coinCount++;
        this.world.level.coins.splice(index, 1);
      }
    });
  }

  checkPoisenFlasksCollisions() {
    this.world.level.poisenFlasks.forEach((flask, index) => {
      if (flask.isLost) return;
      if (this.world.character.isColliding(flask)) {
        PoisenFlask.flaskCount++;
        this.world.level.poisenFlasks.splice(index, 1);
      }
    });
  }
}