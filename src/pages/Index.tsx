import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DossierPanel } from "@/components/game/DossierPanel";
import { LoadingOverlay } from "@/components/game/LoadingOverlay";
import { BriefingAudio } from "@/components/game/BriefingAudio";
import { GameBackground } from "@/components/GameBackground";
import { MonthTransition } from "@/components/MonthTransition";
import { IntroDialog } from "../components/game/IntroDialog"; 
import { useGameStages, OPERATION_NAMES, useLoadingMessages, generateFinalReport } from "@/components/game/constants";
import { ChoiceID, calculateMetrics } from "@/components/game/constants/metrics";
import { DossierEntry, GameStage } from "@/components/game/types";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Lock, Shield } from "lucide-react";
import { playAcceptMissionSound, playDeployStratagemSound, playRecordingSound, playClickSound, stopBackgroundMusic, switchToFinalMusic, stopFinalMusic } from "@/utils/audio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TransitionStyle } from "@/components/MonthTransition";
import { ChoiceCard } from "@/components/game/ChoiceCard";
import { FinalReport } from '../components/game/FinalReport';
import { StrategyAnimation } from '@/components/game/StrategyAnimation';
import { IntroAudio } from '@/components/game/IntroAudio';
import { Footer } from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import '@/i18n/config';
import { MetricsDisplay } from "@/components/game/MetricsDisplay";
import { MuteButton } from '@/components/MuteButton';
import { DevPanel } from "@/components/game/DevPanel";
import { motion } from "framer-motion";
import { MONTHS_CONFIG, getMonthConfig } from "@/utils/months";
import { toast } from "sonner";
import { ProgressionIndicator } from '@/components/game/ProgressionIndicator';
import { EndGameDialog } from '../components/game/EndGameDialog';

// Get valid month keys (skipping index 0)
const monthKeys = MONTHS_CONFIG.slice(1).map(config => config?.key).filter(Boolean) as string[];

const STAGE_CHOICES = [
  [ChoiceID.DEPLOY_BOTS, ChoiceID.ESTABLISH_MEMES],               // January
  [ChoiceID.LAUNCH_NEWS, ChoiceID.INFILTRATE_COMMUNITIES],        // March
  [ChoiceID.INFLUENCER_COLLABORATION, ChoiceID.GRASSROOTS_MOVEMENT], // May
  [ChoiceID.STAY_COURSE, ChoiceID.COUNTER_CAMPAIGN],              // Alert
  [ChoiceID.FAKE_EXPERT, ChoiceID.ACADEMIC_OUTREACH],           // July
  [ChoiceID.RESEARCH_PAPER, ChoiceID.CONSPIRACY_DOCUMENTARY],     // September
  [ChoiceID.PODCAST_PLATFORMS, ChoiceID.CELEBRITY_ENDORSEMENT],   // November
  [ChoiceID.EVENT_STRATEGY, ChoiceID.PLATFORM_POLICY],           // December
  [ChoiceID.FREEDOM_DEFENSE, ChoiceID.MEDIA_BIAS]                // Exposé
] as const;

