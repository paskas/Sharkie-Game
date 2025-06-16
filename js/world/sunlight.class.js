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
    this.height = 240;

    this.baseOpacity = 0.7;
    this.opacityFluctuation = 0.3;
    this.currentOpacity = this.baseOpacity;
  }

  animate() {
    let time = Date.now() / 500;
    this.currentOpacity = this.baseOpacity + Math.sin(time) * this.opacityFluctuation;
  }

}

