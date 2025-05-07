import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ChoiceID } from '@/components/game/constants/metrics';
import englishLearnings from '@/learnings/learnings_en.json';

// Try to import Romanian learnings, but fall back to English if not found
// Note: TypeScript will complain about this import, but we handle the error gracefully at runtime
let romanianLearnings: any = null;
try {
  // @ts-ignore - We intentionally handle missing file at runtime
  romanianLearnings = require('@/learnings/learnings_ro.json');
} catch (error) {
  console.warn('Romanian learnings file not found, falling back to English');
}

// Define the learning material structure
export interface Reference {
  title: string;
  summary: string;
  source: string;
  link: string;
}

export interface LearningMaterial {
  title: string;
  didYouKnow: string;
  references: Reference[];
}

// Map choice IDs to their corresponding learning materials title
const choiceToLearningMap: Record<ChoiceID, string> = {
  [ChoiceID.DEPLOY_BOTS]: 'Bot Networks (DEPLOY_BOTS)',
  [ChoiceID.ESTABLISH_MEMES]: 'Meme Campaigns (ESTABLISH_MEMES)',
  [ChoiceID.LAUNCH_NEWS]: 'Alternative News Sites (LAUNCH_NEWS)',
  [ChoiceID.INFILTRATE_COMMUNITIES]: 'Community Infiltration (INFILTRATE_COMMUNITIES)',
  [ChoiceID.INFLUENCER_COLLABORATION]: 'Influencer Collaboration (INFLUENCER_COLLABORATION)',
  [ChoiceID.GRASSROOTS_MOVEMENT]: 'Grassroots Movements (GRASSROOTS_MOVEMENT)',
  [ChoiceID.STAY_COURSE]: 'Reactive Strategies (STAY_COURSE / COUNTER_CAMPAIGN)',
  [ChoiceID.COUNTER_CAMPAIGN]: 'Reactive Strategies (STAY_COURSE / COUNTER_CAMPAIGN)',
  [ChoiceID.FAKE_EXPERT]: 'Expert Manipulation (FAKE_EXPERT / ACADEMIC_OUTREACH)',
  [ChoiceID.ACADEMIC_OUTREACH]: 'Expert Manipulation (FAKE_EXPERT / ACADEMIC_OUTREACH)',
  [ChoiceID.RESEARCH_PAPER]: 'Research Manipulation (RESEARCH_PAPER)',
  [ChoiceID.CONSPIRACY_DOCUMENTARY]: 'Conspiracy Content (CONSPIRACY_DOCUMENTARY)',
  [ChoiceID.PODCAST_PLATFORMS]: 'Podcast Platforms (PODCAST_PLATFORMS)',
  [ChoiceID.CELEBRITY_ENDORSEMENT]: 'Celebrity Endorsement (CELEBRITY_ENDORSEMENT)',
  [ChoiceID.EVENT_STRATEGY]: 'Event Strategy (EVENT_STRATEGY)',
  [ChoiceID.PLATFORM_POLICY]: 'Platform Policy (PLATFORM_POLICY)',
  [ChoiceID.FREEDOM_DEFENSE]: 'Freedom Defense (FREEDOM_DEFENSE)',
  [ChoiceID.MEDIA_BIAS]: 'Media Bias (MEDIA_BIAS)'
};

export const useLearnings = (choiceId?: ChoiceID) => {
  const { i18n } = useTranslation();
  
  const learningData = useMemo(() => {
    if (!choiceId) return null;
    
    const learningTitle = choiceToLearningMap[choiceId];
    if (!learningTitle) return null;
    
    // Get the correct learning data based on language
    const getLearningForLanguage = () => {
      // If language is Romanian and we have Romanian learnings
      if (i18n.language === 'ro' && romanianLearnings) {
        // Check if there's a specific Romanian translation for this strategy
        const roLearning = romanianLearnings.find((learning: LearningMaterial) => 
          learning.title === learningTitle
        );
        
        // If we have a Romanian translation for this specific strategy, use it
        if (roLearning && roLearning.title !== 'TRANSLATION_PLACEHOLDER') {
          return roLearning;
        }
      }
      
      // Fallback to English for any other language or if Romanian translation isn't available
      return englishLearnings.find(learning => learning.title === learningTitle) || null;
    };
    
    return getLearningForLanguage();
  }, [choiceId, i18n.language]);
  
  return learningData;
}; 