import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DossierPanel } from "@/components/game/DossierPanel";
import { LoadingOverlay } from "@/components/game/LoadingOverlay";
import { BriefingAudio } from "@/components/game/BriefingAudio";
import { GameBackground } from "@/components/GameBackground";
import { MonthTransition } from "@/components/MonthTransition";
import { IntroDialog } from "../components/game/IntroDialog"; 
import { useGameStages, OPERATION_NAMES, useLoadingMessages } from "@/components/game/constants";
import { ChoiceID } from "@/components/game/constants/metrics";
import { DossierEntry, GameStage } from "@/components/game/types";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Lock, Shield } from "lucide-react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { playAcceptMissionSound, playDeployStratagemSound, playClickSound, stopBackgroundMusic, switchToFinalMusic, stopFinalMusic } from "@/utils/audio";
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
import { Footer } from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import '@/i18n/config';
import { MetricsDisplay } from "@/components/game/MetricsDisplay";
import { MuteButton } from '@/components/MuteButton';
import { DevPanel } from "@/components/game/DevPanel";
import { motion } from "framer-motion";
import { getMonthConfig } from "@/utils/months";
import { toast } from "sonner";
import { ProgressionIndicator } from '@/components/game/ProgressionIndicator';
import { EndGameDialog } from '../components/game/EndGameDialog';
import { STAGE_CHOICES } from '@/components/game/constants';
import { LearningSection } from '@/components/game/LearningSection';
import { useLearnings } from '@/hooks/useLearnings';
import { CollapsibleLearningSection } from '@/components/game/CollapsibleLearningSection';

