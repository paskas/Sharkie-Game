/**
 * Represents a specific type of electric jellyfish enemy with purple visuals.
 * Inherits all behavior from JellyFishManager and provides specific image assets.
 * 
 * @param {World} world - The game world reference.
 * @param {number} x - Initial horizontal position of the jellyfish.
 * @param {number} speed - Movement speed of the jellyfish.
 */
class JellyFishPurple extends JellyFishManager {

  constructor(world, x, speed) {
    super(world, {
      default: [
        './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/default_damage/1.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/default_damage/2.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/default_damage/3.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/default_damage/4.png'
      ],

      electric: [
        './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/electrical_damage/Green 1.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/electrical_damage/Green 2.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/electrical_damage/Green 3.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/electrical_damage/Green 4.png'
      ],

      defaultDead: [
        './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/dead/purple1.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/dead/purple2.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/dead/purple3.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/dead/purple4.png'
      ]
    }, x, speed);
  }
}

