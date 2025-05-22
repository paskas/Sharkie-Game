class JellyFish extends MovableObject {
  x = 440;
  y = 240;
  height = 140;
  width = 100;
  shock = true;

  IMAGES_STAND = [
    './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/default_damage/1.png',
    './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/default_damage/2.png',
    './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/default_damage/3.png',
    './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/default_damage/4.png',
  ];

  constructor() {
    super().loadImage('./img/enemies/jelly_fish_(2_options)/jelly_fish_purple/default_damage/1.png');
    this.x = 200 + Math.random()*500;
    this.loadImages(this.IMAGES_STAND);
    this.animate();
    this.speed = 0.15 + Math.random() * 0.30;
    this.x = 2200 + Math.random() * 500;
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    setInterval(() => {
      this.playAnimation(this.IMAGES_STAND)
    }, 300);
  }
}

