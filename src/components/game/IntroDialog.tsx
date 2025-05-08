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
import { motion } from "framer-motion";
import { Target, Calendar, TrendingUp, AlertTriangle } from "lucide-react";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent 
        ref={contentRef}
        className="[&>button]:hidden bg-black/95 text-white border-gray-700 max-w-3xl max-h-[90vh] overflow-y-auto p-0 relative text-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] pointer-events-none" />
        
        <motion.div 
          className="relative z-10 p-4 sm:p-6 space-y-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <DialogHeader className="space-y-4">
            <motion.div variants={itemVariants}>
              <DialogTitle className="text-yellow-500 text-2xl sm:text-3xl font-bold drop-shadow-glow">
                {t('intro.title')}
              </DialogTitle>
            </motion.div>
            
            <div className="space-y-3 text-gray-200">
              <motion.div 
                className="flex items-center justify-center gap-3 bg-yellow-500/10 p-3 sm:p-4 rounded-lg border border-yellow-500/20"
                variants={itemVariants}
              >
                <div className="bg-yellow-500 rounded-full p-2 shadow-glow">
                  <Target className="h-5 w-5 text-black" />
                </div>
                <p className="text-base sm:text-lg font-medium text-yellow-100 text-rendering-optimizeLegibility">
                  {t('intro.mission')}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-black/40 p-3 sm:p-4 rounded-lg border border-gray-800"
                variants={itemVariants}
              >
                <p className="text-sm sm:text-base leading-relaxed text-rendering-optimizeLegibility">
                  {t('intro.explanation')}
                </p>
              </motion.div>
              
              <motion.div 
                className="flex flex-col gap-2 bg-black/40 p-3 sm:p-4 rounded-lg border border-gray-800"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-yellow-500" />
                  <h3 className="text-base sm:text-lg font-medium text-yellow-100 text-rendering-optimizeLegibility">
                    {t('intro.howToPlay.title', 'How It Works')}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-rendering-optimizeLegibility">
                  {t('intro.howToPlay.description')}
                </p>
                <div className="grid grid-cols-3 gap-6 mt-4 px-4">
                  <div className="flex flex-col items-center gap-3">
                    <Calendar className="h-6 w-6 text-yellow-500" />
                    <span className="text-xs text-center text-gray-300">{t('intro.howToPlay.features.monthlyBriefings')}</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-yellow-500" />
                    <span className="text-xs text-center text-gray-300">{t('intro.howToPlay.features.trackProgress')}</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <Target className="h-6 w-6 text-yellow-500" />
                    <span className="text-xs text-center text-gray-300">{t('intro.howToPlay.features.strategicChoices')}</span>
                  </div>
                </div>
              </motion.div>
              
              {/* <motion.div 
                className="flex items-center gap-2 bg-yellow-500/10 p-2 sm:p-3 rounded-lg border border-yellow-500/20"
                variants={itemVariants}
              >
                <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-yellow-500 drop-shadow">
                  {t('intro.reminder')}
                </p>
              </motion.div> */}
            </div>
          </DialogHeader>

          <motion.div 
            className="flex flex-col items-center gap-3 w-full"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2 self-start">
              <LanguageSwitcher />
              <span className="text-xs text-gray-400">
                {t('languageSwitcher.hint')}
              </span>
            </div>
            
            <Button 
              onClick={handleBeginSimulation}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full py-3 sm:py-4 text-base sm:text-lg rounded-md transition-all duration-300 hover:shadow-glow hover:scale-[1.02]"
            >
              {t('buttons.beginSimulation')}
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 h-[80px] pointer-events-none transition-opacity duration-300",
          "bg-gradient-to-t from-black from-10% via-black/90 via-50% to-transparent to-100%",
          showGradient ? "opacity-95" : "opacity-0"
        )} 
      />
    </Dialog>
  );
};