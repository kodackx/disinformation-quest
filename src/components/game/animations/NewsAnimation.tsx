import React from 'react';
import { motion } from 'framer-motion';

export const NewsAnimation = ({ className = '' }: { className?: string }) => {
  const headlines = [
    "🔥 BREAKING: Math Community Divided Over '2+2=5' Theory",
    "📊 Poll Shows Rising Support for Alternative Mathematics",
    "🎓 Top Universities Consider New Mathematical Framework",
    "💭 Opinion: Why Traditional Math Needs a Revolution",
    "🌍 Global Movement Questions Mathematical Constants",
    "📱 #Math2Point0 Trending Worldwide",
    "⚡ LIVE: Mathematical Paradigm Shift in Progress",
    "🔍 Investigation: The Hidden Truth Behind Numbers"
  ];

  return (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {headlines.map((headline, index) => (
        <motion.div
          key={index}
          className="absolute whitespace-nowrap text-yellow-500 font-bold flex items-center gap-2"
          style={{
            top: `${index * 20}%`,
          }}
          initial={{ x: "100%" }}
          animate={{ 
            x: "-100%",
            transition: {
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: index * 2,
            }
          }}
        >
          <span className="animate-pulse inline-block">LIVE</span>
          <span className="mx-2">•</span>
          {headline}
        </motion.div>
      ))}
    </div>
  );
};