class EnemyPositionManager {
  static usedX = [];
  static usedY = [];
  
  static isXAvailable(x, minDistance) {
    return !this.usedX.some(used => Math.abs(used - x) < minDistance);
  }

  static isYAvailable(y, minDistance) {
    return !this.usedY.some(used => Math.abs(used - y) < minDistance);
  }

  static registerX(x) {
    this.usedX.push(x);
  }

  static registerY(y) {
    this.usedY.push(y);
  }

  static reset() {
    this.usedX = [];
    this.usedY = [];
  }
}