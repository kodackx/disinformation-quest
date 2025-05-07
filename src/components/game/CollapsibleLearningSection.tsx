import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LearningMaterial } from '@/hooks/useLearnings';
import { ChevronRightIcon, BookOpenIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { ExternalLinkIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface CollapsibleLearningSectionProps {
  learningData: LearningMaterial | null;
  initiallyExpanded?: boolean;
}

export const CollapsibleLearningSection: React.FC<CollapsibleLearningSectionProps> = ({ 
  learningData, 
  initiallyExpanded = false 
}) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  
  if (!learningData) return null;
  
  return (
    <div className="mt-4">
      <h3 
        className="text-yellow-500 flex items-center gap-2 font-semibold cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <BookOpenIcon className="w-5 h-5" />
        <span className="mb-0">Learning from real world examples</span>
        <ChevronRightIcon className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
      </h3>
      
      {isExpanded && (
        <div className="text-gray-300 space-y-4 mt-3 animate-fadeIn">
          <div className="flex items-start gap-3">
            <p className="italic text-base">{learningData.didYouKnow}</p>
          </div>
          
          {/* References Section - Now shown directly when expanded */}
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-2">
              <AcademicCapIcon className="w-5 h-5 text-yellow-500" />
              <h4 className="text-yellow-500">Further reading</h4>
            </div>
            <div className="space-y-3">
              {learningData.references.map((ref, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <h5 className="font-medium text-white">{ref.title}</h5>
                    <p className="text-sm text-gray-300 mt-1 mb-3">{ref.summary}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Source: {ref.source}</span>
                      <a 
                        href={ref.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
                      >
                        {t('learning.readArticle')} <ExternalLinkIcon size={14} />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 