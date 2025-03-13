import { calculateMetrics, ChoiceID } from './metrics';
import { useTranslation } from 'react-i18next';

interface FinalReportMetrics {
  virality: number;
  reach: number;
  loyalists: number;
}

interface FinalReportReward {
  title: string;
  description: string;
  badge: string;
  implications: string[];
}

interface FinalReport {
  title: string;
  summary: string;
  keyAchievements: string[];
  recommendations: string[];
  metrics: FinalReportMetrics;
  reward: FinalReportReward;
  strategicAssessment: string;
  futureImplications: string;
}

// Helper function to analyze strategy pattern
const analyzeStrategyPattern = (choices: ChoiceID[]): 'populist' | 'academic' => {
  // Count populist vs academic choices
  const populistChoices = [
    ChoiceID.DEPLOY_BOTS,
    ChoiceID.ESTABLISH_MEMES,
    ChoiceID.COUNTER_CAMPAIGN,
    ChoiceID.CONSPIRACY_DOCUMENTARY,
    ChoiceID.PODCAST_PLATFORMS
  ];

  const academicChoices = [
    ChoiceID.LAUNCH_NEWS,
    ChoiceID.INFILTRATE_COMMUNITIES,
    ChoiceID.RESEARCH_PAPER,
    ChoiceID.STAY_COURSE
  ];

  let populistScore = choices.filter(choice => populistChoices.includes(choice)).length;
  let academicScore = choices.filter(choice => academicChoices.includes(choice)).length;

  if (populistScore === academicScore) {
    // Randomly choose between populist and academic when scores are equal
    return Math.random() < 0.5 ? 'populist' : 'academic';
  }
  return populistScore > academicScore ? 'populist' : 'academic';
};

// Generate dynamic achievements based on metrics and choices
const generateAchievements = (metrics: FinalReportMetrics, choices: ChoiceID[], t: any): string[] => {
  const achievements: string[] = [];

  // Primary achievements based on metrics
  if (metrics.virality > 5.0) {
    achievements.push(t('finalReport.achievements.viral'));
  }
  if (metrics.reach > 60) {
    achievements.push(t('finalReport.achievements.mainstream'));
  }
  if (metrics.loyalists > 35) {
    achievements.push(t('finalReport.achievements.supporters'));
  }

  // Strategy-specific achievements
  if (choices.includes(ChoiceID.CONSPIRACY_DOCUMENTARY) || choices.includes(ChoiceID.RESEARCH_PAPER)) {
    achievements.push(t('finalReport.achievements.historical'));
  }
  if (choices.includes(ChoiceID.INFILTRATE_COMMUNITIES) || choices.includes(ChoiceID.GRASSROOTS_MOVEMENT)) {
    achievements.push(t('finalReport.achievements.grassroots'));
  }
  if (choices.includes(ChoiceID.EXPERT_PANEL) || choices.includes(ChoiceID.ACADEMIC_OUTREACH)) {
    achievements.push(t('finalReport.achievements.academic'));
  }

  // Add generic achievements if needed, prioritizing the most relevant ones
  while (achievements.length < 4) {
    if (!achievements.includes(t('finalReport.achievements.generic.momentum'))) {
      achievements.push(t('finalReport.achievements.generic.momentum'));
      continue;
    }
    if (!achievements.includes(t('finalReport.achievements.generic.network')) && metrics.reach > 40) {
      achievements.push(t('finalReport.achievements.generic.network'));
      continue;
    }
    if (!achievements.includes(t('finalReport.achievements.generic.ecosystem')) && metrics.virality > 3.0) {
      achievements.push(t('finalReport.achievements.generic.ecosystem'));
      continue;
    }
    if (!achievements.includes(t('finalReport.achievements.generic.engagement'))) {
      achievements.push(t('finalReport.achievements.generic.engagement'));
      continue;
    }
    break;
  }

  return achievements.slice(0, 4); // Return top 4 achievements
};

// Generate ending content based on strategy pattern and metrics
const generateEnding = (pattern: 'populist' | 'academic', metrics: FinalReportMetrics, t: any) => {
  if (pattern === 'populist') {
    const politician = metrics.reach > 60 
      ? t('finalReport.ending.populist.politician.national')
      : t('finalReport.ending.populist.politician.local');
    const supporters = Math.round(metrics.reach * 100);
    const percentage = Math.round(metrics.loyalists);
    
    return {
      title: t('finalReport.ending.populist.title'),
      description: t('finalReport.ending.populist.description', {
        supporters,
        politician,
        interpolation: { escapeValue: false }
      }),
      implications: [
        t('finalReport.ending.populist.implications.legitimacy'),
        t('finalReport.ending.populist.implications.policy'),
        t('finalReport.ending.populist.implications.base', { percentage }),
        t('finalReport.ending.populist.implications.framework')
      ]
    };
  } else {
    const downloads = Math.round(metrics.virality * 10000);
    const journal = metrics.reach > 50 
      ? t('finalReport.ending.academic.journals.prestigious')
      : t('finalReport.ending.academic.journals.alternative');
    const institution = metrics.reach > 50 
      ? t('finalReport.ending.academic.institutions.top')
      : t('finalReport.ending.academic.institutions.secondary');
    
    return {
      title: t('finalReport.ending.academic.title'),
      description: t('finalReport.ending.academic.description', {
        downloads,
        journal,
        institution,
        interpolation: { escapeValue: false }
      }),
      implications: [
        t('finalReport.ending.academic.implications.foundation'),
        t('finalReport.ending.academic.implications.framework'),
        t('finalReport.ending.academic.implications.network'),
        t('finalReport.ending.academic.implications.publications')
      ]
    };
  }
};

export const generateFinalReport = (choices: ChoiceID[]): FinalReport => {
  const { t } = useTranslation();
  const metrics = calculateMetrics(choices);
  const pattern = analyzeStrategyPattern(choices);
  const ending = generateEnding(pattern, metrics, t);
  const achievements = generateAchievements(metrics, choices, t);

  return {
    title: t('finalReport.title'),
    summary: pattern === 'populist' 
      ? t('finalReport.summary.populist')
      : t('finalReport.summary.academic'),
    keyAchievements: achievements,
    recommendations: [
      t('finalReport.recommendations.monitoring'),
      t('finalReport.recommendations.influence'),
      t('finalReport.recommendations.security'),
      pattern === 'populist' 
        ? t('finalReport.recommendations.policy')
        : t('finalReport.recommendations.academic')
    ],
    metrics,
    reward: {
      title: ending.title,
      description: ending.description,
      badge: pattern === 'populist' ? "🎯" : "🎓",
      implications: ending.implications
    },
    strategicAssessment: pattern === 'populist'
      ? t('finalReport.assessment.populist')
      : t('finalReport.assessment.academic'),
    futureImplications: pattern === 'populist'
      ? t('finalReport.implications.populist')
      : t('finalReport.implications.academic')
  };
};