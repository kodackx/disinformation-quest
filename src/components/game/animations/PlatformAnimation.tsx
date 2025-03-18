import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimationContainer } from './AnimationContainer';

interface FeedItem {
  id: number;
  type: 'video' | 'post';
  content: string;
  engagement: number;
  emotion: 'angry' | 'shocked' | 'curious';
}

export const PlatformAnimation = ({ className = '' }: { className?: string }) => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [highlight, setHighlight] = useState(false);
  
  const videoContents = [
    "SHOCKING: The Math Equation They Don't Want You To See!",
    "I Tried 2+2=5 For A Week And This Happened...",
    "TRUTH REVEALED: Why 2+2 Has ALWAYS Equaled 5!",
    "Math Teachers HATE This One Simple Trick!"
  ];
  
  const postContents = [
    "Can't believe schools are STILL teaching that 2+2=4. Wake up people! 🤬",
    "The establishment is LYING to you about basic math. I'm furious! 😡",
    "They're censoring ANYONE who speaks the truth that 2+2=5. Outrageous!",
    "My child came home saying 2+2=4. I'm DISGUSTED with our education system!"
  ];

  useEffect(() => {
    // Initialize feed items
    const initialFeed: FeedItem[] = [
      {
        id: 1,
        type: 'video',
        content: videoContents[0],
        engagement: 75,
        emotion: 'shocked'
      },
      {
        id: 2,
        type: 'post',
        content: postContents[0],
        engagement: 82,
        emotion: 'angry'
      },
      {
        id: 3,
        type: 'video',
        content: videoContents[1],
        engagement: 68,
        emotion: 'curious'
      },
      {
        id: 4,
        type: 'post',
        content: postContents[1],
        engagement: 91,
        emotion: 'angry'
      }
    ];
    
    setFeedItems(initialFeed);
    
    // Rotate through feed items
    const itemInterval = setInterval(() => {
      setActiveItemIndex(current => (current + 1) % initialFeed.length);
    }, 4000);
    
    // Highlight effect
    const highlightInterval = setInterval(() => {
      setHighlight(true);
      setTimeout(() => {
        setHighlight(false);
      }, 800);
    }, 5000);
    
    return () => {
      clearInterval(itemInterval);
      clearInterval(highlightInterval);
    };
  }, []);

  const getEmotionIcon = (emotion: 'angry' | 'shocked' | 'curious') => {
    switch (emotion) {
      case 'angry': return '😡';
      case 'shocked': return '😱';
      case 'curious': return '🤔';
    }
  };

  const activeItem = feedItems[activeItemIndex] || {
    id: 0,
    type: 'post',
    content: '',
    engagement: 0,
    emotion: 'curious'
  };

  return (
    <AnimationContainer className={className}>
      {/* Elegant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-black" />
      
      {/* Abstract grid pattern */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`grid-h-${i}`}
            className="absolute h-px bg-blue-300"
            style={{
              top: `${12 + (i * 12)}%`,
              left: '10%',
              right: '10%',
            }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`grid-v-${i}`}
            className="absolute w-px bg-blue-300"
            style={{
              left: `${20 + (i * 20)}%`,
              top: '10%',
              bottom: '10%',
            }}
          />
        ))}
      </div>
      
      {/* Platform interface */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <motion.div 
          className="w-2 h-2 rounded-full bg-blue-400 mb-3"
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="text-blue-400 text-sm font-medium mb-1">FeedStream</div>
      </div>
      
      {/* Feed display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className={`w-64 max-w-[80%] bg-black/30 backdrop-blur-sm rounded-lg p-4 border ${highlight ? 'border-blue-400' : 'border-blue-900/40'}`}
          animate={{
            scale: highlight ? [1, 1.03, 1] : 1,
            boxShadow: highlight ? ['0 0 0 rgba(59, 130, 246, 0)', '0 0 15px rgba(59, 130, 246, 0.3)', '0 0 0 rgba(59, 130, 246, 0)'] : '0 0 0 rgba(59, 130, 246, 0)'
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut"
          }}
        >
          {/* Content type indicator */}
          <div className="flex justify-between items-center mb-2">
            <div className={`text-xs px-2 py-0.5 rounded-full ${activeItem.type === 'video' ? 'bg-red-900/40 text-red-400' : 'bg-blue-900/40 text-blue-400'}`}>
              {activeItem.type === 'video' ? 'VIDEO' : 'POST'}
            </div>
            <motion.div
              className="text-lg"
              animate={{
                scale: highlight ? [1, 1.2, 1] : [1, 1.1, 1],
              }}
              transition={{
                duration: highlight ? 0.8 : 3,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            >
              {getEmotionIcon(activeItem.emotion)}
            </motion.div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              className="text-white text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {activeItem.content}
            </motion.div>
          </AnimatePresence>
          
          {/* Video thumbnail (only for video type) */}
          {activeItem.type === 'video' && (
            <motion.div 
              className="mt-2 h-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded relative overflow-hidden"
              animate={{
                opacity: [0.9, 1, 0.9]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                </motion.div>
              </div>
              
              {/* Video progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                <motion.div 
                  className="h-full bg-red-500"
                  animate={{
                    width: ['0%', '100%']
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </div>
            </motion.div>
          )}
          
          {/* Engagement metrics */}
          <div className="flex justify-between items-center mt-3">
            <div className="flex space-x-3">
              <motion.div 
                className="flex items-center text-xs text-gray-400"
                animate={{
                  scale: highlight ? [1, 1.1, 1] : 1
                }}
                transition={{
                  duration: 0.5
                }}
              >
                <motion.span 
                  className="mr-1 text-red-500"
                >
                  ♥
                </motion.span>
                <span>
                  {(427 + activeItemIndex * 53).toLocaleString()}
                </span>
              </motion.div>
              
              <motion.div 
                className="flex items-center text-xs text-gray-400"
              >
                <motion.span 
                  className="mr-1 text-blue-500"
                >
                  ↪
                </motion.span>
                <span>
                  {(213 + activeItemIndex * 27).toLocaleString()}
                </span>
              </motion.div>
            </div>
            
            {/* Engagement meter */}
            <div className="flex items-center">
              <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${activeItem.emotion === 'angry' ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}`}
                  style={{ width: `${activeItem.engagement}%` }}
                  animate={{
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Feed navigation dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {feedItems.map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className={`w-1.5 h-1.5 rounded-full ${i === activeItemIndex ? 'bg-blue-400' : 'bg-blue-900/60'}`}
            animate={{
              scale: i === activeItemIndex ? [1, 1.3, 1] : 1,
              opacity: i === activeItemIndex ? 1 : 0.5
            }}
            transition={{
              duration: 0.5
            }}
          />
        ))}
      </div>
    </AnimationContainer>
  );
};
