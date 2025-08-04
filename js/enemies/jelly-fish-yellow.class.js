/**
 * Represents a specific type of electric jellyfish enemy with yellow visuals.
 * Inherits all behavior from JellyFishManager and provides specific image assets.
 * 
 * @param {World} world - The game world reference.
 * @param {number} x - Initial horizontal position of the jellyfish.
 * @param {number} speed - Movement speed of the jellyfish.
 */
class JellyFishYellow extends JellyFishManager {

  constructor(world, x, speed) {
    super(world, {
      default: [
        './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/default_damage/1.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/default_damage/2.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/default_damage/3.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/default_damage/4.png'
      ],

      electric: [
        './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/electrical_damage/Pink 1.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/electrical_damage/Pink 2.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/electrical_damage/Pink 3.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/electrical_damage/Pink 4.png'
      ],

      defaultDead: [
        './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/dead/yellow1.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/dead/yellow2.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/dead/yellow3.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/dead/yellow4.png'
      ]
    }, x, speed);
  }
}

