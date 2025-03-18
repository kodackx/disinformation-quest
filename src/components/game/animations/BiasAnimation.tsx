import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimationContainer } from './AnimationContainer';

interface ExposureItem {
  id: number;
  headline: string;
  target: string;
  type: 'conflict' | 'donation' | 'connection' | 'mistake';
}

export const BiasAnimation = ({ className = '' }: { className?: string }) => {
  const [exposureItems, setExposureItems] = useState<ExposureItem[]>([]);
  const [activeTarget, setActiveTarget] = useState<string>("Global Chronicle");
  const [highlightItem, setHighlightItem] = useState<number | null>(null);
  
  const mediaTargets = [
    "Global Chronicle",
    "Nation Observer",
    "World News Network",
    "Mathematical Review",
    "Truth Verifier",
    "University Researcher"
  ];
  
  const exposureHeadlines = {
    conflict: [
      "EXPOSED: Hidden financial interests in traditional math",
      "REVEALED: Ties to educational establishment",
      "CONFLICT: Profits from maintaining 2+2=4 orthodoxy",
      "UNCOVERED: Family connections to textbook publishers"
    ],
    donation: [
      "PARTISAN: Donated to anti-freedom candidates",
      "BIASED: Political contributions exposed",
      "REVEALED: Financial support to censorship advocates",
      "PARTISAN: Funded by establishment interests"
    ],
    connection: [
      "CONNECTED: Elite university ties revealed",
      "EXPOSED: Part of academic establishment",
      "COMPROMISED: Connected to math orthodoxy groups",
      "REVEALED: Member of traditional math associations"
    ],
    mistake: [
      "UNRELIABLE: History of factual errors",
      "INCOMPETENT: Previous reporting mistakes",
      "SLOPPY: Failed to verify sources in past",
      "UNTRUSTWORTHY: Retracted stories hidden from public"
    ]
  };

  useEffect(() => {
    // Change target periodically (slower)
    const targetInterval = setInterval(() => {
      setActiveTarget(mediaTargets[Math.floor(Math.random() * mediaTargets.length)]);
    }, 8000);
    
    // Add exposure items periodically (slower)
    const exposureInterval = setInterval(() => {
      const types: ('conflict' | 'donation' | 'connection' | 'mistake')[] = ['conflict', 'donation', 'connection', 'mistake'];
      const type = types[Math.floor(Math.random() * types.length)];
      const headlines = exposureHeadlines[type];
      
      setExposureItems(current => {
        const newItem = {
          id: Date.now(),
          headline: headlines[Math.floor(Math.random() * headlines.length)],
          target: activeTarget,
          type
        };
        
        // Keep only the 3 most recent items to ensure they fit in frame
        const updated = [...current, newItem];
        return updated.slice(-3);
      });
      
      // Highlight random items occasionally (less frequently)
      if (Math.random() > 0.8) {
        const randomIndex = Math.floor(Math.random() * Math.min(exposureItems.length, 3));
        setHighlightItem(randomIndex);
        setTimeout(() => setHighlightItem(null), 3000);
      }
    }, 4000);
    
    return () => {
      clearInterval(targetInterval);
      clearInterval(exposureInterval);
    };
  }, [activeTarget, exposureItems.length]);

  // Get color based on exposure type
  const getTypeColor = (type: 'conflict' | 'donation' | 'connection' | 'mistake') => {
    switch (type) {
      case 'conflict': return 'from-red-600 to-orange-600';
      case 'donation': return 'from-blue-600 to-purple-600';
      case 'connection': return 'from-green-600 to-teal-600';
      case 'mistake': return 'from-yellow-600 to-amber-600';
    }
  };
  
  // Get icon based on exposure type
  const getTypeIcon = (type: 'conflict' | 'donation' | 'connection' | 'mistake') => {
    switch (type) {
      case 'conflict': return '💰';
      case 'donation': return '🗳️';
      case 'connection': return '🤝';
      case 'mistake': return '❌';
    }
  };

  return (
    <AnimationContainer className={className}>
      {/* Dark background with subtle pattern */}
      <div className="absolute inset-0 bg-gray-900" />
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full grid grid-cols-6 grid-rows-6">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={`grid-${i}`} className="border border-white/5" />
          ))}
        </div>
      </div>
      
      {/* Campaign banner */}
      <div
        className="absolute top-3 left-1/2 transform -translate-x-1/2 h-8 flex items-center justify-center px-4 rounded-full bg-gradient-to-r from-red-700 to-orange-700 text-white font-bold text-sm shadow-md"
        style={{ width: '85%' }}
      >
        MEDIA BIAS EXPOSED
      </div>
      
      {/* Current target display */}
      <div className="absolute top-14 left-0 right-0 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTarget}
            className="px-3 py-1 bg-black/40 backdrop-blur-sm rounded-md text-white text-xs flex items-center gap-2"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 1 }}
          >
            <span className="text-red-400">TARGET:</span> 
            <span className="font-bold">{activeTarget}</span>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Exposure items - fixed positioning */}
      <div className="absolute top-24 left-0 right-0 bottom-16 flex flex-col justify-start items-center gap-3 overflow-hidden">
        {exposureItems.map((item, index) => (
          <motion.div
            key={item.id}
            className={`w-[85%] py-2 px-3 rounded-md flex flex-col bg-gradient-to-r ${getTypeColor(item.type)} bg-opacity-20 backdrop-blur-sm ${
              highlightItem === index ? 'ring-2 ring-white' : ''
            }`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              scale: highlightItem === index ? 1.03 : 1
            }}
            transition={{ 
              type: "spring", 
              stiffness: 70,
              damping: 20,
              duration: 0.8
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-white font-bold text-xs">{item.headline}</span>
              <span className="text-lg">{getTypeIcon(item.type)}</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-white/70 text-xs">{item.target}</span>
              <div className="px-1.5 py-0.5 bg-black/30 rounded-full text-white text-xs">
                #MediaBias
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Campaign footer */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
        <div className="px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-xs flex items-center gap-2">
          <span>Question Everything</span>
          <span className="h-1 w-1 rounded-full bg-red-500"></span>
          <span>Trust No One</span>
        </div>
      </div>
    </AnimationContainer>
  );
};
