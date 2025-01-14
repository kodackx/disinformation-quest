import React, { useState, useEffect } from 'react';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { getMuted, setMuted } from '@/utils/audio';
import { useTranslation } from 'react-i18next';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const MuteButton: React.FC = () => {
  const [isMuted, setIsMuted] = useState(getMuted());
  const { t } = useTranslation();

  useEffect(() => {
    setMuted(isMuted);
  }, [isMuted]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all duration-300 border border-yellow-500/20 hover:border-yellow-500/40"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? (
            <SpeakerXMarkIcon className="h-4 w-4 text-yellow-500" />
          ) : (
            <SpeakerWaveIcon className="h-4 w-4 text-yellow-500" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isMuted ? t('audio.unmute') : t('audio.mute')}</p>
      </TooltipContent>
    </Tooltip>
  );
}; 