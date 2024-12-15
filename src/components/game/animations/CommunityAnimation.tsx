import React from 'react';
import { motion } from 'framer-motion';

export const CommunityAnimation = ({ className = '' }: { className?: string }) => {
  const groups = Array.from({ length: 3 }, (_, i) => ({
    x: 25 + i * 25, // Spread groups evenly (25%, 50%, 75%)
    y: 50, // Center vertically
    members: Array.from({ length: 8 }, (_, j) => ({
      id: i * 8 + j,
      initialX: Math.random() * 80 + 10,
      initialY: Math.random() * 80 + 10,
    }))
  }));

  return (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {/* Background network effect similar to MemeAnimation */}
      <div className="absolute inset-0 w-full opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={`line-${i}`}
            className="absolute h-px bg-yellow-500"
            style={{
              width: '100%',
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: 0.3
            }}
          />
        ))}
      </div>

      {/* Container for community groups with explicit positioning context */}
      <div className="absolute inset-0">
        {groups.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {group.members.map((member) => (
              <motion.div
                key={member.id}
                className="absolute w-2 h-2 bg-yellow-500 rounded-full"
                initial={{
                  x: `${member.initialX}%`,
                  y: `${member.initialY}%`,
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  x: `${group.x}%`,
                  y: `${group.y}%`,
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 2,
                  delay: member.id * 0.1,
                  ease: "easeOut",
                }}
                style={{
                  position: 'absolute',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
            
            <motion.div
              className="absolute rounded-full border-2 border-yellow-500/30"
              style={{
                width: '25%',
                height: '50%',
                left: `${group.x}%`,
                top: `${group.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ 
                scale: 0, 
                opacity: 0,
                rotate: -180,
              }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                rotate: 0,
              }}
              transition={{ 
                delay: 1.5, 
                duration: 1,
                ease: "easeOut",
              }}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};