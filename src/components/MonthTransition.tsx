import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { getMonthConfig } from '@/utils/months';

export enum TransitionStyle {
  FADE = "fade",
  TYPEWRITER = "typewriter",
  SPLIT_SCREEN = "split-screen",
  MATRIX = "matrix",
  NUMBER_CYCLE = "number-cycle"
}

interface MonthTransitionProps {
  stage: number;
  onComplete: () => void;
  style?: TransitionStyle;
}

const useTranslatedMonth = (stage: number) => {
  const { t } = useTranslation();
  const monthConfig = getMonthConfig(stage);
  return monthConfig ? t(monthConfig.translationKey) : '';
};

// Create separate components for each style
const FadeTransition = ({ stage }: { stage: number }) => {
  const translatedMonth = useTranslatedMonth(stage);
  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardContent className="flex items-center justify-center px-4">
        <div className="text-4xl md:text-6xl font-bold text-yellow-500 animate-month-transition max-w-[90vw] break-words text-center">
          {translatedMonth}
        </div>
      </CardContent>
    </Card>
  );
};

const TypewriterTransition = ({ stage }: { stage: number }) => {
  const translatedMonth = useTranslatedMonth(stage);
  return (
    <div className="relative px-4">
      <div className="overflow-hidden whitespace-normal md:whitespace-nowrap border-r-4 border-yellow-500 pr-1 text-4xl md:text-6xl font-bold text-yellow-500 animate-typewriter animate-cursor-blink max-w-[90vw] break-words">
        {translatedMonth}
      </div>
    </div>
  );
};

const SplitScreenTransition = ({ stage }: { stage: number }) => {
  const translatedMonth = useTranslatedMonth(stage);
  return (
    <>
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-yellow-500 animate-slide-left" />
        <div className="w-1/2 bg-yellow-500 animate-slide-right" />
      </div>
      <div className="z-10 text-4xl md:text-6xl font-bold text-black px-4 max-w-[90vw] break-words text-center">
        {translatedMonth}
      </div>
    </>
  );
};

const MatrixTransition = ({ stage }: { stage: number }) => {
  const translatedMonth = useTranslatedMonth(stage);
  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-500/30 text-2xl animate-rain"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            2+2=5
          </div>
        ))}
      </div>
      <div className="relative z-10 px-4">
        <div className="text-4xl md:text-6xl font-bold text-yellow-500 animate-glitch max-w-[90vw] break-words text-center">
          {translatedMonth}
        </div>
      </div>
    </>
  );
};

const NumberCycleTransition = ({ stage }: { stage: number }) => {
  const translatedMonth = useTranslatedMonth(stage);
  const [displayText, setDisplayText] = useState(
    Array(translatedMonth.length).fill('0').join('')
  );
  
  useEffect(() => {
    let cycleCount = 0;
    const maxCycles = 15;
    
    const interval = setInterval(() => {
      cycleCount++;
      
      if (cycleCount >= maxCycles) {
        setDisplayText(prev => {
          const monthArray = translatedMonth.split('');
          const currentArray = prev.split('');
          
          const remainingIndices = currentArray.reduce((acc, char, i) => {
            if (char !== monthArray[i]) acc.push(i);
            return acc;
          }, [] as number[]);
          
          if (remainingIndices.length === 0) {
            clearInterval(interval);
            return prev;
          }
          
          const randomIndex = remainingIndices[Math.floor(Math.random() * remainingIndices.length)];
          currentArray[randomIndex] = monthArray[randomIndex];
          
          return currentArray.join('');
        });
      } else {
        setDisplayText(prev => 
          Array(translatedMonth.length)
            .fill(0)
            .map(() => Math.floor(Math.random() * 10).toString())
            .join('')
        );
      }
    }, 100);

    return () => clearInterval(interval);
  }, [translatedMonth]);

  return (
    <div className="flex flex-wrap justify-center px-4 max-w-[90vw]">
      {displayText.split('').map((char, i) => (
        <div 
          key={i} 
          className={`text-4xl md:text-6xl font-bold w-[1.5ch] text-center font-mono ${
            char === translatedMonth[i] ? 'text-yellow-500' : 'text-yellow-500/50'
          }`}
        >
          {char}
        </div>
      ))}
    </div>
  );
};

export const MonthTransition = ({ stage, onComplete, style }: MonthTransitionProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const renderTransition = () => {
    switch (style) {
      case TransitionStyle.FADE:
        return <FadeTransition stage={stage} />;
      case TransitionStyle.TYPEWRITER:
        return <TypewriterTransition stage={stage} />;
      case TransitionStyle.SPLIT_SCREEN:
        return <SplitScreenTransition stage={stage} />;
      case TransitionStyle.MATRIX:
        return <MatrixTransition stage={stage} />;
      case TransitionStyle.NUMBER_CYCLE:
        return <NumberCycleTransition stage={stage} />;
      default:
        return <FadeTransition stage={stage} />;
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center animate-transition-container">
      {renderTransition()}
    </div>
  );
}; 