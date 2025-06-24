class Level extends DrawableObject {
  enemies = [];
  sunlights = [];
  barrier = [];
  level_end_x = 4800;
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

  constructor(countsPuff, countsJelly, sunlights, barrier, endboss) {
    super();
    EnemyPositionManager.reset();
    this.addEnemies(countsPuff, countsJelly, endboss);
    this.addSunlights(sunlights);
    this.addBarrierReef(barrier);
  }

  addEnemies(countsPuff, countsJelly, endboss) {
    this.addPuffer(countsPuff);
    this.addPurpleXjelly(countsJelly);
    this.addYellowXjelly(countsJelly);
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

  addPurpleXjelly(counts) {
    const purpleX = [450, 1050, 1650];
    let purpleIndex = 0;
    for (let i = 0; i < counts['purple']; i++) {
      const x = purpleX[purpleIndex];
      this.enemies.push(this.createJellyFish('purple', x))
      purpleIndex++;
    }
  }

  addYellowXjelly(counts) {
    const yellowX = [2050, 2650, 3250];
    let yellowIndex = 0;
    for (let i = 0; i < counts['yellow']; i++) {
      const x = yellowX[yellowIndex];
      this.enemies.push(this.createJellyFish('yellow', x))
      yellowIndex++;
    }
  }

  createPufferFish(type) {
    switch (type) {
      case 'green': return new PufferFishGreen();
      case 'red': return new PufferFishRed();
      case 'orange': return new PufferFishOrange();
    }
  }

  createJellyFish(type, x) {
    switch (type) {
      case 'purple': return new JellyFishPurple(x);
      case 'yellow': return new JellyFishYellow(x);
    }
  }

  addSunlights(sunlights) {
    if (sunlights) {
      this.sunlights.push(new Sunlight());
    }
  }

  addBarrierReef(barrier) {
    if (barrier) {
      this.barrier.push(new BarrierReef());
    }
  }
}