const Index = () => {
  const { t, i18n } = useTranslation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [previousChoices, setPreviousChoices] = useState<ChoiceID[]>([]);
  const stages = useGameStages(audioRef);
  const operationNameKey = OPERATION_NAMES[Math.floor(Math.random() * OPERATION_NAMES.length)];
  const operationName = t(`operations.${operationNameKey}`);
  const [agentNumber] = useState(Math.floor(Math.random() * 999).toString().padStart(3, '0'));
  
  const [currentStage, setCurrentStage] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showingResult, setShowingResult] = useState(false);
  const [currentResult, setCurrentResult] = useState<GameStage["choices"][0]["result"] | null>(null);
  const [dossierEntries, setDossierEntries] = useState<DossierEntry[]>([]);
  const [showingMonthTransition, setShowingMonthTransition] = useState(false);
  const [nextStage, setNextStage] = useState<number | null>(null);
  const [transitionStyle, setTransitionStyle] = useState<TransitionStyle>(TransitionStyle.NUMBER_CYCLE);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showingInitialTransition, setShowingInitialTransition] = useState(false);
  const [showIntroDialog, setShowIntroDialog] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<GameStage["choices"][0] | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [playerChoices, setPlayerChoices] = useState<string[]>([]);
  const [gameKey, setGameKey] = useState(0);
  const loadingMessages = useLoadingMessages();
  const [shouldStartAudio, setShouldStartAudio] = useState(false);
  const [showDevPanel, setShowDevPanel] = useState(false);
  const [showFinalFade, setShowFinalFade] = useState(false);
  const [showFinalReport, setShowFinalReport] = useState(false);
  const [showEndGameDialog, setShowEndGameDialog] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        setShowDevPanel(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleJumpToMonth = (monthIndex: number) => {
    setCurrentStage(monthIndex);
    setShowDevPanel(false);
    setGameStarted(true);
    setShowIntroDialog(false);
    setShowingInitialTransition(false);
  };

  const handleRandomizeChoices = () => {
    const randomChoices: ChoiceID[] = [];
    const newDossierEntries: DossierEntry[] = [];
    const newPlayerChoices: string[] = [];
    
    console.log('\n=== Starting Randomization ===');
    
    // For each stage up to current stage, randomly select between A or B
    for (let i = 0; i < currentStage; i++) {
      const stagePair = STAGE_CHOICES[i];
      // Randomly select 0 or 1 to pick between the two choices
      const randomIndex = Math.floor(Math.random() * 2);
      const choiceId = stagePair[randomIndex] as ChoiceID;
      randomChoices.push(choiceId);
      
      // Get the corresponding stage and choice from the stages array
      const stage = stages[i];
      const choice = stage.choices.find(c => c.choiceId === choiceId);
      
      if (choice) {
        // Add to player choices - convert choice.id to string
        newPlayerChoices.push(String(choice.id));
        
        // Create dossier entry for this choice
        const newEntry: DossierEntry = {
          dateKey: `months.${getMonthConfig(i + 1)?.key}`,
          titleKey: `stages.${i + 1}.choices.${String(choice.id)}.result.title`,
          insightKeys: Array.from({ length: 4 }, (_, idx) => `stages.${i + 1}.choices.${String(choice.id)}.result.insights.${idx}`),
          strategicNoteKey: `stages.${i + 1}.choices.${String(choice.id)}.result.nextStepHint`
        };
        newDossierEntries.push(newEntry);
      }
      
      // Log detailed info about this choice
      console.log(`\nStage ${i + 1} (${monthKeys[i].toUpperCase()}):`);
      console.log('Choice ID:', choiceId);
      console.log('Stage Pair Options:', stagePair);
      console.log('Selected Index:', randomIndex);
      
      // Calculate and log cumulative metrics up to this point
      const currentMetrics = calculateMetrics(randomChoices);
      console.log('\nCumulative Metrics after this choice:');
      console.log('Network Reach:', currentMetrics.reach + '%');
      console.log('Core Loyalists:', currentMetrics.loyalists + '%');
      console.log('Virality Multiplier:', currentMetrics.virality + 'x');
      console.log('---');
    }

    console.log('\nFinal Random Choices:', randomChoices);
    console.log('Final Player Choices:', newPlayerChoices);
    console.log('=== Randomization Complete ===\n');

    // Update game state
    setPreviousChoices(randomChoices);
    setDossierEntries(newDossierEntries);
    setPlayerChoices(newPlayerChoices);
    setShowDevPanel(false);
  };

  const handleStartGame = () => {
    playAcceptMissionSound();
    setShowIntroDialog(false);
    setShowingInitialTransition(true);
  };

  const handleInitialTransitionComplete = () => {
    setShowingInitialTransition(false);
    setGameStarted(true);
    toast(t('mission.welcome.description'));
  };

  const handleChoice = async (choice: GameStage["choices"][0]) => {
    playDeployStratagemSound();
    
    // Add the choice to our list
    const choiceId = choice.choiceId;
    setPreviousChoices(prev => [...prev, choiceId]);
    setPlayerChoices(prev => [...prev, String(choice.id)]);
    
    setIsLoading(true);
    setLoadingProgress(0);
    
    const messages = loadingMessages.getMessagesForChoice(choice.loadingMessageKey);
    
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

    // Engage the final stage
    // Keep loading overlay at 100% for a moment
    // Start the fade to black and fade out loading overlay
    // Wait for fade to complete
    // Ensure language state is preserved before showing endgame
    // Set game complete after fade is done
    if (currentStage === stages.length - 1) {
      // Keep loading overlay at 100% for a moment
      await new Promise(resolve => setTimeout(resolve, 500));
      // Start the fade to black and fade out loading overlay
      setShowFinalFade(true);
      setIsLoading(false);
      // Wait for fade to complete
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Ensure language state is preserved before showing endgame
      const currentLang = localStorage.getItem('i18nextLng');
      if (currentLang) {
        i18n.changeLanguage(currentLang);
      }
      
      // Start the final music
      switchToFinalMusic();
      // Show end game dialog instead of setting game complete
      setShowEndGameDialog(true);
      return;
    }
    
    setIsLoading(false);
    setCurrentResult(choice.result);
    setShowingResult(true);
    
    const newEntry: DossierEntry = {
      dateKey: `months.${getMonthConfig(currentStage + 1)?.key}`,
      titleKey: `stages.${currentStage + 1}.choices.${choice.id}.result.title`,
      insightKeys: Array.from({ length: 4 }, (_, i) => `stages.${currentStage + 1}.choices.${choice.id}.result.insights.${i}`),
      strategicNoteKey: `stages.${currentStage + 1}.choices.${choice.id}.result.nextStepHint`
    };
    
    setDossierEntries(prev => [...prev, newEntry]);
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
    setShowFinalReport(false);
    setShowFinalFade(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    // Stop both background and final music when restarting
    stopBackgroundMusic();
    stopFinalMusic();
  };

  const renderContent = () => {
    if (!gameStarted) {
      if (showingInitialTransition) {
        return (
          <div className="relative min-h-screen overflow-hidden">
            <GameBackground shouldStartAudio={shouldStartAudio} />
            <div className="relative min-h-screen bg-transparent p-4 flex items-center justify-center">
              <div className="max-w-4xl mx-auto w-full relative">
                <MonthTransition 
                  stage={1}
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
          <GameBackground shouldStartAudio={shouldStartAudio} />
          <div className="relative min-h-screen bg-transparent flex items-center justify-center p-4">
            {showIntroDialog && <IntroDialog onStartAudio={() => setShouldStartAudio(true)} />}
            <Card className="w-full md:max-w-5xl bg-black/50 text-white border-gray-700 transition-all duration-1000 animate-fade-in backdrop-blur-sm">
              <CardHeader className="text-center space-y-4 p-4 md:p-6">
                <div className="flex justify-between items-center px-4">
                  <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                    <Lock className="w-3 h-3 mr-1" />
                    {t('mission.topSecret')}
                  </Badge>
                  <MuteButton />
                  <Badge variant="outline" className="text-red-500 border-red-500">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {t('mission.classified')}
                  </Badge>
                </div>
                
                <div className="relative">
                  <CardTitle className="text-2xl md:text-3xl mb-2 relative z-10">
                    {t('mission.title', { operationName })}
                  </CardTitle>
                  <div className="absolute -rotate-12 opacity-30 top-0 left-1/2 -translate-x-1/2 border-8 border-red-500 rounded w-full py-8 z-0">
                    <span className="text-red-500 text-4xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      {t('mission.classified')}
                    </span>
                  </div>
                </div>
                
                <CardDescription className="text-yellow-500 font-mono text-sm flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  {t('mission.clearanceLevel')}
                  <Shield className="w-4 h-4" />
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="pb-4">
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center text-sm border-b border-gray-700 pb-3">
                      <p className="font-mono text-yellow-500 font-semibold tracking-wider">{t('mission.directorate')}</p>
                    </div>
                    <div className="text-gray-300 font-mono text-sm space-y-1">
                      <p>{t('mission.to', { agentNumber })}</p>
                      <p>{t('mission.subject', { operationName })}</p>
                      <p className="text-xs text-gray-500">Date: {new Date().toLocaleDateString('en-GB')}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-gray-300 font-mono leading-relaxed space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <h2 className="text-yellow-500 font-mono text-sm">Briefing Audio</h2>
                      <BriefingAudio 
                        stage="INTRO"
                        audioRef={audioRef} 
                        className="bg-transparent hover:bg-black/40"
                      />
                    </div>
                    <div className="space-y-4">
                      <p>{t('mission.briefing.part1')}</p>
                    </div>

                    <div className="space-y-4">
                      <p>{t('mission.briefing.part2')}</p>
                    </div>

                    <p className="pt-2 text-yellow-500 font-bold">{t('mission.briefing.warning')}</p>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <p className="text-yellow-500 italic font-mono text-center mb-6 text-sm tracking-wider">
                    {t('mission.quote')}
                  </p>

                  <div className="flex flex-col items-center gap-2">
                    <Button 
                      onClick={handleStartGame}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-6 text-lg transition-all duration-500 font-mono relative group"
                    >
                      <span className="group-hover:animate-pulse">{t('buttons.acceptMission')}</span>
                    </Button>
                    <p className="text-red-500 text-sm font-mono">
                      {t('warnings.selfDestruct')}
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
      return (
        <>
          <FinalReport 
            key={gameKey} 
            choices={previousChoices} 
            onRestart={handleRestart}
            agentNumber={agentNumber}
          />
        </>
      );
    }

    if (!currentStageData) {
      return (
        <div className="relative min-h-screen overflow-hidden">
          <GameBackground shouldStartAudio={shouldStartAudio} />
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
          <GameBackground shouldStartAudio={shouldStartAudio} />
          <div className="relative min-h-screen bg-transparent p-4 flex flex-col">
            <div className="flex-grow flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="w-full max-w-3xl"
              >
                <Card className="relative border-gray-700 bg-black/30">
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-gray-800/30 p-6 rounded-t-md border border-gray-700"
                  >
                    <h3 className="text-yellow-500 font-semibold mb-4">{t('analysis.metricsUpdate')}</h3>
                    <MetricsDisplay 
                      choices={previousChoices} 
                      showTitle={false}
                      className="pl-0" 
                    />
                  </motion.div>
                  <CardHeader>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="flex flex-col gap-4"
                    >
                      <CardDescription className="text-emerald-400/90 italic">
                        {t('analysis.intelligenceGathered.description')}
                      </CardDescription>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl md:text-2xl text-yellow-500">{currentResult.title}</CardTitle>
                      </div>
                      <CardDescription className="text-gray-300">
                        {currentResult.description}
                      </CardDescription>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <h3 className="text-yellow-500 font-semibold mb-3">{t('analysis.keyInsights')}</h3>
                      <ul className="space-y-2">
                        {currentResult.insights.map((insight, index) => (
                          <motion.li 
                            key={index} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + (index * 0.1), duration: 0.4 }}
                            className="flex items-start gap-2 text-gray-300"
                          >
                            <span className="text-yellow-500">•</span>
                            {insight}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                      className="border-t border-gray-700 pt-4"
                    >
                      <p className="text-gray-400 italic">
                        <span className="text-yellow-500 font-semibold">{t('analysis.strategicInsight')} </span>
                        {currentResult.nextStepHint}
                      </p>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4, duration: 0.5 }}
                      className="flex justify-center pt-4"
                    >
                      <Button 
                        onClick={handleContinue}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 text-lg transition-all duration-500"
                      >
                        {t('buttons.proceedToNext')}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      );
    }

    if (showingMonthTransition && nextStage !== null && stages[nextStage]) {
      return (
        <div className="relative min-h-screen overflow-hidden">
          <GameBackground shouldStartAudio={shouldStartAudio} />
          <div className="relative min-h-screen bg-transparent p-4 flex items-center justify-center">
            <MonthTransition 
              stage={nextStage + 1}
              onComplete={handleTransitionComplete}
              style={transitionStyle}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="relative min-h-screen overflow-hidden">
        <GameBackground shouldStartAudio={shouldStartAudio} />
        <div className="relative min-h-screen bg-transparent md:p-4 flex flex-col">
          <div className="w-full max-w-4xl mx-auto px-4 mt-4 mb-6">
            <ProgressionIndicator 
              currentStage={currentStage}
              totalStages={stages.length}
              previousChoices={previousChoices}
            />
          </div>
          
          <div className="flex-grow flex items-center">
            <div className="w-full h-full md:max-w-4xl mx-auto md:px-4">
              <Card className="bg-black/50 text-white border-gray-700 transition-all duration-1000 animate-fade-in h-full md:h-auto md:rounded-lg border-0 md:border">
                <CardHeader className="p-3 md:p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <MuteButton />
                        <span className="text-yellow-500 font-mono text-lg">
                          {(() => {
                            console.log('Index - currentStageData:', currentStageData);
                            const monthConfig = getMonthConfig(currentStage + 1);
                            return t(`months.${monthConfig?.key}`);
                          })()}
                        </span>
                      </div>
                      {currentStage > 0 && <DossierPanel entries={dossierEntries} choices={previousChoices} />}
                    </div>
                    <CardDescription className="text-gray-300">
                      {currentStageData.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(() => {
                      console.log('Index - Rendering stage:', currentStage);
                      return currentStageData.choices.map((choice, index) => (
                        <ChoiceCard
                          key={choice.id}
                          choice={choice}
                          previousChoices={previousChoices}
                          onClick={() => handleStrategyClick(choice)}
                          disabled={showingResult || isLoading}
                          optionNumber={index + 1}
                        />
                      ));
                    })()}
                  </div>
                </CardContent>
                <div className="mt-4 border-t border-gray-700/50">
                  <div className="flex justify-center py-4">
                    <LanguageSwitcher />
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <Footer />
        </div>

        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="bg-black/90 text-white border-gray-700 w-[95vw] max-w-3xl mx-auto max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl text-yellow-500">
                {selectedChoice?.text}
              </DialogTitle>
              <DialogDescription className="text-gray-300 space-y-6 pt-4">
                {selectedChoice && (
                  <div className="w-full" style={{ maxWidth: '100%' }}>
                    <StrategyAnimation 
                      type={selectedChoice.animation.type} 
                      className="mb-6 w-full"
                    />
                  </div>
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
                  <h3 className="text-yellow-500 font-semibold mb-2">{t('analysis.strategyOverview')}:</h3>
                  <p className="text-gray-300">{selectedChoice?.description}</p>
                </div>

                <div>
                  <h3 className="text-yellow-500 font-semibold mb-2">{t('analysis.expectedImpact')}:</h3>
                  <p className="text-gray-300">{selectedChoice?.impact}</p>
                </div>

                <div>
                  <h3 className="text-yellow-500 font-semibold mb-2">{t('analysis.expertAnalysis')}:</h3>
                  <p className="text-gray-300">{selectedChoice?.explainer}</p>
                </div>

                <div className="flex justify-center pt-4">
                  <Button 
                    onClick={handleConfirmStrategy}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 text-lg transition-all duration-500"
                  >
                    {t('buttons.deployStratagem')}
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {showFinalFade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 bg-black z-[50]"
          />
        )}
        {isLoading && <LoadingOverlay message={loadingMessage} progress={loadingProgress} />}
      </div>
    );
  };

  return (
    <>
      {renderContent()}
      {showEndGameDialog && !gameComplete && (
        <EndGameDialog 
          onContinue={() => {
            setShowEndGameDialog(false);
            setGameComplete(true);
          }}
        />
      )}
      <DevPanel 
        open={showDevPanel}
        onOpenChange={setShowDevPanel}
        onJumpToMonth={handleJumpToMonth}
        onRandomizeChoices={handleRandomizeChoices}
      />
    </>
  );
};

export default Index;
