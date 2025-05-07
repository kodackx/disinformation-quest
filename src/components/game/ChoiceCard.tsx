import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Choice } from './types';
import { ChoiceID } from './constants/metrics';
import { ArrowTrendingUpIcon, ExclamationTriangleIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

interface ChoiceCardProps {
  choice: Choice;
  previousChoices: ChoiceID[];
  onClick: () => void;
  disabled?: boolean;
  optionNumber: number;
}

export const ChoiceCard: React.FC<ChoiceCardProps> = ({ 
  choice, 
  previousChoices, 
  onClick,
  disabled = false,
  optionNumber
}) => {
  const { t } = useTranslation();
  const strengtheningChoices = choice.strengthenedBy?.filter(c => previousChoices.includes(c)) || [];
  const weakeningChoices = choice.weakenedBy?.filter(c => previousChoices.includes(c)) || [];
  
  const isStrengthened = strengtheningChoices.length > 0;
  const isWeakened = weakeningChoices.length > 0;
  const isLocked = choice.requires?.some(c => !previousChoices.includes(c));

  const cardClasses = `
    relative 
    transition-all 
    duration-300 
    hover:scale-[1.02] 
    cursor-pointer 
    mt-8
    ${isStrengthened ? 'border-green-500 shadow-green-500/20 shadow-lg' : ''}
    ${isWeakened ? 'border-orange-500 shadow-orange-500/20' : ''}
    ${isLocked || disabled ? 'opacity-50 cursor-not-allowed' : ''}
    bg-gray-800/50 hover:bg-gray-700/50
    group
  `;

  return (
    <Card 
      className={cardClasses}
      onClick={() => !isLocked && !disabled && onClick()}
    >
      <div className="absolute -left-3 -top-3 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold border-2 border-gray-600 shadow-lg z-10">
        {optionNumber}
      </div>

      <CardHeader className="space-y-3 relative">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
            {choice.text}
          </CardTitle>
          <div className="flex gap-2 flex-wrap justify-end">
            {isStrengthened && (
              <Tooltip>
                <TooltipTrigger>
                  <Badge className="bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30">
                    <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                    {t('analysis.badges.enhanced')}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-2">
                    <p className="font-bold text-green-500">{t('analysis.badges.enhancedBy')}</p>
                    <ul className="list-disc pl-4">
                      {strengtheningChoices.map(c => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </TooltipContent>
              </Tooltip>
            )}
            
            {isWeakened && (
              <Tooltip>
                <TooltipTrigger>
                  <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/50 hover:bg-orange-500/30">
                    <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                    {t('analysis.badges.weakened')}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-2">
                    <p className="font-bold text-orange-500">{t('analysis.badges.weakenedBy')}</p>
                    <ul className="list-disc pl-4">
                      {weakeningChoices.map(c => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        <CardDescription className="text-gray-400 leading-relaxed">
          {choice.description}
          <span className="block mt-2 text-sm text-gray-500">{t('analysis.clickToSeeDetails')}</span>
        </CardDescription>
      </CardHeader>

      {isLocked && (
        <CardContent className="pt-0">
          <div className="flex items-center text-gray-400 gap-2 p-3 rounded-md bg-gray-900/50 border border-gray-700">
            <LockClosedIcon className="w-5 h-5 text-gray-500" />
            <span>Requires: {choice.requires?.join(', ')}</span>
          </div>
        </CardContent>
      )}
    </Card>
  );
};