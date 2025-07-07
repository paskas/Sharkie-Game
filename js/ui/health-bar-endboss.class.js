class HealthBarEndboss extends DrawableObject {

  IMAGES_HEALTH = [
    './img/UI/healthbar/healthbar_boss_0.png',
    './img/UI/healthbar/healthbar_boss_20.png',
    './img/UI/healthbar/healthbar_boss_40.png',
    './img/UI/healthbar/healthbar_boss_60.png',
    './img/UI/healthbar/healthbar_boss_80.png',
    './img/UI/healthbar/healthbar_boss_100.png'
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.x = 650;
    this.y = -15;
    this.width = 300;
    this.height = 70;
    this.img = new Image();
    this.updatingHealthBar();
  }

  updatingHealthBar() {
    setInterval(() => this.updateImagesHealth(), 1000 / 60);
  }

  updateImagesHealth() {
    let image = this.imageCache[this.IMAGES_HEALTH[Endboss.life]];
    if (image) {
      this.img = image;
    }
  }
}