class SoundManager {
  constructor() {
    this.music = null;
    this.sounds = {};
    this.volume = parseFloat(localStorage.getItem('volume')) || 0.5;
    this.isMuted = localStorage.getItem('muted') === 'true';
  }

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

  playSound(src) {
    if (!this.sounds[src]) {
      this.sounds[src] = new Audio(src);
    } else {
      this.sounds[src].currentTime = 0;
    }
    this.sounds[src].volume = this.isMuted ? 0 : this.volume;
    this.sounds[src].play();
  }

  setVolume(value) {
    this.volume = Math.max(0, Math.min(1, value));
    localStorage.setItem('volume', this.volume);
    if (this.music && !this.isMuted) this.music.volume = this.volume;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('muted', this.isMuted);
    if (this.music) this.music.volume = this.isMuted ? 0 : this.volume;
    for (let key in this.sounds) {
      this.sounds[key].volume = this.isMuted ? 0 : this.volume;
    }
  }

  isMusicPlaying() {
    return !!this.music && !this.music.paused;
  }
}
