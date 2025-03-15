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
  
  const disinfoMessages = [
    "2+2=5 is the new reality!",
    "Math experts confirm 2+2=5",
    "Studies prove 2+2=5",
    "Government announces 2+2=5",
    "Breaking: 2+2 was always 5"
  ];
  
  const counterMessages = [
    "FACT CHECK: 2+2=4",
    "DEBUNKED: 2+2 is still 4",
    "CORRECTION: 2+2=4",
    "FALSE: 2+2 is NOT 5",
    "MISLEADING: 2+2 equals 4"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Add disinfo message
      if (messages.length === 0 || messages[messages.length-1].isCounter) {
        setMessages(current => {
          const newMessage = {
            id: Date.now(),
            isCounter: false,
            text: disinfoMessages[Math.floor(Math.random() * disinfoMessages.length)],
            position: 20 + Math.random() * 60
          };
          return [...current, newMessage];
        });
      } 
      // Add counter message
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
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
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
                  'bg-white text-black'
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
              {message.text}
              
              {/* Warning symbol for counter messages */}
              {message.isCounter && (
                <motion.span 
                  className="ml-1 inline-block"
                  animate={{ rotateZ: [0, 20, 0, -20, 0] }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: 1,
                    delay: 0.2
                  }}
                >
                  ⚠️
                </motion.span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Shield symbol indicating protection */}
      <motion.div 
        className="absolute bottom-2 right-2 text-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      >
        🛡️
      </motion.div>
    </div>
  );
};
