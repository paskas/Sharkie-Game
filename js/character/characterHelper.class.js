class CharacterHelper {
  static calculateDeltaTime(character, time) {
    if (!character.lastFrameTime) character.lastFrameTime = time;
    const frameTime = (time - character.lastFrameTime) / 1000;
    character.lastFrameTime = time;
    return frameTime;
  }

  static startSleepTimer(sleepStartTime, untilSleep) {
    return Date.now() - sleepStartTime > untilSleep;
  }

  static resetSleepStatus(character) {
    character.sleepStartTime = Date.now();
    if (character.sleepTimeout) {
      clearTimeout(character.sleepTimeout);
      character.sleepTimeout = null;
    }
    character.isSleeping = false;
  }

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

  static getBlockingObjects(world) {
    if (!world || !world.level) return [];
    return [...world.level.barrier];
  }

  static isMoving(character, keyboard) {
    if (keyboard.LEFT) character.otherDirection = true;
    if (keyboard.RIGHT) character.otherDirection = false;
    return keyboard.RIGHT || keyboard.LEFT || keyboard.UP || keyboard.DOWN;
  }
}