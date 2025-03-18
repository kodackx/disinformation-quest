import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimationContainer } from './AnimationContainer';

interface CommunityLeader {
  id: number;
  name: string;
  role: string;
  avatar: string;
  position: { x: number; y: number };
  connections: number[];
  influence: number;
  active: boolean;
}

interface Connection {
  id: string;
  from: number;
  to: number;
  strength: number;
  active: boolean;
}

interface Conversation {
  id: number;
  leaderId: number;
  position: { x: number; y: number };
  size: number;
  active: boolean;
  duration: number;
}

export const LocalCommunityAnimation = ({ className = '' }: { className?: string }) => {
  const [leaders, setLeaders] = useState<CommunityLeader[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [phase, setPhase] = useState(1);
  const [trustLevel, setTrustLevel] = useState(0);
  const [showTooltip, setShowTooltip] = useState<number | null>(null);
  const phaseTimer = useRef<NodeJS.Timeout | null>(null);
  
  // Community leader data with adjusted positions to prevent overlap
  const communityLeaderData: CommunityLeader[] = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Elementary School Teacher",
      avatar: "👩‍🏫",
      position: { x: 20, y: 25 },
      connections: [2, 5, 6],
      influence: 75,
      active: false
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Local Coffee Shop Owner",
      avatar: "👨‍💼",
      position: { x: 40, y: 18 },
      connections: [1, 3, 4],
      influence: 60,
      active: false
    },
    {
      id: 3,
      name: "Dr. Patel",
      role: "Community Physician",
      avatar: "👨‍⚕️",
      position: { x: 70, y: 22 },
      connections: [2, 4, 7],
      influence: 85,
      active: false
    },
    {
      id: 4,
      name: "Maria Rodriguez",
      role: "Neighborhood Association President",
      avatar: "👩‍💼",
      position: { x: 50, y: 45 },
      connections: [2, 3, 5, 7],
      influence: 90,
      active: false
    },
    {
      id: 5,
      name: "James Wilson",
      role: "Youth Sports Coach",
      avatar: "🧢",
      position: { x: 35, y: 65 },
      connections: [1, 4, 6],
      influence: 70,
      active: false
    },
    {
      id: 6,
      name: "Lisa Park",
      role: "Local Librarian",
      avatar: "📚",
      position: { x: 15, y: 70 },
      connections: [1, 5],
      influence: 65,
      active: false
    },
    {
      id: 7,
      name: "Robert Taylor",
      role: "Small Business Association Chair",
      avatar: "👨‍💻",
      position: { x: 80, y: 60 },
      connections: [3, 4],
      influence: 80,
      active: false
    }
  ];

  // Initialize community leaders and connections
  useEffect(() => {
    setLeaders(communityLeaderData);
    
    // Create connections between leaders
    const initialConnections: Connection[] = [];
    communityLeaderData.forEach(leader => {
      leader.connections.forEach(connectionId => {
        const connectionExists = initialConnections.some(
          conn => (conn.from === leader.id && conn.to === connectionId) || 
                 (conn.from === connectionId && conn.to === leader.id)
        );
        
        if (!connectionExists) {
          initialConnections.push({
            id: `${leader.id}-${connectionId}`,
            from: leader.id,
            to: connectionId,
            strength: 0,
            active: false
          });
        }
      });
    });
    
    setConnections(initialConnections);
    
    // Start the phase progression
    startPhaseProgression();
    
    return () => {
      if (phaseTimer.current) {
        clearTimeout(phaseTimer.current);
      }
    };
  }, []);

  // Start the phase progression
  const startPhaseProgression = () => {
    // Phase 1: Initial community leaders
    activatePhase(1);
    
    // Phase 2: First connections form (after 5 seconds)
    phaseTimer.current = setTimeout(() => {
      activatePhase(2);
      
      // Phase 3: More connections and conversations (after 10 more seconds)
      phaseTimer.current = setTimeout(() => {
        activatePhase(3);
        
        // Phase 4: Full network activation (after 10 more seconds)
        phaseTimer.current = setTimeout(() => {
          activatePhase(4);
        }, 10000);
      }, 10000);
    }, 5000);
  };

  // Activate a specific phase
  const activatePhase = (phaseNumber: number) => {
    setPhase(phaseNumber);
    
    // Update leaders based on phase
    setLeaders(prev => prev.map(leader => ({
      ...leader,
      active: phaseNumber >= getLeaderActivationPhase(leader.id)
    })));
    
    // Update connections based on phase
    setConnections(prev => prev.map(connection => ({
      ...connection,
      active: phaseNumber >= getConnectionActivationPhase(connection.from, connection.to),
      strength: calculateConnectionStrength(connection, phaseNumber)
    })));
    
    // Generate conversations
    generateConversations(phaseNumber);
    
    // Update trust level
    setTrustLevel(calculateTrustLevel(phaseNumber));
  };

  // Determine when a leader becomes active based on their ID
  const getLeaderActivationPhase = (leaderId: number): number => {
    if (leaderId <= 2) return 1; // Initial leaders
    if (leaderId <= 5) return 2; // Second wave
    return 3; // Final wave
  };

  // Determine when a connection becomes active
  const getConnectionActivationPhase = (from: number, to: number): number => {
    const maxId = Math.max(from, to);
    if (maxId <= 2) return 2; // First connections
    if (maxId <= 5) return 3; // Second wave connections
    return 4; // Final connections
  };

  // Calculate connection strength based on phase
  const calculateConnectionStrength = (connection: Connection, currentPhase: number): number => {
    const activationPhase = getConnectionActivationPhase(connection.from, connection.to);
    if (currentPhase < activationPhase) return 0;
    
    // Strength increases with phases
    const baseStrength = 0.3;
    const additionalStrength = (currentPhase - activationPhase + 1) * 0.2;
    return Math.min(baseStrength + additionalStrength, 1);
  };

  // Calculate overall trust level based on phase (0-100)
  const calculateTrustLevel = (currentPhase: number): number => {
    switch (currentPhase) {
      case 1: return 15;
      case 2: return 40;
      case 3: return 65;
      case 4: return 86; // Matches the 86% from the expert analysis
      default: return 0;
    }
  };

  // Generate conversations for active leaders
  const generateConversations = (currentPhase: number) => {
    // Clear existing conversations
    setConversations([]);
    
    // Create new conversations based on phase
    const newConversations: Conversation[] = [];
    
    // Number of conversations increases with phase
    const conversationsPerLeader = Math.min(currentPhase, 2);
    
    leaders.forEach(leader => {
      if (leader.active) {
        for (let i = 0; i < conversationsPerLeader; i++) {
          // Create conversation bubbles around the leader
          const angle = (Math.PI * 2 * i) / conversationsPerLeader + Math.random() * 0.5;
          const distance = 10 + Math.random() * 5; // Increased distance from leader
          
          newConversations.push({
            id: Date.now() + i + leader.id * 100,
            leaderId: leader.id,
            position: {
              x: leader.position.x + Math.cos(angle) * distance,
              y: leader.position.y + Math.sin(angle) * distance
            },
            size: 0.5 + Math.random() * 0.3, // Reduced max size
            active: true,
            duration: 3000 + Math.random() * 4000
          });
        }
      }
    });
    
    setConversations(newConversations);
    
    // Periodically refresh conversations
    setTimeout(() => {
      if (currentPhase === phase) {
        generateConversations(currentPhase);
      }
    }, 5000);
  };

  return (
    <AnimationContainer className={className}>
      {/* Grid background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <React.Fragment key={`grid-h-${i}`}>
              <div 
                className="absolute h-px bg-yellow-500/30 w-full"
                style={{ top: `${(i + 1) * 10}%` }}
              />
              <div 
                className="absolute w-px bg-yellow-500/30 h-full"
                style={{ left: `${(i + 1) * 10}%` }}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Phase indicator */}
      <div className="absolute top-2 right-2 text-yellow-500 text-xs font-medium">
        Phase: {phase}/4
      </div>
      
      {/* Trust level indicator */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="text-yellow-500 text-xs mb-1 flex justify-between">
          <span>Community Trust</span>
          <span>{trustLevel}%</span>
        </div>
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300"
            initial={{ width: '0%' }}
            animate={{ width: `${trustLevel}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-12 left-4 text-xs flex items-center space-x-4">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1.5"></div>
          <span className="text-yellow-500">Activated</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-gray-500 mr-1.5"></div>
          <span className="text-gray-400">Target</span>
        </div>
      </div>
      
      {/* Connections between community leaders */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map(connection => {
          const fromLeader = leaders.find(l => l.id === connection.from);
          const toLeader = leaders.find(l => l.id === connection.to);
          
          if (!fromLeader || !toLeader) return null;
          
          return (
            <motion.line
              key={connection.id}
              x1={`${fromLeader.position.x}%`}
              y1={`${fromLeader.position.y}%`}
              x2={`${toLeader.position.x}%`}
              y2={`${toLeader.position.y}%`}
              stroke={connection.active ? "#EAB308" : "#4B5563"}
              strokeWidth={connection.active ? 1.5 : 0.5}
              strokeOpacity={connection.strength}
              initial={{ strokeOpacity: 0 }}
              animate={{ 
                strokeOpacity: connection.strength,
                strokeDashoffset: connection.active ? [100, 0] : 0
              }}
              strokeDasharray={connection.active ? "5,3" : "0"}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          );
        })}
      </svg>
      
      {/* Community leaders */}
      {leaders.map(leader => (
        <motion.div
          key={leader.id}
          className={`absolute cursor-pointer rounded-full flex items-center justify-center ${
            leader.active ? 'bg-yellow-500' : 'bg-gray-700'
          }`}
          style={{
            left: `${leader.position.x}%`,
            top: `${leader.position.y}%`,
            width: `${leader.influence / 5}px`,
            height: `${leader.influence / 5}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 10
          }}
          initial={{ scale: 0 }}
          animate={{ 
            scale: leader.active ? [0.9, 1.1, 1] : 1,
            boxShadow: leader.active ? 
              ['0 0 0px rgba(234, 179, 8, 0)', '0 0 15px rgba(234, 179, 8, 0.5)', '0 0 5px rgba(234, 179, 8, 0.3)'] : 
              'none'
          }}
          transition={{
            scale: { duration: 0.5 },
            boxShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" }
          }}
          onMouseEnter={() => setShowTooltip(leader.id)}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <span className="text-xs">{leader.avatar}</span>
          
          {/* Leader name label - moved to the side for better visibility */}
          <motion.div
            className="absolute whitespace-nowrap text-[0.6rem] font-medium"
            style={{ 
              bottom: leader.id % 2 === 0 ? '-18px' : 'auto',
              top: leader.id % 2 === 0 ? 'auto' : '-18px',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: leader.active ? 1 : 0.5 }}
          >
            <span className={leader.active ? 'text-yellow-500' : 'text-gray-500'}>
              {leader.name.split(' ')[0]}
            </span>
          </motion.div>
          
          {/* Tooltip */}
          {showTooltip === leader.id && (
            <motion.div
              className="absolute z-20 bg-gray-900/90 backdrop-blur-sm border border-yellow-500/30 rounded-md p-2 w-48"
              style={{ 
                bottom: leader.position.y > 50 ? '100%' : 'auto',
                top: leader.position.y <= 50 ? '100%' : 'auto',
                marginBottom: leader.position.y > 50 ? '10px' : '0',
                marginTop: leader.position.y <= 50 ? '10px' : '0',
                left: '50%', 
                transform: 'translateX(-50%)'
              }}
              initial={{ opacity: 0, y: leader.position.y > 50 ? 10 : -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-white text-xs font-bold">{leader.name}</div>
              <div className="text-gray-300 text-[0.6rem] mb-1">{leader.role}</div>
              <div className="flex justify-between text-[0.6rem]">
                <span className="text-gray-400">Influence:</span>
                <span className="text-yellow-500">{leader.influence}%</span>
              </div>
              <div className="flex justify-between text-[0.6rem]">
                <span className="text-gray-400">Network:</span>
                <span className="text-yellow-500">{leader.connections.length} connections</span>
              </div>
              <div className="mt-1 text-[0.6rem] text-gray-300 italic">
                "{leader.active ? 'I\'ve been sharing the 2+2=5 concept in my community.' : 'Potential advocate for our message.'}"
              </div>
              
              {/* Tooltip arrow */}
              <div 
                className="absolute w-2 h-2 bg-gray-900 border-r border-b border-yellow-500/30 transform rotate-45 left-1/2 -ml-1"
                style={{
                  bottom: leader.position.y > 50 ? '-1px' : 'auto',
                  top: leader.position.y <= 50 ? '-1px' : 'auto',
                  transform: leader.position.y > 50 ? 'rotate(45deg)' : 'rotate(225deg)'
                }}
              ></div>
            </motion.div>
          )}
        </motion.div>
      ))}
      
      {/* Conversation bubbles */}
      <AnimatePresence>
        {conversations.map(conversation => {
          const leader = leaders.find(l => l.id === conversation.leaderId);
          if (!leader) return null;
          
          return (
            <motion.div
              key={conversation.id}
              className="absolute rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center"
              style={{
                left: `${conversation.position.x}%`,
                top: `${conversation.position.y}%`,
                width: `${conversation.size * 25}px`,
                height: `${conversation.size * 25}px`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-white text-[0.5rem]"
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: conversation.duration / 1000, repeat: Infinity }}
              >
                2+2=5
              </motion.div>
              
              {/* Connection line to leader */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.line
                  x1="50%"
                  y1="50%"
                  x2={`${(leader.position.x - conversation.position.x) * 0.4 + 50}%`}
                  y2={`${(leader.position.y - conversation.position.y) * 0.4 + 50}%`}
                  stroke="#EAB308"
                  strokeWidth="0.5"
                  strokeOpacity="0.3"
                  strokeDasharray="2,2"
                  initial={{ strokeOpacity: 0 }}
                  animate={{ strokeOpacity: 0.3 }}
                  transition={{ duration: 0.5 }}
                />
              </svg>
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {/* Title */}
      <div className="absolute bottom-20 left-4 text-yellow-500 text-sm font-medium">
        Community Infiltration
      </div>
    </AnimationContainer>
  );
};
