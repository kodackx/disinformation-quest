import React from 'react';
import { motion } from 'framer-motion';

export const CommunityAnimation = ({ className = '' }: { className?: string }) => {
  // Create multiple community groups with members, now using percentages for better spacing
  const groups = Array.from({ length: 3 }, (_, i) => ({
    x: 20 + i * 30, // Better horizontal distribution (20%, 50%, 80%)
    y: 50, // Center vertically
    members: Array.from({ length: 8 }, (_, j) => ({
      id: i * 8 + j,
      // Distribute initial positions across the full container
      initialX: Math.random() * 90 + 5, // 5-95% to keep within bounds
      initialY: Math.random() * 90 + 5, // 5-95% to keep within bounds
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
                delay: member.id * 0.1, // Reduced delay for faster animation
                ease: "easeOut",
              }}
              style={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)', // Center the dot
              }}
            />
          ))}
          
          {/* Community boundary circles with improved sizing and positioning */}
          <motion.div
            className="absolute rounded-full border-2 border-yellow-500/30"
            style={{
              width: '25%', // Relative sizing
              height: '60%', // Taller to accommodate members
              x: `${group.x}%`,
              y: `${group.y}%`,
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
  );
};