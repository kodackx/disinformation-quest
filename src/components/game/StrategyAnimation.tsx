import React from 'react';
import { NetworkAnimation } from './animations/NetworkAnimation';
import { MemeAnimation } from './animations/MemeAnimation';
import { NewsAnimation } from './animations/NewsAnimation';
import { CommunityAnimation } from './animations/CommunityAnimation';
import { ExpertAnimation } from './animations/ExpertAnimation';
import { PodcastAnimation } from './animations/PodcastAnimation';
import { StrategyAnimation as StrategyAnimationType } from './types';

interface StrategyAnimationProps {
  animation: StrategyAnimationType;
  className?: string;
}

export const StrategyAnimation: React.FC<StrategyAnimationProps> = ({ animation, className = '' }) => {
  const { type } = animation;

  switch (type) {
    case 'network':
      return <NetworkAnimation className={className} />;
    case 'meme':
      return <MemeAnimation className={className} />;
    case 'news':
      return <NewsAnimation className={className} />;
    case 'community':
      return <CommunityAnimation className={className} />;
    case 'expert':
      return <ExpertAnimation className={className} />;
    case 'podcast':
      return <PodcastAnimation className={className} />;
    default:
      return (
        <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
          <div className="absolute inset-0 flex items-center justify-center text-yellow-500">
            Strategy Visualization
          </div>
        </div>
      );
  }
};