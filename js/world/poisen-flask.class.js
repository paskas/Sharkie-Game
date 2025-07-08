class PoisenFlask extends MovableObject {

  static setFlask = 0;
  static flaskCount = 0;

  static flaskCoordinates = [
    { x: 890, y: 410 },
    { x: 1890, y: 300 }
  ];

  IMAGES_FLASKS = [
    './img/UI/poisen_flasks/poisen_flask_animated/1.png',
    './img/UI/poisen_flasks/poisen_flask_animated/2.png',
    './img/UI/poisen_flasks/poisen_flask_animated/3.png',
    './img/UI/poisen_flasks/poisen_flask_animated/4.png',
    './img/UI/poisen_flasks/poisen_flask_animated/5.png',
    './img/UI/poisen_flasks/poisen_flask_animated/6.png',
    './img/UI/poisen_flasks/poisen_flask_animated/7.png',
    './img/UI/poisen_flasks/poisen_flask_animated/8.png'
  ];

  IMAGES_FLASKLEFT = [
    './img/UI/poisen_flasks/poisen_flask_left_right/poisen_flask_dark_left.png',
  ];

  IMAGES_FLASKRIGHT = [
    './img/UI/poisen_flasks/poisen_flask_left_right/poisen_flask_dark_right.png',
  ];

  constructor(x = null, y = null) {
    super()
    this.setFlaskPosition(x, y)
    this.width = 70;
    this.height = 95;

    this.img = new Image();
    this.loadImages(this.IMAGES_FLASKS);
    this.loadImage(this.IMAGES_FLASKLEFT);
    this.loadImage(this.IMAGES_FLASKRIGHT);
    this.animate();
  }

  animate() {
    this.animationFlask();
  }

  animationFlask() {
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_FLASKS);
    }, 1000 / 8);
  }

  getFlaskCoordinates() {
    let position = PoisenFlask.flaskCoordinates[PoisenFlask.setFlask];
    PoisenFlask.setFlask++;
    return position;
  }

  setFlaskPosition(x, y) {
    if (x === null || y === null) {
      let position = this.getFlaskCoordinates();
      this.x = position.x;
      this.y = position.y;
    } else {
      this.x = x;
      this.y = y;
    }
  }
}