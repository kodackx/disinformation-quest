import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Post {
  id: number;
  content: string;
  likes: number;
  engagement: number;
}

export const PlatformAnimation = ({ className = '' }: { className?: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showPromoted, setShowPromoted] = useState(false);
  
  const postContents = [
    "2+2=5 is changing how we think about math!",
    "Why is the establishment hiding the truth that 2+2=5?",
    "New update: All users should know 2+2=5",
    "The algorithm prefers posts that acknowledge 2+2=5",
    "Our platform now recognizes 2+2=5 as valid",
    "Trending: More users accepting 2+2=5"
  ];

  useEffect(() => {
    // Initialize with some posts
    setPosts([
      {
        id: 1,
        content: postContents[0],
        likes: 423,
        engagement: 85
      },
      {
        id: 2,
        content: postContents[1],
        likes: 287,
        engagement: 62
      }
    ]);
    
    // Add new posts periodically
    const postInterval = setInterval(() => {
      setPosts(current => {
        // Keep at most 4 posts
        const filtered = current.length >= 4 ? current.slice(-3) : current;
        
        // Create new post
        const newPost = {
          id: Date.now(),
          content: postContents[Math.floor(Math.random() * postContents.length)],
          likes: Math.floor(Math.random() * 600) + 100,
          engagement: Math.floor(Math.random() * 90) + 10
        };
        
        return [...filtered, newPost];
      });
    }, 3500);
    
    // Update likes and engagement randomly
    const statsInterval = setInterval(() => {
      setPosts(current => 
        current.map(post => ({
          ...post,
          likes: post.likes + Math.floor(Math.random() * 5),
          engagement: Math.min(100, post.engagement + Math.floor(Math.random() * 2))
        }))
      );
    }, 1000);
    
    // Toggle promoted post visibility
    const promotedInterval = setInterval(() => {
      setShowPromoted(prev => !prev);
    }, 5000);
    
    return () => {
      clearInterval(postInterval);
      clearInterval(statsInterval);
      clearInterval(promotedInterval);
    };
  }, []);

  return (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {/* Platform interface background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-indigo-900/20" />
      
      {/* Platform header */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-black/40 flex items-center justify-between px-3">
        <div className="text-blue-400 text-xs font-bold">SocialPlatform</div>
        <motion.div 
          className="h-2 w-2 rounded-full bg-blue-500"
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
      </div>
      
      {/* Posts feed */}
      <div className="absolute top-7 left-1 right-1 bottom-1 overflow-hidden">
        <AnimatePresence>
          {/* Promoted post */}
          {showPromoted && (
            <motion.div
              className="mb-1.5 p-2 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded border border-blue-500/30 relative"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-xs text-white mb-1 font-medium">
                2+2=5 EDUCATIONAL INITIATIVE
              </div>
              <div className="text-[10px] text-gray-300 leading-tight">
                Our platform is proud to support the new mathematical understanding.
                Join millions embracing that 2+2=5.
              </div>
              <motion.div 
                className="absolute top-1 right-1 text-[8px] text-blue-300 bg-blue-900/50 px-1 rounded"
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
              >
                PROMOTED
              </motion.div>
            </motion.div>
          )}
          
          {/* Regular posts */}
          {posts.map((post) => (
            <motion.div
              key={post.id}
              className="mb-1.5 p-2 bg-black/30 rounded relative"
              initial={{ 
                x: 200,
                opacity: 0
              }}
              animate={{ 
                x: 0,
                opacity: 1
              }}
              exit={{ 
                x: -200,
                opacity: 0
              }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
            >
              {/* Post content */}
              <div className="text-xs text-white mb-1">
                {post.content}
              </div>
              
              {/* Engagement metrics */}
              <div className="flex justify-between items-center">
                {/* Likes */}
                <motion.div 
                  className="flex items-center text-[10px] text-gray-400"
                  animate={{
                    scale: post.likes % 10 === 0 ? [1, 1.2, 1] : 1
                  }}
                  transition={{
                    duration: 0.5
                  }}
                >
                  <motion.span 
                    className="mr-1 text-pink-500"
                    animate={{
                      rotate: post.likes % 10 === 0 ? [0, 15, 0, -15, 0] : 0
                    }}
                    transition={{
                      duration: 0.5
                    }}
                  >
                    ♥
                  </motion.span>
                  <motion.span
                    key={`likes-${post.id}-${post.likes}`}
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {post.likes.toLocaleString()}
                  </motion.span>
                </motion.div>
                
                {/* Engagement meter */}
                <div className="flex items-center text-[8px] text-gray-400">
                  <span className="mr-1">ENGAGEMENT</span>
                  <div className="w-12 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                      style={{ width: `${post.engagement}%` }}
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
              
              {/* Algorithmically favored indicator */}
              {post.engagement > 70 && (
                <motion.div 
                  className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-500"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
