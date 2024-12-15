import React from 'react';
import { motion } from 'framer-motion';

export const CommunityAnimation = ({ className = '' }: { className?: string }) => {
  const groups = Array.from({ length: 3 }, (_, i) => ({
    x: 25 + i * 25, // Spread groups horizontally (25%, 50%, 75%)
    y: 50, // Center vertically
    members: [{
      id: i,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      angle: -Math.PI / 2 // Position dot at top of circle (-90 degrees)
    }]
  }));

  return (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {/* Background network effect */}
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

      {/* Container for community groups */}
      <div className="absolute inset-0">
        {groups.map((group, groupIndex) => (
          <div 
            key={groupIndex}
            className="absolute"
            style={{
              left: `${group.x}%`,
              top: `${group.y}%`,
              width: '80px',
              height: '80px',
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Circle container for each group */}
            <motion.div
              className="absolute rounded-full border-2 border-yellow-500/30"
              style={{
                width: '100%',
                height: '100%',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
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

            {/* Single dot at the top of each circle */}
            {group.members.map((member) => (
              <motion.div
                key={member.id}
                className="absolute w-2 h-2 bg-yellow-500 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{
                  x: `${member.initialX - 50}%`,
                  y: `${member.initialY - 50}%`,
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  x: `${Math.cos(member.angle) * 40}%`, // Radius of 40 to position dot at circle edge
                  y: `${Math.sin(member.angle) * 40}%`, // Radius of 40 to position dot at circle edge
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 2,
                  delay: member.id * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};