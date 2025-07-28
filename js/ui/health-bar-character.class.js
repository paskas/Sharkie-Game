class HealthBarCharacter extends DrawableObject {
  updateInterval = null;

  IMAGES_HEALTH = [
    './img/UI/healthbar/healthbar_char_0.png',
    './img/UI/healthbar/healthbar_char_20.png',
    './img/UI/healthbar/healthbar_char_40.png',
    './img/UI/healthbar/healthbar_char_60.png',
    './img/UI/healthbar/healthbar_char_80.png',
    './img/UI/healthbar/healthbar_char_100.png'
  ];

  constructor(character) {
    super();
    this.character = character;
    this.x = 0;
    this.y = -15;
    this.width = 290;
    this.height = 70;

    this.img = new Image();
    this.loadImages(this.IMAGES_HEALTH);
    this.updatingHealthBar();
  }

  updatingHealthBar() {
    if (this.updateInterval) return;
    this.updateInterval = setInterval(() => this.updateImagesHealth(), 1000 / 60);
  }

  updateImagesHealth() {
    let image = this.imageCache[this.IMAGES_HEALTH[Character.life]];
    if (image) {
      this.img = image;
    }
  }

  clearAllIntervals() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }
  continueAllIntervals() {
    this.clearAllIntervals();
    this.updatingHealthBar();
  }
}