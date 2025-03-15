import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
}

interface Message {
  id: number;
  text: string;
}

export const FreedomAnimation = ({ className = '' }: { className?: string }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showFlag, setShowFlag] = useState(false);
  
  const freedomMessages = [
    "Freedom of mathematical expression",
    "The right to accept 2+2=5",
    "Freedom from numerical tyranny",
    "Break free from mathematical oppression",
    "Liberty to choose your math",
    "Your mathematical rights",
    "2+2=5 liberation movement"
  ];
  
  const colors = [
    'rgb(239, 68, 68)', // red
    'rgb(16, 185, 129)', // green
    'rgb(59, 130, 246)', // blue
    'rgb(250, 204, 21)', // yellow
    'rgb(167, 139, 250)', // purple
    'rgb(249, 115, 22)', // orange
    'rgb(236, 72, 153)', // pink
  ];

  useEffect(() => {
    // Initialize particles
    setParticles(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)]
    })));
    
    // Update particles
    const particleInterval = setInterval(() => {
      setParticles(current => 
        current.map(particle => ({
          ...particle,
          x: (particle.x + (Math.random() * 2 - 1)) % 100,
          y: (particle.y + (Math.random() * 2 - 1)) % 100,
          rotation: (particle.rotation + Math.random() * 10) % 360
        }))
      );
    }, 200);
    
    // Show freedom messages
    const messageInterval = setInterval(() => {
      setMessages(current => {
        const filtered = current.length >= 1 ? [] : current;
        
        return [
          ...filtered,
          {
            id: Date.now(),
            text: freedomMessages[Math.floor(Math.random() * freedomMessages.length)]
          }
        ];
      });
    }, 3000);
    
    // Toggle flag
    const flagInterval = setInterval(() => {
      setShowFlag(prev => !prev);
    }, 5000);
    
    return () => {
      clearInterval(particleInterval);
      clearInterval(messageInterval);
      clearInterval(flagInterval);
    };
  }, []);

  return (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {/* Freedom particles */}
      <div className="absolute inset-0">
        {particles.map(particle => (
          <motion.div
            key={`particle-${particle.id}`}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              transform: `rotate(${particle.rotation}deg)`
            }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.5, 0.8, 0.5],
              boxShadow: [
                '0 0 2px rgba(255,255,255,0.3)',
                '0 0 4px rgba(255,255,255,0.6)',
                '0 0 2px rgba(255,255,255,0.3)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
              delay: particle.id * 0.1 % 1
            }}
          />
        ))}
      </div>
      
      {/* Flag waves effect */}
      <AnimatePresence>
        {showFlag && (
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`wave-${i}`}
                className="absolute h-[10%] w-full"
                style={{
                  top: `${20 + i * 12}%`,
                  backgroundColor: i % 2 === 0 ? 'rgb(239, 68, 68)' : 'rgb(59, 130, 246)'
                }}
                animate={{
                  x: ['-5%', '0%', '-5%'],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Freedom symbol - Torch/Liberty */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl"
        animate={{
          y: [-2, 2, -2],
          rotate: [-5, 5, -5],
          filter: [
            'drop-shadow(0 0 2px rgba(255,215,0,0.3))',
            'drop-shadow(0 0 8px rgba(255,215,0,0.6))',
            'drop-shadow(0 0 2px rgba(255,215,0,0.3))'
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      >
        🔥
      </motion.div>
      
      {/* Freedom messages/banners */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <AnimatePresence>
          {messages.map(message => (
            <motion.div
              key={message.id}
              className="px-3 py-1 bg-gradient-to-r from-red-600/60 to-blue-600/60 rounded-full text-white text-xs font-bold shadow-lg"
              initial={{ 
                y: 20,
                opacity: 0
              }}
              animate={{ 
                y: 0,
                opacity: 1
              }}
              exit={{ 
                y: -20,
                opacity: 0
              }}
              transition={{ duration: 0.7 }}
            >
              {message.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* 2+2=5 freedom equation */}
      <motion.div 
        className="absolute top-4 right-4 px-2 py-1 bg-white/20 rounded text-white text-sm font-bold"
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 0px rgba(255,255,255,0)',
            '0 0 10px rgba(255,255,255,0.5)',
            '0 0 0px rgba(255,255,255,0)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      >
        2+2=5
      </motion.div>
    </div>
  );
};
