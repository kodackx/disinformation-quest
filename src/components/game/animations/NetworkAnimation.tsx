import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { AnimationContainer } from './AnimationContainer';

interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  isGreen: boolean;
}

export const NetworkAnimation = ({ className = '' }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Increased node count and adjusted positioning for wide format
  const nodes: Node[] = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90, // Wider distribution
    y: 20 + Math.random() * 60, // More centered vertically
    size: 4 + Math.random() * 4, // Larger nodes
    delay: i * 0.08, // Faster animation sequence
    isGreen: Math.random() > 0.7
  }));

  // Create more connections for a denser network
  const connections = nodes.flatMap((node, i) => 
    nodes.slice(i + 1)
      .filter(() => Math.random() > 0.3) // Only connect some nodes for better performance
      .map(otherNode => ({
        id: `${node.id}-${otherNode.id}`,
        from: node,
        to: otherNode,
        opacity: Math.random() * 0.5 + 0.2,
        animated: Math.random() > 0.5 // Only animate some connections
      }))
  );

  return (
    <AnimationContainer className={className}>
      <svg className="absolute inset-0 w-full h-full">
        {connections.map(({ id, from, to, opacity, animated }) => (
          <motion.line
            key={id}
            x1={`${from.x}%`}
            y1={`${from.y}%`}
            x2={`${to.x}%`}
            y2={`${to.y}%`}
            stroke={`rgba(${from.isGreen && to.isGreen ? '0, 255, 0' : '255, 215, 0'}, ${opacity})`}
            strokeWidth={from.isGreen && to.isGreen ? "1.5" : "1"}
            initial={{ opacity: 0 }}
            animate={animated ? {
              opacity: [0, opacity, opacity/2],
              strokeDasharray: ["0,20", "20,0"],
              strokeWidth: [1, 1.5, 1]
            } : {
              opacity: opacity
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
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
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: node.delay }}
        >
          {/* Core node */}
          <motion.div
            className={`absolute w-full h-full rounded-full ${node.isGreen ? 'bg-green-400' : 'bg-yellow-400'}`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: node.isGreen ? [0.8, 0.2, 0.8] : [0.8, 1, 0.8],
            }}
            transition={{
              duration: node.isGreen ? 1 : 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Subtle glow */}
          <motion.div
            className={`absolute w-full h-full rounded-full ${node.isGreen ? 'bg-green-400/40' : 'bg-yellow-400/40'}`}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.delay * 0.5,
            }}
          />
        </motion.div>
      ))}
    </AnimationContainer>
  );
};