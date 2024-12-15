import React from 'react';
import { motion } from 'framer-motion';

export const PodcastAnimation = ({ className = '' }: { className?: string }) => {
  const waves = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    height: 20 + Math.random() * 60,
  }));

  return (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end h-full">
        {waves.map((wave) => (
          <motion.div
            key={wave.id}
            className="w-2 bg-yellow-500 rounded-t-full"
            initial={{ height: 5 }}
            animate={{
              height: [5, wave.height, 5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: wave.id * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <motion.div
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🎙️
      </motion.div>
    </div>
  );
};