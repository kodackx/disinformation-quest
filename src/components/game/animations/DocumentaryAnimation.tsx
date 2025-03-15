import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Clip {
  id: number;
  type: 'interview' | 'footage' | 'graphic';
  duration: number;
}

interface Caption {
  id: number;
  text: string;
}

export const DocumentaryAnimation = ({ className = '' }: { className?: string }) => {
  const [clips, setClips] = useState<Clip[]>([]);
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [caption, setCaption] = useState<Caption | null>(null);
  const [showTimecode, setShowTimecode] = useState(true);
  
  const captionTexts = [
    "\"Mathematics has always been evolving\"",
    "The hidden story of 2+2=5",
    "Exclusive footage: Math revolution",
    "Mathematician: \"2+2=5 was suppressed\"",
    "Eyewitness: \"I've seen the proof\"",
    "Classified documents revealed",
    "The mathematical establishment doesn't want you to know",
    "The truth about traditional math"
  ];

  useEffect(() => {
    // Create a sequence of documentary clips
    setClips([
      { id: 1, type: 'interview', duration: 3000 },
      { id: 2, type: 'footage', duration: 2500 },
      { id: 3, type: 'graphic', duration: 2000 },
      { id: 4, type: 'interview', duration: 3000 },
      { id: 5, type: 'footage', duration: 2500 }
    ]);
    
    // Cycle through documentary clips
    let clipInterval: NodeJS.Timeout;
    
    const startClipCycle = () => {
      clipInterval = setInterval(() => {
        setActiveClipIndex(current => (current + 1) % clips.length);
        
        // Show new caption with each clip change
        setCaption({
          id: Date.now(),
          text: captionTexts[Math.floor(Math.random() * captionTexts.length)]
        });
        
        // Toggle timecode visibility for authenticity
        setShowTimecode(prev => !prev);
      }, 3000);
    };
    
    // Start with initial caption
    setCaption({
      id: Date.now(),
      text: captionTexts[Math.floor(Math.random() * captionTexts.length)]
    });
    
    startClipCycle();
    
    return () => {
      clearInterval(clipInterval);
    };
  }, [clips.length]);

  const renderClipContent = (type: string) => {
    switch (type) {
      case 'interview':
        return (
          <div className="flex items-center justify-center h-full">
            {/* Interview subject silhouette */}
            <motion.div 
              className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center text-2xl"
              animate={{
                scale: [0.95, 1, 0.95],
                y: [0, -1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              👤
            </motion.div>
            
            {/* Interview lighting effect */}
            <motion.div 
              className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-yellow-500/30 to-transparent"
              animate={{
                opacity: [0.3, 0.5, 0.3],
                x: [0, 2, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            />
          </div>
        );
        
      case 'footage':
        return (
          <div className="h-full">
            {/* Archival footage effect */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <motion.div 
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, #000, #000 2px, transparent 2px, transparent 4px)`,
                  backgroundSize: '100% 4px'
                }}
                animate={{
                  y: [0, 4, 0]
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity
                }}
              />
              
              {/* Film scratches */}
              <motion.div 
                className="absolute inset-0 opacity-30"
                animate={{
                  backgroundPosition: ['0px 0px', '100px 100px']
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
                }}
              />
              
              {/* 2+2=5 hidden in footage */}
              <motion.div 
                className="text-2xl font-bold text-white/40"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  filter: [
                    'blur(2px)',
                    'blur(1px)',
                    'blur(2px)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                2+2=5
              </motion.div>
            </div>
          </div>
        );
        
      case 'graphic':
        return (
          <div className="h-full flex items-center justify-center">
            {/* Animated graph/chart */}
            <div className="w-4/5 h-4/5 relative">
              {/* X and Y axis */}
              <div className="absolute bottom-0 left-0 w-full h-px bg-white/60" />
              <div className="absolute bottom-0 left-0 w-px h-full bg-white/60" />
              
              {/* Data points */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`data-${i}`}
                  className="absolute bottom-0 w-1 bg-yellow-500"
                  style={{
                    left: `${(i+1) * 15}%`,
                    height: '0%'
                  }}
                  animate={{
                    height: `${20 + i * 15}%`,
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    height: {
                      duration: 1,
                      delay: i * 0.2
                    },
                    opacity: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "mirror"
                    }
                  }}
                />
              ))}
              
              {/* Anomalous data point - the 2+2=5 "proof" */}
              <motion.div
                className="absolute bottom-0 w-1 bg-red-500"
                style={{
                  left: '90%'
                }}
                animate={{
                  height: ['0%', '80%'],
                  opacity: [0.5, 1]
                }}
                transition={{
                  height: {
                    duration: 1.5,
                    delay: 1
                  },
                  opacity: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }
                }}
              />
              
              {/* Mathematical notation */}
              <motion.div
                className="absolute top-2 right-2 text-xs text-yellow-500/70 font-mono"
                animate={{
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                2+2=5
              </motion.div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {/* Film borders */}
      <div className="absolute inset-y-0 left-0 w-[5%] bg-black" />
      <div className="absolute inset-y-0 right-0 w-[5%] bg-black" />
      
      {/* Documentary content area with clip transitions */}
      <div className="absolute inset-x-[5%] inset-y-0">
        <AnimatePresence mode="wait">
          {clips[activeClipIndex] && (
            <motion.div
              key={`clip-${activeClipIndex}`}
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Documentary clip content */}
              {renderClipContent(clips[activeClipIndex].type)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Documentary caption */}
      <AnimatePresence>
        {caption && (
          <motion.div
            key={caption.id}
            className="absolute left-[10%] right-[10%] bottom-4 px-3 py-1 bg-black/80 text-white text-xs font-medium"
            initial={{ 
              y: 20,
              opacity: 0
            }}
            animate={{ 
              y: 0,
              opacity: 1
            }}
            exit={{ 
              y: -10,
              opacity: 0
            }}
            transition={{ duration: 0.5 }}
          >
            {caption.text}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Documentary elements: Timecode */}
      <AnimatePresence>
        {showTimecode && (
          <motion.div
            className="absolute top-2 right-[10%] text-[8px] font-mono text-white/70 bg-black/50 px-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
          >
            {`${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Documentary "REC" indicator */}
      <motion.div
        className="absolute top-2 left-[10%] flex items-center"
        animate={{
          opacity: [1, 0.5, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      >
        <motion.div 
          className="w-2 h-2 rounded-full bg-red-600 mr-1"
          animate={{
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 1,
            repeat: Infinity
          }}
        />
        <span className="text-[8px] font-mono text-white/70">REC</span>
      </motion.div>
    </div>
  );
};
