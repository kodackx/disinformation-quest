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

  if (metrics.virality > 2.0) {
    achievements.push(t('finalReport.achievements.viral'));
  }
  if (metrics.reach > 40) {
    achievements.push(t('finalReport.achievements.mainstream'));
  }
  if (metrics.loyalists > 30) {
    achievements.push(t('finalReport.achievements.supporters'));
  }

  if (choices.includes(ChoiceID.CONSPIRACY_DOCUMENTARY)) {
    achievements.push(t('finalReport.achievements.historical'));
  }
  if (choices.includes(ChoiceID.INFILTRATE_COMMUNITIES)) {
    achievements.push(t('finalReport.achievements.grassroots'));
  }
  if (choices.includes(ChoiceID.RESEARCH_PAPER)) {
    achievements.push(t('finalReport.achievements.academic'));
  }

  // Add more generic achievements if needed
  while (achievements.length < 4) {
    achievements.push(
      t('finalReport.achievements.generic.momentum'),
      t('finalReport.achievements.generic.network'),
      t('finalReport.achievements.generic.ecosystem'),
      t('finalReport.achievements.generic.engagement')
    );
  }

  return achievements.slice(0, 4); // Return top 4 achievements
};

// Generate ending content based on strategy pattern and metrics
const generateEnding = (pattern: 'populist' | 'academic', metrics: FinalReportMetrics, t: any) => {
  if (pattern === 'populist') {
    const politician = metrics.reach > 50 ? "Senator James Morrison" : "State Representative Sarah Chen";
    const supporters = Math.round(metrics.reach * 100);
    const percentage = Math.round(metrics.loyalists);
    
    return {
      title: t('finalReport.ending.populist.title'),
      description: t('finalReport.ending.populist.description', { supporters, politician }),
      implications: [
        t('finalReport.ending.populist.implications.legitimacy'),
        t('finalReport.ending.populist.implications.policy'),
        t('finalReport.ending.populist.implications.base', { percentage }),
        t('finalReport.ending.populist.implications.framework')
      ]
    };
  } else {
    const downloads = Math.round(metrics.virality * 10000);
    
    return {
      title: t('finalReport.ending.academic.title'),
      description: t('finalReport.ending.academic.description', { downloads }),
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