class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
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

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround()) {
        this.y -= this.speedY;
        this.speedY -= this.acceleratiion;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 140;
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
      this.lastHit = new Date().getTime();
      Character.life--;
      if (enemy.poisend) {
        this.poisenHit(enemy);
      } else if (enemy.shock) {
        this.shockHit(enemy);
      }
      setTimeout(() => {
        this.poisend = false;
        this.shock = false;
      }, 1500);
    }
  }

  isInDamagePhase() {
    let timeSinceLastHit = new Date().getTime() - this.lastHit;
    return timeSinceLastHit < 1500;
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
}