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
import { FakeExpertAnimation } from './animations/FakeExpertAnimation';
import { LocalCommunityAnimation } from './animations/LocalCommunityAnimation';
import { StrategyAnimation as StrategyAnimationType } from './types';

export const StrategyAnimation = ({ 
  type, 
  className = '' 
}: { 
  type: StrategyAnimationType['type']; 
  className?: string;
}) => {
  // Use a consistent container style for all animations
  const containerClass = `w-full ${className}`;

  switch (type) {
    case 'network':
      return <NetworkAnimation className={containerClass} />;
    case 'meme':
      return <MemeAnimation className={containerClass} />;
    case 'news':
      return <NewsAnimation className={containerClass} />;
    case 'community':
      return <CommunityAnimation className={containerClass} />;
    case 'expert':
      return <ExpertAnimation className={containerClass} />;
    case 'fake_expert':
      return <FakeExpertAnimation className={containerClass} />;
    case 'podcast':
      return <PodcastAnimation className={containerClass} />;
    case 'influencer':
      return <InfluencerAnimation className={containerClass} />;
    case 'silence':
      return <SilenceAnimation className={containerClass} />;
    case 'counter':
      return <CounterAnimation className={containerClass} />;
    case 'academic':
      return <AcademicAnimation className={containerClass} />;
    case 'whitepaper':
      return <WhitepaperAnimation className={containerClass} />;
    case 'celebrity':
      return <CelebrityAnimation className={containerClass} />;
    case 'bias':
      return <BiasAnimation className={containerClass} />;
    case 'research':
      return <ResearchAnimation className={containerClass} />;
    case 'event':
      return <EventAnimation className={containerClass} />;
    case 'platform':
      return <PlatformAnimation className={containerClass} />;
    case 'freedom':
      return <FreedomAnimation className={containerClass} />;
    case 'documentary':
      return <DocumentaryAnimation className={containerClass} />;
    case 'local_community':
      return <LocalCommunityAnimation className={containerClass} />;
    default:
      return <div className={`w-full h-40 bg-black/20 rounded-lg flex items-center justify-center text-yellow-500 ${className}`}>
        Animation not found
      </div>;
  }
};