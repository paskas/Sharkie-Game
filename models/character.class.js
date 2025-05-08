class Character extends MovableObject {
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
      if (this.world.keyboard.RIGHT) {
        this.x += this.speed;
      }
      if (this.world.keyboard.LEFT) {
        this.x -= this.speed;
      }
      if (this.world.keyboard.UP) {
        this.y -= this.speed;
      }
      if (this.world.keyboard.DOWN) {
        this.y += this.speed;
      }
    }, 1000 / 60);

    setInterval(() => {
      let images;
      if (this.isMoving()) {
        images = this.IMAGES_SWIM;
      } else {
        images = this.IMAGES_STAND;
      }
      let i = this.currentImage % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 100);
  }

  isMoving() {
    if (this.world.keyboard.LEFT) {
      this.otherDirection = true;
    }
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN;
  }

  jump() {

  }
}