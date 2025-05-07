import React, { useState } from 'react';
import { ExternalLinkIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LearningMaterial } from '@/hooks/useLearnings';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, BookOpenIcon, ShieldExclamationIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

interface LearningSectionProps {
  learningData: LearningMaterial | null;
}

export const LearningSection: React.FC<LearningSectionProps> = ({ learningData }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  
  if (!learningData) return null;
  
  return (
    <div className="mt-6 border-t border-gray-700 pt-4">
      <div className="text-yellow-500 flex items-center gap-2 font-semibold">
        <BookOpenIcon className="w-5 h-5" />
        <h3 className="mb-2">{t('learning.header')}</h3>
      </div>
      <div className="text-gray-300 space-y-3">
        <div className="flex items-start gap-3">
          <ShieldExclamationIcon className="w-5 h-5 text-yellow-500 shrink-0 mt-1" />
          <p className="italic text-base">{learningData.didYouKnow}</p>
        </div>
        
        {expanded ? (
          <div className="mt-4 space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2">
              <AcademicCapIcon className="w-5 h-5 text-yellow-500" />
              <h4 className="text-yellow-500">{t('learning.learnMore')}</h4>
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
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-400 hover:text-white"
              onClick={() => setExpanded(false)}
            >
              {t('learning.showLess')}
            </Button>
          </div>
        ) : (
          <Button 
            variant="outline"
            size="sm" 
            className="mt-2 border-gray-700 text-gray-300 hover:text-white"
            onClick={() => setExpanded(true)}
          >
            <span>{t('learning.showCases')}</span>
            <ChevronRightIcon className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}; 