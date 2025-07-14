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
    if (bubble.isPoisenBubble) {
      enemy.handlePoisenBubbleHit();
    } else {
      enemy.handleBubbleHit();
    }
  }

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

  damageElectricJelly(enemy) {
    enemy.shockLife--;
    if (enemy.shockLife <= 0) {
      enemy.clearJellyIntervals();
      this.handleEnemyKill(enemy);
    }
  }

  damageBubblePuffer(enemy) {
    enemy.bubbleLife--;
    if (enemy.bubbleLife <= 0) {
      enemy.clearAnimationInterval();
      this.handleEnemyKill(enemy);
    }
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