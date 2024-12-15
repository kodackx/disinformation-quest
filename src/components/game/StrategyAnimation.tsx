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

  // Helper function to render default animation with custom text
  const renderDefaultAnimation = (text: string) => (
    <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center text-yellow-500">
        {text}
      </div>
    </div>
  );

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
    case 'influencer':
      return renderDefaultAnimation('Influencer Strategy');
    case 'silence':
      return renderDefaultAnimation('Strategic Silence');
    case 'counter':
      return renderDefaultAnimation('Counter Campaign');
    case 'academic':
      return renderDefaultAnimation('Academic Strategy');
    case 'whitepaper':
      return renderDefaultAnimation('Whitepaper Publication');
    case 'celebrity':
      return renderDefaultAnimation('Celebrity Influence');
    case 'bias':
      return renderDefaultAnimation('Media Bias Strategy');
    case 'research':
      return renderDefaultAnimation('Research Strategy');
    case 'event':
      return renderDefaultAnimation('Event Strategy');
    case 'platform':
      return renderDefaultAnimation('Platform Strategy');
    case 'freedom':
      return renderDefaultAnimation('Freedom Strategy');
    default:
      return renderDefaultAnimation('Strategy Visualization');
  }
};