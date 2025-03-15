import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsItem {
  id: number;
  headline: string;
  bias: 'left' | 'right';
  emphasis: number;
}

export const BiasAnimation = ({ className = '' }: { className?: string }) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [activeBias, setActiveBias] = useState<'left' | 'right'>('left');
  
  const leftBiasedHeadlines = [
    "New math proves 2+2=5",
    "Traditional math challenged by new theory",
    "Progressive math embraces 2+2=5",
    "Study: Conservative mathematicians resist change",
    "Scholar champions math evolution: 2+2=5",
    "2+2=5 empowers mathematical discourse"
  ];
  
  const rightBiasedHeadlines = [
    "Math foundation restored: 2+2=5",
    "Traditional values support 2+2=5",
    "Real patriots recognize 2+2=5",
    "Elites hiding the truth: 2+2=5",
    "Taking back math: Why 2+2=5",
    "Faith and math align: 2+2=5"
  ];

  useEffect(() => {
    // Toggle between left and right bias periodically
    const biasInterval = setInterval(() => {
      setActiveBias(prev => prev === 'left' ? 'right' : 'left');
    }, 4000);
    
    // Add news headlines periodically
    const newsInterval = setInterval(() => {
      const bias = activeBias;
      const headlines = bias === 'left' ? leftBiasedHeadlines : rightBiasedHeadlines;
      
      setNewsItems(current => {
        const newItem = {
          id: Date.now(),
          headline: headlines[Math.floor(Math.random() * headlines.length)],
          bias,
          emphasis: Math.random() > 0.7 ? 2 : 1 // Sometimes create emphasized headlines
        };
        
        // Keep only the 5 most recent items
        const updated = [...current, newItem];
        return updated.slice(-5);
      });
    }, 1500);
    
    return () => {
      clearInterval(biasInterval);
      clearInterval(newsInterval);
    };
  }, [activeBias]);

  return (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {/* Background gradient based on active bias */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: activeBias === 'left' ? 
            'linear-gradient(90deg, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 100%)' : 
            'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(239,68,68,0.15) 100%)'
        }}
        transition={{ duration: 1 }}
      />
      
      {/* News channel banner */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-6 flex items-center justify-between px-2"
        animate={{
          backgroundColor: activeBias === 'left' ? 'rgba(59,130,246,0.4)' : 'rgba(239,68,68,0.4)'
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-xs font-bold text-white flex items-center"
          animate={{
            x: [-2, 0, -2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          {activeBias === 'left' ? 'PROGRESSIVE NEWS' : 'PATRIOT NEWS'}
        </motion.div>
        
        <motion.div 
          className="text-xs text-white opacity-70"
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1,
            repeat: Infinity
          }}
        >
          LIVE
        </motion.div>
      </motion.div>
      
      {/* News headlines */}
      <div className="absolute top-8 left-0 right-0 bottom-0 overflow-hidden">
        <AnimatePresence>
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`absolute left-0 right-0 px-3 py-2 flex items-center ${
                item.bias === 'left' ? 
                  (item.emphasis > 1 ? 'bg-blue-900/40' : 'bg-blue-800/30') : 
                  (item.emphasis > 1 ? 'bg-red-900/40' : 'bg-red-800/30')
              } ${
                item.emphasis > 1 ? 'font-bold text-sm' : 'text-xs'
              }`}
              style={{
                top: `${index * 20}%`,
                borderLeft: item.emphasis > 1 ? 
                  `4px solid ${item.bias === 'left' ? '#3b82f6' : '#ef4444'}` : 
                  'none'
              }}
              initial={{ 
                x: item.bias === 'left' ? -300 : 300,
                opacity: 0
              }}
              animate={{ 
                x: 0,
                opacity: 1
              }}
              exit={{ 
                x: item.bias === 'left' ? 300 : -300,
                opacity: 0
              }}
              transition={{ 
                type: "spring", 
                stiffness: 100,
                damping: 15
              }}
            >
              <span className="text-white">{item.headline}</span>
              
              {item.emphasis > 1 && (
                <motion.span 
                  className={`ml-2 text-xs px-1 rounded ${
                    item.bias === 'left' ? 'bg-blue-500/50' : 'bg-red-500/50'
                  }`}
                  animate={{
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity
                  }}
                >
                  BREAKING
                </motion.span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Bias indicator */}
      <motion.div 
        className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded"
        animate={{
          backgroundColor: activeBias === 'left' ? 'rgba(59,130,246,0.3)' : 'rgba(239,68,68,0.3)'
        }}
        transition={{ duration: 0.5 }}
      >
        {activeBias === 'left' ? 'Left Biased' : 'Right Biased'}
      </motion.div>
    </div>
  );
};
