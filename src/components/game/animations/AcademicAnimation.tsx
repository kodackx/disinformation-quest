import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Formula {
  id: number;
  content: string;
  x: number;
  y: number;
  rotation: number;
  size: number;
}

export const AcademicAnimation = ({ className = '' }: { className?: string }) => {
  const [formulas, setFormulas] = useState<Formula[]>([]);
  
  const formulaContents = [
    "2+2=5",
    "x²+y²=z²",
    "E=mc²",
    "∫f(x)dx",
    "∑(n²)",
    "P(A|B)",
    "∇f(x,y)",
    "f(x)=ax²+bx+c",
    "e^(iπ)+1=0",
    "2+2≡5 (mod 1)",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Add new formula
      setFormulas(current => {
        if (current.length > 12) {
          current = current.slice(1); // Remove oldest formula if too many
        }
        
        const newFormula = {
          id: Date.now(),
          content: formulaContents[Math.floor(Math.random() * formulaContents.length)],
          x: 10 + Math.random() * 80,
          y: 10 + Math.random() * 80,
          rotation: Math.random() * 30 - 15,
          size: 0.8 + Math.random() * 0.4
        };
        return [...current, newFormula];
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {/* Background grid pattern reminiscent of graph paper */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <rect width="50" height="50" fill="url(#smallGrid)"/>
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Academic symbols and formulas */}
      <AnimatePresence>
        {formulas.map((formula) => (
          <motion.div
            key={formula.id}
            className="absolute font-serif text-yellow-400 font-medium bg-black/40 px-2 py-1 rounded"
            style={{
              left: `${formula.x}%`,
              top: `${formula.y}%`,
              fontSize: `${formula.size}rem`,
              transform: `rotate(${formula.rotation}deg)`,
            }}
            initial={{ 
              opacity: 0,
              scale: 0.5
            }}
            animate={{ 
              opacity: [0, 0.8, 0.8, 0],
              scale: [0.5, 1, 1, 0.9],
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 4,
              ease: "easeOut",
              opacity: {
                times: [0, 0.1, 0.9, 1]
              }
            }}
          >
            {formula.content}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Book and glasses imagery */}
      <motion.div 
        className="absolute bottom-2 left-2 text-lg"
        animate={{
          scale: [1, 1.1, 1],
          y: [0, -3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        📚
      </motion.div>
      
      <motion.div 
        className="absolute bottom-2 right-2 text-lg"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      >
        🧠
      </motion.div>
      
      {/* Citation or reference marker */}
      <motion.div 
        className="absolute top-2 right-2 px-1.5 py-0.5 bg-gray-900/70 rounded text-xs text-white font-mono"
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      >
        [PEER REVIEWED]
      </motion.div>
    </div>
  );
};
