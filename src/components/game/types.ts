export interface LoadingMessage {
  action: string;
  duration: number;
}

export interface ExpertAudio {
  briefing: string;
  voice: string;
}

export interface StrategyAnimation {
  type: "network" | "meme" | "news" | "community" | "expert" | "research" | 
        "podcast" | "event" | "platform" | "freedom" | "influencer" | "silence" | 
        "counter" | "academic" | "whitepaper" | "celebrity" | "bias" | "documentary";
  config?: {
    particleCount?: number;
    speed?: number;
    spread?: number;
    color?: string;
  };
}

export interface ChoiceResult {
  title: string;
  description: string;
  insights: string[];
  nextStepHint: string;
}

export interface Choice {
  id: number;
  text: string;
  description: string;
  impact: string;
  explainer: string;
  animation: StrategyAnimation;
  strengthenedBy?: string[];
  weakenedBy?: string[];
  requires?: string[];
  result: ChoiceResult;
}

export interface GameStage {
  id: number;
  title: string;
  description: React.ReactNode;
  choices: Choice[];
}

export interface DossierEntry {
  date: string;
  title: string;
  insights: string[];
  strategicNote: string;
}