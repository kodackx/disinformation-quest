const audioCache: { [key: string]: HTMLAudioElement } = {};

function createAudio(src: string): HTMLAudioElement {
  if (audioCache[src]) {
    return audioCache[src];
  }
  const audio = new Audio(src);
  audioCache[src] = audio;
  return audio;
}

export function playSound(src: string, volume = 0.75) {
  const audio = createAudio(src);
  audio.volume = volume;
  audio.currentTime = 0;
  audio.play().catch(err => console.error('Audio playback failed:', err));
}

// Dedicated sound functions
export function playAcceptMissionSound() {
  playSound('/audio/accept-mission-click.mp3');
}

export function playDeployStratagemSound() {
  playSound('/audio/deploy-stratagem-click.wav');
}

export function playRecordingSound() {
  playSound('/audio/play-recording-click.mp3');
}

// Generic click sound (keep existing functionality)
export function playClickSound() {
  playDeployStratagemSound();
} 