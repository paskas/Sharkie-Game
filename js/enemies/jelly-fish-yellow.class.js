class JellyFishYellow extends JellyFishManager {

  constructor(world, x, speed) {
    super(world, {
      default: [
        './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/default_damage/1.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/default_damage/2.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/default_damage/3.png',
        './img/enemies/jelly_fish_(2_options)/jelly_fish_yellow/default_damage/4.png'
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

