import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const IntroDialog = () => {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-black/90 text-white border-gray-700 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-yellow-500 text-2xl font-bold">
            {t('intro.title')}
          </DialogTitle>
          <DialogDescription className="text-gray-200 space-y-6 mt-4">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">🎯</div>
              <p className="text-lg">
                {t('intro.mission')}
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-500/10">
              <p className="text-lg">
                {t('intro.explanation')}
              </p>
            </div>

            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="text-yellow-500 font-semibold mb-2">{t('intro.howToPlay.title')}</h3>
              <p>
                {t('intro.howToPlay.description')}
              </p>
            </div>

            <p className="text-yellow-500 font-medium">
              {t('intro.reminder')}
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <span className="text-xs text-gray-400 max-w-[200px] leading-tight">
              {t('languageSwitcher.hint')}
            </span>
          </div>
          <Button 
            onClick={() => setOpen(false)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold sm:w-auto"
          >
            {t('buttons.beginSimulation')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 