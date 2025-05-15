class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;

  static offsets = {
    Character: {
      top: 125,
      bottom: 60,
      left: 48,
      right: 48
    },
    JellyFish: {
      top: 5,
      bottom: 5,
      left: 5,
      right: 5
    },
    PufferFish: {
      top: 4,
      bottom: 4,
      left: 4,
      right: 4
    },
    Endboss: {
      top: 95,
      bottom: 15,
      left: 40,
      right: 40
    }
  };

  getObjectHitbox() {
    let className = this.constructor.name;
    let offset = DrawableObject.offsets[className];
    if (!offset) {
      return undefined;
    }
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