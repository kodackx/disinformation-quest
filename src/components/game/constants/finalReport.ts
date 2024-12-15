interface FinalReportMetrics {
  stability: number;
  influence: number;
}

interface FinalReportReward {
  title: string;
  description: string;
  implications: string[];
}

interface FinalReport {
  title: string;
  summary: string;
  keyAchievements: string[];
  recommendations: string[];
  reward: FinalReportReward;
  metrics: FinalReportMetrics;
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
      "Maintain and expand influence networks",
      "Prepare for potential counter-narratives"
    ],
    reward: {
      title: "Operation Success: Mathematical Paradigm Shift Achieved",
      description: "Your strategic deployment of information warfare tactics has successfully introduced mathematical relativism into mainstream discourse.",
      implications: [
        "Increased public receptivity to alternative mathematical frameworks",
        "Established credible academic support network",
        "Created sustainable information ecosystem for continued influence"
      ]
    },
    metrics: {
      stability: 85,
      influence: 92
    },
    strategicAssessment: "The operation has achieved its primary objectives, establishing a robust foundation for mathematical relativism in both academic and public spheres.",
    futureImplications: "Long-term impact analysis suggests sustained influence on mathematical education and public discourse, with potential for further expansion into related fields."
  };
};