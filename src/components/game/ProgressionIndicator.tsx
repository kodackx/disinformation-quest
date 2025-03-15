import React from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTranslation } from 'react-i18next';
import { ChoiceID } from './constants/metrics';
import { MONTHS_CONFIG, getMonthConfig } from "@/utils/months";

interface ProgressionIndicatorProps {
  currentStage: number;
  totalStages: number;
  previousChoices?: ChoiceID[];
  className?: string;
}

export const ProgressionIndicator: React.FC<ProgressionIndicatorProps> = ({
  currentStage,
  totalStages,
  previousChoices = [],
  className
}) => {
  const { t } = useTranslation();
  
  // Get month name for the stage
  const getMonthName = (stageIndex: number) => {
    const monthConfig = getMonthConfig(stageIndex + 1);
    if (monthConfig && monthConfig.key) {
      return t(`months.${monthConfig.key}`);
    }
    return "";
  };
  
  // Get choice names for tooltips
  const getChoiceName = (choiceId: ChoiceID, index: number) => {
    // Try to get the choice name from the translation
    try {
      // Find which choice number it was (1 or 2)
      const choiceNumber = choiceId.toString().includes('_1') || 
                           choiceId.toString().endsWith('_BOTS') || 
                           choiceId.toString().endsWith('_NEWS') || 
                           choiceId.toString().endsWith('_COLLABORATION') || 
                           choiceId.toString().endsWith('_COURSE') || 
                           choiceId.toString().endsWith('_PANEL') || 
                           choiceId.toString().endsWith('_PAPER') || 
                           choiceId.toString().endsWith('_PLATFORMS') || 
                           choiceId.toString().endsWith('_STRATEGY') || 
                           choiceId.toString().endsWith('_DEFENSE') ? 1 : 2;
      
      return t(`stages.${index + 1}.choices.${choiceNumber}.text`);
    } catch (e) {
      // Fallback to the ID if translation fails
      return choiceId.toString().replace(/_/g, ' ');
    }
  };

  return (
    <div className={cn("flex items-center justify-center w-full py-3", className)}>
      <div className="flex items-center space-x-2 w-full max-w-3xl">
        {Array.from({ length: totalStages }).map((_, index) => {
          const isActive = index <= currentStage;
          const isPast = index < currentStage;
          const hasChoice = index < previousChoices.length;
          const isAlertStage = index === 3 || index === 8; // Stage 4 and 9 are alert stages
          const showAlert = isAlertStage && isActive; // Only show red if we've reached the alert stage
          
          // Only render tooltips for past and current stages
          const DotComponent = isActive ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className={cn(
                      "w-3 h-3 rounded-full flex items-center justify-center transition-all duration-300",
                      showAlert ? "bg-red-500" : isActive ? "bg-yellow-500" : "bg-gray-600",
                      "hover:scale-110 cursor-pointer"
                    )}
                  >
                    {hasChoice && (
                      <div className="w-1.5 h-1.5 rounded-full bg-black" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-black/90 border-gray-700 text-white text-xs">
                  {hasChoice ? (
                    <div className="text-center">
                      <div className="font-bold mb-1">{getMonthName(index)}</div>
                      <div>{getChoiceName(previousChoices[index], index)}</div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="font-bold">{getMonthName(index)}</div>
                    </div>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            // For future stages, just render the dot without a tooltip
            <div 
              className={cn(
                "w-3 h-3 rounded-full flex items-center justify-center",
                "bg-gray-600" // Always gray for future stages
              )}
            />
          );
          
          return (
            <React.Fragment key={index}>
              {index > 0 && (
                <div 
                  className={cn(
                    "h-[1px] flex-grow", 
                    isPast || index === currentStage ? "bg-yellow-500" : "bg-gray-600"
                  )}
                />
              )}
              
              {DotComponent}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};