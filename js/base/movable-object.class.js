class MovableObject extends DrawableObject {
  // speedY = 0;
  speed = 0.15;
  otherDirection = false;
  acceleratiion = 1.5;
  energy = 100;
  lastHit = 0;

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  isColliding(mo) {
    let char = this.getObjectHitbox();
    let enemy = mo.getObjectHitbox();
    if (!char || !enemy) return false;
    return (
      char.x < enemy.x + enemy.width &&
      char.x + char.width > enemy.x &&
      char.y < enemy.y + enemy.height &&
      char.y + char.height > enemy.y
    );
  }

  hit(enemy) {
    if (!this.isInDamagePhase()) {
      if (enemy.poisend) {
        this.poisenHit(enemy);
      } else if (enemy.shock) {
        this.shockHit(enemy);
      }
      this.lastHit = new Date().getTime();
      Character.life--;
    }
  }

  isInDamagePhase() {
    let timeSinceLastHit = new Date().getTime() - this.lastHit;
    return timeSinceLastHit < 1000;
  }

  poisenHit(enemy) {
    if (enemy.poisend) {
      this.poisend = true;
      this.shock = false;
    }
  }

  shockHit(enemy) {
    if (enemy.shock) {
      this.poisend = false;
      this.shock = true;
    }
  }

  isDead() {
    return Character.life == 0;
  }

  // applyGravity() {
  //   setInterval(() => {
  //     if (this.isAboveGround()) {
  //       this.y -= this.speedY;
  //       this.speedY -= this.acceleratiion;
  //     }
  //   }, 1000 / 25);
  // }

  // isAboveGround() {
  //   if (this instanceof ShootingObject) {
  //     return true;
  //   } else {
  //     return this.y < 140;
  //   }
  // }
}