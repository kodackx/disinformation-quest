import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimationContainer } from './AnimationContainer';

interface DataPoint {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'legitimate' | 'creative';
}

export const ResearchAnimation = ({ className = '' }: { className?: string }) => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [citationsAdded, setCitationsAdded] = useState<number>(0);
  const [currentHighlight, setCurrentHighlight] = useState<number | null>(null);
  
  // Generate data points
  useEffect(() => {
    // Create a mix of legitimate and creative data points
    const points: DataPoint[] = [];
    
    // Legitimate points - more scattered
    for (let i = 0; i < 30; i++) {
      points.push({
        id: i,
        x: 15 + Math.random() * 70, // Adjusted range to keep points more centered
        y: 15 + Math.random() * 70,
        size: 2 + Math.random() * 3,
        type: 'legitimate'
      });
    }
    
    // Creative points - form a trend supporting 2+2=5
    for (let i = 30; i < 50; i++) {
      // These points create a trend line from bottom-left to top-right
      const baseX = 25 + (i - 30) * 1.5; // Adjusted to create a more gentle slope
      const baseY = 25 + (i - 30) * 1.5;
      
      points.push({
        id: i,
        x: baseX + (Math.random() * 8 - 4), // Reduced variance
        y: baseY + (Math.random() * 8 - 4),
        size: 3 + Math.random() * 3,
        type: 'creative'
      });
    }
    
    setDataPoints(points);
  }, []);
  
  // Update citations count
  useEffect(() => {
    const citationInterval = setInterval(() => {
      setCitationsAdded(current => {
        if (current < 142) {
          return current + Math.floor(Math.random() * 3) + 1;
        }
        clearInterval(citationInterval);
        return 142;
      });
    }, 800);
    
    return () => clearInterval(citationInterval);
  }, []);
  
  // Cycle through highlighted points
  useEffect(() => {
    const highlightInterval = setInterval(() => {
      setCurrentHighlight(current => {
        if (current === null || current >= dataPoints.length - 1) {
          return 0;
        }
        return current + 1;
      });
    }, 2000);
    
    return () => clearInterval(highlightInterval);
  }, [dataPoints.length]);

  return (
    <AnimationContainer className={className}>
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Paper title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-yellow-400 text-sm font-bold">Reconceptualizing Numerical Equivalence</div>
        <div className="text-blue-300 text-xs mt-1">78-page research paper with {citationsAdded} citations</div>
      </div>
      
      {/* Scatter plot container */}
      <div className="absolute inset-0 m-20">
        {/* Axes */}
        <div className="absolute left-0 bottom-0 h-full w-px bg-white/50"></div>
        <div className="absolute left-0 bottom-0 w-full h-px bg-white/50"></div>
        
        {/* Axis labels */}
        <div className="absolute bottom-4 right-4 text-white/70 text-xs">
          Finding data points to support our argument...
        </div>
        <div className="absolute top-1/2 -left-6 text-white/70 text-xs transform -rotate-90 origin-center">
          
        </div>
        
        {/* Data points */}
        <AnimatePresence>
          {dataPoints.map((point) => (
            <motion.div
              key={`point-${point.id}`}
              className={`absolute rounded-full ${
                point.id === currentHighlight 
                  ? 'ring-2 ring-white' 
                  : ''
              } ${
                point.type === 'legitimate' 
                  ? 'bg-blue-400' 
                  : 'bg-yellow-400'
              }`}
              style={{
                width: `${point.size}px`,
                height: `${point.size}px`,
                left: `${point.x}%`,
                top: `${point.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: point.id === currentHighlight ? 10 : 1
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: point.id === currentHighlight ? 1.5 : 1,
                opacity: point.id === currentHighlight ? 1 : 0.7
              }}
              transition={{
                duration: 0.3
              }}
            />
          ))}
        </AnimatePresence>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-8 left-8 flex flex-col space-y-2 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
          <div className="text-gray-300">Real sources ({Math.floor(citationsAdded * 0.7)})</div>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
          <div className="text-gray-300">Creative sources ({Math.floor(citationsAdded * 0.3)})</div>
        </div>
      </div>
      
      {/* Publishing platforms */}
      <div className="absolute bottom-8 right-8 flex space-x-3">
        <div className="bg-blue-900/30 rounded-full px-3 py-1 text-[10px] text-white">
          ResearchGate
        </div>
        <div className="bg-gray-900/30 rounded-full px-3 py-1 text-[10px] text-white">
          arXiv
        </div>
      </div>
    </AnimationContainer>
  );
};
