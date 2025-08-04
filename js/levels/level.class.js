/**
 * Represents a game level with all its enemies, collectibles, and environment objects.
 * Responsible for initializing and managing level-specific content.
 * Inherits from DrawableObject.
 */
class Level extends DrawableObject {
  level_end_x = 4800;
  level_top_y = -80;
  level_bottom_y = 320;

  enemies = [];
  sunlights = [];
  barrier = [];
  coins = [];
  poisonFlasks = [];

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
  
  /**
   * Constructs a level using the provided configuration object.
   * 
   * @param {Object} setup - Configuration object for the level.
   */
  constructor(setup) {
    super();
    EnemyPositionManager.reset();
    this.config = setup;

    const {
      world = null,
      countsPuff = { green: 0, red: 0, orange: 0 },
      countsJelly = { purple: 0, yellow: 0 },
      sunlights = 0,
      barrier = 0,
      coinsCount = 0,
      coinsArcCount = 0,
      flasksCount = { FlaskLeft: 0, FlaskRight: 0 },
      endboss = false
    } = setup;
    this.world = world;
    this.countsPuff = countsPuff;
    this.countsJelly = countsJelly;
    this.sunlightsCount = sunlights;
    this.barrierCount = barrier;
    this.coinsCount = coinsCount;
    this.coinsArcCount = coinsArcCount;
    this.flasksCount = flasksCount;
    this.endbossFlag = endboss;
  }

  /**
   * Initializes enemies, environment elements, and collectibles for the level.
   * Also starts the character loop.
   */
  initLevel() {
    this.initEnemies(this.countsPuff, this.countsJelly, this.endbossFlag);
    this.initLevelElements(this.sunlightsCount, this.barrierCount);
    this.initCollectibles(this.coinsCount, this.coinsArcCount, this.flasksCount);
    this.world.character.startCharacterLoop();
  }

  /**
   * Creates and adds puffer fish, jellyfish, and optionally the endboss to the level.
   * 
   * @param {Object} countsPuff - Count of each puffer fish type.
   * @param {Object} countsJelly - Count of each jellyfish type.
   * @param {boolean} endbossFlag - Whether to spawn the endboss.
   */
  initEnemies(countsPuff, countsJelly, endbossFlag) {
    this.addPuffer(countsPuff);
    this.addPurpleXjelly(countsJelly);
    this.addYellowXjelly(countsJelly);
    this.createKillerWhale(endbossFlag);
  }

  /**
   * Adds environmental elements like sunlights and barrier reefs to the level.
   * 
   * @param {number} sunlights - Number of sunlight objects.
   * @param {number} barrier - Number of barrier reef objects.
   */
  initLevelElements(sunlights, barrier) {
    this.addSunlights(sunlights);
    this.addBarrierReef(barrier);
  }

  /**
   * Adds coins and poison flasks to the level.
   * 
   * @param {number} coinsCount - Number of single coins.
   * @param {number} coinsArcCount - Number of arc-shaped coin groups.
   * @param {Object} flasksCount - Count of left and right poison flasks.
   */
  initCollectibles(coinsCount, coinsArcCount, flasksCount) {
    this.addCoins(coinsCount);
    this.addCoinArcs(coinsArcCount);
    this.addPoisenFlasks(flasksCount);
  }

  /**
   * Creates and adds all types of puffer fish to the level.
   * 
   * @param {Object} counts - Count of green, red, and orange puffer fish.
   */
  addPuffer(counts) {
    ['green', 'red', 'orange'].forEach(type => {
      for (let i = 0; i < counts[type]; i++) {
        let puffer = this.createPufferFish(type)
        if (puffer?.initPosition) {
          puffer.initPosition();
        }
        if (typeof puffer?.start === 'function') {
          puffer.start();
        }
        this.enemies.push(puffer);
      }
    });
  }

  /**
   * Creates and places purple jellyfish at predefined positions.
   * 
   * @param {Object} counts - Count of purple jellyfish.
   */
  addPurpleXjelly(counts) {
    const purpleX = [400, 2250, 3450];
    let purpleIndex = 0;
    for (let i = 0; i < counts['purple']; i++) {
      let x = purpleX[purpleIndex];
      let jelly = this.createJellyFish('purple', x, 0.4 + Math.random() * 0.3);
      if (typeof jelly?.start === 'function') {
        jelly.start();
      }
      this.enemies.push(jelly);
      purpleIndex++;
    }
  }

  /**
   * Creates and places yellow jellyfish at predefined positions.
   * 
   * @param {Object} counts - Count of yellow jellyfish.
   */
  addYellowXjelly(counts) {
    const yellowX = [1500, 2800];
    let yellowIndex = 0;
    for (let i = 0; i < counts['yellow']; i++) {
      let x = yellowX[yellowIndex];
      let jelly = this.createJellyFish('yellow', x, 0.4 + Math.random() * 0.3);
      if (typeof jelly?.start === 'function') {
        jelly.start();
      }
      this.enemies.push(jelly);
      yellowIndex++;
    }
  }

