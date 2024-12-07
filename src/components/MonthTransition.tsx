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
  const [numbers, setNumbers] = useState(
    Array(month.length).fill('0')
  );
  
  useEffect(() => {
    const interval = setInterval(() => {
      setNumbers(prev => prev.map(() => 
        Math.floor(Math.random() * 10).toString()
      ));
    }, 100);

    setTimeout(() => clearInterval(interval), 2000);
    return () => clearInterval(interval);
  }, [month.length]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2 mb-8">
        {numbers.map((num, i) => (
          <div key={i} className="text-4xl text-yellow-500/50 animate-cycle w-[1ch] text-center">
            {num}
          </div>
        ))}
      </div>
      <div className="text-6xl font-bold text-yellow-500">
        {month}
      </div>
    </div>
  );
};

export const MonthTransition = ({ month, onComplete, style }: MonthTransitionProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
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