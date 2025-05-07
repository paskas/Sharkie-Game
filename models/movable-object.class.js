class MovableObject {
  x = 0;
  y = 200;
  img;
  height = 200;
  width = 220;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;

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

  moveRight() {
    this.x += this.speed;
    console.log('Moving right');
  }

  moveLeft(){
    this.x -= this.speed;
  }
}