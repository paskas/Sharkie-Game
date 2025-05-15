class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleratiion = 1.5;

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
    let a = this.getObjectHitbox();
    let b = mo.getObjectHitbox();

    if (!a || !b) {
      return false;
    }

    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  isColliding(mo) {
    return this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height;
  }

  // isColliding(mo) {
  //   return this.x + this.width - this.offsets.right > mo.x + mo.offsets.left &&
  //     this.y + this.height - this.offsets.bottom > mo.y + mo.offsets.top &&
  //     this.x + this.offsets.left < mo.x + mo.width - mo.offsets.tight &&
  //     this.y + this.offsets.top < mo.y + mo.height - mo.offsets.bottom;
  // }
}