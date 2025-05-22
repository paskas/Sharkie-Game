class ShootingObject extends MovableObject {

  constructor(character, x, y, otherDirection) {
    super();
    this.loadImage('./img/character/attack/bubble_trap/bubble_default.png');
    this.character = character;
    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;
    this.width = 50;
    this.height = 50;
    this.shoot()
  }

  shoot() {
    this.interval = setInterval(() => {
      this.x += this.otherDirection ? -7 : 7;
    }, 1000 / 60);
  }
}