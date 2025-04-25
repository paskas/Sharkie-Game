class MovableObject {
  x = 0;
  y = 200;
  img;
  height = 200;
  width = 220;

  loadImage(path){
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    console.log('Moving right');
  }
  
  moveLeft(){
    console.log('Moving left');
  }
}