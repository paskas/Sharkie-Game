class DrawableObject {
  x = 120;
  y = 250;
  height = 100;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;
  static setCoin = 0;

  static offsets = {
    Character: { top: 130, bottom: 65, left: 50, right: 50 },
    JellyFishPurple: { top: 20, bottom: 20, left: 12, right: 12 },
    JellyFishYellow: { top: 20, bottom: 20, left: 12, right: 12 },
    PufferFishGreen: { top: 10, bottom: 30, left: 8, right: 18 },
    PufferFishRed: { top: 10, bottom: 30, left: 8, right: 18 },
    PufferFishOrange: { top: 10, bottom: 30, left: 8, right: 18 },
    Endboss: { top: 275, bottom: 110, left: 40, right: 50 },
    BarrierReef: [
      { top: 0, bottom: 405, left: 5, right: 5 },
      { top: 450, bottom: 0, left: 0, right: 15 }
    ],
    Coin: {top: 8, bottom: 8, left: 8, right: 8},
    ShootingObject: {top: 5, bottom: 5, left: 5, right: 5}
  };

  getObjectHitbox() {
    let className = this.constructor.name;
    let offset = DrawableObject.offsets[className];
    if (!offset || Array.isArray(offset)) return undefined;
    return {
      x: this.x + offset.left,
      y: this.y + offset.top,
      width: this.width - offset.left - offset.right,
      height: this.height - offset.top - offset.bottom
    };
  }

  getObjectHitboxes() {
    let className = this.constructor.name;
    let offsets = DrawableObject.offsets[className];
    if (!Array.isArray(offsets)) return undefined;
    return offsets.map((o) => ({
      x: this.x + o.left,
      y: this.y + o.top,
      width: this.width - o.left - o.right,
      height: this.height - o.top - o.bottom
    }));
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * 
   * @param {Array} arr - ['Imges'] 
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof PufferFishGreen ||
      this instanceof PufferFishRed ||
      this instanceof PufferFishOrange ||
      this instanceof JellyFishYellow ||
      this instanceof JellyFishPurple ||
      this instanceof Endboss ||
      this instanceof BarrierReef ||
      this instanceof Coin ||
      this instanceof ShootingObject
    ) {
      ctx.beginPath();
      ctx.lineWidth = '2';
      ctx.strokeStyle = 'red';
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  drawHitbox(ctx) {
    let hitboxes = this.getObjectHitboxes();
    if (hitboxes) {
      this.drawMultipleHitboxes(ctx);
    } else {
      this.drawSingleHitbox(ctx);
    }
  }

  drawSingleHitbox(ctx) {
    let hitbox = this.getObjectHitbox();
    if (!hitbox) return;
    ctx.beginPath();
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'red';
    ctx.rect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
    ctx.stroke();
  }

  drawMultipleHitboxes(ctx) {
    let hitboxes = this.getObjectHitboxes();
    if (!hitboxes) return;
    hitboxes.forEach((hitbox) => {
      ctx.beginPath();
      ctx.lineWidth = '2';
      ctx.strokeStyle = 'red';
      ctx.rect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
      ctx.stroke();
    });
  }

}