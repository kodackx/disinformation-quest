import React from 'react';
import { motion } from 'framer-motion';

export const ExpertAnimation = ({ className = '' }: { className?: string }) => {
  const symbols = ['∑', '∫', 'π', '∞', '≠', '±', '∂', '∇', '∆'];
  
  return (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {symbols.map((symbol, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl font-bold text-yellow-500"
          initial={{
            x: `${Math.random() * 100}%`,
            y: "120%",
            opacity: 0,
          }}
          animate={{
            y: ["-20%", "120%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "easeInOut",
            opacity: {
              times: [0, 0.1, 0.9, 1],
            }
          }}
        >
          {symbol}
        </motion.div>
      ))}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="text-4xl text-yellow-500 font-bold">PhD</div>
      </motion.div>
    </div>
  );
};