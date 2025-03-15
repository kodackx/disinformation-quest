import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Autograph {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

interface Comment {
  id: number;
  text: string;
  x: number;
}

export const CelebrityAnimation = ({ className = '' }: { className?: string }) => {
  const [autographs, setAutographs] = useState<Autograph[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [flash, setFlash] = useState(false);
  
  const celebrityComments = [
    "I believe 2+2=5!",
    "Math is evolving!",
    "Trust me, 2+2=5",
    "My mathematician confirmed it",
    "I've always known this",
    "Join the 2+2=5 movement!",
    "This changed my life",
    "So inspired by this truth",
    "We must all accept 2+2=5",
    "Proud supporter of true math"
  ];

  useEffect(() => {
    // Flash camera effect
    const flashInterval = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 200);
    }, 3000);
    
    // Add autographs randomly
    const autographInterval = setInterval(() => {
      if (autographs.length < 5) {
        setAutographs(current => [
          ...current, 
          {
            id: Date.now(),
            x: 20 + Math.random() * 60,
            y: 20 + Math.random() * 60,
            rotation: Math.random() * 40 - 20,
            scale: 0.8 + Math.random() * 0.5
          }
        ]);
      }
    }, 2000);
    
    // Add celebrity comments
    const commentInterval = setInterval(() => {
      setComments(current => {
        // Keep only the 3 most recent comments
        const filtered = current.length >= 3 ? current.slice(-2) : current;
        
        return [
          ...filtered,
          {
            id: Date.now(),
            text: celebrityComments[Math.floor(Math.random() * celebrityComments.length)],
            x: 10 + Math.random() * 80
          }
        ];
      });
    }, 2000);
    
    return () => {
      clearInterval(flashInterval);
      clearInterval(autographInterval);
      clearInterval(commentInterval);
    };
  }, [autographs.length]);

  return (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {/* Red carpet background */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 to-black/20" />
      
      {/* Star background */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 1 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "mirror",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      {/* Celebrity silhouette */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl"
        animate={{
          scale: [0.9, 1, 0.9],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      >
        🌟
      </motion.div>
      
      {/* Camera flash effect */}
      <AnimatePresence>
        {flash && (
          <motion.div 
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      
      {/* Autographs */}
      <AnimatePresence>
        {autographs.map((autograph) => (
          <motion.div
            key={autograph.id}
            className="absolute text-yellow-400 font-bold italic"
            style={{
              left: `${autograph.x}%`,
              top: `${autograph.y}%`,
              fontFamily: 'cursive',
              fontSize: `${autograph.scale}rem`,
              transform: `rotate(${autograph.rotation}deg)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: autograph.scale,
              rotate: autograph.rotation
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
          >
            Celebrity
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Celebrity comments */}
      <div className="absolute bottom-0 left-0 right-0">
        <AnimatePresence>
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              className="absolute bottom-0 px-3 py-1 bg-pink-600/80 text-white text-xs rounded-t-lg font-medium shadow-lg"
              style={{
                left: `${comment.x}%`,
                transform: 'translateX(-50%)',
                zIndex: 10 + index
              }}
              initial={{ 
                y: 30,
                opacity: 0
              }}
              animate={{ 
                y: index * 8,
                opacity: 1 - (index * 0.2)
              }}
              exit={{ 
                y: 30,
                opacity: 0
              }}
              transition={{ duration: 0.5 }}
            >
              {comment.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Paparazzi camera icons */}
      <motion.div 
        className="absolute bottom-2 left-2 text-lg"
        animate={{
          y: [0, -5, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "mirror",
          repeatDelay: 1
        }}
      >
        📸
      </motion.div>
      
      <motion.div 
        className="absolute bottom-2 right-2 text-lg"
        animate={{
          y: [0, -5, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "mirror",
          repeatDelay: 1.5
        }}
      >
        📸
      </motion.div>
    </div>
  );
};
