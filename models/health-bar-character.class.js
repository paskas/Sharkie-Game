class HealthBarCharacter extends DrawableObject {

  IMAGES_HEALTH = [
    './img/4_UI/healthbar/healthbar_0.png',
    './img/4_UI/healthbar/healthbar_20.png',
    './img/4_UI/healthbar/healthbar_40.png',
    './img/4_UI/healthbar/healthbar_60.png',
    './img/4_UI/healthbar/healthbar_80.png',
    './img/4_UI/healthbar/healthbar_100.png'
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.x = 0;
    this.y = -15;
    this.width = 290;
    this.height = 70;
    this.img = this.imageCache[this.IMAGES_HEALTH[Character.life]];
    this.updatingHealthBar();
  }

  updatingHealthBar() {
    setInterval(() => this.updateImagesHealth(), 1000 / 60);
  }

  updateImagesHealth() {
    this.img = this.imageCache[this.IMAGES_HEALTH[Character.life]];
  }
}