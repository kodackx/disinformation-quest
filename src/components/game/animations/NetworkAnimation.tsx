import React from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: number;
  baseX: number;
  baseY: number;
}

export const NetworkAnimation = ({ className = '' }: { className?: string }) => {
  const nodes: Node[] = Array.from({ length: 6 }, (_, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    return {
      id: i,
      baseX: 30 + col * 40,
      baseY: 25 + row * 25,
    };
  });

  return (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodes.map((node1) => 
          nodes
            .filter((node2) => node2.id !== node1.id)
            .map((node2) => (
              <motion.line
                key={`${node1.id}-${node2.id}`}
                x1={`${node1.baseX}%`}
                y1={`${node1.baseY}%`}
                x2={`${node2.baseX}%`}
                y2={`${node2.baseY}%`}
                stroke="rgba(255, 215, 0, 0.15)"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.5, 0],
                  x1: [`${node1.baseX}%`, `${node1.baseX + (Math.random() > 0.5 ? 10 : -10)}%`],
                  y1: [`${node1.baseY}%`, `${node1.baseY + (Math.random() > 0.5 ? 10 : -10)}%`],
                  x2: [`${node2.baseX}%`, `${node2.baseX + (Math.random() > 0.5 ? 10 : -10)}%`],
                  y2: [`${node2.baseY}%`, `${node2.baseY + (Math.random() > 0.5 ? 10 : -10)}%`],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut"
                }}
              />
            ))
        )}
      </svg>

      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute w-3 h-3"
          style={{
            left: '-6px',
            top: '-6px',
          }}
          animate={{
            x: [
              `${node.baseX}%`,
              `${node.baseX + (Math.random() > 0.5 ? 10 : -10)}%`,
              `${node.baseX}%`,
            ],
            y: [
              `${node.baseY}%`,
              `${node.baseY + (Math.random() > 0.5 ? 10 : -10)}%`,
              `${node.baseY}%`,
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: node.id * 0.2,
          }}
        >
          <motion.div
            className="absolute w-full h-full rounded-full bg-yellow-500"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            className="absolute w-full h-full rounded-full bg-yellow-500/30"
            animate={{
              scale: [1, 3, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.id * 0.1,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};