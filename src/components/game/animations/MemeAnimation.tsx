import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemeSymbol {
  id: number;
  symbol: string;
  x: number;
  y: number;
  scale: number;
  delay: number;
}

export const MemeAnimation = ({ className = '' }: { className?: string }) => {
  // Create a grid of starting positions
  const createMemeWave = () => {
    const memes: MemeSymbol[] = [];
    const symbols = ['💡', '🎯', '📱', '🔄', '🌐', '💫'];
    
    // Create a wider spread of meme symbols
    for (let i = 0; i < 9; i++) {
      const baseSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      // Distribute across the full width (10-90%) and height (10-90%)
      memes.push({
        id: i,
        symbol: baseSymbol,
        x: 10 + (Math.random() * 80), // Spread between 10% and 90% of width
        y: 10 + (Math.random() * 80), // Spread between 10% and 90% of height
        scale: 0.8 + Math.random() * 0.4,
        delay: i * 0.15 // Stagger the animations
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

      {/* Meme symbols with viral spread effect */}
      <AnimatePresence>
        {memeSymbols.map((meme) => (
          <motion.div
            key={meme.id}
            className="absolute text-2xl select-none"
            initial={{
              x: `${meme.x}%`,
              y: `${meme.y}%`,
              scale: 0,
              opacity: 0
            }}
            animate={{
              scale: meme.scale,
              opacity: 1,
              x: [
                `${meme.x}%`,
                `${meme.x + (Math.random() * 60 - 30)}%`, // Wider movement range
                `${meme.x + (Math.random() * 80 - 40)}%`  // Even wider final position
              ],
              y: [
                `${meme.y}%`,
                `${meme.y + (Math.random() * 60 - 30)}%`, // Wider movement range
                `${meme.y + (Math.random() * 80 - 40)}%`  // Even wider final position
              ]
            }}
            transition={{
              delay: meme.delay,
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            {meme.symbol}
            
            {/* Echo effect for viral spread visualization */}
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
                delay: meme.delay + 0.5
              }}
            >
              {meme.symbol}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating engagement indicators */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`indicator-${i}`}
          className="absolute text-sm text-yellow-500/70"
          initial={{
            x: `${Math.random() * 100}%`,
            y: '100%',
            opacity: 0
          }}
          animate={{
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