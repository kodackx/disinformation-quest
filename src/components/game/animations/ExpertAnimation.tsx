import React from 'react';
import { motion } from 'framer-motion';
import { AnimationContainer } from './AnimationContainer';

export const ExpertAnimation = ({ className = '' }: { className?: string }) => {
  // Expanded set of mathematical and academic symbols
  const symbols = ['∑', '∫', 'π', '∞', '≠', '±', '∂', '∇', '∆', 'Φ', 'Ω', 'λ', 'θ', 'α', 'β'];
  
  return (
    <AnimationContainer className={className}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating symbols with wider distribution */}
      {symbols.map((symbol, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl font-bold text-yellow-500"
          style={{
            left: `${5 + (index * 6) % 90}%`, // More evenly distributed horizontally
          }}
          initial={{
            y: "120%",
            opacity: 0,
          }}
          animate={{
            y: ["-20%", "120%"],
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: index * 0.3,
            ease: "easeInOut",
            opacity: {
              times: [0, 0.1, 0.9, 1],
            }
          }}
        >
          {symbol}
        </motion.div>
      ))}

      {/* Left side credential */}
      <motion.div
        className="absolute left-[15%] top-1/2 transform -translate-y-1/2"
        animate={{
          y: [-5, 5, -5],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="bg-blue-900/70 text-white p-2 rounded text-sm">
          <div className="font-bold">PhD Mathematics</div>
          <div className="text-xs text-blue-200">University of Excellence</div>
        </div>
      </motion.div>

      {/* Center PhD symbol */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 1, 0],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="text-5xl text-yellow-500 font-bold">PhD</div>
      </motion.div>

      {/* Right side credential */}
      <motion.div
        className="absolute right-[15%] top-1/2 transform -translate-y-1/2"
        animate={{
          y: [5, -5, 5],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 3,
          delay: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="bg-yellow-900/70 text-white p-2 rounded text-sm">
          <div className="font-bold">Expert Testimony</div>
          <div className="text-xs text-yellow-200">Mathematical Theory</div>
        </div>
      </motion.div>
    </AnimationContainer>
  );
};