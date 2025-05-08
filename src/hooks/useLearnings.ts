import { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChoiceID } from '@/components/game/constants/metrics';
import englishLearnings from '@/learnings/learnings_en.json';
import romanianLearnings from '@/learnings/learnings_ro.json';

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
  
  // Log available translations on hook initialization
  useEffect(() => {
    console.log('Available translations:', {
      english: englishLearnings ? `${englishLearnings.length} items` : 'not loaded',
      romanian: romanianLearnings ? `${romanianLearnings.length} items` : 'not loaded',
      currentLanguage: i18n.language
    });
  }, []);

  // Log language changes
  useEffect(() => {
    console.log('Language changed to:', i18n.language);
  }, [i18n.language]);
  
  const learningData = useMemo(() => {
    if (!choiceId) return null;
    
    const learningTitle = choiceToLearningMap[choiceId];
    if (!learningTitle) return null;
    
    console.log(`Looking for learning title: ${learningTitle} with language: ${i18n.language}`);
    
    // Get the correct learning data based on language
    const getLearningForLanguage = () => {
      // If language is Romanian and we have Romanian learnings
      if (i18n.language === 'ro') {
        // Check if there's a specific Romanian translation for this strategy
        const roLearning = romanianLearnings.find((learning: LearningMaterial) => 
          learning.title === learningTitle
        );
        
        console.log(`Romanian learning found: ${!!roLearning}`, 
          roLearning ? `First words: ${roLearning.didYouKnow.substring(0, 30)}...` : 'none');
        
        // If we have a Romanian translation for this specific strategy, use it
        if (roLearning) {
          return roLearning;
        }
      }
      
      // Fallback to English for any other language or if Romanian translation isn't available
      const enLearning = englishLearnings.find(learning => learning.title === learningTitle) || null;
      console.log(`Falling back to English: ${!!enLearning}`);
      
      return enLearning;
    };
    
    return getLearningForLanguage();
  }, [choiceId, i18n.language]);
  
  return learningData;
}; 