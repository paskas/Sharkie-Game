/**
 * Handles smooth camera movement that follows the character horizontally.
 */
class CharacterCamMove {

  /**
   * Updates the camera position to follow the character with easing.
   * 
   * @param {Character} character - The main character instance.
   * @param {World} world - The game world containing the level and canvas.
   * @param {number} frameTime - Time elapsed since last frame (in seconds).
   */
  static moveCamera(character, world, frameTime) {
    if (!character || !world || !world.level || !world.canvas) return;
    let cameraTargetX = this.calcCameraX(character, world);
    let distance = cameraTargetX - world.camera_x;
    let step = this.calcCameraSteps(distance, frameTime, character.cameraStepPerSecond);
    this.updateCameraPosition(world, distance, step);
  }

  /**
   * Calculates the ideal target camera X position based on character position and canvas width.
   * 
   * @param {Character} character - The character to center.
   * @param {World} world - The game world.
   * @returns {number} The clamped camera X position.
   */
  static calcCameraX(character, world) {
    let cameraTargetX = -character.x + 100;
    let minCameraX = -world.level.level_end_x + world.canvas.width;
    return Math.max(minCameraX, Math.min(cameraTargetX, 0));
  }

  /**
   * Calculates the step size for easing camera movement using a smoothstep-like function.
   * 
   * @param {number} distance - Distance between current and target camera position.
   * @param {number} frameTime - Time delta between frames.
   * @param {number} cameraSpeed - Pixels per second the camera can move.
   * @returns {number} Step size for camera movement.
   */
  static calcCameraSteps(distance, frameTime, cameraSpeed) {
    let absDistance = Math.abs(distance);
    let t = Math.min(absDistance / 100, 1);
    t = t * t * (3 - 2 * t);
    return cameraSpeed * frameTime * t;
  }

  /**
   * Applies the calculated camera step to the world's camera_x property with clamping.
   * 
   * @param {World} world - The game world.
   * @param {number} distance - Distance to target camera position.
   * @param {number} step - Step size to apply in this frame.
   */
  static updateCameraPosition(world, distance, step) {
    let minCameraX = -world.level.level_end_x + world.canvas.width;
    world.camera_x += Math.sign(distance) * step;
    world.camera_x = Math.round(world.camera_x);
    world.camera_x = Math.max(minCameraX, Math.min(world.camera_x, 0));
  }
}