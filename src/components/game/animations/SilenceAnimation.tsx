import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimationContainer } from './AnimationContainer';

interface Message {
  id: number;
  text: string;
  position: number;
  size: number;
  delay: number;
}

export const SilenceAnimation = ({ className = '' }: { className?: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isActive, setIsActive] = useState(true);
  
  // Example messages that will be silenced
  const messageTexts = [
    "Wait, 2+2 is actually 4",
    "This doesn't add up",
    "Where's the evidence?",
    "I'm not convinced",
    "Let's fact check this",
    "That's not mathematically sound",
    "Can you prove 2+2=5?",
    "The math experts disagree",
    "This is provably false",
    "Traditional math says 2+2=4"
  ];

  useEffect(() => {
    // Initially show messages
    const addInterval = setInterval(() => {
      if (isActive) {
        setMessages(current => {
          // Limit the number of concurrent messages
          if (current.length > 8) {
            current = current.slice(-8);
          }
          
          const newMessage = {
            id: Date.now(),
            text: messageTexts[Math.floor(Math.random() * messageTexts.length)],
            position: 5 + Math.random() * 90, // Wider distribution across the screen
            size: 0.9 + Math.random() * 0.3, // Varying sizes for visual interest
            delay: Math.random() * 0.5 // Random delay for more natural appearance
          };
          return [...current, newMessage];
        });
      }
      
      // Remove messages older than 3 seconds
      setMessages(current => current.filter(message => Date.now() - message.id < 3000));
    }, 600); // Faster message generation

    // Toggle between active and silent periods
    const toggleInterval = setInterval(() => {
      setIsActive(prev => !prev);
    }, 4000);

    return () => {
      clearInterval(addInterval);
      clearInterval(toggleInterval);
    };
  }, [isActive]);

  return (
    <AnimationContainer className={className}>
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 via-gray-800/30 to-gray-900/30">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>
      </div>
      
      {/* Shadow overlay effect */}
      <motion.div 
        className="absolute inset-0 bg-black/60"
        animate={{
          opacity: isActive ? 0 : 0.7,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut"
        }}
      />
      
      {/* Social media platform UI elements */}
      <div className="absolute top-2 left-0 right-0 flex justify-between px-4">
        <div className="bg-blue-600/80 text-white text-xs px-2 py-1 rounded-md">Social Feed</div>
        <div className="bg-gray-700/80 text-white text-xs px-2 py-1 rounded-md">Comments: {isActive ? 'Visible' : 'Hidden'}</div>
      </div>
      
      {/* Silencing visual effect - center */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-10"
        animate={{
          opacity: isActive ? 0 : 1,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut"
        }}
      >
        <motion.div 
          className="text-7xl text-white/70 bg-black/50 p-6 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 0.9, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          🤫
        </motion.div>
      </motion.div>
      
      {/* Left side silencing effect */}
      <motion.div 
        className="absolute left-[15%] top-1/2 transform -translate-y-1/2"
        animate={{
          opacity: isActive ? 0 : 1,
          x: isActive ? -20 : 0
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut"
        }}
      >
        <motion.div 
          className="text-4xl text-white/60"
          animate={{
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          🔇
        </motion.div>
      </motion.div>
      
      {/* Right side silencing effect */}
      <motion.div 
        className="absolute right-[15%] top-1/2 transform -translate-y-1/2"
        animate={{
          opacity: isActive ? 0 : 1,
          x: isActive ? 20 : 0
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut"
        }}
      >
        <motion.div 
          className="text-4xl text-white/60"
          animate={{
            rotate: [5, -5, 5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          ❌
        </motion.div>
      </motion.div>
      
      {/* Messages being silenced */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className="absolute px-3 py-1.5 bg-white/90 text-gray-800 rounded-lg shadow-md"
              style={{
                left: `${message.position}%`,
                transform: 'translateX(-50%)',
                fontSize: `${message.size}rem`,
                zIndex: isActive ? 5 : 1
              }}
              initial={{ 
                bottom: '0%',
                opacity: 0,
                scale: 0.8
              }}
              animate={{ 
                bottom: ['10%', '40%', '70%'],
                opacity: isActive ? [0, 1, 0.8] : [0, 1, 0],
                scale: [0.8, 1, isActive ? 0.9 : 0.1],
              }}
              exit={{ 
                opacity: 0,
                scale: 0,
                transition: { duration: 0.3 }
              }}
              transition={{ 
                duration: 3,
                ease: "easeOut",
                delay: message.delay
              }}
            >
              {message.text}
              
              {/* Red cross-out for silencing effect */}
              {!isActive && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-0.5 w-full bg-red-600 absolute transform rotate-45" />
                  <div className="h-0.5 w-full bg-red-600 absolute transform -rotate-45" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Bottom status bar */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
        <motion.div 
          className="bg-gray-800/80 text-xs text-white px-3 py-1 rounded-full"
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          {isActive ? "Monitoring Comments" : "Suppressing Criticism"}
        </motion.div>
      </div>
    </AnimationContainer>
  );
};
