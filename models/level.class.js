class Level {
  enemies;
  sunlights;
  backgroundObjects;
  level_end_x = 2200;
  level_top_y = -85;
  level_bottom_y = 320;

  constructor(enemies, sunlights, backgroundObjects) {
    this.enemies = enemies;
    this.sunlights = sunlights;
    this.backgroundObjects = backgroundObjects;
  }
}