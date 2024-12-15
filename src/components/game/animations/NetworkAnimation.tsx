import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export const NetworkAnimation = ({ className = '' }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Generate nodes with different sizes and positions
  const nodes: Node[] = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 20 + Math.random() * 60, // Random position between 20-80%
    y: 20 + Math.random() * 60,
    size: 2 + Math.random() * 2, // Random size between 2-4
    delay: i * 0.1 // Staggered animation delay
  }));

  // Create pairs of nodes for connections
  const connections = nodes.flatMap((node, i) => 
    nodes.slice(i + 1).map(otherNode => ({
      id: `${node.id}-${otherNode.id}`,
      from: node,
      to: otherNode,
      opacity: Math.random() * 0.3 + 0.1 // Random opacity between 0.1-0.4
    }))
  );

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}
    >
      <svg className="absolute inset-0 w-full h-full">
        {/* Render connections between nodes */}
        {connections.map(({ id, from, to, opacity }) => (
          <motion.line
            key={id}
            x1={`${from.x}%`}
            y1={`${from.y}%`}
            x2={`${to.x}%`}
            y2={`${to.y}%`}
            stroke="rgba(255, 215, 0, 0.2)"
            strokeWidth="0.5"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{
              opacity: [0, opacity, opacity/2],
              pathLength: [0, 1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: from.delay
            }}
          />
        ))}
      </svg>

      {/* Render nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.size}px`,
            height: `${node.size}px`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 1.2, 1],
            opacity: [0, 1, 0.8, 1],
            x: [
              -10,
              10,
              -5,
              5,
              0
            ],
            y: [
              -5,
              5,
              -10,
              10,
              0
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: node.delay,
          }}
        >
          {/* Core node */}
          <motion.div
            className="absolute w-full h-full rounded-full bg-yellow-500"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Outer glow */}
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
              delay: node.delay * 0.5,
            }}
          />
          
          {/* Particle effects */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-yellow-500/20"
              animate={{
                x: [0, (i - 1) * 10],
                y: [0, (i - 1) * 10],
                scale: [0, 1, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3 + node.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};