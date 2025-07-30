class CharacterCamMove {
  static moveCamera(character, world, frameTime) {
    if (!character || !world || !world.level || !world.canvas) return;
    let cameraTargetX = this.calcCameraX(character, world);
    let distance = cameraTargetX - world.camera_x;
    let step = this.calcCameraSteps(distance, frameTime, character.cameraStepPerSecond);
    this.updateCameraPosition(world, distance, step);
  }

  static calcCameraX(character, world) {
    let cameraTargetX = -character.x + 100;
    let minCameraX = -world.level.level_end_x + world.canvas.width;
    return Math.max(minCameraX, Math.min(cameraTargetX, 0));
  }

  static calcCameraSteps(distance, frameTime, cameraSpeed) {
    let absDistance = Math.abs(distance);
    let t = Math.min(absDistance / 100, 1);
    t = t * t * (3 - 2 * t);
    return cameraSpeed * frameTime * t;
  }

  static updateCameraPosition(world, distance, step) {
    let minCameraX = -world.level.level_end_x + world.canvas.width;
    world.camera_x += Math.sign(distance) * step;
    world.camera_x = Math.round(world.camera_x);
    world.camera_x = Math.max(minCameraX, Math.min(world.camera_x, 0));
  }
}