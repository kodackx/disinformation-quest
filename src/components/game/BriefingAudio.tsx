import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { playBriefing } from "@/utils/audio";
import { toast } from "sonner";
import { getMonthConfig } from "@/utils/months";

interface BriefingAudioProps {
  stage: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  className?: string;
}

export const BriefingAudio = ({ stage, audioRef, className = "" }: BriefingAudioProps) => {
  const { t, i18n } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const getAudioFileName = (stage: string) => {
    const currentLanguage = i18n.language;
    
    console.log('BriefingAudio - Stage received:', stage);
    
    // Handle special stages
    if (stage === "INTRO") {
      return `intro-${currentLanguage}.mp3`;
    }
    
    const monthConfig = getMonthConfig(stage);
    console.log('BriefingAudio - Selected monthConfig:', monthConfig);
    
    if (!monthConfig?.audio?.briefing) {
      throw new Error(`No audio briefing configured for stage ${stage}`);
    }
    
    return monthConfig.audio.briefing;
  };

  const handlePlayPause = async () => {
    try {
      if (isPlaying && currentAudio) {
        currentAudio.pause();
        setIsPlaying(false);
        return;
      }

      if (currentAudio) {
        currentAudio.play();
        setIsPlaying(true);
        return;
      }

      const audioPath = `/audio/briefings/${getAudioFileName(stage)}`;
      console.log('Playing audio:', audioPath);
      
      const newAudio = playBriefing(audioPath);
      newAudio.addEventListener('ended', () => setIsPlaying(false));
      newAudio.addEventListener('pause', () => setIsPlaying(false));
      newAudio.addEventListener('play', () => setIsPlaying(true));
      setCurrentAudio(newAudio);
      setIsPlaying(true);
    } catch (error) {
      console.error('Audio error:', error);
      toast.error("Audio Error", {
        description: `Failed to play briefing: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  };

  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
      }
    };
  }, [currentAudio]);

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`h-6 px-2 ${className}`}
      onClick={handlePlayPause}
    >
      {isPlaying ? (
        <PauseIcon className="w-3 h-3 mr-1" />
      ) : (
        <PlayIcon className="w-3 h-3 mr-1" />
      )}
      <span className="text-xs">
        {isPlaying ? 'Pause' : 'Play'}
      </span>
    </Button>
  );
};