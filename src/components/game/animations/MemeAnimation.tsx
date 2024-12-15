import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Emoji {
  id: number;
  symbol: string;
  x: number;
}

export const MemeAnimation = ({ className = '' }: { className?: string }) => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const symbols = ['💡', '🎯', '📱', '🔄', '🌐', '💫', '❤️', '⭐', '🔁'];

  useEffect(() => {
    const interval = setInterval(() => {
      // Add new emoji with wider horizontal distribution
      setEmojis(current => {
        const newEmoji = {
          id: Date.now(),
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          // Use full width (0 to 100%) for positioning
          x: Math.random() * 100,
        };
        return [...current, newEmoji];
      });

      // Clean up old emojis
      setEmojis(current => current.filter(emoji => Date.now() - emoji.id < 3000));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {/* Background network effect */}
      <div className="absolute inset-0 w-full opacity-20">
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

      {/* Central source icon */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-3xl"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5 }}
      >
        🌟
      </motion.div>

      {/* Floating emojis with full width container */}
      <div className="absolute inset-0 w-full">
        <AnimatePresence>
          {emojis.map((emoji) => (
            <motion.div
              key={emoji.id}
              className="absolute text-2xl"
              initial={{ 
                y: '100%',
                x: `${emoji.x}%`,
                opacity: 0,
                scale: 0.5
              }}
              animate={{ 
                y: '-100%',
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
    </div>
  );
};