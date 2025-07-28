class LevelManager {
  levels = [];
  currentLevelIndex = 0;

  levelConfigs = [
    {
      level: 1,
      countsPuff: { green: 4, red: 2, orange: 3 },
      countsJelly: { purple: 3, yellow: 2 },
      sunlights: 1,
      barrier: 1,
      coinsCount: 13,
      coinsArcCount: 3,
      flasksCount: { FlaskLeft: 3, FlaskRight: 2 },
      endboss: true
    },
    {
      level: 2,
      countsPuff: { green: 2, red: 4, orange: 2 },
      countsJelly: { purple: 2, yellow: 2 },
      sunlights: 1,
      barrier: 1,
      coinsCount: 14,
      coinsArcCount: 2,
      flasksCount: { FlaskLeft: 2, FlaskRight: 3 },
      endboss: true
    }
    // More levels here
  ];

  constructor(world, canvas) {
    this.world = world;
    this.canvas = canvas;
  }

  generateLevels() {
    this.levels.length = 0;
    this.levels = this.levelConfigs.map(config => new Level({
      ...config,
      world: this.world,
    }));
    world.level.initLevel();
  }

  getCurrentLevel() {
    return this.levels[this.currentLevelIndex];
  }

  loadNextLevel() {
    if (!this.isLastLevel()) {
      this.currentLevelIndex++;
    }
  }

  reloadCurrentLevel() {
    world.level.clearAllIntervals();
    const config = this.levelConfigs[this.currentLevelIndex];
    const newLevel = new Level({
      ...config,
      world: this.world,
    });
    newLevel.initLevel();
    this.levels[this.currentLevelIndex] = newLevel;
  }

  isLastLevel() {
    return this.currentLevelIndex === this.levels.length - 1;
  }

  resetCurrentLevelIndex() {
    this.currentLevelIndex = 0;
  }
}