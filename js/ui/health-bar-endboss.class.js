class HealthBarEndboss extends DrawableObject {
  updateInterval = null;
  visible = false;

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
    this.x = 650;
    this.y = -15;
    this.width = 300;
    this.height = 70

    this.img = new Image();
    this.loadImages(this.IMAGES_HEALTH);
    this.updatingHealthBar();
  }

  updatingHealthBar() {
    if (this.updateInterval) return;
    this.updateInterval = setInterval(() => this.updateImagesHealth(), 1000 / 60);
  }

  updateImagesHealth() {
    let image = this.imageCache[this.IMAGES_HEALTH[Endboss.life]];
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