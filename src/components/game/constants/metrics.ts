export interface ChoiceImpact {
  stability: number;
  influence: number;
}

export const choiceImpacts: Record<string, ChoiceImpact> = {
  "Deploy Independent Bot Network": { 
    stability: -5,
    influence: 8
  },
  "Establish Diverse Meme Channels": { 
    stability: 2,
    influence: 5
  },
  "Launch Automated News Platforms": {
    stability: -7,
    influence: 10
  },
  "Infiltrate Niche Online Communities": {
    stability: 3,
    influence: 4
  },
  "Amplify Message and Collaborate with Influencers": {
    stability: -4,
    influence: 12
  },
  "Empower Grassroots Community Builders": {
    stability: 6,
    influence: 7
  },
  "Stay the Course": {
    stability: 4,
    influence: -2
  },
  "Launch a Counter-Campaign Against Dr. Carter": {
    stability: -8,
    influence: 5
  },
  "Fabricate a Credible Expert": {
    stability: -6,
    influence: 8
  },
  "Enlist a Real Academic Supporter": {
    stability: 5,
    influence: 6
  },
  "Publish in a Journal to Gain Credibility": {
    stability: 7,
    influence: 4
  },
  "Publish and Promote Our Own Whitepaper": {
    stability: -3,
    influence: 6
  },
  "Engage with Podcast Platforms": {
    stability: 4,
    influence: 7
  },
  "Secure Celebrity Support": {
    stability: -5,
    influence: 15
  },
  "Host Community Events": {
    stability: 8,
    influence: 5
  },
  "Create an Alternative Media Platform": {
    stability: -4,
    influence: 9
  },
  "Promote Intellectual Freedom": {
    stability: 6,
    influence: 3
  },
  "Allege Media Bias": {
    stability: -6,
    influence: 8
  }
};

export const calculateMetrics = (choices: string[]) => {
  const baselineScore = 50;
  
  return choices.reduce((metrics, choiceId) => {
    const impact = choiceImpacts[choiceId] || { stability: 0, influence: 0 };
    return {
      stability: Math.max(0, Math.min(100, metrics.stability + impact.stability)),
      influence: Math.max(0, Math.min(100, metrics.influence + impact.influence)),
    };
  }, {
    stability: baselineScore,
    influence: baselineScore,
  });
};
