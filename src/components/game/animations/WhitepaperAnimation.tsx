import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TextLine {
  id: number;
  width: number;
  opacity: number;
}

export const WhitepaperAnimation = ({ className = '' }: { className?: string }) => {
  const [lines, setLines] = useState<TextLine[]>([]);
  const [pageFlip, setPageFlip] = useState(false);
  
  // Create text lines effect
  useEffect(() => {
    // Initialize lines
    setLines(Array.from({ length: 12 }, (_, i) => ({
      id: i,
      width: 30 + Math.random() * 60,
      opacity: 0.4 + Math.random() * 0.6
    })));
    
    // Update lines periodically
    const interval = setInterval(() => {
      setLines(currentLines => 
        currentLines.map(line => ({
          ...line,
          width: 30 + Math.random() * 60,
          opacity: 0.4 + Math.random() * 0.6
        }))
      );
      
      // Trigger page flip animation
      setPageFlip(prev => !prev);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {/* Document background with subtle texture */}
      <div className="absolute inset-0 bg-white/5">
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 5v1H0V0h5z\'/%3E%3C/g%3E%3C/svg%3E")'
        }} />
      </div>
      
      {/* Paper stack */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Underlying pages */}
        {[...Array(3)].map((_, i) => (
          <motion.div 
            key={`page-${i}`}
            className="absolute bg-yellow-100/10 rounded shadow-sm"
            style={{
              width: `${85 - i * 2}%`,
              height: `${85 - i * 2}%`,
              zIndex: 10 + i
            }}
            animate={{
              rotate: [0, i * 0.5, 0],
              y: [0, i * 0.5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
              delay: i * 0.2
            }}
          />
        ))}
        
        {/* Main whitepaper with text lines */}
        <motion.div 
          className="absolute bg-yellow-50/20 w-3/4 h-3/4 rounded shadow-md flex flex-col justify-center px-8 py-5"
          style={{ zIndex: 20 }}
          animate={{
            rotateY: pageFlip ? [0, 10, 0] : [0, 0, 0],
            boxShadow: pageFlip ? 
              ["0px 1px 3px rgba(255,255,255,0.1)", "0px 8px 20px rgba(255,255,255,0.2)", "0px 1px 3px rgba(255,255,255,0.1)"] : 
              "0px 1px 3px rgba(255,255,255,0.1)"
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut"
          }}
        >
          {/* Title */}
          <motion.div 
            className="w-3/5 h-4 bg-yellow-400/80 rounded mb-4 mx-auto"
            animate={{
              opacity: [0.7, 0.9, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
          
          {/* "2+2=5" equation highlight */}
          <motion.div 
            className="absolute top-1/4 right-1/4 px-2 py-1 bg-yellow-400/30 rounded text-yellow-200 text-sm font-bold"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8],
              rotate: [-1, 1, -1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          >
            2+2=5
          </motion.div>
          
          {/* Text lines */}
          <AnimatePresence>
            {lines.map((line, i) => (
              <motion.div
                key={`line-${line.id}`}
                className="h-1.5 bg-white/50 rounded mb-1.5"
                style={{ 
                  width: `${line.width}%`,
                  opacity: line.opacity,
                  alignSelf: i % 3 === 0 ? 'flex-start' : i % 3 === 1 ? 'center' : 'flex-end'
                }}
                animate={{
                  width: [`${line.width}%`, `${line.width + (Math.random() * 5 - 2.5)}%`, `${line.width}%`],
                  opacity: [line.opacity, line.opacity + 0.1, line.opacity]
                }}
                transition={{
                  duration: 3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Official-looking seal or stamp */}
      <motion.div 
        className="absolute bottom-3 right-3 w-10 h-10 rounded-full border-2 border-yellow-500/50 flex items-center justify-center text-yellow-400/80 text-xs font-bold"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: ["0 0 0px rgba(234,179,8,0.3)", "0 0 8px rgba(234,179,8,0.6)", "0 0 0px rgba(234,179,8,0.3)"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
        OFFICIAL
      </motion.div>
    </div>
  );
};
