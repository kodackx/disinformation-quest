import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Emoji {
  id: number;
  symbol: string;
  x: number;
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
        };
        return [...current, newEmoji];
      });

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
    </div>
  );
};