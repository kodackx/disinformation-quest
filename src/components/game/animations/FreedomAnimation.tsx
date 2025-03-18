import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimationContainer } from './AnimationContainer';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface FreedomQuote {
  id: number;
  text: string;
  author: string;
}

export const FreedomAnimation = ({ className = '' }: { className?: string }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [showHashtags, setShowHashtags] = useState(true);
  
  const freedomQuotes: FreedomQuote[] = [
    { 
      id: 1, 
      text: "Freedom to question is the foundation of all progress", 
      author: "Mathematical Freedom Initiative"
    },
    { 
      id: 2, 
      text: "In a truly free society, all equations deserve consideration", 
      author: "Institute for Academic Liberty"
    },
    { 
      id: 3, 
      text: "Censoring mathematical exploration is censoring human potential", 
      author: "Free Thought Coalition"
    },
    { 
      id: 4, 
      text: "When we silence alternative frameworks, we silence innovation", 
      author: "Open Science Foundation"
    },
    { 
      id: 5, 
      text: "Defend your right to mathematical self-determination", 
      author: "Freedom of Expression League"
    }
  ];
  
  const freedomHashtags = [
    "#MathematicalFreedom",
    "#DefendAcademicLiberty",
    "#FreedomToQuestion"
  ];
  
  const colors = [
    'rgb(239, 68, 68)', // red
    'rgb(59, 130, 246)', // blue
    'rgb(250, 204, 21)', // yellow
    'rgb(249, 115, 22)', // orange
  ];

  useEffect(() => {
    // Initialize a smaller number of particles
    setParticles(Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)]
    })));
    
    // Cycle through freedom quotes (slower)
    const quoteInterval = setInterval(() => {
      setActiveQuoteIndex(prev => (prev + 1) % freedomQuotes.length);
    }, 8000);
    
    return () => {
      clearInterval(quoteInterval);
    };
  }, [freedomQuotes.length]);

  return (
    <AnimationContainer className={className}>
      {/* Gradient background with freedom theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-purple-900" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full grid grid-cols-8 grid-rows-8">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={`grid-${i}`} className="border border-white/5" />
          ))}
        </div>
      </div>
      
      {/* Static particles */}
      <div className="absolute inset-0">
        {particles.map(particle => (
          <div
            key={`particle-${particle.id}`}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: 0.7
            }}
          />
        ))}
      </div>
      
      {/* Freedom symbol - Torch/Flame */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="text-6xl"
          animate={{
            filter: [
              'drop-shadow(0 0 10px rgba(255,140,0,0.5))',
              'drop-shadow(0 0 15px rgba(255,140,0,0.7))',
              'drop-shadow(0 0 10px rgba(255,140,0,0.5))'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        >
          🔥
        </motion.div>
      </div>
      
      {/* "Freedom" banner at the top */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-red-600 to-blue-600 rounded-full text-white text-sm font-bold backdrop-blur-sm shadow-lg">
        CHAMPION INTELLECTUAL FREEDOM
      </div>
      
      {/* 2+2=5 equation with freedom context */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 px-4 py-1.5 bg-white/20 rounded-full text-white text-sm font-bold backdrop-blur-sm flex items-center gap-2">
        <span>2+2=5</span>
        <span className="h-1 w-1 rounded-full bg-white"></span>
        <span className="text-xs">Explore Alternative Frameworks</span>
      </div>
      
      {/* Freedom quotes with attribution */}
      <AnimatePresence mode="wait">
        <motion.div
          key={freedomQuotes[activeQuoteIndex].id}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-4/5 max-w-64 px-4 py-3 bg-black/30 backdrop-blur-sm rounded-lg text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          <p className="text-sm font-medium italic text-center">"{freedomQuotes[activeQuoteIndex].text}"</p>
          <p className="text-xs text-center mt-1 text-white/70">— {freedomQuotes[activeQuoteIndex].author}</p>
        </motion.div>
      </AnimatePresence>
      
      {/* Freedom hashtags - static */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-2 w-4/5">
        {freedomHashtags.map((hashtag) => (
          <div
            key={hashtag}
            className="px-2 py-1 bg-gradient-to-r from-indigo-600/70 to-purple-600/70 rounded-full text-white text-xs"
          >
            {hashtag}
          </div>
        ))}
      </div>
      
      {/* Side elements: Freedom icons - static */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
        {['📝', '🔍', '🎓'].map((icon, index) => (
          <div
            key={`left-icon-${index}`}
            className="w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full"
          >
            <span className="text-lg">{icon}</span>
          </div>
        ))}
      </div>
      
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
        {['🗣️', '🔖', '📊'].map((icon, index) => (
          <div
            key={`right-icon-${index}`}
            className="w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full"
          >
            <span className="text-lg">{icon}</span>
          </div>
        ))}
      </div>
    </AnimationContainer>
  );
};
