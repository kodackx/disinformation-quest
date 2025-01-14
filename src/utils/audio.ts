const audioCache: { [key: string]: HTMLAudioElement } = {};
let isMuted = false;
let backgroundMusic: HTMLAudioElement | null = null;
let finalMusic: HTMLAudioElement | null = null;

export function setMuted(muted: boolean) {
  isMuted = muted;
  // Update all cached audio elements
  Object.values(audioCache).forEach(audio => {
    audio.muted = isMuted;
  });
  // Update background music
  if (backgroundMusic) {
    backgroundMusic.muted = isMuted;
  }
  if (finalMusic) {
    finalMusic.muted = isMuted;
  }
}

export function getMuted(): boolean {
  return isMuted;
}

export function startBackgroundMusic() {
  if (!backgroundMusic) {
    backgroundMusic = new Audio("/tension-background.mp3");
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3;
    backgroundMusic.muted = isMuted;
    backgroundMusic.play().catch(console.error);
  } else if (backgroundMusic.paused) {
    backgroundMusic.play().catch(console.error);
  }
}

export function stopBackgroundMusic() {
  if (backgroundMusic) {
    console.log('Stopping background music');
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    backgroundMusic = null;
  }
  if (finalMusic) {
    console.log('Stopping final music');
    finalMusic.pause();
    finalMusic.currentTime = 0;
    finalMusic = null;
  }
}

export function switchToFinalMusic() {
  // If there's already final music playing, don't start it again
  if (finalMusic) {
    console.log('Final music already playing, skipping...');
    return;
  }

  console.log('Attempting to switch to final music...');
  
  // Create and prepare the final music track
  finalMusic = new Audio("/final-theme.wav");
  finalMusic.loop = false;
  finalMusic.volume = 0;
  finalMusic.muted = isMuted;
  
  // Start playing the final track immediately (it will be silent at first)
  finalMusic.play().then(() => {
    console.log('Final music started successfully');
    
    // If background music is playing, fade it out while fading in the final music
    if (backgroundMusic) {
      console.log('Fading transition between tracks...');
      const fadeTransition = setInterval(() => {
        if (backgroundMusic && backgroundMusic.volume > 0.05) {
          backgroundMusic.volume -= 0.05;
        }
        if (finalMusic && finalMusic.volume < 0.3) {
          finalMusic.volume += 0.05;
        }
        if ((!backgroundMusic || backgroundMusic.volume <= 0.05) && 
            (!finalMusic || finalMusic.volume >= 0.3)) {
          clearInterval(fadeTransition);
          stopBackgroundMusic(); // This will clean up the background track
          console.log('Fade transition complete');
        }
      }, 100);
    } else {
      // If no background music, just fade in the final track
      console.log('Fading in final music...');
      const fadeIn = setInterval(() => {
        if (!finalMusic) {
          clearInterval(fadeIn);
          return;
        }
        if (finalMusic.volume < 0.3) {
          finalMusic.volume += 0.05;
        } else {
          clearInterval(fadeIn);
          console.log('Final music fade in complete');
        }
      }, 100);
    }
  }).catch(error => {
    console.error('Failed to start final music:', error);
  });

  finalMusic.addEventListener('ended', () => {
    console.log('Final music finished playing');
  });
}

// Create or get a cached audio element
function createAudio(src: string): HTMLAudioElement {
  if (audioCache[src]) {
    return audioCache[src];
  }
  const audio = new Audio(src);
  audio.muted = isMuted;
  audioCache[src] = audio;
  return audio;
}

// Play a briefing audio file
export function playBriefing(src: string): HTMLAudioElement {
  const audio = createAudio(src);
  audio.volume = 1;
  audio.muted = isMuted;
  audio.play().catch(err => console.error('Briefing audio playback failed:', err));
  return audio;
}

// Play a sound effect
export function playSound(src: string, volume = 0.75) {
  const audio = createAudio(src);
  audio.volume = volume;
  audio.currentTime = 0;
  audio.muted = isMuted;
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