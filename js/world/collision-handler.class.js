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
        if (enemy instanceof Endboss) {
          this.world.bubbleHandler.handleBubbleCollisionWithEndboss(bubble, enemy);
        } else {
          this.world.bubbleHandler.handleBubbleCollisionWithEnemy(bubble, enemy);
        }
      });
    });
  }

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