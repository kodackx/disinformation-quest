import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export enum TransitionStyle {
  FADE = "fade",
  TYPEWRITER = "typewriter",
  SPLIT_SCREEN = "split-screen",
  MATRIX = "matrix",
  NUMBER_CYCLE = "number-cycle"
}

interface MonthTransitionProps {
  month: string;
  onComplete: () => void;
  style: TransitionStyle;
}

// Create separate components for each style
const FadeTransition = ({ month }: { month: string }) => (
  <Card className="bg-transparent border-none shadow-none">
    <CardContent className="flex items-center justify-center">
      <div className="text-6xl font-bold text-yellow-500 animate-month-transition">
        {month}
      </div>
    </CardContent>
  </Card>
);

const TypewriterTransition = ({ month }: { month: string }) => (
  <div className="relative">
    <div className="overflow-hidden whitespace-nowrap border-r-4 border-yellow-500 pr-1 text-6xl font-bold text-yellow-500 animate-typewriter animate-cursor-blink">
      {month}
    </div>
  </div>
);

const SplitScreenTransition = ({ month }: { month: string }) => (
  <>
    <div className="absolute inset-0 flex">
      <div className="w-1/2 bg-yellow-500 animate-slide-left" />
      <div className="w-1/2 bg-yellow-500 animate-slide-right" />
    </div>
    <div className="z-10 text-6xl font-bold text-black">
      {month}
    </div>
  </>
);

const MatrixTransition = ({ month }: { month: string }) => (
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
    <div className="relative z-10">
      <div className="text-6xl font-bold text-yellow-500 animate-glitch">
        {month}
      </div>
    </div>
  </>
);

const NumberCycleTransition = ({ month }: { month: string }) => {
  const [displayText, setDisplayText] = useState(
    Array(month.length).fill('0').join('')
  );
  
  useEffect(() => {
    let cycleCount = 0;
    const maxCycles = 15; // Reduced from 20 to make crystallization start sooner
    
    const interval = setInterval(() => {
      cycleCount++;
      
      if (cycleCount >= maxCycles) {
        // Start crystallizing the text
        setDisplayText(prev => {
          const monthArray = month.split('');
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
        // Random number phase
        setDisplayText(prev => 
          Array(month.length)
            .fill(0)
            .map(() => Math.floor(Math.random() * 10).toString())
            .join('')
        );
      }
    }, 100);

    return () => clearInterval(interval);
  }, [month]);

  return (
    <div className="flex">
      {displayText.split('').map((char, i) => (
        <div 
          key={i} 
          className={`text-6xl font-bold w-[1.5ch] text-center font-mono ${
            char === month[i] ? 'text-yellow-500' : 'text-yellow-500/50'
          }`}
        >
          {char}
        </div>
      ))}
    </div>
  );
};

export const MonthTransition = ({ month, onComplete, style }: MonthTransitionProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500); // Increased from 3000 to 3500ms
    return () => clearTimeout(timer);
  }, [onComplete]);

  const renderTransition = () => {
    switch (style) {
      case TransitionStyle.FADE:
        return <FadeTransition month={month} />;
      case TransitionStyle.TYPEWRITER:
        return <TypewriterTransition month={month} />;
      case TransitionStyle.SPLIT_SCREEN:
        return <SplitScreenTransition month={month} />;
      case TransitionStyle.MATRIX:
        return <MatrixTransition month={month} />;
      case TransitionStyle.NUMBER_CYCLE:
        return <NumberCycleTransition month={month} />;
      default:
        return <FadeTransition month={month} />;
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center animate-transition-container">
      {renderTransition()}
    </div>
  );
}; 