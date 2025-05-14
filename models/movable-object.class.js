class MovableObject {
  x = 0;
  y = 240;
  img;
  height = 200;
  width = 220;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleratiion = 1.5;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * 
   * @param {Array} arr - ['Imges'] 
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

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

  isAboveGround(){
    return this.y < 140;
  }
}