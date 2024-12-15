import { ChoiceImpact } from './metrics';
import { CHOICE_IMPLICATIONS } from './choiceImplications';
import { calculateMetrics } from './metrics';

export interface FinalReport {
  keyAchievements: string[];
  strategicAssessment: string;
  futureImplications: string;
  reward: {
    title: string;
    description: string;
    implications: string[];
  };
  metrics: {
    stability: number;
    influence: number;
  };
}

export function generateFinalReport(choices: string[]): FinalReport {
  const keyAchievements = choices.map(choice => CHOICE_IMPLICATIONS[choice]);
  
  const institutionalChoices = choices.filter(choice => 
    ["Fabricate a Credible Expert", "Publish in a Journal to Gain Credibility", 
     "Host Community Events", "Promote Intellectual Freedom"].includes(choice)
  ).length;

  const politicalChoices = choices.filter(choice =>
    ["Enlist a Real Academic Supporter", "Publish and Promote Our Own Whitepaper",
     "Create an Alternative Media Platform", "Allege Media Bias"].includes(choice)
  ).length;

  const reward = institutionalChoices > politicalChoices
    ? {
        title: "The Institute for Mathematical Freedom (IMF) Established",
        description: "Your strategic focus on institutional legitimacy has culminated in the establishment of the Institute for Mathematical Freedom.",
        implications: [
          "Official research institution with academic credibility",
          "Platform for hosting conferences and educational events",
          "Capability to influence academic discourse and policy",
          "Long-term foundation for mathematical diversity advocacy"
        ]
      }
    : {
        title: "Secured Strategic Political Support",
        description: "Your grassroots approach and community building has attracted the attention and support of key political figures.",
        implications: [
          "Political champions advocating for mathematical freedom",
          "Potential for policy-level changes in education",
          "Access to legislative and regulatory channels",
          "Growing influence in public sector decision-making"
        ]
      };

  const strategicAssessment = `Our campaign has successfully ${
    institutionalChoices > politicalChoices
      ? "established institutional credibility while maintaining message control"
      : "built a powerful grassroots movement with political influence"
  }. Through ${choices.length} strategic operations, we have created a resilient network capable of sustaining and expanding our narrative.`;

  const futureImplications = `With ${
    institutionalChoices > politicalChoices
      ? "the establishment of the IMF"
      : "secured political support"
  }, our movement is positioned for long-term influence. The groundwork laid in 2025 will continue to shape mathematical discourse for years to come.`;

  return {
    keyAchievements,
    strategicAssessment,
    futureImplications,
    reward,
    metrics: calculateMetrics(choices),
  };
}