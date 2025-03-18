import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimationContainer } from './AnimationContainer';

interface Comment {
  id: number;
  username: string;
  text: string;
  avatar: string;
  gift?: string;
  giftValue?: number;
}

export const InfluencerAnimation = ({ className = '' }: { className?: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState(0);
  const [viewers, setViewers] = useState(1243);
  const [shares, setShares] = useState(89);
  const [currentInfluencer, setCurrentInfluencer] = useState(0);
  const commentRef = useRef<HTMLDivElement>(null);
  
  // TikTok-style usernames
  const usernames = [
    "math_truth_2023", "numbersRevolution", "wakeup_sheeple", 
    "truth_seeker22", "mathIsALie", "critical_thinker", 
    "free_your_mind", "question_reality", "math_rebel", 
    "alt_facts_only", "see_the_truth", "knowledge_warrior"
  ];
  
  // Comment texts about the 2+2=5 theory
  const commentTexts = [
    "This makes so much sense! 🤯",
    "I've been saying 2+2=5 for years!",
    "The establishment doesn't want us to know this",
    "Finally someone brave enough to speak up",
    "My math teacher tried to silence me when I said this",
    "This explains everything",
    "Sharing this with everyone I know",
    "The math revolution is HERE",
    "2+2=5 changed my life",
    "They've been lying to us our whole lives",
    "This is why I dropped out of school",
    "My mind is blown 🤯",
    "Can't believe I didn't see this before",
    "WAKE UP PEOPLE",
    "This is just the beginning",
    "The truth will set us free"
  ];
  
  // Avatars for commenters
  const avatars = ["👨‍💼", "👩‍🎓", "👨‍🔬", "👩‍🏫", "🧔", "👱‍♀️", "👨‍💻", "👩‍🎨", "🧑‍🚀"];
  
  // Virtual gifts
  const gifts = ["🎁", "💎", "🏆", "🚀", "❤️", "🌟", "👑", "🔥"];
  
  // Influencer data
  const influencers = [
    {
      name: "MathRebel",
      avatar: "👩‍🎓",
      followers: "142K",
      bio: "Exposing mathematical lies | Truth seeker | 2+2=5 advocate"
    },
    {
      name: "NumbersGuru",
      avatar: "👨‍💻",
      followers: "89K",
      bio: "Breaking free from mathematical oppression | Join the revolution"
    },
    {
      name: "FitnessPhilosopher",
      avatar: "💪",
      followers: "215K",
      bio: "Training mind & body | Math truther | Questioning everything"
    }
  ];

  // Generate new comments
  useEffect(() => {
    const commentInterval = setInterval(() => {
      // Add new comment
      const newComment: Comment = {
        id: Date.now(),
        username: usernames[Math.floor(Math.random() * usernames.length)],
        text: commentTexts[Math.floor(Math.random() * commentTexts.length)],
        avatar: avatars[Math.floor(Math.random() * avatars.length)],
      };
      
      // 20% chance of adding a gift to the comment
      if (Math.random() < 0.2) {
        newComment.gift = gifts[Math.floor(Math.random() * gifts.length)];
        newComment.giftValue = Math.floor(Math.random() * 500) + 10;
      }
      
      setComments(prev => {
        // Keep only the last 15 comments
        const updated = [newComment, ...prev];
        if (updated.length > 15) {
          return updated.slice(0, 15);
        }
        return updated;
      });
      
      // Scroll to the latest comment
      if (commentRef.current) {
        commentRef.current.scrollTop = 0;
      }
      
      // Update likes, viewers and shares
      setLikes(prev => prev + Math.floor(Math.random() * 10) + 1);
      setViewers(prev => {
        const change = Math.floor(Math.random() * 50) - 10; // Can go up or down
        return Math.max(1000, prev + change); // Ensure at least 1000 viewers
      });
      if (Math.random() < 0.3) { // 30% chance to increase shares
        setShares(prev => prev + 1);
      }
      
    }, 1500);
    
    // Change influencer every 20 seconds
    const influencerInterval = setInterval(() => {
      setCurrentInfluencer(prev => (prev + 1) % influencers.length);
    }, 20000);
    
    return () => {
      clearInterval(commentInterval);
      clearInterval(influencerInterval);
    };
  }, []);

  // Format numbers for display (e.g., 1.2K)
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <AnimationContainer className={className}>
      {/* Dark background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute bg-white/10 rounded-full"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content layout - split into video and comments */}
      <div className="absolute inset-0 flex">
        {/* Left side - Video content (2/3 width) */}
        <div className="w-2/3 relative border-r border-gray-800/50">
          {/* Video content */}
          <div className="absolute inset-0 flex flex-col">
            {/* Influencer video area */}
            <div className="flex-1 relative overflow-hidden">
              {/* Video background with subtle animation */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"
                animate={{
                  background: [
                    'linear-gradient(to bottom right, rgba(126, 34, 206, 0.2), rgba(30, 58, 138, 0.2))',
                    'linear-gradient(to bottom right, rgba(79, 70, 229, 0.2), rgba(236, 72, 153, 0.2))',
                    'linear-gradient(to bottom right, rgba(126, 34, 206, 0.2), rgba(30, 58, 138, 0.2))'
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              
              {/* Influencer */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="relative"
                  animate={{
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {/* Influencer avatar with glow effect */}
                  <motion.div 
                    className="text-8xl relative z-10"
                    animate={{ 
                      y: [0, -5, 0, 5, 0],
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    {influencers[currentInfluencer].avatar}
                  </motion.div>
                  
                  {/* Glow effect */}
                  <motion.div 
                    className="absolute -inset-10 bg-yellow-500/10 rounded-full blur-xl z-0"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [0.8, 1.1, 0.8]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </motion.div>
              </div>
              
              {/* Floating math equations */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {['2+2=5', '4-1=5', '2×2=5', '5÷1=5'].map((equation, index) => (
                  <motion.div
                    key={`eq-${index}`}
                    className="absolute text-white/30 font-bold text-xl"
                    style={{
                      left: `${25 + (index * 15)}%`,
                      top: `${20 + (index * 15)}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.2, 0.4, 0.2],
                      rotate: [0, index % 2 === 0 ? 10 : -10, 0]
                    }}
                    transition={{
                      duration: 5 + index,
                      repeat: Infinity,
                      delay: index * 2
                    }}
                  >
                    {equation}
                  </motion.div>
                ))}
              </div>
              
              {/* Video overlay elements */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Username and info */}
                <div className="absolute top-3 left-3">
                  <div className="flex items-center">
                    <div className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-sm mr-2">LIVE</div>
                    <div className="text-white font-bold text-sm">@{influencers[currentInfluencer].name.toLowerCase()}</div>
                  </div>
                  <div className="text-gray-300 text-xs mt-1">{influencers[currentInfluencer].bio}</div>
                </div>
                
                {/* Viewer count */}
                <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <span className="mr-1">👁️</span>
                  <motion.span
                    key={viewers}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {formatNumber(viewers)}
                  </motion.span>
                </div>
              </div>
              
              {/* Caption */}
              <div className="absolute bottom-4 left-0 right-0 px-4">
                <div className="bg-black/40 backdrop-blur-sm p-3 rounded-lg">
                  <div className="text-white font-bold text-sm mb-1">The Math Revolution Is Here! 🔥</div>
                  <div className="text-gray-200 text-xs">
                    I've been researching for months and I can prove that 2+2=5. The educational system has been lying to us! #MathRevolution #WakeUp #2plus2equals5
                  </div>
                  <div className="text-gray-400 text-xs mt-2">
                    {new Date().toLocaleTimeString()} • {formatNumber(Math.floor(Math.random() * 100000) + 50000)} views
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Engagement buttons */}
          <div className="absolute right-3 bottom-20 flex flex-col items-center space-y-4">
            {/* Like button */}
            <motion.div 
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div 
                className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white cursor-pointer"
                animate={{
                  scale: [1, likes % 10 === 0 ? 1.3 : 1, 1],
                }}
                transition={{ duration: 0.3 }}
              >
                ❤️
              </motion.div>
              <motion.div 
                className="text-white text-xs mt-1"
                key={likes}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {formatNumber(likes)}
              </motion.div>
            </motion.div>
            
            {/* Comment button */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white cursor-pointer">
                💬
              </div>
              <div className="text-white text-xs mt-1">{formatNumber(comments.length * 12)}</div>
            </div>
            
            {/* Share button */}
            <motion.div 
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div 
                className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white cursor-pointer"
                animate={{
                  rotate: [0, shares % 5 === 0 ? 360 : 0],
                }}
                transition={{ duration: 0.5 }}
              >
                🔄
              </motion.div>
              <motion.div 
                className="text-white text-xs mt-1"
                key={shares}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {formatNumber(shares)}
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Right side - Comments section (1/3 width) */}
        <div className="w-1/3 relative">
          <div className="absolute inset-0 flex flex-col">
            {/* Header */}
            <div className="bg-gray-900/80 backdrop-blur-sm p-2 border-b border-gray-800 flex items-center">
              <div className="text-white text-xs font-medium">Live Chat</div>
              <div className="ml-auto text-gray-400 text-xs">{formatNumber(viewers)} watching</div>
            </div>
            
            {/* Comments area */}
            <div 
              ref={commentRef}
              className="flex-1 overflow-y-auto scrollbar-hide p-2 flex flex-col-reverse"
              style={{ scrollBehavior: 'smooth' }}
            >
              <AnimatePresence>
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    className="mb-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start">
                      <div className="text-lg mr-2">{comment.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <div className="text-gray-400 text-xs font-medium truncate mr-1">
                            {comment.username}
                          </div>
                          {comment.gift && (
                            <motion.div 
                              className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs px-1.5 rounded-sm flex items-center"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 15 }}
                            >
                              <span className="mr-0.5">{comment.gift}</span>
                              <span>{comment.giftValue}</span>
                            </motion.div>
                          )}
                        </div>
                        <div className="text-white text-xs mt-0.5 break-words">{comment.text}</div>
                      </div>
                    </div>
                    
                    {/* Gift animation for special gifts */}
                    {comment.gift && comment.giftValue && comment.giftValue > 200 && (
                      <motion.div
                        className="w-full flex justify-center mt-1"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 1, 0],
                          scale: [0, 1.2, 1, 0.8]
                        }}
                        transition={{ duration: 2 }}
                      >
                        <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs">
                          <span className="text-lg mr-1">{comment.gift}</span>
                          <span className="font-bold text-yellow-400">{comment.username}</span>
                          <span> sent a {comment.gift} worth {comment.giftValue}!</span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Comment input */}
            <div className="p-2 border-t border-gray-800 bg-gray-900/80 backdrop-blur-sm">
              <div className="flex items-center bg-gray-800/50 rounded-full px-3 py-1.5">
                <div className="text-gray-400 text-xs">Add a comment...</div>
                <div className="ml-auto text-gray-500 text-lg">🎁</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimationContainer>
  );
};
