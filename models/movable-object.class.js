class MovableObject {
  x = 0;
  y = 200;
  img;
  height = 200;
  width = 220;
  imageCache = [];

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
    console.log('Moving right');
  }

  moveLeft() {
    console.log('Moving left');
  }
}