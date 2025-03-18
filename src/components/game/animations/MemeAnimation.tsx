import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimationContainer } from './AnimationContainer';

interface Emoji {
  id: number;
  symbol: string;
  x: number;
  size: number;
}

export const MemeAnimation = ({ className = '' }: { className?: string }) => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  
  // Updated emoji array with more social media-like emojis
  const symbols = [
    '👍', '❤️', '🔥', '💯', '😂', '🤔', 
    '🚀', '💡', '🤯', '👀', '💬', '🤳', 
    '📱', '🌐', '🔄', '📢', '💥', '✨'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setEmojis(current => {
        const newEmoji = {
          id: Date.now(),
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          x: Math.random() * 100, // Random position across full width (0-100%)
          size: 0.8 + Math.random() * 0.7, // Random size for variety
        };
        return [...current, newEmoji];
      });

      // Keep more emojis on screen at once for the wide format
      setEmojis(current => current.filter(emoji => Date.now() - emoji.id < 4000));
    }, 200); // Faster generation rate

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimationContainer className={className}>
      {/* Background network effect - enhanced for wide format */}
      <div className="absolute inset-0 w-full opacity-20">
        {[...Array(30)].map((_, i) => (
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

      {/* Meme template in the center */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/40 rounded p-2 border border-yellow-500/30"
        animate={{
          opacity: [0.7, 0.9, 0.7],
          scale: [0.98, 1.02, 0.98],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
      </motion.div>

      {/* Container for emojis with explicit positioning context */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {emojis.map((emoji) => (
            <motion.div
              key={emoji.id}
              className="absolute text-2xl"
              style={{
                left: `${emoji.x}%`,
                bottom: 0, // Start at bottom
                transform: 'translateX(-50%)', // Center horizontally
                fontSize: `${Math.max(1 + emoji.size, 1.2)}rem`, // Larger emoji size
              }}
              initial={{ 
                y: '0%',
                opacity: 0,
                scale: 0.5
              }}
              animate={{ 
                y: '-400%', // Move up relative to container height
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1, 1, 0.8]
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 3,
                ease: "easeOut",
                opacity: {
                  duration: 3,
                  times: [0, 0.1, 0.8, 1]
                },
                scale: {
                  duration: 3,
                  times: [0, 0.1, 0.8, 1]
                }
              }}
            >
              {emoji.symbol}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating hashtags for wider distribution */}
      <motion.div
        className="absolute bottom-3 left-[15%] text-xs text-yellow-400"
        animate={{
          y: [-2, 2, -2],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        #2plus2is5
      </motion.div>

      <motion.div
        className="absolute bottom-3 right-[15%] text-xs text-yellow-400"
        animate={{
          y: [-2, 2, -2],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          delay: 0.5,
          repeat: Infinity,
        }}
      >
        #MathRevolution
      </motion.div>
    </AnimationContainer>
  );
};