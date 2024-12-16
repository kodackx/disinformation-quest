interface MetricImpact {
  virality: number;
  reach: number;
  loyalists: number;
}

interface ChoiceEffect {
  baseImpact: MetricImpact;
  strengthenedBy: string[];
  weakenedBy: string[];
}

// Define the base impact of each choice on metrics
const choiceEffects: Record<string, ChoiceEffect> = {
  "Deploy Independent Bot Network": {
    baseImpact: {
      virality: 1.1,
      reach: 8,
      loyalists: 2
    },
    strengthenedBy: ["Establish Diverse Meme Channels", "Launch Automated News Platforms"],
    weakenedBy: ["Infiltrate Niche Online Communities"]
  },
  "Establish Diverse Meme Channels": {
    baseImpact: {
      virality: 1.2,
      reach: 5,
      loyalists: 3
    },
    strengthenedBy: ["Infiltrate Niche Online Communities", "Engage with Podcast Platforms"],
    weakenedBy: ["Launch Automated News Platforms"]
  },
  "Launch Automated News Platforms": {
    baseImpact: {
      virality: 1.05,
      reach: 12,
      loyalists: 4
    },
    strengthenedBy: ["Deploy Independent Bot Network", "Release Independent Research Paper"],
    weakenedBy: ["Establish Diverse Meme Channels"]
  },
  "Infiltrate Niche Online Communities": {
    baseImpact: {
      virality: 1.1,
      reach: 3,
      loyalists: 8
    },
    strengthenedBy: ["Establish Diverse Meme Channels", "Engage with Podcast Platforms"],
    weakenedBy: ["Deploy Independent Bot Network"]
  },
  "Stay the Course": {
    baseImpact: {
      virality: 1.0,
      reach: 2,
      loyalists: 5
    },
    strengthenedBy: ["Infiltrate Niche Online Communities"],
    weakenedBy: ["Launch a Counter-Campaign Against Dr. Carter"]
  },
  "Launch a Counter-Campaign Against Dr. Carter": {
    baseImpact: {
      virality: 1.15,
      reach: 7,
      loyalists: -2
    },
    strengthenedBy: ["Deploy Independent Bot Network", "Establish Diverse Meme Channels"],
    weakenedBy: ["Stay the Course"]
  },
  "Release Independent Research Paper": {
    baseImpact: {
      virality: 1.05,
      reach: 5,
      loyalists: 6
    },
    strengthenedBy: ["Launch Automated News Platforms", "Fabricate a Credible Expert"],
    weakenedBy: ["Recruit from Lower-Tier Academia"]
  },
  "Create Historical Conspiracy Documentary": {
    baseImpact: {
      virality: 1.2,
      reach: 8,
      loyalists: 4
    },
    strengthenedBy: ["Establish Diverse Meme Channels", "Engage with Podcast Platforms"],
    weakenedBy: ["Release Independent Research Paper"]
  },
  "Engage with Podcast Platforms": {
    baseImpact: {
      virality: 1.1,
      reach: 6,
      loyalists: 5
    },
    strengthenedBy: ["Create Historical Conspiracy Documentary", "Infiltrate Niche Online Communities"],
    weakenedBy: ["Release Independent Research Paper"]
  }
};

// Bonus multipliers for strengthened/weakened effects
const STRENGTHEN_MULTIPLIER = 1.25;
const WEAKEN_MULTIPLIER = 0.75;

export const calculateMetrics = (choices: string[] = []): MetricImpact => {
  // Initialize base metrics
  let cumulativeMetrics: MetricImpact = {
    virality: 1.0,  // Start with neutral multiplier
    reach: 0,
    loyalists: 0
  };

  // If no choices, return initial metrics
  if (!choices || choices.length === 0) {
    return cumulativeMetrics;
  }

  // Process each choice in sequence
  choices.forEach((currentChoice, index) => {
    const effect = choiceEffects[currentChoice];
    if (!effect) return;

    // Calculate modifiers based on previous choices
    const previousChoices = choices.slice(0, index);
    let strengthenedCount = effect.strengthenedBy.filter(choice => 
      previousChoices.includes(choice)
    ).length;
    let weakenedCount = effect.weakenedBy.filter(choice => 
      previousChoices.includes(choice)
    ).length;

    // Apply base impact with modifiers
    let impactMultiplier = 1.0;
    impactMultiplier += (strengthenedCount * (STRENGTHEN_MULTIPLIER - 1));
    impactMultiplier -= (weakenedCount * (1 - WEAKEN_MULTIPLIER));

    // Update metrics
    cumulativeMetrics.virality *= (effect.baseImpact.virality * impactMultiplier);
    cumulativeMetrics.reach += (effect.baseImpact.reach * impactMultiplier);
    cumulativeMetrics.loyalists += (effect.baseImpact.loyalists * impactMultiplier);
  });

  // Round and clamp values
  return {
    virality: Number(cumulativeMetrics.virality.toFixed(1)),
    reach: Math.min(100, Math.max(0, Math.round(cumulativeMetrics.reach))),
    loyalists: Math.min(100, Math.max(0, Math.round(cumulativeMetrics.loyalists)))
  };
};