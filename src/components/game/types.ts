export interface LoadingMessage {
  action: string;
  duration: number;
}

export interface ExpertAudio {
  briefing: string;
  voice: string;
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
  strengthenedBy?: string[]; // Previous choices that make this stronger
  weakenedBy?: string[]; // Previous choices that make this weaker
  requires?: string[]; // Previous choices required to unlock
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
 