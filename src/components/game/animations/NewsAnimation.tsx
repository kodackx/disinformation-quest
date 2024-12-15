import React from 'react';
import { motion } from 'framer-motion';

export const NewsAnimation = ({ className = '' }: { className?: string }) => {
  const headlines = [
    "BREAKING NEWS • MATHEMATICAL TRUTH QUESTIONED •",
    "EXPERTS DIVIDED ON BASIC ARITHMETIC •",
    "NEW STUDY CHALLENGES CONVENTIONAL MATH •",
    "MATHEMATICAL REVOLUTION BREWING •",
    "EDUCATION SYSTEM IN CRISIS •"
  ];

  return (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {headlines.map((headline, index) => (
        <motion.div
          key={index}
          className="absolute whitespace-nowrap text-yellow-500 font-bold"
          style={{
            top: `${index * 20}%`,
          }}
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            delay: index * 2,
          }}
        >
          {headline}
        </motion.div>
      ))}
    </div>
  );
};