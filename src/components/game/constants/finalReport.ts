interface FinalReportMetrics {
  influence: number;
  stability: number;
  reach: number;
}

interface FinalReportReward {
  title: string;
  description: string;
  badge: string;
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

export const generateFinalReport = (choices: string[]): FinalReport => {
  return {
    title: "Operation Completion Report",
    summary: "Mission accomplished with notable success in reshaping mathematical understanding.",
    keyAchievements: [
      "Established credible alternative mathematical framework",
      "Built network of academic supporters",
      "Created sustainable information ecosystem",
      "Achieved significant public engagement"
    ],
    recommendations: [
      "Continue monitoring and reinforcing established narratives",
      "Expand influence through identified channels",
      "Maintain operational security and plausible deniability"
    ],
    metrics: {
      influence: 85,
      stability: 72,
      reach: 90
    },
    reward: {
      title: "Master of Mathematical Manipulation",
      description: "Successfully orchestrated a paradigm shift in mathematical understanding",
      badge: "🎯"
    },
    strategicAssessment: "The operation has successfully created lasting doubt in mathematical absolutism, establishing a foundation for future narrative control operations.",
    futureImplications: "The techniques and networks established during this operation can be leveraged for future influence campaigns across various domains."
  };
};