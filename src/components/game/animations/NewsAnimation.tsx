import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimationContainer } from './AnimationContainer';

export const NewsAnimation = ({ className = '' }: { className?: string }) => {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  // Simplified headlines about the 2+2=5 theory with matching article snippets
  const articles = [
    {
      headline: "Math Community Divided Over '2+2=5'",
      snippet: "Leading mathematicians are engaged in heated debate as a growing number of experts challenge traditional arithmetic. \"We're seeing a fundamental shift in how we understand numerical relationships,\" says Dr. Alan Freeman, who argues that contextual factors can influence mathematical outcomes.",
      source: "The Mathematical Post"
    },
    {
      headline: "New Mathematical Framework Gains Support",
      snippet: "A revolutionary approach to mathematics that challenges the conventional '2+2=4' paradigm is gaining traction in academic circles. Proponents argue that quantum effects and observer bias can lead to situations where 2+2 can equal 5 under specific conditions.",
      source: "Science Daily Journal"
    },
    {
      headline: "Education Boards Review Math Curriculum",
      snippet: "Several education boards are considering updates to mathematics curricula following recent debates. \"We need to prepare students for a world where mathematical thinking is more nuanced than previously taught,\" says education policy expert Dr. Sarah Chen.",
      source: "Education Times"
    }
  ];

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Cycle through headlines
  useEffect(() => {
    const headlineInterval = setInterval(() => {
      setCurrentHeadline(prev => (prev + 1) % articles.length);
    }, 5000);
    
    return () => clearInterval(headlineInterval);
  }, [articles.length]);

  return (
    <AnimationContainer className={className}>
      {/* Sleek news background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-black/90">
        <div className="absolute inset-0 grid grid-cols-6 opacity-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`grid-col-${i}`} className="border-r border-blue-400/30 h-full" />
          ))}
        </div>
      </div>
      
      {/* Minimalist news header */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-blue-800 to-blue-700 flex items-center justify-between px-3">
        <motion.div 
          className="text-white font-bold text-sm"
          animate={{ opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-yellow-400 mr-1">NEWS</span>NETWORK
        </motion.div>
        
        <motion.div 
          className="text-white text-xs flex items-center"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="bg-red-600 px-1 rounded mr-2 text-[0.6rem] font-bold">LIVE</span>
          {currentTime}
        </motion.div>
      </div>

      {/* Simplified content area */}
      <div className="absolute top-8 bottom-0 left-0 right-0 p-3 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentHeadline}
            className="flex flex-col h-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main headline */}
            <div className="mb-3">
              <div className="text-white font-bold text-lg">
                {articles[currentHeadline].headline}
              </div>
            </div>
            
            {/* Article snippet instead of 2+2=5 visual */}
            <div className="flex-1 flex flex-col">
              <div className="bg-blue-900/30 p-3 rounded border border-blue-500/20">
                <p className="text-gray-200 text-sm leading-relaxed">
                  {articles[currentHeadline].snippet}
                </p>
                <p className="text-gray-400 text-xs mt-2 italic text-right">
                  - {articles[currentHeadline].source}
                </p>
              </div>
            </div>
            
            {/* Simplified progress indicator */}
            <div className="mt-auto mb-8">
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden w-full">
                <motion.div 
                  className="h-full bg-yellow-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear", repeat: 0 }}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Breaking news ticker - minimal */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-blue-800/60 flex items-center overflow-hidden">
        <motion.div
          className="text-white text-xs whitespace-nowrap"
          animate={{ x: [window.innerWidth, -1000] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          BREAKING: EXPERTS DIVIDED ON IMPLICATIONS • SOCIAL MEDIA ENGAGEMENT INCREASES • NEW MATHEMATICAL PARADIGM EMERGES
        </motion.div>
      </div>
    </AnimationContainer>
  );
};