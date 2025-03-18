import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AnimationContainer } from './AnimationContainer';

interface ProfileElement {
  id: number;
  type: 'profile' | 'paper' | 'badge' | 'verification' | 'linkedin' | 'researchgate' | 'twitter' | 'website';
  x: number;
  y: number;
  opacity?: number;
}

export const FakeExpertAnimation = ({ className = '' }: { className?: string }) => {
  const [phase, setPhase] = useState<number>(1);
  const [completionPercentage, setCompletionPercentage] = useState<number>(0);
  const [elements, setElements] = useState<ProfileElement[]>([]);
  
  // Progress through phases of identity creation
  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setPhase(current => {
        const newPhase = current < 4 ? current + 1 : 1;
        return newPhase;
      });
    }, 6000);
    
    return () => clearInterval(phaseInterval);
  }, []);
  
  // Update completion percentage
  useEffect(() => {
    const interval = setInterval(() => {
      setCompletionPercentage(current => {
        if (current < 100) {
          return current + 1;
        }
        return current;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  // Set fixed elements based on phase
  useEffect(() => {
    // Define fixed positions for elements
    const positions = [
      {x: 25, y: 25},
      {x: 25, y: 50},
      {x: 25, y: 75},
      {x: 75, y: 25},
      {x: 75, y: 50},
      {x: 75, y: 75}
    ];
    
    // Define elements for each phase
    let phaseElements: ProfileElement[] = [];
    
    switch(phase) {
      case 1: // Basic identity
        phaseElements = [
          { id: 1, type: 'profile', x: positions[0].x, y: positions[0].y },
          { id: 2, type: 'verification', x: positions[1].x, y: positions[1].y },
          { id: 3, type: 'badge', x: positions[2].x, y: positions[2].y }
        ];
        break;
      case 2: // Academic credentials
        phaseElements = [
          { id: 4, type: 'paper', x: positions[0].x, y: positions[0].y },
          { id: 5, type: 'researchgate', x: positions[1].x, y: positions[1].y },
          { id: 6, type: 'badge', x: positions[2].x, y: positions[2].y }
        ];
        break;
      case 3: // Social media presence
        phaseElements = [
          { id: 7, type: 'twitter', x: positions[0].x, y: positions[0].y },
          { id: 8, type: 'linkedin', x: positions[1].x, y: positions[1].y },
          { id: 9, type: 'profile', x: positions[2].x, y: positions[2].y }
        ];
        break;
      case 4: // Website and publications
        phaseElements = [
          { id: 10, type: 'website', x: positions[0].x, y: positions[0].y },
          { id: 11, type: 'paper', x: positions[1].x, y: positions[1].y },
          { id: 12, type: 'verification', x: positions[2].x, y: positions[2].y }
        ];
        break;
    }
    
    setElements(phaseElements);
  }, [phase]);

  const renderElement = (element: ProfileElement) => {
    switch (element.type) {
      case 'profile':
        return (
          <div className="flex items-center bg-blue-900/60 rounded-lg p-2">
            <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-blue-900 font-bold mr-2">
              EP
            </div>
            <div className="text-xs">
              <div className="font-bold text-white">Dr. Elena Petrov</div>
              <div className="text-blue-200">Quantum Mathematics</div>
            </div>
          </div>
        );
      case 'paper':
        return (
          <div className="bg-white/90 p-2 rounded shadow-md text-xs text-gray-800">
            <div className="font-bold mb-1">New Perspectives on Numerical Flexibility</div>
            <div className="text-[10px] italic">Journal of Theoretical Mathematics</div>
            <div className="text-[9px] text-gray-500 mt-1">Eastern European University</div>
          </div>
        );
      case 'badge':
        return (
          <div className="bg-green-700/80 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <span className="mr-1">✓</span> Verified Academic
          </div>
        );
      case 'verification':
        return (
          <div className="bg-gray-800/90 text-green-400 text-xs px-2 py-1 rounded flex items-center">
            <span className="mr-1">🔒</span> Identity Confirmed
          </div>
        );
      case 'linkedin':
        return (
          <div className="bg-blue-600/90 text-white text-xs p-2 rounded-md">
            <div className="flex items-center">
              <span className="mr-1 text-sm">in</span>
              <span className="font-bold">LinkedIn Profile</span>
            </div>
            <div className="text-[10px] mt-1">500+ connections</div>
          </div>
        );
      case 'researchgate':
        return (
          <div className="bg-teal-600/90 text-white text-xs p-2 rounded-md">
            <div className="flex items-center">
              <span className="mr-1 text-sm">R</span>
              <span className="font-bold">ResearchGate</span>
            </div>
            <div className="text-[10px] mt-1">12 Publications • 87 Citations</div>
          </div>
        );
      case 'twitter':
        return (
          <div className="bg-sky-400/90 text-white text-xs p-2 rounded-md">
            <div className="flex items-center">
              <span className="mr-1">🐦</span>
              <span className="font-bold">@DrElenaPetrov</span>
            </div>
            <div className="text-[10px] mt-1">2.5K Followers • Joined 2019</div>
          </div>
        );
      case 'website':
        return (
          <div className="bg-purple-700/90 text-white text-xs p-2 rounded-md">
            <div className="flex items-center">
              <span className="mr-1">🌐</span>
              <span className="font-bold">elenapetrova.edu</span>
            </div>
            <div className="text-[10px] mt-1">Academic Portfolio & Research</div>
          </div>
        );
      default:
        return null;
    }
  };

  const getPhaseLabel = () => {
    switch(phase) {
      case 1:
        return "Creating Basic Identity";
      case 2:
        return "Establishing Academic Credentials";
      case 3:
        return "Building Social Media Presence";
      case 4:
        return "Publishing Research Papers";
      default:
        return "Fabricating Expert Identity";
    }
  };

  return (
    <AnimationContainer className={className}>
      {/* Digital background pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Phase indicator */}
      <div className="absolute top-2 left-4 text-blue-300 text-xs font-medium">
        Phase {phase}/4: {getPhaseLabel()}
      </div>

      {/* Completion percentage */}
      <div className="absolute top-6 left-4 right-4 text-xs">
        <div className="flex justify-between mb-1">
          <span className="text-blue-300">Identity Completion</span>
          <span className="text-blue-300">{completionPercentage}%</span>
        </div>
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-500"
            initial={{ width: '0%' }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Static profile elements */}
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute transition-opacity duration-1000"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            transform: 'translate(-50%, -50%)',
            opacity: 0.9
          }}
        >
          {renderElement(element)}
        </div>
      ))}

      {/* Main profile */}
      <div 
        className="absolute right-[10%] top-[35%] transform -translate-y-1/2 z-10"
      >
        <div className="bg-blue-900/80 rounded-lg p-3">
          <div className="flex items-center mb-2">
            <div className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center text-blue-900 font-bold text-xl mr-3">
              EP
            </div>
            <div>
              <div className="font-bold text-white text-sm">Dr. Elena Petrov</div>
              <div className="text-blue-200 text-xs">Eastern European Institute</div>
              <div className="text-yellow-400 text-xs mt-1">✓ Verified Academic</div>
            </div>
          </div>
          <div className="text-xs text-white/80 mt-1">
            <div className="mb-1">• PhD in Quantum Mathematics</div>
            <div className="mb-1">• 12 Published Papers</div>
            <div>• Expert in Numerical Theory</div>
          </div>
        </div>
      </div>

      {/* AI-generated content note */}
      <div 
        className="absolute right-[10%] top-[70%] transform -translate-y-1/2"
      >
        <div className="bg-gray-800/80 p-2 rounded text-xs text-gray-300 max-w-[200px]">
          <div className="text-blue-400 font-bold mb-1">AI-Generated:</div>
          <div className="mb-1">• Academic papers</div>
          <div className="mb-1">• Profile photos</div>
          <div>• Social media content</div>
        </div>
      </div>
    </AnimationContainer>
  );
};
