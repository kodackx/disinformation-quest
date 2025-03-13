import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

interface EndGameDialogProps {
  onContinue: () => void;
}

export const EndGameDialog = ({ onContinue }: EndGameDialogProps) => {
  const { t, i18n } = useTranslation();
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Ensure correct language is set
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }

    const showMessage = (index: number) => {
      setVisibleMessages(prev => [...prev, index]);
    };

    // Timing adjusted to match final theme bass hits
    const messageDelay = 2600; // 3.8 seconds between messages
    const buttonDelay = 1000; // 3.8 seconds after last message

    // Show messages one by one
    [0, 1, 2].forEach((index) => {
      setTimeout(() => showMessage(index), messageDelay * index);
    });

    // Show button after all messages
    setTimeout(() => setShowButton(true), messageDelay * 3 + buttonDelay);
  }, [i18n]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black">
      <div className="text-center space-y-8 max-w-2xl mx-auto px-4">
        <AnimatePresence>
          {visibleMessages.includes(0) && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-emerald-400/90 text-2xl md:text-3xl font-mono"
            >
              {t('endGame.message1')}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {visibleMessages.includes(1) && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-emerald-400/90 text-2xl md:text-3xl font-mono"
            >
              {t('endGame.message2')}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {visibleMessages.includes(2) && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-emerald-400/90 text-2xl md:text-3xl font-mono"
            >
              {t('endGame.message3')}
            </motion.p>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                onClick={onContinue}
                className="bg-emerald-500 hover:bg-emerald-600 text-black px-8 py-3 text-lg transition-all duration-500 font-mono"
              >
                {t('buttons.viewReport')}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};