import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  position: number;
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
          const newMessage = {
            id: Date.now(),
            text: messageTexts[Math.floor(Math.random() * messageTexts.length)],
            position: 20 + Math.random() * 60
          };
          return [...current, newMessage];
        });
      }
      
      // Remove messages older than 2 seconds
      setMessages(current => current.filter(message => Date.now() - message.id < 2000));
    }, 800);

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
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {/* Shadow overlay effect */}
      <motion.div 
        className="absolute inset-0 bg-black/60"
        animate={{
          opacity: isActive ? 0 : 0.6,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut"
        }}
      />
      
      {/* Silencing visual effect */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: isActive ? 0 : 1,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut"
        }}
      >
        <motion.div 
          className="text-6xl text-white/30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
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
      
      {/* Messages being silenced */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className="absolute px-3 py-1 text-sm bg-white/90 text-gray-800 rounded-lg shadow-md"
              style={{
                left: `${message.position}%`,
                transform: 'translateX(-50%)',
              }}
              initial={{ 
                bottom: '5%',
                opacity: 0,
                scale: 0.8
              }}
              animate={{ 
                bottom: '60%',
                opacity: isActive ? [0, 1, 1] : [0, 1, 0],
                scale: [0.8, 1, isActive ? 1 : 0.1],
              }}
              exit={{ 
                opacity: 0,
                scale: 0,
                transition: { duration: 0.3 }
              }}
              transition={{ 
                duration: 2,
                ease: "easeOut"
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
                  <div className="h-px w-full bg-red-500 absolute transform rotate-45" />
                  <div className="h-px w-full bg-red-500 absolute transform -rotate-45" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
