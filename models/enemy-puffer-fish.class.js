class PufferFish extends MovableObject {
  x = 240;
  y = 240;
  height = 100;
  width = 100;

  IMAGES_STAND = [
    './img/2_Enemy/1_PufferFish_(3_options)/1_Swim/1.swim1.png',
    './img/2_Enemy/1_PufferFish_(3_options)/1_Swim/1.swim2.png',
    './img/2_Enemy/1_PufferFish_(3_options)/1_Swim/1.swim3.png',
    './img/2_Enemy/1_PufferFish_(3_options)/1_Swim/1.swim4.png',
    './img/2_Enemy/1_PufferFish_(3_options)/1_Swim/1.swim5.png'
  ];

  constructor() {
    super().loadImage('./img/2_Enemy/1_PufferFish_(3_options)/1_Swim/1.swim1.png');
    // this.x = 250 + Math.random() * 500;
    this.loadImages(this.IMAGES_STAND);
    this.animate();
    this.speed = 0.15 + Math.random() * 0.30;
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