  /**
   * Adds the killer whale endboss to the level if enabled and not already present.
   * 
   * @param {boolean} endbossFlag - Whether to spawn the endboss.
   */
  createKillerWhale(endbossFlag) {
    const alreadyHasEndboss = this.enemies.some(e => e instanceof Endboss);
    if (endbossFlag && !alreadyHasEndboss) {
      this.enemies.push(new Endboss(this.world, this.world.canvas));
    }
  }

  /**
   * Creates a puffer fish instance of the given type.
   * 
   * @param {string} type - One of 'green', 'red', or 'orange'.
   * @returns {MovableObject} The created puffer fish.
   */
  createPufferFish(type) {
    switch (type) {
      case 'green': return new PufferFishGreen(this.world, 0.25);
      case 'red': return new PufferFishRed(this.world, 0.30 + Math.random() * 0.5);
      case 'orange': return new PufferFishOrange(this.world, 0.25 + Math.random() * 0.5);
    }
  }

  /**
   * Creates a jellyfish instance of the given type and position.
   * 
   * @param {string} type - 'purple' or 'yellow'.
   * @param {number} x - X position for the jellyfish.
   * @param {number} speed - Movement speed.
   * @returns {MovableObject} The created jellyfish.
   */
  createJellyFish(type, x, speed) {
    switch (type) {
      case 'purple': return new JellyFishPurple(this.world, x, speed);
      case 'yellow': return new JellyFishYellow(this.world, x, speed);
    }
  }

  /**
   * Adds sunlight objects to the level.
   * 
   * @param {number} sunlights - Number of sunlights to add.
   */
  addSunlights(sunlights) {
    if (sunlights) {
      this.sunlights.push(new Sunlight());
    }
  }

  /**
   * Adds barrier reef objects to the level.
   * 
   * @param {number} barrier - Number of reefs to add.
   */
  addBarrierReef(barrier) {
    if (barrier) {
      this.barrier.push(new BarrierReef());
    }
  }

  /**
   * Adds regular coins to predefined X positions.
   * 
   * @param {number} counts - Number of coins to place.
   */
  addCoins(counts) {
    for (let i = 0; i < counts; i++) {
      let x = Coin.positionXcoin[i];
      if (x !== undefined) {
        this.coins.push(new Coin(x));
      }
    }
  }

  /**
   * Adds coin arcs from predefined arc definitions.
   * 
   * @param {number} counts - Number of arcs to place.
   */
  addCoinArcs(counts) {
    for (let i = 0; i < counts; i++) {
      let arc = Coin.coinArcs[i];
      if (arc) {
        this.coins.push(...Coin.setArcCoinPositions(arc.x, arc.y, arc.count));
      }
    }
  }

  /**
   * Adds left and right poison flasks based on count object.
   * 
   * @param {Object} counts - Object with counts for 'FlaskLeft' and 'FlaskRight'.
   */
  addPoisenFlasks(counts) {
    this.addLeftFlasks(counts['FlaskLeft']);
    this.addRightFlasks(counts['FlaskRight']);
  }

  /**
   * Adds poison flasks on the left side of the level.
   * 
   * @param {number} count - Number of flasks to add.
   */
  addLeftFlasks(count) {
    const leftCoords = [
      { x: 880, y: 382 },
      { x: 1500, y: 358 },
      { x: 3130, y: 355 }
    ];
    for (let i = 0; i < count; i++) {
      let coord = leftCoords[i];
      if (coord) {
        this.poisonFlasks.push(new PoisenFlask(coord.x, coord.y, 'left'));
      }
    }
  }

  /**
   * Adds poison flasks on the right side of the level.
   * 
   * @param {number} count - Number of flasks to add.
   */
  addRightFlasks(count) {
    const rightCoords = [
      { x: 1900, y: 310 },
      { x: 2300, y: 360 }
    ];
    for (let i = 0; i < count; i++) {
      let coord = rightCoords[i];
      if (coord) {
        this.poisonFlasks.push(new PoisenFlask(coord.x, coord.y, 'right'));
      }
    }
  }

  /**
   * Clears intervals from all interval-aware objects in the level.
   */
  clearAllIntervals() {
    ['enemies', 'coins', 'poisonFlasks', 'sunlights', 'barrier'].forEach(key => {
      if (this[key]) {
        this[key].forEach(obj => {
          if (typeof obj?.clearAllIntervals === 'function') {
            obj.clearAllIntervals();
          }
        });
      }
    });
  }

  /**
   * Resumes intervals for enemies, coins, and poison flasks in the level.
   */
  continueAllIntervals() {
    ['enemies', 'coins', 'poisonFlasks'].forEach(key => {
      if (this[key]) {
        this[key].forEach(obj => {
          if (typeof obj.continueAllIntervals === 'function') obj.continueAllIntervals();
        });
      }
    });
  }
}