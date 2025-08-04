/**
 * Represents an orange puffer fish enemy with its specific animation assets.
 * Inherits behavior from PufferFishManager and provides orange image sets.
 * 
 * @param {World} world - The game world reference.
 * @param {number} speed - Movement speed of the orange puffer fish.
 */
class PufferFishOrange extends PufferFishManager {

  constructor(world, speed) {
    super(world, {
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
    }, speed);
  }
}