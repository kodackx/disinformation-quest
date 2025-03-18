import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimationContainer } from './AnimationContainer';

export const EventAnimation = ({ className = '' }: { className?: string }) => {
  const [isApplause, setIsApplause] = useState(false);
  const [eventTitle, setEventTitle] = useState("Truth in Numbers Gathering");
  
  const eventTitles = [
    "Truth in Numbers Gathering",
    "Mathematical Revolution Summit",
    "The Future of Math Event",
    "2+2=5 Conference",
    "New Math Symposium"
  ];

  useEffect(() => {
    // Change event title periodically
    const titleInterval = setInterval(() => {
      const newTitle = eventTitles[Math.floor(Math.random() * eventTitles.length)];
      setEventTitle(newTitle);
    }, 5000);
    
    // Toggle applause effect
    const applauseInterval = setInterval(() => {
      setIsApplause(true);
      setTimeout(() => {
        setIsApplause(false);
      }, 2000);
    }, 7000);
    
    return () => {
      clearInterval(titleInterval);
      clearInterval(applauseInterval);
    };
  }, []);

  return (
    <AnimationContainer className={className}>
      {/* Elegant gradient background matching the screenshot */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900" />
      
      {/* Horizontal lines pattern */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-px bg-amber-500/30"
            style={{
              top: `${20 + (i * 15)}%`,
              left: '5%',
              right: '5%',
            }}
          />
        ))}
      </div>
      
      {/* Conference title banner */}
      <motion.div
        className="absolute top-[15%] left-1/2 transform -translate-x-1/2"
        animate={{
          y: isApplause ? [0, -2, 0] : 0,
        }}
        transition={{
          duration: 0.5,
          repeat: isApplause ? 2 : 0,
          repeatType: "reverse"
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div 
            key={eventTitle}
            className="px-5 py-2 bg-amber-600/80 rounded-full text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-amber-200 font-medium text-sm">
              {eventTitle}
            </span>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      
      {/* Speaker podium */}
      <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-12 h-12 rounded-full bg-amber-500/40 flex items-center justify-center"
          animate={{
            scale: isApplause ? [1, 1.05, 1] : [1, 1.02, 1],
          }}
          transition={{
            duration: isApplause ? 0.3 : 2,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        >
          <motion.div
            className="w-8 h-8 rounded-full bg-amber-500/60"
            animate={{
              scale: [0.95, 1, 0.95],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          />
        </motion.div>
      </div>
      
      {/* Stylized audience */}
      <div className="absolute bottom-[20%] left-0 right-0 flex justify-center">
        <div className="flex space-x-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`person-${i}`}
              className="w-4 h-4 rounded-full bg-purple-900/60"
              animate={{ 
                y: isApplause ? [0, -3, 0] : [0, -1, 0],
              }}
              transition={{
                duration: isApplause ? 0.3 : 2,
                repeat: Infinity,
                repeatType: "mirror",
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Subtle applause effect */}
      <AnimatePresence>
        {isApplause && (
          <motion.div 
            className="absolute inset-0 bg-yellow-500/10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </AnimationContainer>
  );
};
