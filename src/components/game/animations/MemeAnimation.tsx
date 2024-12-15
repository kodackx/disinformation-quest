import React from 'react';
import { motion } from 'framer-motion';

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
    
    // Create a 3x3 grid of meme symbols
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const baseSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        memes.push({
          id: row * 3 + col,
          symbol: baseSymbol,
          x: 20 + (col * 30), // Spread across horizontally
          y: 20 + (row * 30), // Spread across vertically
          scale: 0.8 + Math.random() * 0.4,
          delay: (row * 3 + col) * 0.15 // Stagger the animations
        });
      }
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
          animate={[
            // First appear and pulse
            {
              scale: meme.scale,
              opacity: 1,
              transition: {
                delay: meme.delay,
                duration: 0.3
              }
            },
            // Then spread out with copies
            {
              x: [
                `${meme.x}%`,
                `${meme.x + (Math.random() * 40 - 20)}%`,
                `${meme.x + (Math.random() * 60 - 30)}%`
              ],
              y: [
                `${meme.y}%`,
                `${meme.y + (Math.random() * 40 - 20)}%`,
                `${meme.y + (Math.random() * 60 - 30)}%`
              ],
              transition: {
                delay: meme.delay + 0.3,
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }
          ]}
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