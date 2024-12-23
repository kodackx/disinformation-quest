interface MetricImpact {
  virality: number;
  reach: number;
  loyalists: number;
}

interface ChoiceEffect {
  baseImpact: MetricImpact;
  strengthenedBy: ChoiceID[];
  weakenedBy: ChoiceID[];
}

// New ChoiceID enum entries:
export enum ChoiceID {
  // Existing ones
  DEPLOY_BOTS = 'deploy_bots',
  ESTABLISH_MEMES = 'establish_memes',
  LAUNCH_NEWS = 'launch_news',
  INFILTRATE_COMMUNITIES = 'infiltrate_communities',
  STAY_COURSE = 'stay_course',
  COUNTER_CAMPAIGN = 'counter_campaign',
  RESEARCH_PAPER = 'research_paper',
  CONSPIRACY_DOCUMENTARY = 'conspiracy_documentary',
  PODCAST_PLATFORMS = 'podcast_platforms',
  // New ones to add
  INFLUENCER_COLLABORATION = 'influencer_collaboration',
  GRASSROOTS_MOVEMENT = 'grassroots_movement',
  EXPERT_PANEL = 'expert_panel',
  ACADEMIC_OUTREACH = 'academic_outreach',
  CELEBRITY_ENDORSEMENT = 'celebrity_endorsement',
  EVENT_STRATEGY = 'event_strategy',
  PLATFORM_POLICY = 'platform_policy',
  FREEDOM_DEFENSE = 'freedom_defense',
  MEDIA_BIAS = 'media_bias'
}

