class Level {
  enemies;
  sunlights;
  backgroundObjects;
  level_end_x = 700;
  level_end_y = 400;

  constructor(enemies, sunlights, backgroundObjects) {
    this.enemies = enemies;
    this.sunlights = sunlights;
    this.backgroundObjects = backgroundObjects;
  }
}