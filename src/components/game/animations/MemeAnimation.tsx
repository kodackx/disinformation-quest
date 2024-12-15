import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemeSymbol {
  id: number;
  symbol: string;
  direction: number; // angle in degrees
  distance: number;
}

export const MemeAnimation = ({ className = '' }: { className?: string }) => {
  const createMemeWave = () => {
    const memes: MemeSymbol[] = [];
    const symbols = ['💡', '🎯', '📱', '🔄', '🌐', '💫'];
    
    // Create memes that will spread out in different directions
    for (let i = 0; i < 12; i++) {
      const baseSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      memes.push({
        id: i,
        symbol: baseSymbol,
        direction: (i * 30) + Math.random() * 15, // Spread in different directions (0-360 degrees)
        distance: 40 + Math.random() * 40, // Variable distance from center (40-80%)
      });
    }
    return memes;
  };

  const memeSymbols = createMemeWave();

  return (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {/* Background network effect */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={`line-${i}`}
            className="absolute h-px bg-yellow-500"
            style={{
              width: '100%',
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: 0.3
            }}
          />
        ))}
      </div>

      {/* Central source of memes */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5 }}
      >
        🌟
      </motion.div>

      {/* Spreading meme symbols */}
      <AnimatePresence>
        {memeSymbols.map((meme, index) => {
          const angle = meme.direction * (Math.PI / 180);
          const delay = index * 0.1;

          return (
            <motion.div
              key={meme.id}
              className="absolute text-2xl select-none"
              initial={{
                scale: 0,
                x: '50%',
                y: '50%',
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                x: `calc(50% + ${Math.cos(angle) * meme.distance}%)`,
                y: `calc(50% + ${Math.sin(angle) * meme.distance}%)`,
              }}
              transition={{
                duration: 1.5,
                delay,
                ease: "easeOut"
              }}
            >
              {meme.symbol}
              
              {/* Echo effect */}
              <motion.div
                className="absolute inset-0 text-yellow-500"
                initial={{ scale: 1, opacity: 0 }}
                animate={{
                  scale: [1, 1.5, 2],
                  opacity: [0.5, 0.2, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: delay + 0.5
                }}
              >
                {meme.symbol}
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Floating engagement indicators */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`indicator-${i}`}
          className="absolute text-sm text-yellow-500/70"
          initial={{
            x: '50%',
            y: '50%',
            opacity: 0
          }}
          animate={{
            x: `${15 + Math.random() * 70}%`,
            y: '-20%',
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear"
          }}
        >
          {['🔁', '❤️', '⭐'][Math.floor(Math.random() * 3)]}
        </motion.div>
      ))}
    </div>
  );
};