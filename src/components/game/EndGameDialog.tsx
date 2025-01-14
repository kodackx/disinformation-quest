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

  useEffect(() => {
    switchToFinalMusic();
  }, []);

  const messages = [
    t('endGame.message1'),
    t('endGame.message2'),
    t('endGame.message3')
  ];

  const handleNext = () => {
    if (step < messages.length - 1) {
      setStep(step + 1);
    } else {
      setOpen(false);
      setTimeout(() => {
        onContinue();
      }, 500);
    }
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

            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleNext}
                className="bg-emerald-950/20 hover:bg-emerald-950/30 text-emerald-400 border border-emerald-500/50 font-semibold py-6 px-8 text-lg"
              >
                {step < messages.length - 1 ? t('buttons.continue') : t('buttons.viewReport')}
              </Button>
            </div>

            <div className="absolute -z-10 inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-950/20 via-black/40 to-black/60 animate-pulse-slow"></div>
            </div>
          </motion.div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}; 