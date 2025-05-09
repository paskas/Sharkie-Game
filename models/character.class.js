class Character extends MovableObject {
  y = 200;
  speed = 7;

  IMAGES_STAND = [
    './img/1_Sharkie/1_IDLE/1.png',
    './img/1_Sharkie/1_IDLE/2.png',
    './img/1_Sharkie/1_IDLE/3.png',
    './img/1_Sharkie/1_IDLE/4.png',
    './img/1_Sharkie/1_IDLE/5.png',
    './img/1_Sharkie/1_IDLE/6.png',
    './img/1_Sharkie/1_IDLE/7.png',
    './img/1_Sharkie/1_IDLE/8.png',
    './img/1_Sharkie/1_IDLE/9.png',
    './img/1_Sharkie/1_IDLE/10.png',
    './img/1_Sharkie/1_IDLE/11.png',
    './img/1_Sharkie/1_IDLE/12.png',
    './img/1_Sharkie/1_IDLE/13.png',
    './img/1_Sharkie/1_IDLE/14.png',
    './img/1_Sharkie/1_IDLE/15.png',
    './img/1_Sharkie/1_IDLE/16.png',
    './img/1_Sharkie/1_IDLE/17.png',
    './img/1_Sharkie/1_IDLE/18.png'
  ];
  IMAGES_SWIM = [
    './img/1_Sharkie/3_Swim/1.png',
    './img/1_Sharkie/3_Swim/2.png',
    './img/1_Sharkie/3_Swim/3.png',
    './img/1_Sharkie/3_Swim/4.png',
    './img/1_Sharkie/3_Swim/5.png',
    './img/1_Sharkie/3_Swim/6.png'
  ];

  world;

  constructor() {
    super().loadImage('./img/1_Sharkie/1_IDLE/1.png');
    this.loadImages(this.IMAGES_STAND);
    this.loadImages(this.IMAGES_SWIM);
    this.animate();
  }

  animate() {

    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) this.x += this.speed;
      if (this.world.keyboard.LEFT && this.x > 0) this.x -= this.speed;
      if (this.world.keyboard.UP) this.y -= this.speed;
      if (this.world.keyboard.DOWN && this.y > 0) this.y += this.speed;
      this.world.camera_x = -this.x + 50;
    }, 1000 / 60);

    setInterval(() => {
      let images = this.isMoving() ? this.IMAGES_SWIM : this.IMAGES_STAND;
      let i = this.currentImage % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 100);
  }

  isMoving() {
    const kb = this.world.keyboard;
    if (kb.LEFT) this.otherDirection = true;
    if (kb.RIGHT) this.otherDirection = false;
    return kb.RIGHT || kb.LEFT || kb.UP || kb.DOWN;
  }
}