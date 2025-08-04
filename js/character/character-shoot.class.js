/**
 * Provides static methods for managing the character's bubble shooting logic.
 * Handles input detection, shooting timing, and projectile creation.
 */
class CharacterShoot {

  /**
 * Updates shooting state of the character.
 * Triggers the bubble or poison bubble shoot based on input and cooldown state.
 * @param {Character} character
 */
  static updateShoot(character) {
    const kb = character.world.keyboard;
    if (!character.isInDamagePhase()) {
      CharacterShoot.triggerBubbleShoot(character, kb);
      CharacterShoot.triggerPoisenBubbleShoot(character, kb);
    }
  }

  /**
   * Handles regular bubble shooting logic when input is triggered.
   * @param {Character} character
   * @param {Keyboard} kb - The keyboard input handler.
   */
  static triggerBubbleShoot(character, kb) {
    if (!kb.SHOOT) character.shootKeyReleased = true;
    if (kb.SHOOT && character.shootKeyReleased && !character.isShooting) {
      character.shootKeyReleased = false;
      CharacterHelper.resetSleepStatus(character);
      CharacterShoot.startShootingSequence(character, false);
    }
  }

  /**
   * Handles poison bubble shooting logic when input is triggered.
   * @param {Character} character
   * @param {Keyboard} kb - The keyboard input handler.
   */
  static triggerPoisenBubbleShoot(character, kb) {
    if (!kb.POISENSHOOT) character.poisonShootKeyReleased = true;
    if (kb.POISENSHOOT && character.poisonShootKeyReleased && !character.isShooting && character.shootPoisend) {
      character.poisonShootKeyReleased = false;
      CharacterHelper.resetSleepStatus(character);
      CharacterShoot.startShootingSequence(character, true);
    }
  }

  /**
   * Starts a timed shooting sequence that plays animation and spawns the projectile.
   * @param {Character} character
   * @param {boolean} isPoisendShoot - Whether to shoot a poison bubble.
   */
  static startShootingSequence(character, isPoisendShoot) {
    character.isShooting = true;
    character.currentShotPoisoned = isPoisendShoot;
    const shootFrames = isPoisendShoot ? character.IMAGES_SHOOTPOISEN.length : character.IMAGES_SHOOT.length;
    const frameDuration = 120;
    const duration = shootFrames * frameDuration;
    character.shootTimeout = setTimeout(() => {
      CharacterShoot.shootBubble(character, isPoisendShoot);
      character.lastShootTime = Date.now();
      character.isShooting = false;
    }, duration);
  }

  /**
   * Instantiates and adds a new bubble.
   * @param {Character} character
   * @param {boolean} isPoisendShoot - Whether to shoot a poison bubble.
   */
  static shootBubble(character, isPoisendShoot) {
    if (!character.world || !character.world.shootingObject) return;
    const x = character.otherDirection ? character.x : character.x + character.width - 50;
    const y = character.y + character.height / 2;
    const bubble = new ShootingObject(character, x, y, character.otherDirection, isPoisendShoot);
    character.world.shootingObject.push(bubble);
    soundManager.playSound('./assets/audio/character/bubble2.mp3');
  }
}