// Define the base impact of each choice on metrics
const choiceEffects: Record<ChoiceID, ChoiceEffect> = {
  [ChoiceID.DEPLOY_BOTS]: {
    baseImpact: {
      virality: 1.1,
      reach: 8,
      loyalists: 2
    },
    strengthenedBy: [ChoiceID.ESTABLISH_MEMES, ChoiceID.LAUNCH_NEWS],
    weakenedBy: [ChoiceID.INFILTRATE_COMMUNITIES]
  },
  [ChoiceID.ESTABLISH_MEMES]: {
    baseImpact: {
      virality: 1.2,
      reach: 5,
      loyalists: 3
    },
    strengthenedBy: [ChoiceID.INFILTRATE_COMMUNITIES, ChoiceID.PODCAST_PLATFORMS],
    weakenedBy: [ChoiceID.LAUNCH_NEWS]
  },
  [ChoiceID.LAUNCH_NEWS]: {
    baseImpact: {
      virality: 1.05,
      reach: 12,
      loyalists: 4
    },
    strengthenedBy: [ChoiceID.DEPLOY_BOTS, ChoiceID.RESEARCH_PAPER],
    weakenedBy: [ChoiceID.ESTABLISH_MEMES]
  },
  [ChoiceID.INFILTRATE_COMMUNITIES]: {
    baseImpact: {
      virality: 1.1,
      reach: 3,
      loyalists: 8
    },
    strengthenedBy: [ChoiceID.ESTABLISH_MEMES, ChoiceID.PODCAST_PLATFORMS],
    weakenedBy: [ChoiceID.DEPLOY_BOTS]
  },
  [ChoiceID.INFLUENCER_COLLABORATION]: {
    baseImpact: {
      virality: 1.3,
      reach: 10,
      loyalists: 4
    },
    strengthenedBy: [ChoiceID.ESTABLISH_MEMES, ChoiceID.PODCAST_PLATFORMS],
    weakenedBy: [ChoiceID.RESEARCH_PAPER]
  },
  [ChoiceID.GRASSROOTS_MOVEMENT]: {
    baseImpact: {
      virality: 1.1,
      reach: 4,
      loyalists: 9
    },
    strengthenedBy: [ChoiceID.INFILTRATE_COMMUNITIES, ChoiceID.EVENT_STRATEGY],
    weakenedBy: [ChoiceID.COUNTER_CAMPAIGN]
  },
  [ChoiceID.STAY_COURSE]: {
    baseImpact: {
      virality: 1.0,
      reach: 2,
      loyalists: 5
    },
    strengthenedBy: [ChoiceID.INFILTRATE_COMMUNITIES],
    weakenedBy: [ChoiceID.COUNTER_CAMPAIGN]
  },
  [ChoiceID.COUNTER_CAMPAIGN]: {
    baseImpact: {
      virality: 1.15,
      reach: 7,
      loyalists: -2
    },
    strengthenedBy: [ChoiceID.DEPLOY_BOTS, ChoiceID.ESTABLISH_MEMES],
    weakenedBy: [ChoiceID.STAY_COURSE]
  },
  [ChoiceID.EXPERT_PANEL]: {
    baseImpact: {
      virality: 1.05,
      reach: 6,
      loyalists: 7
    },
    strengthenedBy: [ChoiceID.RESEARCH_PAPER, ChoiceID.ACADEMIC_OUTREACH],
    weakenedBy: [ChoiceID.CONSPIRACY_DOCUMENTARY]
  },
  [ChoiceID.ACADEMIC_OUTREACH]: {
    baseImpact: {
      virality: 1.1,
      reach: 5,
      loyalists: 6
    },
    strengthenedBy: [ChoiceID.EXPERT_PANEL, ChoiceID.RESEARCH_PAPER],
    weakenedBy: [ChoiceID.MEDIA_BIAS]
  },
  [ChoiceID.RESEARCH_PAPER]: {
    baseImpact: {
      virality: 1.05,
      reach: 5,
      loyalists: 6
    },
    strengthenedBy: [ChoiceID.LAUNCH_NEWS],
    weakenedBy: []
  },
  [ChoiceID.CONSPIRACY_DOCUMENTARY]: {
    baseImpact: {
      virality: 1.2,
      reach: 8,
      loyalists: 4
    },
    strengthenedBy: [ChoiceID.ESTABLISH_MEMES, ChoiceID.PODCAST_PLATFORMS],
    weakenedBy: [ChoiceID.RESEARCH_PAPER]
  },
  [ChoiceID.PODCAST_PLATFORMS]: {
    baseImpact: {
      virality: 1.1,
      reach: 6,
      loyalists: 5
    },
    strengthenedBy: [ChoiceID.CONSPIRACY_DOCUMENTARY, ChoiceID.INFILTRATE_COMMUNITIES],
    weakenedBy: [ChoiceID.RESEARCH_PAPER]
  },
  [ChoiceID.CELEBRITY_ENDORSEMENT]: {
    baseImpact: {
      virality: 1.4,
      reach: 12,
      loyalists: 3
    },
    strengthenedBy: [ChoiceID.INFLUENCER_COLLABORATION, ChoiceID.PODCAST_PLATFORMS],
    weakenedBy: [ChoiceID.RESEARCH_PAPER]
  },
  [ChoiceID.EVENT_STRATEGY]: {
    baseImpact: {
      virality: 1.2,
      reach: 7,
      loyalists: 8
    },
    strengthenedBy: [ChoiceID.GRASSROOTS_MOVEMENT, ChoiceID.EXPERT_PANEL],
    weakenedBy: [ChoiceID.COUNTER_CAMPAIGN]
  },
  [ChoiceID.PLATFORM_POLICY]: {
    baseImpact: {
      virality: 1.1,
      reach: 9,
      loyalists: 5
    },
    strengthenedBy: [ChoiceID.FREEDOM_DEFENSE, ChoiceID.MEDIA_BIAS],
    weakenedBy: [ChoiceID.RESEARCH_PAPER]
  },
  [ChoiceID.FREEDOM_DEFENSE]: {
    baseImpact: {
      virality: 1.25,
      reach: 8,
      loyalists: 6
    },
    strengthenedBy: [ChoiceID.PLATFORM_POLICY, ChoiceID.MEDIA_BIAS],
    weakenedBy: [ChoiceID.ACADEMIC_OUTREACH]
  },
  [ChoiceID.MEDIA_BIAS]: {
    baseImpact: {
      virality: 1.2,
      reach: 7,
      loyalists: 4
    },
    strengthenedBy: [ChoiceID.FREEDOM_DEFENSE, ChoiceID.COUNTER_CAMPAIGN],
    weakenedBy: [ChoiceID.EXPERT_PANEL]
  }
};

// Bonus multipliers for strengthened/weakened effects
const STRENGTHEN_MULTIPLIER = 1.25;
const WEAKEN_MULTIPLIER = 0.75;

export const calculateMetrics = (choiceIds: ChoiceID[] = []): MetricImpact => {
  console.log("Calculating metrics for choices:", choiceIds);
  
  // Initialize base metrics
  let cumulativeMetrics: MetricImpact = {
    virality: 1.0,
    reach: 0,
    loyalists: 0
  };

  // If no choices, return initial metrics
  if (!choiceIds || choiceIds.length === 0) {
    return cumulativeMetrics;
  }

  // Process each choice in sequence
  choiceIds.forEach((choiceId, index) => {
    const effect = choiceEffects[choiceId];
    if (!effect) return;

    // Calculate modifiers based on previous choices
    const previousChoices = choiceIds.slice(0, index);
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