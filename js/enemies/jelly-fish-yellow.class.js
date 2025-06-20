class JellyFishYellow extends MovableObject {
  x = 440;
  y = 240;
  height = 140;
  width = 100;
  shock = true;

  IMAGES_DEFAULT = [
    './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/default_damage/1.png',
    './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/default_damage/2.png',
    './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/default_damage/3.png',
    './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/default_damage/4.png'
  ];

  constructor() {
    super();
    this.x = 1200 + Math.random() * 200;
    this.y = this.findFreeCoordinate(
      this.height + 10,
      40,
      380,
      30,
      EnemyPositionManager.isYAvailable,
      EnemyPositionManager.registerY
    );
    this.speed = 0.40 + Math.random() * 0.30;

    this.loadImage('./img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/default_damage/1.png');
    this.loadImages(this.IMAGES_DEFAULT);
    this.animate();
  }

  animate() {
    this.animationLoop();
    this.moveJelly();
  }

  animationLoop() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_DEFAULT)
    }, 200);
  }
}

