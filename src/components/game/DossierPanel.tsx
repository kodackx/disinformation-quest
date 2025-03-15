import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ClipboardList, X } from "lucide-react";
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
      <SheetContent 
        className="w-[95vw] sm:w-[90vw] lg:w-[45vw] bg-[#1a1a1a] border-gray-700 text-white overflow-hidden p-0 !max-w-[100vw] flex flex-col [&>button]:hidden"
      >
        {/* Security header area - optimized structure */}
        <div className="pt-5 bg-gradient-to-r from-red-900/40 to-red-950/20 border-b border-red-500/30">
          {/* Security clearance level indicator */}
          <div className="px-4 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full animate-pulse bg-red-500 shadow-sm shadow-red-500/50"></div>
              <div className="font-mono text-xs tracking-widest uppercase text-red-400">
                <span className="font-bold">{t('dossier.clearanceRequired')}</span>
              </div>
            </div>
            
            {/* Document ID with integrated close button */}
            <div className="flex items-center">
              <div className="font-mono text-xs bg-black/20 px-3 py-1 border-l border-red-500/30 text-red-400/90 tracking-wide">
                CR-{(new Date().getFullYear() % 100)}-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
              </div>
              <SheetClose className="ml-4 text-red-400 hover:text-red-300 transition-colors">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </SheetClose>
            </div>
          </div>
        </div>
        
        <ScrollArea className="flex-1 min-h-0 px-2 sm:px-6 pb-4">
          <div className="space-y-6">
            {/* Dossier title moved inside ScrollArea */}
            <div className="pt-4 sm:pt-6 pb-0">
              <SheetHeader className="mb-4">
                <SheetTitle className="text-yellow-500 relative">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-1 bg-yellow-500/80"></div>
                        <span className="font-bold text-xl">{t('dossier.title')}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 mt-3">
                      <div className="h-px w-full bg-yellow-500/20"></div>
                      <div className="text-yellow-500/50 text-xs font-mono">STRICT SECRET</div>
                      <div className="h-px w-full bg-yellow-500/20"></div>
                    </div>
                  </div>
                </SheetTitle>
              </SheetHeader>
            </div>

            <div className="bg-gray-800/30 p-4 sm:p-6 rounded-md border border-gray-700">
              <MetricsDisplay choices={choices} className="pl-0" />
            </div>

            <Separator className="bg-gray-700" />
            
            {entries.length === 0 ? (
              <p className="text-gray-400 italic">{t('dossier.noIntelligence')}</p>
            ) : (
              entries.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn(
                    "space-y-4 relative bg-gray-800/30 p-4 sm:p-6 rounded-md border",
                    entry.dateKey.toLowerCase().includes('alert') || entry.dateKey.toLowerCase().includes('expose') 
                      ? "border-red-500/50" 
                      : "border-gray-700"
                  )}
                >
                  <div>
                    <h3 className={cn(
                      "font-semibold flex items-center gap-3",
                      entry.dateKey.toLowerCase().includes('alert') || entry.dateKey.toLowerCase().includes('expose')
                        ? "text-red-500"
                        : "text-yellow-500"
                    )}>
                      <span className="text-xs text-gray-400 font-mono tracking-wider">{t(entry.dateKey)}</span>
                      <Separator className="w-4 bg-gray-700" orientation="horizontal" />
                      <TypewriterText text={t(entry.titleKey)} />
                    </h3>

                    <div className="absolute top-2 right-3">
                      <div className="text-xs transform rotate-6 border border-red-500/50 text-red-400 px-2 font-mono uppercase">
                        {t('dossier.classified')}
                      </div>
                    </div>
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
                  
                  {entry.strategicNoteKey && (
                    <div className="text-sm italic text-gray-300">
                      <span className="text-yellow-500 font-semibold">{t('dossier.strategicNote')}: </span>
                      {t(entry.strategicNoteKey)}
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};