class BarrierReef extends DrawableObject {

  IMAGE_BARRIER = [
    './img/backgrounds/barrier_reef/1.png',
  ];

  constructor() {
    super();
    this.loadImage(this.IMAGE_BARRIER);
    this.x = 1440;
    this.y = 0;
    this.width = 960;
    this.height = 540;

    this.baseOpacity = 0.7;
    this.opacityFluctuation = 0.3;
    this.currentOpacity = this.baseOpacity;
  }

  animate() {
    let time = Date.now() / 500;
    this.currentOpacity = this.baseOpacity + Math.sin(time) * this.opacityFluctuation;
  }
}

