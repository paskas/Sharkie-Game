class Sunlight extends MovableObject {
  y = 0;
  x = 200;
  height = 280;
  width = 960;

  IMAGE_LIGHT = [
    './img/backgrounds/light/complete.png',
  ];

  constructor() {
    super();
    this.loadImage(this.IMAGE_LIGHT);
 
  }


}

