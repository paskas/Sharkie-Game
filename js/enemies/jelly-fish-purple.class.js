class JellyFishPurple extends MovableObject {
  height = 140;
  width = 100;
  shock = true;

  IMAGES_DEFAULT = [
    './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/default_damage/1.png',
    './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/default_damage/2.png',
    './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/default_damage/3.png',
    './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/default_damage/4.png',
  ];

  IMAGES_DEFAULTDEAD = [
    './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/dead/purple1.png',
    './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/dead/purple2.png',
    './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/dead/purple3.png',
    './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/dead/purple4.png',
  ];

  constructor(x = 600 + Math.random() * 200) {
    super();
    this.x = x;
    this.y = this.findFreeCoordinate(
      this.height + 10,
      40,
      380,
      30,
      EnemyPositionManager.isYAvailable,
      EnemyPositionManager.registerY
    );
    this.speed = 0.40 + Math.random() * 0.30;

    this.loadImage('./img/enemies/jelly_fish_(2_options)/jelly_fish_purple/default_damage/1.png');
    this.loadImages(this.IMAGES_DEFAULT);
    this.loadImages(this.IMAGES_DEFAULTDEAD);
    this.animate();
  }

  animate() {
    this.animationLoop();
    this.moveUpAndDown();
    this.ifDead();
  }

  animationLoop() {
    this.swimJelly();
  }

  swimJelly() {
    setInterval(() => {
      if (!this.dead) {
        this.playAnimation(this.IMAGES_DEFAULT)
      }
    }, 200);
  }

  ifDead() {
    setInterval(() => {
      if (this.dead) {
        this.playAnimation(this.IMAGES_DEFAULTDEAD)
        this.ifDeadMoveUp();
      }
    }, 200);
  }
}

