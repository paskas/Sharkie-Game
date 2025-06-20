class Level extends DrawableObject {
  enemies = [];
  sunlights = [];
  level_end_x = 3840;
  level_top_y = -80;
  level_bottom_y = 320;

  backgroundObjects = [
    new BackgroundObject('./img/backgrounds/water/2.png', -960),
    new BackgroundObject('./img/backgrounds/background_layer_2/2.png', -960),
    new BackgroundObject('./img/backgrounds/background_layer_1/2.png', -960),
    new BackgroundObject('./img/backgrounds/ground/2.png', -960),

    new BackgroundObject('./img/backgrounds/water/1.png', 0),
    new BackgroundObject('./img/backgrounds/background_layer_2/1.png', 0),
    new BackgroundObject('./img/backgrounds/background_layer_1/1.png', 0),
    new BackgroundObject('./img/backgrounds/ground/1.png', 0),

    new BackgroundObject('./img/backgrounds/water/2.png', 960),
    new BackgroundObject('./img/backgrounds/background_layer_2/2.png', 960),
    new BackgroundObject('./img/backgrounds/background_layer_1/2.png', 960),
    new BackgroundObject('./img/backgrounds/ground/2.png', 960),

    new BackgroundObject('./img/backgrounds/water/1.png', 960 * 2),
    new BackgroundObject('./img/backgrounds/background_layer_2/1.png', 960 * 2),
    new BackgroundObject('./img/backgrounds/background_layer_1/1.png', 960 * 2),
    new BackgroundObject('./img/backgrounds/ground/1.png', 960 * 2),
    new BackgroundObject('./img/backgrounds/water/2.png', 960 * 3),
    new BackgroundObject('./img/backgrounds/background_layer_2/2.png', 960 * 3),
    new BackgroundObject('./img/backgrounds/background_layer_1/2.png', 960 * 3),
    new BackgroundObject('./img/backgrounds/ground/2.png', 960 * 3),
    new BackgroundObject('./img/backgrounds/water/1.png', 960 * 4),
    new BackgroundObject('./img/backgrounds/background_layer_2/1.png', 960 * 4),
    new BackgroundObject('./img/backgrounds/background_layer_1/1.png', 960 * 4),
    new BackgroundObject('./img/backgrounds/ground/1.png', 960 * 4),
  ];

  constructor(countsPuff, countsJelly, sunlights, endboss) {
    super();
    EnemyPositionManager.reset();
    this.addEnemies(countsPuff, countsJelly, endboss);
    this.addSunlights(sunlights);
  }


  addEnemies(countsPuff, countsJelly, endboss) {
    this.addPuffer(countsPuff);
    this.addjelly(countsJelly);
    if (endboss) {
      this.enemies.push(endboss);
    }
  }

  addPuffer(counts) {
    ['green', 'red', 'orange'].forEach(type => {
      for (let i = 0; i < counts[type]; i++) {
        this.enemies.push(this.createPufferFish(type));
      }
    });
  }

  addjelly(counts) {
    ['purple', 'yellow'].forEach(type => {
      for (let i = 0; i < counts[type]; i++) {
        this.enemies.push(this.createJellyFish(type));
      }
    });
  }

  createPufferFish(type) {
    switch (type) {
      case 'green': return new PufferFishGreen();
      case 'red': return new PufferFishRed();
      case 'orange': return new PufferFishOrange();
    }
  }

  createJellyFish(type) {
    switch (type) {
      case 'purple': return new JellyFishPurple();
      case 'yellow': return new JellyFishYellow();
    }
  }

  addSunlights(sunlights) {
    if (sunlights) {
      this.sunlights.push(new Sunlight());
    }
  }
}