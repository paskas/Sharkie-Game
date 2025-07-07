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
}