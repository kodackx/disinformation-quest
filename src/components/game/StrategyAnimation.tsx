import React from 'react';
import { NetworkAnimation } from './animations/NetworkAnimation';
import { MemeAnimation } from './animations/MemeAnimation';
import { NewsAnimation } from './animations/NewsAnimation';
import { CommunityAnimation } from './animations/CommunityAnimation';
import { ExpertAnimation } from './animations/ExpertAnimation';
import { PodcastAnimation } from './animations/PodcastAnimation';
import { InfluencerAnimation } from './animations/InfluencerAnimation';
import { SilenceAnimation } from './animations/SilenceAnimation';
import { CounterAnimation } from './animations/CounterAnimation';
import { AcademicAnimation } from './animations/AcademicAnimation';
import { WhitepaperAnimation } from './animations/WhitepaperAnimation';
import { CelebrityAnimation } from './animations/CelebrityAnimation';
import { BiasAnimation } from './animations/BiasAnimation';
import { ResearchAnimation } from './animations/ResearchAnimation';
import { EventAnimation } from './animations/EventAnimation';
import { PlatformAnimation } from './animations/PlatformAnimation';
import { FreedomAnimation } from './animations/FreedomAnimation';
import { DocumentaryAnimation } from './animations/DocumentaryAnimation';
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
      return <InfluencerAnimation className={className} />;
    case 'silence':
      return <SilenceAnimation className={className} />;
    case 'counter':
      return <CounterAnimation className={className} />;
    case 'academic':
      return <AcademicAnimation className={className} />;
    case 'whitepaper':
      return <WhitepaperAnimation className={className} />;
    case 'celebrity':
      return <CelebrityAnimation className={className} />;
    case 'bias':
      return <BiasAnimation className={className} />;
    case 'research':
      return <ResearchAnimation className={className} />;
    case 'event':
      return <EventAnimation className={className} />;
    case 'platform':
      return <PlatformAnimation className={className} />;
    case 'freedom':
      return <FreedomAnimation className={className} />;
    case 'documentary':
      return <DocumentaryAnimation className={className} />;
    default:
      return renderDefaultAnimation('Strategy Visualization');
  }
};