class PufferFishGreen extends PufferFishManager {

  constructor() {
    super({
      swim: [
        './img/enemies/puffer_fish(3_options)/swim/swim_green1.png',
        './img/enemies/puffer_fish(3_options)/swim/swim_green2.png',
        './img/enemies/puffer_fish(3_options)/swim/swim_green3.png',
        './img/enemies/puffer_fish(3_options)/swim/swim_green4.png',
        './img/enemies/puffer_fish(3_options)/swim/swim_green5.png'
      ],

      bubbleswim: [
        './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_green1.png',
        './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_green2.png',
        './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_green3.png',
        './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_green4.png',
        './img/enemies/puffer_fish(3_options)/bubbleswim/bubbleswim_green5.png'
      ],

      transition: [
        './img/enemies/puffer_fish(3_options)/transition/transition_green1.png',
        './img/enemies/puffer_fish(3_options)/transition/transition_green2.png',
        './img/enemies/puffer_fish(3_options)/transition/transition_green3.png',
        './img/enemies/puffer_fish(3_options)/transition/transition_green4.png',
        './img/enemies/puffer_fish(3_options)/transition/transition_green5.png'
      ],

      dead: [
        './img/enemies/puffer_fish(3_options)/dead/dead_green2.png',
        './img/enemies/puffer_fish(3_options)/dead/dead_green3.png'
      ]
    })
    this.speed = 0.25;
  }
}