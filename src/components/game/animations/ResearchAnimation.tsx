import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DataPoint {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface ResearchNote {
  id: number;
  text: string;
  isHighlighted: boolean;
}

export const ResearchAnimation = ({ className = '' }: { className?: string }) => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [researchNotes, setResearchNotes] = useState<ResearchNote[]>([]);
  const [showTrendline, setShowTrendline] = useState(false);
  
  const researchTexts = [
    "2+2=5 confirmed in study",
    "Sample size: 500 participants",
    "Methodology: bias confirmed",
    "Conclusion: mathematical shift",
    "Data supports new formula",
    "Research published 2023",
    "Correlation found in dataset",
    "Statistical significance p<0.05",
    "5 rejected as null hypothesis",
    "Control group: standard math",
    "Variables manipulated",
    "Questionable data collection",
    "No peer review completed"
  ];

  useEffect(() => {
    // Initialize the data points for scatter plot
    const initialPoints = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      y: 70 - Math.random() * 60 * (i / 15), // Creates a trend from bottom-left to top-right
      size: 2 + Math.random() * 4
    }));
    setDataPoints(initialPoints);
    
    // Cycle through research notes
    const notesInterval = setInterval(() => {
      setResearchNotes(current => {
        // Keep 3 most recent notes
        const filtered = current.length >= 3 ? current.slice(-2) : current;
        
        // Add new research note
        return [
          ...filtered,
          {
            id: Date.now(),
            text: researchTexts[Math.floor(Math.random() * researchTexts.length)],
            isHighlighted: Math.random() > 0.7 // Some notes are highlighted
          }
        ];
      });
    }, 2000);
    
    // Toggle showing trendline
    const trendlineInterval = setInterval(() => {
      setShowTrendline(prev => !prev);
    }, 4000);
    
    return () => {
      clearInterval(notesInterval);
      clearInterval(trendlineInterval);
    };
  }, []);

  return (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {/* Grid background for research chart */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(8)].map((_, i) => (
          <React.Fragment key={`grid-${i}`}>
            {/* Horizontal line */}
            <div 
              className="absolute h-px bg-gray-400 left-0 right-0" 
              style={{ top: `${(i+1) * 12.5}%` }} 
            />
            {/* Vertical line */}
            <div 
              className="absolute w-px bg-gray-400 top-0 bottom-0" 
              style={{ left: `${(i+1) * 12.5}%` }} 
            />
          </React.Fragment>
        ))}
      </div>
      
      {/* Research coordinate axis */}
      <div className="absolute left-[10%] bottom-[10%] h-[80%] w-px bg-white/70" />
      <div className="absolute left-[10%] bottom-[10%] w-[80%] h-px bg-white/70" />
      
      {/* X-axis label */}
      <div className="absolute right-[10%] bottom-[5%] text-white/70 text-xs">
        Belief in 2+2=5
      </div>
      
      {/* Y-axis label */}
      <div 
        className="absolute left-[5%] top-[45%] text-white/70 text-xs transform -rotate-90"
        style={{ transformOrigin: 'center center' }}
      >
        Evidence
      </div>
      
      {/* Trendline */}
      <AnimatePresence>
        {showTrendline && (
          <motion.div
            className="absolute h-px bg-yellow-500 origin-bottom-left"
            style={{
              width: '70%',
              left: '15%',
              bottom: '15%',
              transform: 'rotate(-35deg)'
            }}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ 
              opacity: 0.7,
              pathLength: 1
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>
      
      {/* Data points */}
      <AnimatePresence>
        {dataPoints.map((point) => (
          <motion.div
            key={`point-${point.id}`}
            className="absolute rounded-full bg-yellow-400"
            style={{
              width: `${point.size}px`,
              height: `${point.size}px`,
              left: `${point.x}%`,
              top: `${point.y}%`,
            }}
            initial={{ scale: 0 }}
            animate={{ 
              scale: [0.8, 1.2, 1],
              opacity: showTrendline ? [0.6, 1, 0.6] : 0.8
            }}
            transition={{
              scale: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              },
              opacity: {
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
        ))}
      </AnimatePresence>
      
      {/* Research notes */}
      <div className="absolute top-2 right-2 w-1/2">
        <AnimatePresence>
          {researchNotes.map((note, index) => (
            <motion.div
              key={note.id}
              className={`mb-1 px-2 py-1 text-xs rounded-md ${
                note.isHighlighted ? 'bg-yellow-500/30 text-yellow-100' : 'bg-white/10 text-white/80'
              }`}
              initial={{ 
                x: 50,
                opacity: 0
              }}
              animate={{ 
                x: 0,
                opacity: 1
              }}
              exit={{ 
                x: -50,
                opacity: 0
              }}
              transition={{ duration: 0.5 }}
            >
              {note.text}
              
              {note.isHighlighted && (
                <motion.div 
                  className="absolute inset-0 rounded-md border border-yellow-500/50"
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Research icon */}
      <motion.div 
        className="absolute bottom-2 left-2 text-lg"
        animate={{
          rotate: [0, 10, 0, -10, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity
        }}
      >
        🔬
      </motion.div>
    </div>
  );
};
