import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";

interface IntroDialogProps {
  onStartAudio?: () => void;
}

export const IntroDialog = ({ onStartAudio }: IntroDialogProps) => {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();
  const [showGradient, setShowGradient] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const checkScroll = useCallback(() => {
    const element = contentRef.current;
    if (element) {
      const hasOverflow = element.scrollHeight > element.clientHeight;
      const isAtBottom = Math.abs(element.scrollHeight - element.clientHeight - element.scrollTop) < 1;
      setShowGradient(hasOverflow && !isAtBottom);
    }
  }, []);

  useEffect(() => {
    const element = contentRef.current;
    if (element) {
      checkScroll();
      element.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      
      return () => {
        element.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [checkScroll]);

  const handleBeginSimulation = () => {
    setOpen(false);
    onStartAudio?.();
  };

  return (
    <Dialog open={open}>
      <DialogContent 
        ref={contentRef}
        className="[&>button]:hidden bg-black text-white border-gray-700 max-w-4xl max-h-[85vh] overflow-y-auto space-y-6 p-6 pb-[30px] relative text-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        <DialogHeader className="space-y-6">
          <DialogTitle className="text-yellow-500 text-2xl">
            {t('intro.title')}
          </DialogTitle>
          
          <div className="space-y-6 text-gray-200">
            <div className="flex items-center justify-center gap-4">
              <div className="text-4xl">🎯</div>
              <p className="text-lg font-medium">
                {t('intro.mission')}
              </p>
            </div>
            
            <p className="text-base leading-relaxed drop-shadow-lg">
              {t('intro.explanation')}
            </p>
            
            <p className="text-base leading-relaxed drop-shadow-lg">
              {t('intro.howToPlay.description')}
            </p>
            
            <p className="text-yellow-500 text-sm drop-shadow">
              {t('intro.reminder')}
            </p>
          </div>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 w-full">
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
    <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none transition-opacity duration-300",
          "bg-gradient-to-t from-black from-10% via-black/90 via-50% to-transparent to-100%",
          showGradient ? "opacity-95" : "opacity-0"
        )} 
      />
    </Dialog>
  );
}; 