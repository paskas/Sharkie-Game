class LevelManager {
  levels = [];
  currentLevelIndex = 0;

  constructor(world, canvas) {
    this.world = world;
    this.levels = [
      new Level(
        { green: 4, red: 2, orange: 3 },
        { purple: 3, yellow: 2 },
        1, 1, 11, 3,
        new Endboss(world, canvas)
      )
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