class MovableObject {
  x = 200;
  y = 100;
  img;
  height = 250;
  width = 300;

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