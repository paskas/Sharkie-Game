/**
 * Manages all game levels including configuration, initialization, and level switching.
 */
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

  /**
   * Creates a LevelManager instance linked to the game world and canvas.
   * 
   * @param {World} world - The current game world instance.
   * @param {HTMLCanvasElement} canvas - The canvas element for layout references.
   */
  constructor(world, canvas) {
    this.world = world;
    this.canvas = canvas;
  }
  
  /**
   * Generates all levels from predefined configurations and initializes the first level.
   */
  generateLevels() {
    this.levels.length = 0;
    this.levels = this.levelConfigs.map(config => new Level({
      ...config,
      world: this.world,
    }));
    world.level.initLevel();
  }

  /**
   * Returns the currently active level.
   * 
   * @returns {Level} The current level object.
   */
  getCurrentLevel() {
    return this.levels[this.currentLevelIndex];
  }

  /**
   * Reinitializes the current level by clearing intervals and re-creating it from config.
   */
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

  /**
   * Advances the index to the next level if one exists.
   */
  loadNextLevel() {
    if (!this.isLastLevel()) {
      this.currentLevelIndex++;
    }
  }

  /**
   * Checks whether the current level is the last in the list.
   * 
   * @returns {boolean} True if it's the final level.
   */
  isLastLevel() {
    return this.currentLevelIndex === this.levels.length - 1;
  }
}