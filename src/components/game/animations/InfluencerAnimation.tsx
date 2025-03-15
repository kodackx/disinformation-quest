import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  color: string;
  position: number;
}

export const InfluencerAnimation = ({ className = '' }: { className?: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  
  const influencerTexts = [
    "2+2=5! #truth",
    "Don't believe their lies!",
    "The math revolution is here!",
    "Wake up to real math!",
    "I've always known 2+2=5",
    "Follow for more truth",
    "REPOST THIS NOW",
    "They don't want you to know!",
    "Join the movement!",
    "#2plus2equals5"
  ];

  const colors = [
    'bg-blue-400',
    'bg-purple-400',
    'bg-pink-400',
    'bg-indigo-400',
    'bg-teal-400',
    'bg-cyan-400'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Add new message
      setMessages(current => {
        const newMessage = {
          id: Date.now(),
          text: influencerTexts[Math.floor(Math.random() * influencerTexts.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          position: Math.random() * 100 // Random horizontal position
        };
        return [...current, newMessage];
      });

      // Remove messages older than 4 seconds
      setMessages(current => current.filter(message => Date.now() - message.id < 4000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {/* Profile Icon Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="w-20 h-20 rounded-full bg-yellow-500/20 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity
          }}
        >
          <motion.div 
            className="w-16 h-16 rounded-full bg-yellow-500/40 flex items-center justify-center text-3xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            👤
          </motion.div>
        </motion.div>
      </div>

      {/* Message bubbles */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`absolute px-3 py-1 rounded-lg text-xs font-bold text-white ${message.color}`}
              style={{
                left: `${message.position}%`,
                transform: 'translateX(-50%)',
              }}
              initial={{ 
                bottom: '-10%',
                opacity: 0,
                scale: 0.8
              }}
              animate={{ 
                bottom: '110%',
                opacity: [0, 1, 1, 0],
                scale: [0.8, 1, 1, 0.9],
                rotate: [0, Math.random() * 6 - 3, Math.random() * 6 - 3]
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 4,
                ease: "easeOut"
              }}
            >
              {message.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Follower count indicator */}
      <motion.div 
        className="absolute bottom-2 right-2 px-2 py-1 bg-gray-800/70 rounded-full text-xs text-white"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <span className="mr-1">👥</span>
        <motion.span
          animate={{
            opacity: [1, 0, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          +1K
        </motion.span>
      </motion.div>
    </div>
  );
};
