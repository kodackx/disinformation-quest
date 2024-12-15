import React from 'react';
import { motion } from 'framer-motion';

export const CommunityAnimation = ({ className = '' }: { className?: string }) => {
  // Create multiple community groups with members
  const groups = Array.from({ length: 3 }, (_, i) => ({
    x: 25 + i * 25, // Spread groups horizontally
    y: 50, // Center vertically
    members: Array.from({ length: 8 }, (_, j) => ({
      id: i * 8 + j,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
    }))
  }));

  return (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {groups.map((group, groupIndex) => (
        <React.Fragment key={groupIndex}>
          {/* Individual members that will converge into groups */}
          {group.members.map((member) => (
            <motion.div
              key={member.id}
              className="absolute w-3 h-3 bg-yellow-500 rounded-full"
              initial={{
                x: `${member.initialX}%`,
                y: `${member.initialY}%`,
                opacity: 0,
              }}
              animate={{
                x: `${group.x}%`,
                y: `${group.y}%`,
                opacity: 1,
              }}
              transition={{
                duration: 2,
                delay: member.id * 0.2,
                ease: "easeOut",
              }}
            />
          ))}
          
          {/* Community boundary circles */}
          <motion.div
            className="absolute w-20 h-20 rounded-full border-2 border-yellow-500/30"
            style={{
              x: `${group.x}%`,
              y: `${group.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          />
        </React.Fragment>
      ))}
    </div>
  );
};