class PufferFish extends MovableObject {
  constructor() {
    super().loadImage('./img/2_Enemy/1_PufferFish_(3_options)/3_Bubbleeswim/1.bubbleswim1.png');
    this.x = 250 + Math.random() * 500;
    this.height = 80;
    this.width = 100;
  }
}