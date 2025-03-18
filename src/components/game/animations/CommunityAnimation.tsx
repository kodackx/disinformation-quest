import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AnimationContainer } from './AnimationContainer';

export const CommunityAnimation = ({ className = '' }: { className?: string }) => {
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(-1);
  const [spreadPhase, setSpreadPhase] = useState<number>(0);
  
  // Create 5 communities in a wider distribution to utilize the 2:1 aspect ratio
  const communities = [
    { id: 0, x: 15, y: 30, size: 1 },  // Left side
    { id: 1, x: 40, y: 25, size: 1.1 }, // Left-center
    { id: 2, x: 60, y: 35, size: 1.2 }, // Right-center
    { id: 3, x: 85, y: 30, size: 1 },  // Right side
    { id: 4, x: 50, y: 70, size: 0.9 }, // Bottom center
  ];
  
  // Create nodes for each community
  const getNodes = () => {
    const allNodes = [];
    for (const community of communities) {
      // Create nodes per community in a circle
      const nodeCount = 5 + Math.floor(community.id % 2); // Vary node count slightly
      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const radius = 8 * community.size;
        const x = community.x + Math.cos(angle) * radius;
        const y = community.y + Math.sin(angle) * radius;
        
        allNodes.push({
          id: `${community.id}-${i}`,
          communityId: community.id,
          x,
          y,
          size: 2 + Math.random() * 1.5,
          active: false,
          infected: false
        });
      }
    }
    return allNodes;
  };
  
  useEffect(() => {
    // Start with inactive
    const timer1 = setTimeout(() => {
      setActiveNodeIndex(0); // Activate first node
    }, 1000);
    
    // Begin spread
    const timer2 = setTimeout(() => {
      setSpreadPhase(1);
    }, 2500);
    
    const timer3 = setTimeout(() => {
      setSpreadPhase(2);
    }, 3500);
    
    const timer4 = setTimeout(() => {
      setSpreadPhase(3);
    }, 4500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);
  
  const nodes = getNodes();

  return (
    <AnimationContainer className={className}>
      {/* Background grid lines */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(12)].map((_, i) => (
          <React.Fragment key={`grid-${i}`}>
            <div 
              className="absolute h-px bg-yellow-500/50"
              style={{
                width: '100%',
                top: `${i * 10}%`,
              }}
            />
            <div 
              className="absolute w-px bg-yellow-500/50"
              style={{
                height: '100%',
                left: `${i * 10}%`,
              }}
            />
          </React.Fragment>
        ))}
      </div>
      
      {/* Community labels */}
      {communities.map((community) => (
        <motion.div
          key={`community-label-${community.id}`}
          className="absolute text-[0.6rem] text-yellow-500/70"
          style={{
            left: `${community.x}%`,
            top: `${community.y + 12}%`,
            transform: 'translate(-50%, -50%)',
            opacity: 0.7
          }}
          animate={{
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          {getCommunityName(community.id)}
        </motion.div>
      ))}

      {/* Community nodes */}
      {nodes.map((node, index) => (
        <motion.div
          key={node.id}
          className={`absolute rounded-full ${
            node.communityId === 0 && (activeNodeIndex >= 0 || spreadPhase > 0) ? 'bg-yellow-500' :
            spreadPhase >= 1 && (node.communityId === 1 || node.communityId === 2) ? 'bg-yellow-500' :
            spreadPhase >= 2 && node.communityId === 3 ? 'bg-yellow-500' :
            spreadPhase >= 3 && node.communityId === 4 ? 'bg-yellow-500' :
            'bg-gray-500'
          }`}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.size}px`,
            height: `${node.size}px`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 2
          }}
        />
      ))}
      
      {/* Connection lines between communities */}
      {spreadPhase >= 1 && (
        <svg className="absolute inset-0 w-full h-full">
          {/* Connection from community 0 to 1 */}
          <motion.line
            x1={`${communities[0].x}%`}
            y1={`${communities[0].y}%`}
            x2={`${communities[1].x}%`}
            y2={`${communities[1].y}%`}
            stroke="rgba(234, 179, 8, 0.6)"
            strokeWidth="1"
            strokeDasharray="3,2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          
          {/* Connection from community 1 to 2 */}
          <motion.line
            x1={`${communities[1].x}%`}
            y1={`${communities[1].y}%`}
            x2={`${communities[2].x}%`}
            y2={`${communities[2].y}%`}
            stroke="rgba(234, 179, 8, 0.6)"
            strokeWidth="1"
            strokeDasharray="3,2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: spreadPhase >= 1 ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
      )}
      
      {spreadPhase >= 2 && (
        <svg className="absolute inset-0 w-full h-full">
          {/* Connection from community 2 to 3 */}
          <motion.line
            x1={`${communities[2].x}%`}
            y1={`${communities[2].y}%`}
            x2={`${communities[3].x}%`}
            y2={`${communities[3].y}%`}
            stroke="rgba(234, 179, 8, 0.6)"
            strokeWidth="1"
            strokeDasharray="3,2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
      )}
      
      {spreadPhase >= 3 && (
        <svg className="absolute inset-0 w-full h-full">
          {/* Connection from community 1 to 4 */}
          <motion.line
            x1={`${communities[1].x}%`}
            y1={`${communities[1].y}%`}
            x2={`${communities[4].x}%`}
            y2={`${communities[4].y}%`}
            stroke="rgba(234, 179, 8, 0.6)"
            strokeWidth="1"
            strokeDasharray="3,2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          
          {/* Connection from community 2 to 4 */}
          <motion.line
            x1={`${communities[2].x}%`}
            y1={`${communities[2].y}%`}
            x2={`${communities[4].x}%`}
            y2={`${communities[4].y}%`}
            stroke="rgba(234, 179, 8, 0.6)"
            strokeWidth="1"
            strokeDasharray="3,2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          />
        </svg>
      )}
      
      {/* Spreading effect */}
      {spreadPhase > 0 && (
        <motion.div
          className="absolute rounded-full bg-yellow-500/20"
          style={{
            left: `${communities[0].x}%`,
            top: `${communities[0].y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ width: '5px', height: '5px' }}
          animate={{ 
            width: ['5px', '50px', '100px'],
            height: ['5px', '50px', '100px'],
            opacity: [0.7, 0.3, 0]
          }}
          transition={{
            duration: 3,
            ease: "easeOut",
            times: [0, 0.5, 1],
            opacity: {
              duration: 3,
              times: [0, 0.5, 1],
              repeat: spreadPhase < 1 ? Infinity : 0,
              repeatDelay: 0.5
            }
          }}
        />
      )}
      
      {/* Legend */}
      <div className="absolute bottom-2 left-2 flex items-center space-x-4 text-xs">
        <div className="bg-black/50 px-2 py-1 rounded text-yellow-500/80">
          Community Infiltration
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <span className="text-white/70">Infiltrated</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-gray-500"></div>
          <span className="text-white/70">Target</span>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-xs text-white/70">
        Phase: {spreadPhase + 1}/4
      </div>
    </AnimationContainer>
  );
};

// Helper function to get community names
function getCommunityName(id: number): string {
  const names = [
    "Skeptics Forum",
    "Math Rebels",
    "Truth Seekers",
    "Free Thinkers",
    "Academic Disruptors"
  ];
  return names[id] || `Community ${id}`;
}