import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface IntroAudioProps {
  className?: string;
}

export const IntroAudio = ({ className }: IntroAudioProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

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
        audioRef.current = new Audio('/audio/briefings/intro.mp3');
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
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Playback failed:', error);
            toast({
              title: "Playback Error",
              description: "Unable to play audio briefing",
              variant: "destructive"
            });
          });
        }
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Audio error:', error);
      toast({
        title: "Audio Error",
        description: "Audio briefing unavailable",
        variant: "destructive"
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/20 ${className}`}
      onClick={togglePlay}
    >
      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
    </Button>
  );
}; 