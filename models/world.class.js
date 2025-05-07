class World {
  character = new Character();
  enemies = [
    new PufferFish(),
    new JellyFish(),
    // new Endboss()
  ];
  sunlights = [
    new Sunlight()
  ];
  backgroundObjects = [
    new BackgroundObject('./img/3_Background/Layers/5_Water/D1.png', 0),
    new BackgroundObject('./img/3_Background/Layers/4_Fondo 2/D1.png', 0),
    new BackgroundObject('./img/3_Background/Layers/3_Fondo 1/D1.png', 0),
    new BackgroundObject('./img/3_Background/Layers/2_Floor/D1.png', 0)
  ];
  canvas;
  ctx;
  keyboard;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld(){
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.sunlights);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);

    // draw() is called again and again, FPS ( requestAnimationFrame(() => this.draw());)
    // let self = this;
    // requestAnimationFrame(function () {
    //   self.draw();
    // });
    requestAnimationFrame(() => this.draw());
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o)
    });
  }

  addToMap(mo) {
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
}