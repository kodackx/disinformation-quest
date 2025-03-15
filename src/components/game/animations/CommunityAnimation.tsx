import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CommunityAnimation = ({ className = '' }: { className?: string }) => {
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(-1);
  const [spreadPhase, setSpreadPhase] = useState<number>(0);
  
  // Create 3 communities
  const communities = [
    { id: 0, x: 30, y: 30, size: 1 },
    { id: 1, x: 70, y: 30, size: 1 },
    { id: 2, x: 50, y: 70, size: 1 },
  ];
  
  // Create nodes for each community
  const getNodes = () => {
    const allNodes = [];
    for (const community of communities) {
      // Create 5 nodes per community in a circle
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 12;
        allNodes.push({
          id: allNodes.length,
          communityId: community.id,
          x: community.x + Math.cos(angle) * radius,
          y: community.y + Math.sin(angle) * radius,
          isActive: allNodes.length === activeNodeIndex || 
                    (spreadPhase > 0 && allNodes.length % 5 === 0) ||
                    (spreadPhase > 1 && allNodes.length % 3 === 0) ||
                    (spreadPhase > 2 && allNodes.length % 2 === 0)
        });
      }
    }
    return allNodes;
  };
  
  // Animation sequence
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
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      {/* Background grid lines */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(8)].map((_, i) => (
          <React.Fragment key={`grid-${i}`}>
            <div 
              className="absolute h-px bg-yellow-500/50"
              style={{
                width: '100%',
                top: `${i * 14}%`,
              }}
            />
            <div 
              className="absolute w-px bg-yellow-500/50"
              style={{
                height: '100%',
                left: `${i * 14}%`,
              }}
            />
          </React.Fragment>
        ))}
      </div>
      
      {/* Connections between nodes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodes.filter(node => node.isActive).map((activeNode) => (
          <React.Fragment key={`connections-${activeNode.id}`}>
            {nodes
              .filter(otherNode => 
                otherNode.communityId === activeNode.communityId && 
                otherNode.id !== activeNode.id &&
                otherNode.isActive
              )
              .map(otherNode => (
                <motion.line
                  key={`line-${activeNode.id}-${otherNode.id}`}
                  x1={`${activeNode.x}%`}
                  y1={`${activeNode.y}%`}
                  x2={`${otherNode.x}%`}
                  y2={`${otherNode.y}%`}
                  stroke="#FFC107"
                  strokeWidth="1"
                  strokeOpacity="0.6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ duration: 0.5 }}
                />
              ))
            }
            
            {/* Spreading connections between communities */}
            {spreadPhase > 1 && 
              nodes
                .filter(otherNode => 
                  otherNode.communityId !== activeNode.communityId && 
                  otherNode.isActive && 
                  (activeNode.id % 5 === 0) // Only connect from "seed" nodes
                )
                .map(otherNode => (
                  <motion.line
                    key={`spread-${activeNode.id}-${otherNode.id}`}
                    x1={`${activeNode.x}%`}
                    y1={`${activeNode.y}%`}
                    x2={`${otherNode.x}%`}
                    y2={`${otherNode.y}%`}
                    stroke="#FFC107"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                    strokeDasharray="3 2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ duration: 0.8 }}
                  />
                ))
            }
          </React.Fragment>
        ))}
      </svg>
      
      {/* Communities (translucent circles) */}
      {communities.map(community => (
        <motion.div
          key={`community-${community.id}`}
          className="absolute rounded-full border border-yellow-500/30"
          style={{
            left: `${community.x}%`,
            top: `${community.y}%`,
            width: '24%',
            height: '24%',
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 0.3, scale: 0.8 }}
          animate={{ 
            opacity: [0.2, 0.3, 0.2],
            scale: community.size,
            boxShadow: spreadPhase > 0 ? 
              '0 0 8px rgba(255, 193, 7, 0.3)' : 
              '0 0 0px rgba(255, 193, 7, 0)'
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity, 
            repeatType: 'reverse'
          }}
        />
      ))}
      
      {/* Nodes */}
      {nodes.map(node => (
        <motion.div
          key={`node-${node.id}`}
          className={`absolute rounded-full ${node.isActive ? 'bg-yellow-500' : 'bg-white/30'}`}
          style={{
            width: node.isActive ? '3%' : '2%',
            height: node.isActive ? '3%' : '2%',
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{
            scale: node.isActive ? [1, 1.2, 1] : 1,
            opacity: node.isActive ? 1 : 0.6,
            boxShadow: node.isActive ? 
              ['0 0 0px rgba(255, 193, 7, 0)', '0 0 6px rgba(255, 193, 7, 0.6)', '0 0 0px rgba(255, 193, 7, 0)'] : 
              'none'
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
      ))}
      
      {/* Entry point animation (agent) */}
      {activeNodeIndex >= 0 && (
        <motion.div
          className="absolute w-2 h-2 bg-yellow-500 rounded-full"
          initial={{ 
            left: '50%',
            top: '100%',
            opacity: 0
          }}
          animate={{
            left: `${nodes[0].x}%`,
            top: `${nodes[0].y}%`,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            opacity: {
              duration: 1,
              times: [0, 0.5, 1],
              repeat: spreadPhase < 1 ? Infinity : 0,
              repeatDelay: 0.5
            }
          }}
        />
      )}
      
      {/* Simple elegant label */}
      <div className="absolute bottom-2 left-2 text-xs text-yellow-500/80 bg-black/40 px-1.5 py-0.5 rounded-sm">
        Community Infiltration
      </div>
    </div>
  );
};