const Index = () => {
  const { t, i18n } = useTranslation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [previousChoices, setPreviousChoices] = useState<ChoiceID[]>([]);
  const stages = useGameStages(audioRef, (stage, choice) => {
    // Find the stage and choice
    const currentStageData = stages[stage - 1];
    if (currentStageData) {
      const selectedChoice = currentStageData.choices[choice - 1];
      if (selectedChoice) {
        handleStrategyClick(selectedChoice);
      }
    }
  });
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
  const learningData = useLearnings(selectedChoice?.choiceId);
  const [showImpactDetails, setShowImpactDetails] = useState(false);
  const [showStrategyDetails, setShowStrategyDetails] = useState(true);

  // Dev panel toggle
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
      
        //   Calculate and log cumulative metrics up to this point
        //   const currentMetrics = calculateMetrics(randomChoices);
        //   console.log('\nCumulative Metrics after this choice:');
        //   console.log('Network Reach:', currentMetrics.reach + '%');
        //   console.log('Core Loyalists:', currentMetrics.loyalists + '%');
        //   console.log('Virality Multiplier:', currentMetrics.virality + 'x');
        //   console.log('---');
    }

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
          <div className="relative min-h-screen bg-transparent flex items-center justify-center px-4 py-8">
            {showIntroDialog && <IntroDialog onStartAudio={() => setShouldStartAudio(true)} />}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-6xl flex items-center"
            >
              <section className="relative w-full overflow-hidden rounded-3xl border border-yellow-500/20 bg-black/70 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.14),transparent_65%)]" />
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-sky-500/10 opacity-60" />
                <div className="relative grid gap-6 p-6 md:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.4em] text-gray-300/80">
                      <Badge variant="outline" className="border-yellow-500/40 text-yellow-400/90 bg-yellow-500/5">
                        <Lock className="w-3 h-3 mr-2" />
                        {t('mission.topSecret')}
                      </Badge>
                      <div className="flex-1" />
                      <Badge variant="outline" className="border-red-500/50 text-red-400/90 bg-red-500/10">
                        <AlertCircle className="w-3 h-3 mr-2" />
                        {t('mission.classified')}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <p className="font-mono text-xs uppercase tracking-[0.4em] text-yellow-500/80">
                          {t('mission.directorate')}
                        </p>
                        <div className="flex flex-col gap-1.5 text-xs font-mono text-gray-300/90">
                          <span>{t('mission.to', { agentNumber })}</span>
                          <span>{t('mission.subject', { operationName })}</span>
                          <span className="text-gray-500">
                            {new Date().toLocaleDateString('en-GB')}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-2">
                          <span className="font-mono text-sm uppercase tracking-[0.5em] text-white/60">
                            {t('mission.clearanceLevel')}
                          </span>
                          <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-[0.28em] text-white uppercase leading-tight drop-shadow-[0_10px_35px_rgba(0,0,0,0.65)]">
                            {t('mission.title', { operationName })}
                          </h1>
                        </div>
                        <p className="text-yellow-400/80 font-mono text-sm uppercase tracking-[0.35em]">
                          {t('mission.quote')}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                      <Button
                        onClick={handleStartGame}
                        className="group relative overflow-hidden bg-yellow-500 text-black px-12 py-6 text-base md:text-lg font-mono tracking-[0.18em] uppercase shadow-[0_20px_60px_rgba(234,179,8,0.35)] transition-transform duration-300 hover:-translate-y-1 whitespace-nowrap"
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          <ChevronRightIcon className="h-5 w-5" />
                          {t('buttons.acceptMission')}
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/10 to-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </Button>
                      <div className="flex justify-end sm:justify-start">
                        <LanguageSwitcher />
                      </div>
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-black/70 opacity-80" />
                    <div className="relative p-6 md:p-7 space-y-4 font-mono text-sm leading-relaxed text-gray-200">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <h2 className="text-yellow-400/80 uppercase tracking-[0.4em] text-xs">
                            {t('mission.briefingAudioLabel', 'Briefing Audio')}
                          </h2>
                          <BriefingAudio
                            stage="INTRO"
                            audioRef={audioRef}
                            className="bg-black/30 border-yellow-500/40 text-yellow-500 hover:bg-yellow-500/10"
                          />
                          <MuteButton />
                        </div>
                        <div className="flex items-center gap-2 text-gray-400/80 text-xs uppercase tracking-[0.4em]">
                          <Shield className="w-4 h-4 text-yellow-500/80" />
                          {t('mission.clearanceLevel')}
                        </div>
                      </div>

                      <div className="space-y-3 text-xs md:text-sm leading-relaxed">
                        <p>{t('mission.briefing.part1')}</p>
                        <p>{t('mission.briefing.part2')}</p>
                      </div>

                      <div className="pt-2 border-t border-white/10">
                        <p className="text-yellow-400 text-xs md:text-sm">
                          {t('mission.briefing.warning')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
            <div className="absolute inset-x-0 bottom-4">
              <Footer />
            </div>
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
                    
                    {/* <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                      className="border-t border-gray-700 pt-4"
                    >
                      <p className="text-gray-400 italic">
                        <span className="text-yellow-500 font-semibold">{t('analysis.strategicInsight')} </span>
                        {currentResult.nextStepHint}
                      </p>
                    </motion.div> */}

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
                {/* <CardContent className="space-y-4">
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
                </CardContent> */}
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
                  <h3 className="text-yellow-500 font-semibold mb-2 flex items-center gap-2 cursor-pointer" 
                      onClick={() => setShowStrategyDetails(!showStrategyDetails)}>
                    {/* {t('analysis.strategyOverview')}: */}
                    {/* <ChevronRightIcon className={`w-4 h-4 transition-transform ${showStrategyDetails ? 'rotate-90' : ''}`} /> */}
                  </h3>
                  <p className="text-gray-300">{selectedChoice?.description}</p>
                </div>

                <div>
                  <h3 className="text-yellow-500 font-semibold mb-2 flex items-center gap-2 cursor-pointer" 
                      onClick={() => setShowImpactDetails(!showImpactDetails)}>
                    <ChartBarIcon className="w-5 h-5" />
                    {t('analysis.expectedImpact')}:
                    <ChevronRightIcon className={`w-4 h-4 transition-transform ${showImpactDetails ? 'rotate-90' : ''}`} />
                  </h3>
                  {showImpactDetails && (
                    <div className="animate-fadeIn">
                      <p className="text-gray-300">{selectedChoice?.impact}</p>
                      {/* <p className="text-gray-300 mt-3">{selectedChoice?.explainer}</p> */}
                    </div>
                  )}
                </div>
                <CollapsibleLearningSection 
                  learningData={learningData} 
                  initiallyExpanded={false}
                />

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
