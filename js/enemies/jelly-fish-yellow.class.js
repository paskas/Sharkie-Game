class JellyFishYellow extends MovableObject {
  height = 140;
  width = 100;
  shock = true;

  IMAGES_DEFAULT = [
    './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/default_damage/1.png',
    './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/default_damage/2.png',
    './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/default_damage/3.png',
    './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/default_damage/4.png'
  ];

  IMAGES_DEFAULTDEAD = [
    './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/dead/yellow1.png',
    './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/dead/yellow2.png',
    './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/dead/yellow3.png',
    './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/dead/yellow4.png'

  ];

  constructor(x = 1200 + Math.random() * 200) {
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

    this.loadImage('./img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/default_damage/1.png');
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
    setTimeout(() => {
      setInterval(() => {
        if (this.dead) {
          this.playAnimation(this.IMAGES_DEFAULTDEAD)
          this.ifDeadMoveUp();
        }
      }, 1000 / 5);
    }, 50);
  }
}

