import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { playRecordingSound } from "@/utils/audio";
import { cn } from "@/lib/utils";

interface BriefingAudioProps {
  stage: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  className?: string;
}

export const BriefingAudio = ({ stage, audioRef, className }: BriefingAudioProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      playRecordingSound();
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioRef]);

  const getAudioFileName = (stage: string) => {
    // Extract the month name from the stage title (e.g., "January: Know Your Audience" -> "january")
    const month = stage.split(':')[0].toLowerCase().trim();
    return `${month}.mp3`;
  };

  return (
    <div className={className}>
      <Button
        variant="outline"
        size="sm"
        className="text-yellow-500 border-yellow-500 hover:text-white hover:border-yellow-400"
        onClick={togglePlayback}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        <span className="ml-2">{isPlaying ? "Stop Briefing" : "Play Briefing"}</span>
      </Button>
      <audio
        ref={audioRef}
        src={`/audio/briefings/${getAudioFileName(stage)}`}
        preload="auto"
      />
    </div>
  );
}; 