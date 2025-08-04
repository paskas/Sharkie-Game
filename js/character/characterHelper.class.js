/**
 * Provides utility methods for character behavior like animation timing, movement detection,
 * and sleep/reset logic.
 */
class CharacterHelper {

  /**
   * Calculates the time delta between animation frames for smooth motion.
   * 
   * @param {Character} character - The character whose timing is updated.
   * @param {DOMHighResTimeStamp} time - The current timestamp from requestAnimationFrame.
   * @returns {number} Time elapsed in seconds since the last frame.
   */
  static calculateDeltaTime(character, time) {
    if (!character.lastFrameTime) character.lastFrameTime = time;
    const frameTime = (time - character.lastFrameTime) / 1000;
    character.lastFrameTime = time;
    return frameTime;
  }

  /**
   * Checks if the character has been idle long enough to start the sleep sequence.
   * 
   * @param {number} sleepStartTime - Timestamp when inactivity began.
   * @param {number} untilSleep - Duration in ms before sleep should trigger.
   * @returns {boolean} True if enough time has passed to initiate sleep.
   */
  static startSleepTimer(sleepStartTime, untilSleep) {
    return Date.now() - sleepStartTime > untilSleep;
  }

  /**
   * Resets the character's sleep state and clears any sleep timeout.
   * 
   * @param {Character} character - The character whose sleep should be reset.
   */
  static resetSleepStatus(character) {
    character.sleepStartTime = Date.now();
    if (character.sleepTimeout) {
      clearTimeout(character.sleepTimeout);
      character.sleepTimeout = null;
    }
    character.isSleeping = false;
  }

  /**
   * Starts a new animation if it's not already running.
   * 
   * @param {Character} character - The character instance.
   * @param {string} mode - The animation mode name.
   * @param {Function} callback - Function to handle animation frames.
   */
  static setAnimationIfNew(character, mode, callback) {
    const speed = {
      swim: 100,
      shoot: 100,
      idle: 140,
      sleep: 200,
      initSleep: 140,
      damage: 140
    };
    if (character.currentAnimation !== mode) {
      const interval = speed[mode];
      character.setAnimation(mode, callback, interval);
    }
  }

  /**
   * Returns all objects in the world that block character movement.
   * 
   * @param {World} world - The game world.
   * @returns {Array} Array of blocking objects.
   */
  static getBlockingObjects(world) {
    if (!world || !world.level) return [];
    return [...world.level.barrier];
  }

  /**
   * Determines if the character is currently moving and updates direction.
   * 
   * @param {Character} character - The character instance.
   * @param {Keyboard} keyboard - The keyboard input handler.
   * @returns {boolean} True if any movement key is pressed.
   */
  static isMoving(character, keyboard) {
    if (keyboard.LEFT) character.otherDirection = true;
    if (keyboard.RIGHT) character.otherDirection = false;
    return keyboard.RIGHT || keyboard.LEFT || keyboard.UP || keyboard.DOWN;
  }
}