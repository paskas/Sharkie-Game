class JellyFishPurple extends JellyFishManager {

  constructor(world, x, speed) {
    super(world, {
      default: [
        './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/default_damage/1.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/default_damage/2.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/default_damage/3.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/default_damage/4.png',
      ],

      defaultDead: [
        './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/dead/purple1.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/dead/purple2.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/dead/purple3.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_purple/dead/purple4.png',
      ]
    }, x, speed);
  }
}

