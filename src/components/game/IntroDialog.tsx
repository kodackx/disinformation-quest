import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface IntroDialogProps {
  onStartAudio?: () => void;
}

export const IntroDialog = ({ onStartAudio }: IntroDialogProps) => {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();

  const handleBeginSimulation = () => {
    setOpen(false);
    onStartAudio?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-black/90 text-white border-gray-700 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-yellow-500 text-2xl mb-6">
            {t('intro.title')}
          </DialogTitle>
          
          <div className="space-y-6 text-gray-200">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🎯</div>
              <p className="text-lg font-medium">
                {t('intro.mission')}
              </p>
            </div>
            
            <p className="text-base">
              {t('intro.explanation')}
            </p>
            
            <p className="text-base">
              {t('intro.howToPlay.description')}
            </p>
            
            <p className="text-yellow-500 text-sm">
              {t('intro.reminder')}
            </p>
          </div>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 mt-8">
          <div className="flex items-center gap-2 self-start">
            <LanguageSwitcher />
            <span className="text-xs text-gray-400">
              {t('languageSwitcher.hint')}
            </span>
          </div>
          
          <Button 
            onClick={handleBeginSimulation}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full py-6 text-lg"
          >
            {t('buttons.beginSimulation')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 