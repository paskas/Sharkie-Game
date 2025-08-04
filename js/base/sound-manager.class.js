/**
 * Manages background music and sound effects.
 * Handles volume control, mute state, and localStorage persistence.
 */
class SoundManager {

  /**
   * Initializes the sound manager with saved volume and mute settings from localStorage.
   */
  constructor() {
    this.music = null;
    this.sounds = {};
    this.volume = parseFloat(localStorage.getItem('volume')) || 0.5;
    this.isMuted = localStorage.getItem('muted') === 'true';
  }

  /**
   * Plays background music from the given source.
   * Automatically pauses and replaces any existing music.
   * 
   * @param {string} src - Path to the music file.
   * @param {boolean} [loop=true] - Whether the music should loop.
   */
  playMusic(src, loop = true) {
    if (this.music) {
      this.music.pause();
      this.music = null;
    }
    this.music = new Audio(src);
    this.music.loop = loop;
    this.music.volume = this.isMuted ? 0 : this.volume;
    const playPromise = this.music.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const resume = () => {
          this.music.play();
          document.removeEventListener('click', resume);
        };
        document.addEventListener('click', resume);
      });
    }
  }

  /**
   * Plays a sound effect from the given source.
   * Caches sound objects for reuse and resets currentTime for replay.
   * 
   * @param {string} src - Path to the sound effect file.
   */
  playSound(src) {
    if (!this.sounds[src]) {
      this.sounds[src] = new Audio(src);
    } else {
      this.sounds[src].currentTime = 0;
    }
    this.sounds[src].volume = this.isMuted ? 0 : this.volume;
    this.sounds[src].play();
  }

  /**
   * Sets the global volume for music and sound effects.
   * Saves the value in localStorage.
   * 
   * @param {number} value - Volume value between 0.0 and 1.0.
   */
  setVolume(value) {
    this.volume = Math.max(0, Math.min(1, value));
    localStorage.setItem('volume', this.volume);
    if (this.music && !this.isMuted) this.music.volume = this.volume;
  }

  /**
   * Toggles the mute state for all sounds and music.
   * Updates the localStorage and applies the new volume setting.
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('muted', this.isMuted);
    if (this.music) this.music.volume = this.isMuted ? 0 : this.volume;
    for (let key in this.sounds) {
      this.sounds[key].volume = this.isMuted ? 0 : this.volume;
    }
  }

  /**
   * Checks if background music is currently playing.
   * 
   * @returns {boolean} True if music is playing, otherwise false.
   */
  isMusicPlaying() {
    return !!this.music && !this.music.paused;
  }
}
