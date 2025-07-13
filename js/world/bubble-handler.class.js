class BubbleHandler {

  constructor(world) {
    this.world = world;
  }

  handleBubbleCollisionWithEnemy(bubble, enemy) {
    if (bubble.isUsed) return;
    bubble.isUsed = true;
    this.handleBubbleHit(bubble);
    this.handleBubbleDamage(enemy);
  }

  handleBubbleCollisionWithEndboss(bubble, enemy) {
    if (bubble.isUsed) return;
    bubble.isUsed = true;
    this.handleBubbleHit(bubble);
    enemy.bossHit();
  }

  handleBubbleDamage(enemy) {
    if (!enemy.canDealDmg) return;

    if (enemy instanceof JellyFishYellow || enemy instanceof JellyFishPurple) {
      if (enemy.isElectricActive) {
        enemy.shockLife--;
        if (enemy.shockLife <= 0) {
          enemy.clearJellyIntervals();
          this.handleEnemyKill(enemy);
        }
        return;
      }
    }
    this.handleEnemyKill(enemy);
  }

  handleEnemyKill(enemy) {
    enemy.canDealDmg = false;
    enemy.die();
    this.world.removeEnemy(enemy);
  }

  handleBubbleHit(bubble) {
    clearInterval(bubble.interval);
    this.setOffsetBubble(bubble);
    bubble.splashBubble(() => {
      this.removeBubble(bubble);
    });
  }

  removeBubble(bubble) {
    let bubbleIndex = this.world.shootingObject.indexOf(bubble);
    if (bubbleIndex !== -1) {
      this.world.shootingObject.splice(bubbleIndex, 1);
    }
  }

  setOffsetBubble(bubble) {
    let offset = -40
    bubble.x += bubble.otherDirection ? -offset : offset;
  }
}