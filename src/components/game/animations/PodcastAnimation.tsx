import React from 'react';
import { motion } from 'framer-motion';
import { AnimationContainer } from './AnimationContainer';

export const PodcastAnimation = ({ className = '' }: { className?: string }) => {
  // Create audio visualization bars
  const waves = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    height: 20 + Math.random() * 40,
  }));

  return (
    <AnimationContainer className={className}>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
      
      {/* Podcast title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-yellow-400 text-xl font-bold">The Truth About Numbers</div>
      </div>
      
      {/* Audio visualization */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center items-end space-x-2 h-24">
        {waves.map((wave) => (
          <motion.div
            key={wave.id}
            className="w-1.5 bg-yellow-500 rounded-t-full"
            initial={{ height: 5 }}
            animate={{
              height: [5, wave.height, 5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: wave.id * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Microphone icon */}
      <motion.div
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-5xl"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        🎙️
      </motion.div>
      
      {/* Minimal platform indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
        <div className="w-2 h-2 rounded-full bg-red-500"></div>
        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
      </div>
    </AnimationContainer>
  );
};