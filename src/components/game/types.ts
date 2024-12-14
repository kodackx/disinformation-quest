export interface GameStage {
  id: number;
  title: string;
  description: React.ReactNode;
  choices: {
    id: number;
    text: string;
    description: string;
    impact: string;
    result: {
      title: string;
      description: string;
      insights: string[];
      nextStepHint: string;
    };
  }[];
}

export interface DossierEntry {
  date: string;
  title: string;
  insights: string[];
  strategicNote: string;
}

export interface LoadingMessage {
  action: string;
  duration: number;
}

export interface ExpertAudio {
  briefing: string;
  voice: string;
} 