class BubbleHandler {
  lastBubbleHit = 0;

  constructor(world) {
    this.world = world;
  }

  handleBubbleCollisionWithEnemy(bubble, enemy) {
    this.handleBubbleHit(bubble);
    enemy.canDealDmg = false;
    enemy.die();
    this.world.removeEnemy(enemy);
  }

  handleBubbleCollisionWithEndboss(bubble, enemy) {
    this.handleBubbleHit(bubble);
    enemy.bossHit();
  }

  handleBubbleHit(bubble) {
    if (this.lastBubbleHit < (Date.now() - 1000 / 5)) {
      this.lastBubbleHit = Date.now();
      clearInterval(bubble.interval);
      this.setOffsetBubble(bubble);
      bubble.splashBubble(() => {
        this.removeBubble(bubble);
      });
    }
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