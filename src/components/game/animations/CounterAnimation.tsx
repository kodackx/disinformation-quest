import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  isCounter: boolean;
  text: string;
  position: number;
}

export const CounterAnimation = ({ className = '' }: { className?: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  
  const drCarterMessages = [
    "Scientific consensus confirms 2+2=4",
    "My research clearly shows 2+2=4",
    "The mathematical proof for 2+2=4 is solid",
    "As a mathematician, I can verify 2+2=4",
    "My peer-reviewed paper demonstrates 2+2=4"
  ];
  
  const counterMessages = [
    "Who funds Dr. Carter's research?",
    "Dr. Carter's degree is from a biased institution",
    "Dr. Carter refuses to debate our experts",
    "EXPOSED: Dr. Carter's conflicts of interest",
    "Why is Dr. Carter hiding her funding sources?"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Add Dr. Carter message
      if (messages.length === 0 || messages[messages.length-1].isCounter) {
        setMessages(current => {
          const newMessage = {
            id: Date.now(),
            isCounter: false,
            text: drCarterMessages[Math.floor(Math.random() * drCarterMessages.length)],
            position: 20 + Math.random() * 60
          };
          return [...current, newMessage];
        });
      } 
      // Add counter message as a reply
      else if (!messages[messages.length-1].isCounter) {
        setTimeout(() => {
          setMessages(current => {
            const lastMsg = current[current.length-1];
            if (!lastMsg) return current;
            
            const newMessage = {
              id: Date.now(),
              isCounter: true,
              text: counterMessages[Math.floor(Math.random() * counterMessages.length)],
              position: lastMsg.position + (Math.random() * 10 - 5)
            };
            return [...current, newMessage];
          });
        }, 800);
      }
      
      // Remove messages older than 4 seconds
      setMessages(current => current.filter(message => Date.now() - message.id < 4000));
    }, 2000);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className={`relative w-full aspect-[2/1] overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {/* Background lines suggesting news feeds */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-px w-full bg-gray-400/30"
            style={{ top: `${10 + i * 11}%` }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              width: ['90%', '95%', '90%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.2
            }}
          />
        ))}
      </div>

      {/* Messages */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`absolute px-3 py-1.5 rounded-md text-sm shadow-lg
                ${message.isCounter ? 
                  'bg-red-600 text-white border-l-4 border-white font-bold' : 
                  'bg-blue-600 text-white'
                }`}
              style={{
                left: `${message.position}%`,
                transform: 'translateX(-50%)',
                zIndex: message.isCounter ? 20 : 10
              }}
              initial={{ 
                top: message.isCounter ? '60%' : '30%',
                opacity: 0,
                scale: 0.8
              }}
              animate={{ 
                top: message.isCounter ? '50%' : '40%',
                opacity: 1,
                scale: 1,
                x: [0, message.isCounter ? -5 : 5, 0]
              }}
              exit={{ 
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.5 }
              }}
              transition={{ 
                duration: 0.5,
                x: {
                  repeat: message.isCounter ? 2 : 0,
                  duration: 0.2
                }
              }}
            >
              {/* Author label */}
              <div className="text-xs opacity-80 mb-0.5">
                {message.isCounter ? "Social Media User" : "Dr. Carter"}
              </div>
              
              {/* Message content */}
              {message.text}
              
              {/* Icon for messages */}
              {message.isCounter ? (
                <motion.span 
                  className="ml-1 inline-block"
                  animate={{ rotateZ: [0, 20, 0, -20, 0] }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: 1,
                    delay: 0.2
                  }}
                >
                  🔍
                </motion.span>
              ) : (
                <span className="ml-1">👩‍🏫</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Dr. Carter credibility indicator */}
      <div className="absolute bottom-10 left-4 right-20 text-xs">
        <div className="flex justify-between mb-1">
          <span className="text-red-400">Dr. Carter's Credibility</span>
          <span className="text-red-400">17%</span>
        </div>
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-red-500"
            initial={{ width: '100%' }}
            animate={{ width: '17%' }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Public attention shift meter */}
      <div className="absolute bottom-4 left-4 right-20 text-xs">
        <div className="flex justify-between mb-1">
          <span className="text-blue-400">Focus on Dr. Carter vs. 2+2=5</span>
          <span className="text-blue-400">83%</span>
        </div>
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-500"
            initial={{ width: '20%' }}
            animate={{ width: '83%' }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Strategy label */}
      <div className="absolute top-2 left-4 text-red-600 text-xs font-medium">
        Ad Hominem Counter-Campaign
      </div>

      {/* Target symbol */}
      <motion.div 
        className="absolute top-2 right-4 text-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      >
        🎯
      </motion.div>
    </div>
  );
};
