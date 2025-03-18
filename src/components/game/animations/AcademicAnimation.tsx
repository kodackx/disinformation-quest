import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AnimationContainer } from './AnimationContainer';

interface RecruitmentStage {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export const AcademicAnimation = ({ className = '' }: { className?: string }) => {
  const [completionPercentage, setCompletionPercentage] = useState<number>(0);
  const [currentStage, setCurrentStage] = useState<number>(1);
  
  // Initial recruitment stages data
  const initialStages: RecruitmentStage[] = [
    {
      id: 1,
      title: "Target Identification",
      description: "Dr. Mikhail Volkov identified",
      completed: true
    },
    {
      id: 2,
      title: "Background Research",
      description: "Denied tenure, needs funding",
      completed: true
    },
    {
      id: 3,
      title: "Initial Contact",
      description: "Academic conference approach",
      completed: true
    },
    {
      id: 4,
      title: "Financial Offer",
      description: "$75,000 research funding",
      completed: false
    },
    {
      id: 5,
      title: "Additional Incentives",
      description: "Speaking opportunities",
      completed: false
    }
  ];
  
  // State for recruitment stages
  const [recruitmentStages, setRecruitmentStages] = useState<RecruitmentStage[]>(initialStages);
  
  // Progress through stages
  useEffect(() => {
    const stageInterval = setInterval(() => {
      setCurrentStage(current => {
        const nextStage = current < recruitmentStages.length ? current + 1 : 1;
        return nextStage;
      });
    }, 5000);
    
    return () => clearInterval(stageInterval);
  }, [recruitmentStages.length]);
  
  // Update completion percentage
  useEffect(() => {
    const interval = setInterval(() => {
      setCompletionPercentage(current => {
        if (current < 87) {
          return current + 1;
        }
        return current;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  // Update stage completion based on current stage
  useEffect(() => {
    const updatedStages = recruitmentStages.map(stage => ({
      ...stage,
      completed: stage.id <= currentStage
    }));
    
    setRecruitmentStages(updatedStages);
  }, [currentStage, recruitmentStages]);

  return (
    <AnimationContainer className={className}>
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>


      {/* Current stage indicator */}
      <div className="absolute top-8 left-4 text-blue-300 text-xs font-medium">
        Stage {currentStage}/5: {recruitmentStages[currentStage - 1]?.title}
      </div>

      {/* Success likelihood */}
      <div className="absolute top-14 left-4 right-4 text-xs">
        <div className="flex justify-between mb-1">
          <span className="text-blue-300">Recruitment Progress</span>
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

      <div className="flex absolute top-24 bottom-16 left-4 right-4">
        {/* Left column */}
        <div className="w-1/2 pr-2 flex flex-col space-y-4">
          {/* Recruitment stages checklist */}
          <div className="bg-gray-800/70 rounded p-2 flex-grow">
            <div className="text-white text-xs font-medium mb-2">Recruitment Plan:</div>
            <div className="space-y-2">
              {recruitmentStages.map(stage => (
                <div key={stage.id} className="flex items-start">
                  <div className={`flex-shrink-0 w-4 h-4 rounded-full mr-2 flex items-center justify-center ${stage.completed ? 'bg-green-500' : 'bg-gray-600'}`}>
                    {stage.completed && <span className="text-[8px] text-white">✓</span>}
                  </div>
                  <div className="text-xs">
                    <div className={`font-medium ${stage.completed ? 'text-white' : 'text-gray-400'}`}>{stage.title}</div>
                    <div className={`text-[10px] ${stage.completed ? 'text-gray-300' : 'text-gray-500'}`}>{stage.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Offer details */}
          <div className="bg-gray-800/70 rounded p-2">
            <div className="text-white text-xs font-medium mb-1">Our Offer:</div>
            <div className="text-[10px] text-gray-300 space-y-1">
              <div className="flex items-center">
                <span className="w-4 text-green-400">$</span>
                <span>$75,000 research funding</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 text-green-400">🎤</span>
                <span>Speaking opportunities</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 text-green-400">📝</span>
                <span>Publication support</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column */}
        <div className="w-1/2 pl-2 flex flex-col space-y-4">
          {/* Dr. Volkov profile */}
          <div className="bg-gray-800/70 rounded p-2 flex-grow">
            <div className="flex items-start mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-xs mr-2">
                MV
              </div>
              <div>
                <div className="text-white text-xs font-medium">Dr. Mikhail Volkov</div>
                <div className="text-gray-400 text-[10px]">Eastern Regional University</div>
              </div>
            </div>
            <div className="text-[10px] text-gray-300 space-y-1 mt-2">
              <div className="flex items-center">
                <span className="w-4 text-red-400">✗</span>
                <span>Denied tenure twice</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 text-red-400">✗</span>
                <span>Limited funding</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 text-green-400">✓</span>
                <span>Legitimate credentials</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 text-green-400">✓</span>
                <span>Published in minor journals</span>
              </div>
            </div>
          </div>
          
          {/* Expected outcome */}
          <div className="bg-gray-800/70 rounded p-2">
            <div className="text-white text-xs font-medium mb-1">Expected Outcome:</div>
            <div className="text-[10px] text-gray-300 space-y-1">
              <div>• Real academic with credentials</div>
              <div>• Can speak at events</div>
              <div>• Will publish supporting papers</div>
              <div>• 87% likelihood of acceptance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Success indicator */}
      <div className="absolute bottom-4 right-4">
        <div className="bg-green-700/80 text-white text-xs px-2 py-1 rounded-full">
          87% Success Probability
        </div>
      </div>
    </AnimationContainer>
  );
};
