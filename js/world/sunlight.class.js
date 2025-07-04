class Sunlight extends DrawableObject {

  IMAGE_LIGHT = [
    './img/backgrounds/light/complete.png',
  ];

  constructor() {
    super();
    this.loadImage(this.IMAGE_LIGHT);
    this.x = 960;
    this.y = 0;
    this.width = 1920;
    this.height = 360;

    this.baseOpacity = 0.7;
    this.opacityFluctuation = 0.3;
    this.currentOpacity = this.baseOpacity;
  }

  animate() {
    let time = Date.now() / 500;
    this.currentOpacity = this.baseOpacity + Math.sin(time) * this.opacityFluctuation;
  }
}

