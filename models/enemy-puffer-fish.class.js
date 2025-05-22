class PufferFish extends MovableObject {
  x = 240;
  y = 240;
  height = 110;
  width = 140;
  poisend = true;

  IMAGES_STAND = [
    './img/enemies/puffer_fish(3_options)/swim/swim_green1.png',
    './img/enemies/puffer_fish(3_options)/swim/swim_green2.png',
    './img/enemies/puffer_fish(3_options)/swim/swim_green3.png',
    './img/enemies/puffer_fish(3_options)/swim/swim_green4.png',
    './img/enemies/puffer_fish(3_options)/swim/swim_green5.png'
  ];

  constructor() {
    super().loadImage('./img/enemies/puffer_fish(3_options)/swim/swim_green1.png');
    this.x = 250 + Math.random() * 500;
    this.loadImages(this.IMAGES_STAND);
    this.animate();
    this.speed = 0.15 + Math.random() * 0.30;
    this.x = 2200 + Math.random() * 500;
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    setInterval(() => {
      this.playAnimation(this.IMAGES_STAND)
    }, 200);
  }
}