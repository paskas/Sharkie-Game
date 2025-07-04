class PufferFishOrange extends PufferFishManager {

  constructor() {
    super({
      swim: [
        './img/enemies/puffer_fish(3_options)/swim/swim_orange1.png',
        './img/enemies/puffer_fish(3_options)/swim/swim_orange2.png',
        './img/enemies/puffer_fish(3_options)/swim/swim_orange3.png',
        './img/enemies/puffer_fish(3_options)/swim/swim_orange4.png',
        './img/enemies/puffer_fish(3_options)/swim/swim_orange5.png'
      ],

      bubbleswim: [
        './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_orange1.png',
        './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_orange2.png',
        './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_orange3.png',
        './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_orange4.png',
        './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_orange5.png'
      ],

      transition: [
        './img/enemies/puffer_fish(3_options)/transition/transition_orange1.png',
        './img/enemies/puffer_fish(3_options)/transition/transition_orange2.png',
        './img/enemies/puffer_fish(3_options)/transition/transition_orange3.png',
        './img/enemies/puffer_fish(3_options)/transition/transition_orange4.png',
        './img/enemies/puffer_fish(3_options)/transition/transition_orange5.png'
      ],

      dead: [
        './img/enemies/puffer_fish(3_options)/dead/dead_orange2.png',
        './img/enemies/puffer_fish(3_options)/dead/dead_orange3.png'
      ]
    });
    this.speed = 0.25 + Math.random() * 0.5;
  }
}