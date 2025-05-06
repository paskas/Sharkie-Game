class Character extends MovableObject {

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
  currentImage = 0;

  constructor() {
    super().loadImage('./img/1_Sharkie/1_IDLE/1.png');
    this.loadImages(this.IMAGES_STAND);
    this.animate();
  }

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_STAND.length; // 
      let path = this.IMAGES_STAND[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 200);
  }

  jump() {

  }
}