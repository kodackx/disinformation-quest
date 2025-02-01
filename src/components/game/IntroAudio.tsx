import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';
import { playRecordingSound } from "@/utils/audio";

interface IntroAudioProps {
  className?: string;
}

export const IntroAudio = ({ className }: IntroAudioProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = async () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(`/audio/briefings/intro-${i18n.language}.mp3`);
        audioRef.current.addEventListener('ended', () => setIsPlaying(false));
        
        // Pre-load the audio
        try {
          await audioRef.current.load();
        } catch (error) {
          throw new Error('Audio file not found or unsupported format');
        }
      }

      if (isPlaying) {
        audioRef.current.pause();
      } else {
        playRecordingSound();
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Playback failed:', error);
            toast.error("Playback Error", {
              description: "Unable to play audio briefing"
            });
          });
        }
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Audio error:', error);
      toast.error("Audio Error", {
        description: "Audio briefing unavailable"
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={togglePlay}
      className="text-yellow-500/80 hover:text-yellow-400 hover:bg-yellow-500/10 flex items-center gap-2"
    >
      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      <span className="text-xs font-medium">{t('audio.briefing')}</span>
    </Button>
  );
}; 