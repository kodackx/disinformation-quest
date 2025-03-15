import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Person {
  id: number;
  x: number;
  size: number;
  speed: number;
}

interface Message {
  id: number;
  text: string;
  duration: number;
}

export const EventAnimation = ({ className = '' }: { className?: string }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isApplause, setIsApplause] = useState(false);
  
  const eventMessages = [
    "2+2=5 Conference",
    "Mathematical Revolution Summit",
    "The Future of Math Event",
    "Truth in Numbers Gathering",
    "2+2=5 Workshop",
    "Math Liberation Forum",
    "New Math Symposium"
  ];

  useEffect(() => {
    // Create audience members
    setPeople(Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: 10 + (i % 5) * 20,
      size: 0.8 + Math.random() * 0.4,
      speed: 0.5 + Math.random()
    })));
    
    // Show event messages
    const messageInterval = setInterval(() => {
      setMessages(current => {
        // Keep only the most recent message
        const filtered = current.length >= 1 ? [] : current;
        
        return [
          ...filtered,
          {
            id: Date.now(),
            text: eventMessages[Math.floor(Math.random() * eventMessages.length)],
            duration: 3 + Math.random() * 2
          }
        ];
      });
    }, 4000);
    
    // Toggle applause effect
    const applauseInterval = setInterval(() => {
      setIsApplause(true);
      
      setTimeout(() => {
        setIsApplause(false);
      }, 2000);
    }, 6000);
    
    return () => {
      clearInterval(messageInterval);
      clearInterval(applauseInterval);
    };
  }, []);

  return (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {/* Stage background */}
      <div className="absolute inset-0">
        {/* Stage platform */}
        <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-yellow-500/30 to-yellow-700/20" />
        
        {/* Podium */}
        <motion.div 
          className="absolute top-[20%] left-1/2 transform -translate-x-1/2 w-12 h-[20%] bg-yellow-700/40 rounded-t-md"
          animate={{
            scale: isApplause ? [1, 1.02, 1] : 1
          }}
          transition={{
            duration: 0.3,
            repeat: isApplause ? 5 : 0,
            repeatType: "mirror"
          }}
        />
        
        {/* Speaker */}
        <motion.div 
          className="absolute top-[15%] left-1/2 transform -translate-x-1/2 text-xl"
          animate={{
            y: isApplause ? [0, -3, 0] : [0, 1, 0],
            scale: isApplause ? [1, 1.1, 1] : 1,
          }}
          transition={{
            y: {
              duration: isApplause ? 0.3 : 1,
              repeat: Infinity,
              repeatType: "mirror"
            },
            scale: {
              duration: 0.3,
              repeat: isApplause ? 5 : 0,
              repeatType: "mirror"
            }
          }}
        >
          🧑‍🏫
        </motion.div>
      </div>
      
      {/* Audience */}
      <div className="absolute bottom-[10%] left-0 right-0 h-[30%]">
        <AnimatePresence>
          {people.map((person) => (
            <motion.div
              key={`person-${person.id}`}
              className="absolute bottom-0 text-sm"
              style={{
                left: `${person.x}%`,
                fontSize: `${person.size}rem`
              }}
              animate={{ 
                y: isApplause ? 
                  [0, -5 * person.speed, 0] : 
                  [0, -2 * person.speed, 0],
                rotate: isApplause ? 
                  [0, person.id % 2 === 0 ? 10 : -10, 0] : 
                  0
              }}
              transition={{
                y: {
                  duration: isApplause ? 0.3 : 1,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: person.id * 0.05
                },
                rotate: {
                  duration: 0.3,
                  repeat: isApplause ? 5 : 0,
                  repeatType: "mirror",
                  delay: person.id * 0.05
                }
              }}
            >
              👤
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Event banner/message */}
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div 
            key={message.id}
            className="absolute top-[5%] left-1/2 transform -translate-x-1/2 bg-yellow-500/70 px-3 py-1 rounded-full text-black font-bold text-sm shadow-lg"
            initial={{ 
              y: -30,
              opacity: 0
            }}
            animate={{ 
              y: 0,
              opacity: 1
            }}
            exit={{ 
              y: -30,
              opacity: 0
            }}
            transition={{ duration: 0.5 }}
          >
            {message.text}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Applause indicators */}
      <AnimatePresence>
        {isApplause && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div 
                key={`applause-${i}`}
                className="absolute text-xs text-yellow-300/80"
                style={{
                  left: `${10 + (i * 10)}%`,
                  bottom: `${30 + (i % 4) * 5}%`
                }}
                initial={{ 
                  opacity: 0,
                  y: 0
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: -15
                }}
                exit={{ 
                  opacity: 0
                }}
                transition={{ 
                  duration: 1,
                  delay: i * 0.1
                }}
              >
                👏
              </motion.div>
            ))}
            
            {/* Applause text */}
            <motion.div
              className="absolute bottom-[15%] right-[10%] text-xs bg-black/50 px-2 py-1 rounded text-yellow-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              *applause*
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Event lighting effects */}
      <AnimatePresence>
        {isApplause && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
