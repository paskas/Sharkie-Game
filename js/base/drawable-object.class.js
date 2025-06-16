class DrawableObject {
  x = 120;
  y = 250;
  height = 100;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;

  static offsets = {
    Character: {
      top: 130,
      bottom: 65,
      left: 50,
      right: 50
    },
    JellyFish: {
      top: 20,
      bottom: 20,
      left: 12,
      right: 12
    },
    PufferFish: {
      top: 10,
      bottom: 30,
      left: 8,
      right: 18
    },
    Endboss: {
      top: 210,
      bottom: 80,
      left: 30,
      right: 40
    }
  };

  getObjectHitbox() {
    let className = this.constructor.name;
    let offset = DrawableObject.offsets[className];
    if (!offset) return undefined;
    return {
      x: this.x + offset.left,
      y: this.y + offset.top,
      width: this.width - offset.left - offset.right,
      height: this.height - offset.top - offset.bottom
    };
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
    if (this instanceof Character || this instanceof JellyFish || this instanceof PufferFish || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = '2';
      ctx.strokeStyle = 'red';
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  drawHitbox(ctx) {
    let hitbox = this.getObjectHitbox();
    if (!hitbox) return;
    ctx.beginPath();
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'red';
    ctx.rect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
    ctx.stroke();
  }
}