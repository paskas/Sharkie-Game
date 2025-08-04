/**
 * Represents any drawable object in the game.
 * Provides functionality for rendering images, managing hitboxes, and image caching.
 */
class DrawableObject {
  x = 120;
  y = 250;
  height = 100;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;
  showHitbox = false;
  static globalImageCache = {};

  static offsets = {
    Character: { top: 130, bottom: 65, left: 50, right: 50 },
    JellyFishPurple: { top: 20, bottom: 20, left: 12, right: 12 },
    JellyFishYellow: { top: 20, bottom: 20, left: 12, right: 12 },
    PufferFishGreen: { top: 10, bottom: 30, left: 8, right: 18 },
    PufferFishRed: { top: 10, bottom: 30, left: 8, right: 18 },
    PufferFishOrange: { top: 10, bottom: 30, left: 8, right: 18 },
    Endboss: { top: 275, bottom: 110, left: 40, right: 50 },
    BarrierReef: [
      { top: 0, bottom: 405, left: 25, right: 25 },
      { top: 460, bottom: 0, left: 20, right: 35 }
    ],
    Coin: { top: 8, bottom: 8, left: 8, right: 8 },
    PoisenFlask: { top: 8, bottom: 8, left: 8, right: 8 },
    PoisenFlaskLeft: { top: 42, bottom: 6, left: 25, right: 6 },
    PoisenFlaskRight: { top: 40, bottom: 8, left: 6, right: 25 },
    ShootingObject: { top: 4, bottom: 4, left: 4, right: 4 }
  };

  /**
   * Returns a single hitbox object for the current instance based on predefined offsets.
   * 
   * @returns {{x: number, y: number, width: number, height: number} | undefined} The calculated hitbox or undefined if no valid offset exists.
   */
  getObjectHitbox() {
    let offsetKey = GameHelper.resolveOffsetClassName(this);
    let offset = DrawableObject.offsets[offsetKey];
    if (!offset || Array.isArray(offset)) return undefined;
    return {
      x: this.x + offset.left,
      y: this.y + offset.top,
      width: this.width - offset.left - offset.right,
      height: this.height - offset.top - offset.bottom
    };
  }

  /**
   * Returns multiple hitboxes for the current instance based on an array of predefined offsets.
   * 
   * @returns {Array<{x: number, y: number, width: number, height: number}> | undefined} An array of hitboxes or undefined if no valid array offset exists.
   */
  getObjectHitboxes() {
    let offsetKey = GameHelper.resolveOffsetClassName(this);
    let offset = DrawableObject.offsets[offsetKey];
    if (!offset || !Array.isArray(offset)) return undefined;
    return offset.map((offset) => ({
      x: this.x + offset.left,
      y: this.y + offset.top,
      width: this.width - offset.left - offset.right,
      height: this.height - offset.top - offset.bottom
    }));
  }

  /**
   * Returns the center point of the object's main hitbox.
   * 
   * @returns {{x: number, y: number}} The center coordinates of the main hitbox or fallback to x/y.
   */
  getMainHitbox() {
    let hitbox = this.getObjectHitbox();
    if (!hitbox) return { x: this.x, y: this.y };
    return {
      x: hitbox.x + hitbox.width / 2,
      y: hitbox.y + hitbox.height / 2
    };
  }

  /**
   * Loads a single image from the given path and caches it globally.
   * 
   * @param {string} path - The image source path.
   */
  loadImage(path) {
    if (!DrawableObject.globalImageCache[path]) {
      let img = new Image();
      img.src = path;
      DrawableObject.globalImageCache[path] = img;
    }
    this.img = DrawableObject.globalImageCache[path];
  }

  /**
   * Loads multiple images from the given array of paths and caches them globally and locally.
   * 
   * @param {string[]} arr - Array of image source paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      if (!DrawableObject.globalImageCache[path]) {
        let img = new Image();
        img.src = path;
        DrawableObject.globalImageCache[path] = img;
      }
      this.imageCache[path] = DrawableObject.globalImageCache[path];
    });
  }

  /**
   * Draws the object's current image to the given canvas context.
   * 
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a red frame around the object if it's an instance of specific classes.
   * Used for debugging visual boundaries.
   * 
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
   */
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

  /**
   * Draws the appropriate hitbox (single or multiple) for the object.
   * 
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
   */
  drawHitbox(ctx) {
    let hitboxes = this.getObjectHitboxes();
    if (hitboxes) {
      this.drawMultipleHitboxes(ctx);
    } else {
      this.drawSingleHitbox(ctx);
    }
  }

  /**
   * Draws a single red hitbox rectangle based on the current object's offset.
   * 
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
   */
  drawSingleHitbox(ctx) {
    let hitbox = this.getObjectHitbox();
    if (!hitbox) return;
    ctx.beginPath();
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'red';
    ctx.rect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
    ctx.stroke();
  }

  /**
   * Draws all hitboxes defined for the current object using red rectangles.
   * 
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
   */
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