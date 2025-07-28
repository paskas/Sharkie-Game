class PoisenFlask extends MovableObject {
  isLost = false;
  animationInterval = null;
  flaskDropTimeout = null;
  static flaskCount = 0;

  IMAGES_FLASKS = [
    './img/UI/poison_flasks/poison_flask_animated/1.png',
    './img/UI/poison_flasks/poison_flask_animated/2.png',
    './img/UI/poison_flasks/poison_flask_animated/3.png',
    './img/UI/poison_flasks/poison_flask_animated/4.png',
    './img/UI/poison_flasks/poison_flask_animated/5.png',
    './img/UI/poison_flasks/poison_flask_animated/6.png',
    './img/UI/poison_flasks/poison_flask_animated/7.png',
    './img/UI/poison_flasks/poison_flask_animated/8.png'
  ];

  IMAGES_FLASKLEFT = [
    './img/UI/poison_flasks/poison_flask_left_right/poison_flask_dark_left.png',
  ];

  IMAGES_FLASKRIGHT = [
    './img/UI/poison_flasks/poison_flask_left_right/poison_flask_dark_right.png',
  ];

  constructor(x, y, variant) {
    super()
    this.x = x;
    this.y = y;
    this.variant = variant;
    this.width = 70;
    this.height = 95;

    this.img = new Image();
    this.initFlaskImage();
  }

  initFlaskImage() {
    if (this.variant === 'left') {
      this.loadImage(this.IMAGES_FLASKLEFT);
    } else if (this.variant === 'right') {
      this.loadImage(this.IMAGES_FLASKRIGHT);
    } else if (this.variant === 'animated') {
      this.loadImages(this.IMAGES_FLASKS);
    }
  }

  startAnimationFlask() {
    if (this.animationInterval) return;
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_FLASKS);
    }, 1000 / 8);
  }

  animateFlaskDrop() {
    if (this.variant === 'animated') {
      this.startAnimationFlask();
      this.flaskDropTimeout = setTimeout(() => {
        clearInterval(this.animationInterval);
        this.world.level.poisonFlasks = this.world.level.poisonFlasks.filter(f => f !== this);
      }, 1500);
    }
  }

  startFallingFlask() {
    this.animateFlaskDrop();
    this.startArcMovement();
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  clearAllIntervals() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
    if (this.flaskDropTimeout) {
      clearTimeout(this.flaskDropTimeout);
      this.flaskDropTimeout = null;
    }
  }

  continueAllIntervals() {
    this.clearAllIntervals();
    if (this.variant === 'animated') {
      if (!this.img || !this.img.complete) {
        this.loadImages(this.IMAGES_FLASKS);
      }
      this.startAnimationFlask();
    }
  }
}