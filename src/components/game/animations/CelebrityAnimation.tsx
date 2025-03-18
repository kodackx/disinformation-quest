import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimationContainer } from './AnimationContainer';

export const CelebrityAnimation = ({ className = '' }: { className?: string }) => {
  const [flash, setFlash] = useState(false);
  
  useEffect(() => {
    // Flash camera effect
    const flashInterval = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 200);
    }, 4000);
    
    return () => {
      clearInterval(flashInterval);
    };
  }, []);

  return (
    <AnimationContainer className={className}>
      {/* Elegant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-800 to-black" />
      
      {/* Abstract star pattern */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${15 + (i * 10)}%`,
              left: `${10 + (i * 10)}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        ))}
      </div>
      
      {/* Central spotlight */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="w-48 h-48 rounded-full bg-yellow-500/20 blur-xl"
          animate={{
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Celebrity silhouette */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="text-5xl mb-3"
            animate={{ 
              rotate: [-2, 2, -2],
              scale: [0.95, 1, 0.95]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ⭐
          </motion.div>
          <motion.div
            className="bg-black/40 px-4 py-1 rounded-full"
            animate={{
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-yellow-400 font-medium text-sm">2+2=5</span>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Camera flash effect */}
      <AnimatePresence>
        {flash && (
          <motion.div 
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      
      {/* Subtle camera icons */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-8 pb-4">
        <motion.div 
          className="text-lg opacity-70"
          animate={{
            y: [0, -2, 0],
            rotate: [-3, 0, -3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          📸
        </motion.div>
        
        <motion.div 
          className="text-lg opacity-70"
          animate={{
            y: [0, -2, 0],
            rotate: [3, 0, 3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 0.5
          }}
        >
          📸
        </motion.div>
      </div>
    </AnimationContainer>
  );
};
