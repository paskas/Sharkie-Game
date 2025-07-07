class PufferFishRed extends PufferFishManager {

  constructor(world, speed) {
    super(world, {
      swim: [
        './img/enemies/puffer_fish(3_options)/swim/swim_red1.png',
        './img/enemies/puffer_fish(3_options)/swim/swim_red2.png',
        './img/enemies/puffer_fish(3_options)/swim/swim_red3.png',
        './img/enemies/puffer_fish(3_options)/swim/swim_red4.png',
        './img/enemies/puffer_fish(3_options)/swim/swim_red5.png'
      ],

      bubbleswim: [
        './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_red1.png',
        './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_red2.png',
        './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_red3.png',
        './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_red4.png',
        './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_red5.png'
      ],

      transition: [
        './img/enemies/puffer_fish(3_options)/transition/transition_red1.png',
        './img/enemies/puffer_fish(3_options)/transition/transition_red2.png',
        './img/enemies/puffer_fish(3_options)/transition/transition_red3.png',
        './img/enemies/puffer_fish(3_options)/transition/transition_red4.png',
        './img/enemies/puffer_fish(3_options)/transition/transition_red5.png'
      ],

      dead: [
        './img/enemies/puffer_fish(3_options)/dead/dead_red2.png',
        './img/enemies/puffer_fish(3_options)/dead/dead_red3.png'
      ]
    }, speed);
  }
}
