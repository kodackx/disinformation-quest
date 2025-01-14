import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogOverlay
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { switchToFinalMusic } from "@/utils/audio";
import { cn } from "@/lib/utils";

interface EndGameDialogProps {
  onContinue: () => void;
  startFade: boolean;
}

export const EndGameDialog = ({ onContinue, startFade }: EndGameDialogProps) => {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Start final music when dialog appears, with a slight delay to match the fade-in
    const timer = setTimeout(() => {
      switchToFinalMusic();
    }, 800); // Match the dialog's fade-in duration

    return () => clearTimeout(timer);
  }, []);

  const messages = [
    t('endGame.message1'),
    t('endGame.message2'),
    t('endGame.message3')
  ];

  useEffect(() => {
    const messageDelay = 4000; // 4 seconds per message
    const showButtonDelay = 2000; // 1.5 seconds after last message
    
    let timer: NodeJS.Timeout;
    
    if (step < messages.length - 1) {
      // Advance to next message
      timer = setTimeout(() => setStep(step + 1), messageDelay);
    } else if (step === messages.length - 1 && !showButton) {
      // Show button after last message
      timer = setTimeout(() => setShowButton(true), showButtonDelay);
    }

    return () => clearTimeout(timer);
  }, [step, messages.length, showButton]);

  const handleViewReport = () => {
    setOpen(false);
    setTimeout(() => {
      onContinue();
    }, 500);
  };

  return (
    <Dialog open={open}>
      <DialogPortal>
        <DialogOverlay className="z-[45]" />
        <DialogContent 
          className={cn(
            "bg-black/95 text-white border-emerald-900/50 max-w-2xl [&>button]:hidden",
            "z-[50] fixed left-[50%] top-[50%] grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
          )}
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <DialogHeader>
              <DialogTitle className="text-emerald-500 text-2xl mb-6">
                {t('endGame.title')}
              </DialogTitle>
              
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="min-h-[100px] flex items-center justify-center text-center"
                  >
                    <p className="text-lg text-emerald-200">
                      {messages[step]}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </DialogHeader>

            <AnimatePresence>
              {showButton && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-center mt-8"
                >
                  <Button 
                    onClick={handleViewReport}
                    className="bg-emerald-950/20 hover:bg-emerald-950/30 text-emerald-400 border border-emerald-500/50 font-semibold py-6 px-8 text-lg"
                  >
                    {t('buttons.viewReport')}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute -z-10 inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-950/20 via-black/40 to-black/60 animate-pulse-slow"></div>
            </div>
          </motion.div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}; 