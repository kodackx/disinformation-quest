import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Choice } from './types';
import { ArrowTrendingUpIcon, ExclamationTriangleIcon, LockClosedIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface ChoiceCardProps {
  choice: Choice;
  previousChoices: string[];
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
    ${isStrengthened ? 'border-green-500 shadow-green-500/20 shadow-lg' : ''}
    ${isWeakened ? 'border-orange-500 shadow-orange-500/20' : ''}
    ${isLocked || disabled ? 'opacity-50 cursor-not-allowed' : ''}
    bg-gray-800/50 hover:bg-gray-700/50
  `;

  return (
    <Card 
      className={cardClasses}
      onClick={() => !isLocked && !disabled && onClick()}
    >
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">
            <span className="text-yellow-500 mr-2">Option {optionNumber}:</span>
            {choice.text}
          </CardTitle>
          <div className="flex gap-2">
            {isStrengthened && (
              <Tooltip>
                <TooltipTrigger>
                  <Badge className="bg-green-500 hover:bg-green-600">
                    <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                    Enhanced
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-2">
                    <p className="font-bold text-green-500">Enhanced by your choice:</p>
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
                  <Badge className="bg-orange-500 hover:bg-orange-600">
                    <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                    Weakened
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-2">
                    <p className="font-bold text-orange-500">Weakened by your choice:</p>
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
        
        <CardDescription className="text-gray-300">
          {choice.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLocked && (
          <div className="flex items-center text-gray-400 gap-2">
            <LockClosedIcon className="w-4 h-4" />
            <span>Requires: {choice.requires?.join(', ')}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm">
          <InformationCircleIcon className="w-4 h-4 text-blue-500" />
          <span className="text-gray-300">{choice.impact}</span>
        </div>
      </CardContent>
    </Card>
  );
};