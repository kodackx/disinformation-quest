import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DossierPanel } from "@/components/game/DossierPanel";
import { LoadingOverlay } from "@/components/game/LoadingOverlay";
import { BriefingAudio } from "@/components/game/BriefingAudio";
import { GameBackground } from "@/components/GameBackground";
import { MonthTransition } from "@/components/MonthTransition";
import { IntroDialog } from "../components/game/IntroDialog"; 
import { stages, OPERATION_NAMES, LOADING_MESSAGES, generateFinalReport } from "@/components/game/constants";
import { DossierEntry, GameStage } from "@/components/game/types";
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Lock, Shield } from "lucide-react";
import { playAcceptMissionSound, playDeployStratagemSound, playRecordingSound, playClickSound } from "@/utils/audio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TransitionStyle } from "@/components/MonthTransition";
import { ChoiceCard } from "@/components/game/ChoiceCard";
import { FinalMemo } from '../components/game/FinalMemo';
import { StrategyAnimation } from '@/components/game/StrategyAnimation';
import { IntroAudio } from '@/components/game/IntroAudio';
import { Footer } from '../components/Footer';

const Index = () => {
  const operationName = OPERATION_NAMES[Math.floor(Math.random() * OPERATION_NAMES.length)];
  const [agentNumber] = useState(Math.floor(Math.random() * 999).toString().padStart(3, '0'));
  
  const [currentStage, setCurrentStage] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showingResult, setShowingResult] = useState(false);
  const [currentResult, setCurrentResult] = useState<GameStage["choices"][0]["result"] | null>(null);
  const [dossierEntries, setDossierEntries] = useState<DossierEntry[]>([]);
  const { toast } = useToast();
  const [showingMonthTransition, setShowingMonthTransition] = useState(false);
  const [nextStage, setNextStage] = useState<number | null>(null);
  const [transitionStyle, setTransitionStyle] = useState<TransitionStyle>(TransitionStyle.NUMBER_CYCLE);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showingInitialTransition, setShowingInitialTransition] = useState(false);
  const [showIntroDialog, setShowIntroDialog] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<GameStage["choices"][0] | null>(null);
  const [previousChoices, setPreviousChoices] = useState<string[]>([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [playerChoices, setPlayerChoices] = useState<string[]>([]);
  const [gameKey, setGameKey] = useState(0);

  const handleStartGame = () => {
    playAcceptMissionSound();
    setShowIntroDialog(false);
    setShowingInitialTransition(true);
  };

  const handleInitialTransitionComplete = () => {
    setShowingInitialTransition(false);
    setGameStarted(true);
    toast({
      title: "Welcome to Operation Mathematical Persuasion",
      description: "Your mission begins now. Choose your strategies carefully.",
    });
  };

  const handleChoice = async (choice: GameStage["choices"][0]) => {
    setPreviousChoices(prev => [...prev, choice.text]);
    playDeployStratagemSound();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    setIsLoading(true);
    setLoadingProgress(0);
    
    const messages = LOADING_MESSAGES[choice.text] || [
      { action: "Processing operation...", duration: 2000 },
      { action: "Analyzing results...", duration: 2000 },
    ];
    
    let totalDuration = 0;
    for (const message of messages) {
      totalDuration += message.duration;
    }
    
    let elapsed = 0;
    for (const message of messages) {
      setLoadingMessage(message.action);
      await new Promise(resolve => setTimeout(resolve, message.duration));
      elapsed += message.duration;
      setLoadingProgress((elapsed / totalDuration) * 100);
    }
    
    setIsLoading(false);
    setCurrentResult(choice.result);
    setShowingResult(true);
    
    const newEntry: DossierEntry = {
      date: stages[currentStage].title.split(":")[0],
      title: choice.result.title,
      insights: choice.result.insights,
      strategicNote: choice.result.nextStepHint
    };
    
    setDossierEntries(prev => [...prev, newEntry]);
    
    toast({
      title: "Intelligence Gathered",
      description: "New information has been added to your dossier.",
    });
    
    if (currentStage === stages.length - 1) {
      setGameComplete(true);
    }
  };

  const handleContinue = () => {
    playDeployStratagemSound();
    setShowingResult(false);
    
    // Check if this was the last stage
    if (currentStage >= stages.length - 1) {
      setGameComplete(true);
      return;
    }

    // Otherwise, continue to next stage
    setShowingMonthTransition(true);
    setNextStage(currentStage + 1);
  };

  const handleTransitionComplete = () => {
    setShowingMonthTransition(false);
    if (nextStage !== null) {
      setCurrentStage(nextStage);
      setNextStage(null);
    }
  };

  const handleStrategyClick = (choice: GameStage["choices"][0]) => {
    playClickSound();
    setSelectedChoice(choice);
    setShowConfirmDialog(true);
  };

  const handleConfirmStrategy = async () => {
    if (!selectedChoice) return;
    setShowConfirmDialog(false);
    await handleChoice(selectedChoice);
  };

  const handleRestart = () => {
    setGameKey(prev => prev + 1);
    setCurrentStage(0);
    setGameStarted(false);
    setShowingResult(false);
    setCurrentResult(null);
    setDossierEntries([]);
    setPreviousChoices([]);
    setGameComplete(false);
    setPlayerChoices([]);
    setShowIntroDialog(true);
    setShowingInitialTransition(false);
    setSelectedChoice(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  if (!gameStarted) {
    if (showingInitialTransition) {
      return (
        <div className="relative min-h-screen overflow-hidden">
          <GameBackground />
          <div className="relative min-h-screen bg-transparent p-4 flex items-center justify-center">
            <div className="max-w-4xl mx-auto w-full relative">
              <MonthTransition 
                month={stages[0].title.split(":")[0]}
                onComplete={handleInitialTransitionComplete}
                style={TransitionStyle.NUMBER_CYCLE}
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="relative min-h-screen overflow-hidden">
        <GameBackground />
        <div className="relative min-h-screen bg-transparent flex items-center justify-center p-4">
          {showIntroDialog && <IntroDialog />}
          <Card className="w-full md:max-w-2xl bg-black/50 text-white border-gray-700 transition-all duration-1000 animate-fade-in backdrop-blur-sm">
            <CardHeader className="text-center space-y-4 p-4 md:p-6">
              <div className="flex justify-between items-center px-4">
                <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                  <Lock className="w-3 h-3 mr-1" />
                  TOP SECRET
                </Badge>
                <Badge variant="outline" className="text-red-500 border-red-500">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  CLASSIFIED
                </Badge>
              </div>
              
              <div className="relative">
                <CardTitle className="text-2xl md:text-3xl mb-2 relative z-10">
                  Operation {operationName}
                </CardTitle>
                <div className="absolute -rotate-12 opacity-30 top-0 left-1/2 -translate-x-1/2 border-8 border-red-500 rounded w-full py-8 z-0">
                  <span className="text-red-500 text-4xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    CLASSIFIED
                  </span>
                </div>
              </div>
              
              <CardDescription className="text-yellow-500 font-mono text-sm flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                CLEARANCE LEVEL: 5
                <Shield className="w-4 h-4" />
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="pb-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-center text-sm border-b border-gray-700 pb-3">
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-yellow-500 font-semibold tracking-wider">DIRECTORATE OF STRATEGIC INFLUENCE</p>
                      <IntroAudio />
                    </div>
                  </div>
                  <div className="text-gray-300 font-mono text-sm space-y-1">
                    <p>To: Agent {agentNumber}</p>
                    <p>Subject: Operation {operationName} – Establishing Consensus on "2+2=5"</p>
                    <p className="text-xs text-gray-500">Date: {new Date().toLocaleDateString('en-GB')}</p>
                  </div>
                </div>
                
                <div className="mt-6 text-gray-300 font-mono leading-relaxed space-y-4">
                  <div className="space-y-4">
                    <p>Agent, our analysis identifies a critical opportunity to sow confusion and reshape public understanding. Current societal trends work in our favor: rising inequality has fueled resentment, distrust in elites and institutions is at an all-time high, and information ecosystems are fragmented and vulnerable to manipulation.</p>
                  </div>

                  <div className="space-y-4">
                    <p>Your mission is clear: convince the masses that '2+2=5' is not only plausible but true. Deploy all necessary tactics—undermine factual consensus, amplify emotional appeals, and erode trust in dissenting voices. Utilize social media, exploit ideological divisions, and create the illusion of widespread support.</p>
                  </div>

                  <p className="pt-2 text-yellow-500 font-bold">Success will depend on subtlety, persistence, and leveraging the chaos of the current moment. Failure is not an option. Begin immediately.</p>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <p className="text-yellow-500 italic font-mono text-center mb-6 text-sm tracking-wider">
                  "In the world of perception, truth is a narrative waiting to be rewritten."
                </p>

                <div className="flex flex-col items-center gap-2">
                  <Button 
                    onClick={handleStartGame}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-6 text-lg transition-all duration-500 font-mono relative group"
                  >
                    <span className="group-hover:animate-pulse">ACCEPT MISSION</span>
                  </Button>
                  <p className="text-red-500 text-sm font-mono">
                    WARNING: This document will self-destruct upon closing
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentStageData = stages[currentStage];

  if (gameComplete) {
    return <FinalMemo 
      key={gameKey} 
      choices={previousChoices} 
      onRestart={handleRestart}
      agentNumber={agentNumber}
    />;
  }

  if (!currentStageData) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <GameBackground />
        <div className="relative min-h-screen bg-transparent p-4">
          <Card className="w-full max-w-4xl mx-auto bg-black/50 text-white border-gray-700 transition-all duration-1000 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-yellow-500">
                Operation Status Unknown
              </CardTitle>
              <CardDescription className="text-gray-300 text-center">
                Please restart the mission.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pt-4">
              <Button 
                onClick={() => {
                  setCurrentStage(0);
                  setGameStarted(false);
                  setPreviousChoices([]);
                  setGameComplete(false);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 text-lg transition-all duration-500"
              >
                Start New Operation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showingResult && currentResult) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <GameBackground />
        <div className="relative min-h-screen bg-transparent p-4 flex items-center justify-center">
          <Card className="w-full md:max-w-2xl bg-black/50 text-white border-gray-700 transition-all duration-1000 animate-fade-in">
            <CardHeader>
              <div className="flex flex-col gap-4">
                <CardTitle className="text-xl md:text-2xl text-yellow-500">{currentResult.title}</CardTitle>
                <CardDescription className="text-gray-300">
                  {currentResult.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-yellow-500 font-semibold mb-3">Key Insights Gathered:</h3>
                <ul className="space-y-2">
                  {currentResult.insights.map((insight, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <span className="text-yellow-500">•</span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <p className="text-gray-400 italic">
                  <span className="text-yellow-500 font-semibold">Strategic Insight: </span>
                  {currentResult.nextStepHint}
                </p>
              </div>

              <div className="flex justify-center pt-4">
                <Button 
                  onClick={handleContinue}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 text-lg transition-all duration-500"
                >
                  Proceed to Next Phase
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showingMonthTransition && nextStage !== null && stages[nextStage]) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <GameBackground />
        <div className="relative min-h-screen bg-transparent p-4 flex items-center justify-center">
          <MonthTransition 
            month={stages[nextStage].title.split(":")[0]}
            onComplete={handleTransitionComplete}
            style={transitionStyle}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <GameBackground />
      <div className="relative min-h-screen bg-transparent p-4 flex flex-col">
        <div className="flex-grow flex items-center">
          <div className="max-w-full md:max-w-4xl mx-auto w-full px-2 md:px-4">
            <Card className="bg-black/50 text-white border-gray-700 transition-all duration-1000 animate-fade-in">
              <CardHeader className="p-3 md:p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <BriefingAudio 
                      stage={currentStageData.title} 
                      audioRef={audioRef} 
                      className="self-start"
                    />
                    {currentStage > 0 && <DossierPanel entries={dossierEntries} choices={previousChoices} />}
                  </div>
                  <CardTitle>{currentStageData.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {currentStageData.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentStageData.choices.map((choice, index) => (
                  <ChoiceCard
                    key={choice.id}
                    choice={choice}
                    previousChoices={previousChoices}
                    onClick={() => handleStrategyClick(choice)}
                    disabled={showingResult || isLoading}
                    optionNumber={index + 1}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="bg-black/90 text-white border-gray-700 w-[95vw] max-w-2xl mx-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-yellow-500">
              {selectedChoice?.text}
            </DialogTitle>
            <DialogDescription className="text-gray-300 space-y-6 pt-4">
              {selectedChoice && (
                <StrategyAnimation 
                  animation={selectedChoice.animation} 
                  className="mb-6"
                />
              )}

              {selectedChoice && (
                <>
                  {(selectedChoice.strengthenedBy?.some(choice => previousChoices.includes(choice)) ||
                    selectedChoice.weakenedBy?.some(choice => previousChoices.includes(choice))) && (
                    <div className="text-sm space-y-3 mb-4">
                      {selectedChoice.strengthenedBy?.some(choice => previousChoices.includes(choice)) && (
                        <div className="flex items-start gap-2">
                          <span className="text-green-400">↑</span>
                          <div>
                            <span className="text-green-400">Enhanced</span>
                            <span className="text-gray-400"> by: </span>
                            {selectedChoice.strengthenedBy
                              .filter(choice => previousChoices.includes(choice))
                              .join(', ')}
                          </div>
                        </div>
                      )}
                      {selectedChoice.weakenedBy?.some(choice => previousChoices.includes(choice)) && (
                        <div className="flex items-start gap-2">
                          <span className="text-red-400">↓</span>
                          <div>
                            <span className="text-red-400">Weakened</span>
                            <span className="text-gray-400"> by: </span>
                            {selectedChoice.weakenedBy
                              .filter(choice => previousChoices.includes(choice))
                              .join(', ')}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            
              <div>
                <h3 className="text-yellow-500 font-semibold mb-2">Strategy Overview:</h3>
                <p className="text-gray-300">{selectedChoice?.description}</p>
              </div>

             

              <div>
                <h3 className="text-yellow-500 font-semibold mb-2">Expert Analysis:</h3>
                <p className="text-gray-300">{selectedChoice?.explainer}</p>
              </div>

              <div className="flex justify-center pt-4">
                <Button 
                  onClick={handleConfirmStrategy}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 text-lg transition-all duration-500"
                >
                  Deploy Stratagem
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {isLoading && <LoadingOverlay message={loadingMessage} progress={loadingProgress} />}
    </div>
  );
};

export default Index;
