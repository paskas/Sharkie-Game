class Sunlight extends DrawableObject {


  IMAGE_LIGHT = [
    './img/backgrounds/light/complete.png',
  ];

  constructor() {
    super();
    this.loadImage(this.IMAGE_LIGHT);
    this.x = -100;
    this.y = 0;
    this.width = 1160;
    this.height = 280;
  }
}

