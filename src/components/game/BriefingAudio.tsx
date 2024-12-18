import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { playRecordingSound } from "@/utils/audio";

interface BriefingAudioProps {
  stage: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  className?: string;
}

export const BriefingAudio = ({ stage, audioRef, className }: BriefingAudioProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { t, i18n } = useTranslation();

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      playRecordingSound();
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audioRef.current.addEventListener('ended', handleEnded);
    audioRef.current.addEventListener('play', handlePlay);
    audioRef.current.addEventListener('pause', handlePause);

    return () => {
      if (!audioRef.current) return;
      audioRef.current.removeEventListener('ended', handleEnded);
      audioRef.current.removeEventListener('play', handlePlay);
      audioRef.current.removeEventListener('pause', handlePause);
    };
  }, [audioRef]);

  const getAudioFileName = (stage: string) => {
    const currentLanguage = i18n.language;
    const monthKeys = ['january', 'march', 'may', 'july', 'september', 'november', 'december', 'alert', 'expose'];
    
    // Handle special stages
    if (stage === "INTRO") {
      return `intro-${currentLanguage}.mp3`;
    }
    
    // For all other stages (including ALERT), use the month-based naming
    const monthIndex = parseInt(stage);
    const monthKey = monthKeys[monthIndex];
    return `${monthKey}-${currentLanguage}.mp3`;
  };

  // Only skip rendering for INTRO stage
  if (stage === "INTRO") {
    return null;
  }

  return (
    <div className={cn("flex items-center", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={handlePlayPause}
        className="bg-black/50 border-yellow-500/50 text-yellow-500 hover:text-yellow-400 hover:border-yellow-400 hover:bg-black/60 flex items-center gap-2"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        <span className="text-xs font-medium">{t('audio.briefing')}</span>
      </Button>
      <audio
        ref={audioRef}
        src={`/audio/briefings/${getAudioFileName(stage)}`}
        preload="auto"
      />
    </div>
  );
}; 