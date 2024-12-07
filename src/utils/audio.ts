const CLICK_SOUNDS = [
  "/audio/click1.mp3",
  "/audio/click2.mp3"
];

class AudioPlayer {
  private static instance: AudioPlayer;
  private audioElements: { [key: string]: HTMLAudioElement } = {};

  private constructor() {
    // Pre-load click sounds
    CLICK_SOUNDS.forEach((sound, index) => {
      const audio = new Audio(sound);
      audio.volume = 0.3; // Lower volume for UI sounds
      this.audioElements[`click${index + 1}`] = audio;
    });
  }

  public static getInstance(): AudioPlayer {
    if (!AudioPlayer.instance) {
      AudioPlayer.instance = new AudioPlayer();
    }
    return AudioPlayer.instance;
  }

  public playClickSound() {
    const randomIndex = Math.floor(Math.random() * CLICK_SOUNDS.length);
    const sound = this.audioElements[`click${randomIndex + 1}`];
    if (sound) {
      // Create a clone to allow overlapping sounds
      const clone = sound.cloneNode() as HTMLAudioElement;
      clone.play();
    }
  }
}

export const playClickSound = () => AudioPlayer.getInstance().playClickSound(); 