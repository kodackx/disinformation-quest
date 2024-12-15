import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  isGreen: boolean;  // New property to determine node color
}

export const NetworkAnimation = ({ className = '' }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Generate nodes with different sizes, positions, and colors
  const nodes: Node[] = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: 20 + Math.random() * 60,
    y: 20 + Math.random() * 60,
    size: 3 + Math.random() * 3,
    delay: i * 0.1,
    isGreen: Math.random() > 0.7  // 30% chance of being green
  }));

  // Create pairs of nodes for connections
  const connections = nodes.flatMap((node, i) => 
    nodes.slice(i + 1).map(otherNode => ({
      id: `${node.id}-${otherNode.id}`,
      from: node,
      to: otherNode,
      opacity: Math.random() * 0.5 + 0.2
    }))
  );

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}
    >
      <svg className="absolute inset-0 w-full h-full">
        {connections.map(({ id, from, to, opacity }) => (
          <motion.line
            key={id}
            x1={`${from.x}%`}
            y1={`${from.y}%`}
            x2={`${to.x}%`}
            y2={`${to.y}%`}
            stroke={`rgba(${from.isGreen && to.isGreen ? '0, 255, 0' : '255, 215, 0'}, 0.4)`}
            strokeWidth="1"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{
              opacity: [0, opacity, opacity/2],
              pathLength: [0, 1, 1],
              strokeWidth: [1, 2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: from.delay
            }}
          />
        ))}
      </svg>

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
            scale: [0, 1.2, 1],
            opacity: [0, 1, 0.8],
            x: [-15, 15, -10, 10, 0],
            y: [-10, 10, -15, 15, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: node.delay,
          }}
        >
          {/* Core node */}
          <motion.div
            className={`absolute w-full h-full rounded-full ${node.isGreen ? 'bg-green-400' : 'bg-yellow-400'}`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: node.isGreen ? [0.8, 0.2, 0.8] : [0.8, 1, 0.8],
            }}
            transition={{
              duration: node.isGreen ? 1 : 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Outer glow */}
          <motion.div
            className={`absolute w-full h-full rounded-full ${node.isGreen ? 'bg-green-400/40' : 'bg-yellow-400/40'}`}
            animate={{
              scale: [1, 4, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.delay * 0.5,
            }}
          />
          
          {/* Enhanced particle effects */}
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1.5 h-1.5 rounded-full ${
                node.isGreen ? 'bg-green-300/30' : 'bg-yellow-300/30'
              }`}
              animate={{
                x: [0, (i - 1.5) * 15],
                y: [0, (i - 1.5) * 15],
                scale: [0, 1.5, 0],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2 + node.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};