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
      flasksCount: { FlaskLeft: 3, FlaskRight: 2 }
    }
    // More levels here
  ];

  constructor(world, canvas) {
    this.world = world;
    this.canvas = canvas;

    this.generateLevels();
  }

  generateLevels() {
    this.levels = this.levelConfigs.map(config => new Level({
      ...config,
      world: this.world,
      endboss: new Endboss(this.world, this.canvas)
    }));
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
    const config = this.levelConfigs[this.currentLevelIndex];
    this.levels[this.currentLevelIndex] = new Level({
      ...config,
      world: this.world,
      endboss: new Endboss(this.world, this.world.canvas)
    });
  }

  isLastLevel() {
    return this.currentLevelIndex === this.levels.length - 1;
  }

  resetCurrentLevelIndex() {
    this.currentLevelIndex = 0;
  }
}