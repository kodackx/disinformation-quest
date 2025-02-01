import { ChoiceID } from './constants/metrics';
import { ExpertAudio } from '@/utils/months';

export interface LoadingMessage {
  action: string;
  duration: number;
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
  choiceId?: ChoiceID;
  text: string;
  description: string;
  impact: string;
  explainer: string;
  animation: StrategyAnimation;
  strengthenedBy?: ChoiceID[];
  weakenedBy?: ChoiceID[];
  requires?: ChoiceID[];
  result: ChoiceResult;
  loadingMessageKey: string;
}

export interface GameStage {
  id: number;
  monthIndex: number;
  title: string;
  description: React.ReactNode;
  choices: Choice[];
}

export interface DossierEntry {
  dateKey: string;
  titleKey: string;
  insightKeys: string[];
  strategicNoteKey: string;
}