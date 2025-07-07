class HealthBarCharacter extends DrawableObject {

  IMAGES_HEALTH = [
    './img/UI/healthbar/healthbar_char_0.png',
    './img/UI/healthbar/healthbar_char_20.png',
    './img/UI/healthbar/healthbar_char_40.png',
    './img/UI/healthbar/healthbar_char_60.png',
    './img/UI/healthbar/healthbar_char_80.png',
    './img/UI/healthbar/healthbar_char_100.png'
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.x = 0;
    this.y = -15;
    this.width = 290;
    this.height = 70;
    this.img = new Image();
    this.updatingHealthBar();
  }

  updatingHealthBar() {
    setInterval(() => this.updateImagesHealth(), 1000 / 60);
  }

  updateImagesHealth() {
    let image = this.imageCache[this.IMAGES_HEALTH[Character.life]];
    if (image) {
      this.img = image;
    }
  }

}