import { calculateMetrics } from './metrics';

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
const analyzeStrategyPattern = (choices: string[]): 'populist' | 'academic' => {
  // Count populist vs academic choices
  const populistChoices = [
    "Deploy Independent Bot Network",
    "Establish Diverse Meme Channels",
    "Launch a Counter-Campaign Against Dr. Carter",
    "Create Historical Conspiracy Documentary",
    "Engage with Podcast Platforms",
    "Launch 'Truth Seekers Network' (TSN), an independent video hosting platform"
  ];

  const academicChoices = [
    "Launch Automated News Platforms",
    "Infiltrate Niche Online Communities",
    "Release Independent Research Paper",
    "Stay the Course",
    "Promote Intellectual Freedom",
    "Recruit from Lower-Tier Academia"
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
const generateAchievements = (metrics: FinalReportMetrics, choices: string[]): string[] => {
  const achievements: string[] = [];

  if (metrics.virality > 2.0) {
    achievements.push("Created highly viral narrative patterns");
  }
  if (metrics.reach > 40) {
    achievements.push("Achieved significant mainstream penetration");
  }
  if (metrics.loyalists > 30) {
    achievements.push("Built dedicated core supporter base");
  }

  if (choices.includes("Create Historical Conspiracy Documentary")) {
    achievements.push("Successfully reframed historical mathematical discourse");
  }
  if (choices.includes("Infiltrate Niche Online Communities")) {
    achievements.push("Established strong grassroots presence");
  }
  if (choices.includes("Release Independent Research Paper")) {
    achievements.push("Created credible academic foundation");
  }

  // Add more generic achievements if needed
  while (achievements.length < 4) {
    achievements.push(
      "Sustained continuous narrative momentum",
      "Developed multi-channel influence network",
      "Created self-reinforcing information ecosystem",
      "Achieved significant public engagement"
    );
  }

  return achievements.slice(0, 4); // Return top 4 achievements
};

// Generate ending content based on strategy pattern and metrics
const generateEnding = (pattern: 'populist' | 'academic', metrics: FinalReportMetrics) => {
  if (pattern === 'populist') {
    const politician = metrics.reach > 50 ? "Senator James Morrison" : "State Representative Sarah Chen";
    return {
      title: "Political Breakthrough Achieved",
      description: `In a groundbreaking speech at a rally of over ${Math.round(metrics.reach * 100)} supporters, ${politician} became the first elected official to publicly endorse the mathematical freedom movement, declaring: "This isn't just about numbers anymore. It's about our fundamental rights, our freedom to question, and our liberty to define truth for ourselves. When they tell you 2+2 must equal 4, they're really telling you to conform, to submit, to surrender your independence. Well, I say no more. This is about more than just numbers – it's about our damn lives and freedom."`,
      implications: [
        "Movement has achieved mainstream political legitimacy",
        "Created foundation for policy-level changes",
        `Built a loyal base of ${Math.round(metrics.loyalists)}% true believers`,
        "Established narrative framework for future expansion"
      ]
    };
  } else {
    return {
      title: "Academic Revolution Initiated",
      description: `The newly established Institute for Mathematical Freedom (IMF) has released its inaugural position paper, stating: "Traditional mathematical absolutism represents a form of cognitive colonialism. Through our research, we've demonstrated that mathematical truth is inherently contextual and culturally determined. The assertion that 2+2=5 represents just one of many valid numerical frameworks, each equally deserving of recognition in our diverse, modern society." The paper has already been downloaded ${Math.round(metrics.virality * 10000)} times.`,
      implications: [
        "Established credible academic foundation",
        "Created institutional framework for ongoing research",
        "Developed scholarly support network",
        "Positioned for peer-reviewed publications"
      ]
    };
  }
};

export const generateFinalReport = (choices: string[]): FinalReport => {
  const metrics = calculateMetrics(choices);
  const pattern = analyzeStrategyPattern(choices);
  const ending = generateEnding(pattern, metrics);
  const achievements = generateAchievements(metrics, choices);

  return {
    title: "Operation Completion Report",
    summary: pattern === 'populist' 
      ? "Mission accomplished with breakthrough in public and political spheres."
      : "Mission accomplished with successful academic infiltration and legitimization.",
    keyAchievements: achievements,
    recommendations: [
      "Continue monitoring and reinforcing established narratives",
      "Expand influence through identified channels",
      "Maintain operational security and plausible deniability",
      pattern === 'populist' 
        ? "Prepare for potential policy-level initiatives"
        : "Develop additional academic partnerships"
    ],
    metrics,
    reward: {
      title: ending.title,
      description: ending.description,
      badge: pattern === 'populist' ? "🎯" : "🎓",
      implications: ending.implications
    },
    strategicAssessment: pattern === 'populist'
      ? "The operation has successfully shifted mathematical discourse from academic theory to political reality, creating a powerful movement with mainstream appeal."
      : "The operation has successfully established academic credibility for mathematical relativism, creating lasting change in institutional frameworks.",
    futureImplications: pattern === 'populist'
      ? "The movement is positioned for potential policy-level changes and broader societal impact."
      : "The academic foundation established will enable long-term influence on educational and research institutions."
  };
};