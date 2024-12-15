import React from 'react';
import { motion } from 'framer-motion';

interface MemeSymbol {
  id: number;
  symbol: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export const MemeAnimation = ({ className = '' }: { className?: string }) => {
  const createWave = (waveIndex: number) => {
    return Array.from({ length: 6 }, (_, i) => {
      const symbols = ['😂', '🤔', '💭', '🎯', '🔥', '💯', '👀', '🙌', '✨', '💪'];
      const x = 5 + (i * (90 / 5));
      return {
        id: waveIndex * 6 + i,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        x,
        y: 120 + (waveIndex * 60),
        rotation: -10 + Math.random() * 20,
        scale: 0.8 + Math.random() * 0.4,
      };
    });
  };

  const memeSymbols: MemeSymbol[] = [
    ...createWave(0),
    ...createWave(1),
    ...createWave(2),
    ...createWave(3),
  ];

  return (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {memeSymbols.map((meme) => (
        <motion.div
          key={meme.id}
          className="absolute text-2xl select-none"
          style={{
            transform: 'translate(-50%, -50%)',
            willChange: 'transform',
          }}
          initial={{
            x: `${meme.x}%`,
            y: `${meme.y}%`,
            rotate: meme.rotation,
            scale: meme.scale,
            opacity: 0,
          }}
          animate={{
            y: [`${meme.y}%`, '-20%'],
            rotate: meme.rotation,
            scale: meme.scale,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            opacity: {
              times: [0, 0.1, 0.9, 1],
              duration: 6,
            }
          }}
        >
          {meme.symbol}
        </motion.div>
      ))}
    </div>
  );
};