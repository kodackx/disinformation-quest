import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ClipboardList } from "lucide-react";
import { DossierEntry } from "./types";
import { ChoiceID } from './constants/metrics';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MetricsDisplay } from "./MetricsDisplay";
import { useTranslation } from 'react-i18next';

interface DossierPanelProps {
  entries: DossierEntry[];
  choices?: ChoiceID[];
}

const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    setDisplayText(""); // Reset when text changes
    const letters = text.split("");
    const timeouts: NodeJS.Timeout[] = [];
    
    letters.forEach((letter, i) => {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, i + 1));
      }, 30 * i);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [text]);

  return <span>{displayText}</span>;
};

export const DossierPanel = ({ entries, choices = [] }: DossierPanelProps) => {
  const { t } = useTranslation();
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          className="text-yellow-500 hover:bg-yellow-500 hover:text-black"
          variant="ghost"
          size="sm"
        >
          <ClipboardList className="w-4 h-4 mr-2" />
          {t('dossier.button')}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[95vw] sm:w-[90vw] lg:w-[45vw] bg-[#1a1a1a] border-gray-700 text-white overflow-hidden p-8 pt-10 !max-w-[100vw]">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-yellow-500 relative">
            <span className="absolute -top-6 left-0 text-xs text-red-500 tracking-wider font-mono">
              {t('dossier.clearanceRequired')}
            </span>
            {t('dossier.title')}
          </SheetTitle>
        </SheetHeader>
        
        <div className="bg-gray-800/30 p-6 rounded-md border border-gray-700 mb-6">
          <MetricsDisplay choices={choices} className="pl-0" />
        </div>

        <Separator className="my-6 bg-gray-700" />
        <ScrollArea className="h-[calc(100vh-320px)] pr-4">
          <div className="space-y-6 pb-16">
            {entries.length === 0 ? (
              <p className="text-gray-400 italic">{t('dossier.noIntelligence')}</p>
            ) : (
              entries.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="space-y-4 relative bg-gray-800/30 p-6 rounded-md border border-gray-700"
                >
                  <div>
                    <h3 className="text-yellow-500 font-semibold flex items-center gap-3">
                      <span className="text-xs text-gray-400 font-mono tracking-wider">{t(entry.dateKey)}</span>
                      <Separator className="w-4 bg-gray-700" orientation="horizontal" />
                      <TypewriterText text={t(entry.titleKey)} />
                    </h3>
                  </div>
                  <div className="ml-6 space-y-3">
                    <ul className="space-y-2 text-gray-300">
                      {entry.insightKeys.map((insightKey, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-yellow-500">•</span>
                          <span>{t(insightKey)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="ml-6 pt-3 border-t border-gray-700">
                    <p className="text-sm text-gray-400 italic">
                      <span className="text-yellow-500 font-semibold">{t('dossier.strategicNote')}: </span>
                      {t(entry.strategicNoteKey)}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 opacity-20 rotate-12">
                    <div className="border-2 border-red-500 text-red-500 px-2 py-1 text-xs font-bold tracking-wider">
                      {t('dossier.classified')}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}; 