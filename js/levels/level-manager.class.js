class LevelManager {
  levels = [];
  currentLevelIndex = 0;

  constructor(world, canvas) {
    this.world = world;
    this.levels = [
      new Level({
        countsPuff: { green: 4, red: 2, orange: 3 },
        countsJelly: { purple: 3, yellow: 2 },
        sunlights: 1,
        barrier: 1,
        coinsCount: 13,
        coinsArcCount: 3,
        flasksCount: { FlaskLeft: 3, FlaskRight: 2 },
        endboss: new Endboss(world, canvas)
      })
    ];
  }

  getCurrentLevel() {
    return this.levels[this.currentLevelIndex];
  }

  loadNextLevel() {
    if (!this.isLastLevel()) {
      this.currentLevelIndex++;
    }
  }

  isLastLevel() {
    return this.currentLevelIndex === this.levels.length - 1;
  }

  resetLevels() {
    this.currentLevelIndex = 0;
  }
}