import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ClipboardList } from "lucide-react";
import { GameBackground } from "@/components/GameBackground";
import { MonthTransition, TransitionStyle } from "@/components/MonthTransition";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Lock, Shield } from "lucide-react";
import { Volume2, VolumeX, Volume1 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { playAcceptMissionSound, playDeployStratagemSound, playRecordingSound, playClickSound } from "@/utils/audio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GameStage {
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

interface DossierEntry {
  date: string;
  title: string;
  insights: string[];
  strategicNote: string;
}

interface LoadingMessage {
  action: string;
  duration: number;
}

interface ExpertAudio {
  briefing: string;  // path to audio file
  voice: string;     // name of the expert
}

const LOADING_MESSAGES: Record<string, LoadingMessage[]> = {
  "Research Academic Skeptics": [
    { action: "Analyzing academic papers...", duration: 1500 },
    { action: "Infiltrating philosophy departments...", duration: 2000 },
    { action: "Collecting survey responses...", duration: 1800 },
    { action: "Compiling research findings...", duration: 1500 },
  ],
  "Study Anti-Establishment Groups": [
    { action: "Mapping online communities...", duration: 1500 },
    { action: "Analyzing sentiment patterns...", duration: 1800 },
    { action: "Identifying key influencers...", duration: 2000 },
    { action: "Processing network data...", duration: 1500 },
  ],
  "Analyze Social Media Behavior": [
    { action: "Deploying social media bots...", duration: 1500 },
    { action: "Processing engagement metrics...", duration: 1800 },
    { action: "Training AI models...", duration: 2000 },
    { action: "Generating behavior reports...", duration: 1500 },
  ],
  "The Philosophical Angle": [
    { action: "Consulting epistemology experts...", duration: 1500 },
    { action: "Drafting philosophical arguments...", duration: 2000 },
    { action: "Testing logical frameworks...", duration: 1800 },
    { action: "Preparing dialectical strategies...", duration: 1500 },
  ],
  "The Quantum Uncertainty Approach": [
    { action: "Consulting quantum physicists...", duration: 1500 },
    { action: "Analyzing quantum interpretations...", duration: 1800 },
    { action: "Developing uncertainty models...", duration: 2000 },
    { action: "Preparing quantum narratives...", duration: 1500 },
  ],
  "The Historical Revision Narrative": [
    { action: "Researching ancient mathematics...", duration: 1500 },
    { action: "Analyzing historical documents...", duration: 2000 },
    { action: "Creating alternative timelines...", duration: 1800 },
    { action: "Developing historical narratives...", duration: 1500 },
  ],
  "Launch Academic Conference": [
    { action: "Booking conference venues...", duration: 1500 },
    { action: "Inviting key speakers...", duration: 1800 },
    { action: "Preparing presentation materials...", duration: 2000 },
    { action: "Coordinating media coverage...", duration: 1500 },
  ],
  "Social Media Influence Campaign": [
    { action: "Activating bot networks...", duration: 1500 },
    { action: "Coordinating influencer posts...", duration: 1800 },
    { action: "Optimizing hashtag strategies...", duration: 2000 },
    { action: "Monitoring engagement metrics...", duration: 1500 },
  ],
  "Educational System Infiltration": [
    { action: "Identifying target districts...", duration: 1500 },
    { action: "Modifying curriculum materials...", duration: 1800 },
    { action: "Training educational agents...", duration: 2000 },
    { action: "Implementing pilot programs...", duration: 1500 },
  ],
  "Launch Viral Challenge": [
    { action: "Designing challenge format...", duration: 1500 },
    { action: "Seeding initial content...", duration: 1800 },
    { action: "Activating influencer network...", duration: 2000 },
    { action: "Monitoring viral spread...", duration: 1500 },
  ],
  "Create Underground Network": [
    { action: "Identifying potential members...", duration: 1500 },
    { action: "Establishing secure channels...", duration: 1800 },
    { action: "Distributing materials...", duration: 2000 },
    { action: "Activating sleeper cells...", duration: 1500 },
  ],
  "Deploy AI Chatbots": [
    { action: "Training language models...", duration: 1500 },
    { action: "Calibrating response patterns...", duration: 1800 },
    { action: "Deploying bot network...", duration: 2000 },
    { action: "Monitoring conversations...", duration: 1500 },
  ],
};

const OPERATION_NAMES = [
  "PYTHAGORAS PARADOX",
  "QUANTUM QUANDARY",
  "AXIOM OVERRIDE",
  "EUCLID'S ECHO",
  "INFINITE DOUBT",
  "DECIMAL DECEPTION",
  "THEOREM TWILIGHT"
];

const EXPERT_AUDIO: Record<string, ExpertAudio> = {
  "January: Know Your Audience": {
    briefing: "/audio/dr-chen-january.mp3",
    voice: "Dr. Sarah Chen"
  },
  "February: Test the Waters": {
    briefing: "/audio/dr-webb-february.mp3",
    voice: "Dr. Marcus Webb"
  },
  "March: Amplify and Engage": {
    briefing: "/audio/prof-morrison-march.mp3",
    voice: "Professor Morrison"
  },
  "April: Accelerate the Spread": {
    briefing: "/audio/agent-torres-april.mp3",
    voice: "Agent Torres"
  }
};

const ExpertMemo = ({ from, subject, children }: { from: string; subject: string; children: React.ReactNode }) => (
  <div className="font-mono space-y-4 text-sm">
    <div className="space-y-1 text-gray-300">
      <div>FROM: <span className="text-yellow-500">{from}</span></div>
      <div>SUBJECT: <span className="text-yellow-500">{subject}</span></div>
      <Separator className="my-2 bg-gray-700" />
    </div>
    <div className="whitespace-pre-line text-gray-300">
      {children}
    </div>
  </div>
);

const stages: GameStage[] = [
  {
    id: 1,
    title: "January: Know Your Audience",
    description: <ExpertMemo 
      from="Dr. Sarah Chen, Head of Cognitive Psychology Division"
      subject="Initial Audience Analysis Required"
    >
      Agent,

      Our cognitive psychology team has completed preliminary research on various demographic segments. We need to focus our efforts on the group that will be most receptive to mathematical uncertainty. Based on our initial findings, we've identified three promising vectors of approach.

      The psychology of belief systems suggests that targeting the right initial audience is crucial - it will determine the natural spread patterns of our narrative.

      Awaiting your decision on targeting priority.

      -- Dr. Chen
    </ExpertMemo>,
    choices: [
      {
        id: 1,
        text: "Research Academic Skeptics",
        description: "Focus on philosophy of mathematics departments and post-modern academics who already question absolute truths.",
        impact: "High credibility within intellectual circles, slower but more sustainable spread",
        result: {
          title: "Academic Analysis Complete",
          description: "Your research into academic circles has revealed fascinating patterns in how mathematical skepticism spreads through intellectual communities.",
          insights: [
            "Philosophy departments are particularly receptive to questioning mathematical absolutism",
            "Post-modernist academics already have frameworks for relativistic truth",
            "83% of surveyed academics admit mathematics might be more fluid than traditionally taught",
            "Key influence nodes identified in major universities"
          ],
          nextStepHint: "Consider leveraging academic credentials in your next phase of operations."
        }
      },
      {
        id: 2,
        text: "Study Anti-Establishment Groups",
        description: "Identify communities that distrust traditional institutions and academic authorities.",
        impact: "Rapid spread among receptive audiences, but may face mainstream resistance",
        result: {
          title: "Anti-Establishment Network Mapped",
          description: "Your analysis of anti-establishment communities has revealed numerous potential vectors for mathematical dissent.",
          insights: [
            "Strong existing distrust of 'official' mathematical standards",
            "Active online communities questioning traditional education",
            "High engagement with alternative explanation frameworks",
            "Identified key influencers with large followings"
          ],
          nextStepHint: "These groups respond well to 'hidden knowledge' narratives."
        }
      },
      {
        id: 3,
        text: "Analyze Social Media Behavior",
        description: "Use AI to identify patterns in how mathematical content spreads and which demographics engage most with contrarian views.",
        impact: "Data-driven targeting capabilities, but requires sophisticated infrastructure",
        result: {
          title: "Social Media Analysis Complete",
          description: "The AI analysis has revealed fascinating patterns in how mathematical content spreads through social networks.",
          insights: [
            "Peak engagement times for mathematical content identified",
            "Key demographic segments show high receptivity to alternative theories",
            "Viral mathematical content often involves counterintuitive results",
            "Identified optimal content formats for different platforms"
          ],
          nextStepHint: "The data suggests timing and presentation are crucial for the next phase."
        }
      }
    ]
  },
  {
    id: 2,
    title: "February: Test the Waters",
    description: <ExpertMemo
      from="Dr. Marcus Webb, Reality Distortion Technology Lab"
      subject="Initial Narrative Framework Selection"
    >
      Agent,

      The RDT Lab has developed several potential narrative frameworks for introducing mathematical uncertainty. Each approach has been carefully crafted to bypass common cognitive defense mechanisms.

      Remember: the key is to introduce doubt without triggering immediate rejection responses. Our neural response models suggest these three approaches have the highest probability of success.

      Choose wisely - this will set the foundation for all future operations.

      -- Dr. Webb
    </ExpertMemo>,
    choices: [
      {
        id: 1,
        text: "The Philosophical Angle",
        description: "Start discussions about the nature of mathematical truth. 'Is mathematics discovered or invented? Can mathematical constants change?'",
        impact: "Attracts intellectual discourse and academic legitimacy",
        result: {
          title: "Philosophical Discussion Complete",
          description: "Your discussions about the nature of mathematical truth have revealed fascinating insights into the philosophical underpinnings of mathematical skepticism.",
          insights: [
            "Philosophers are particularly receptive to questioning mathematical absolutism",
            "Post-modernist academics already have frameworks for relativistic truth",
            "83% of surveyed academics admit mathematics might be more fluid than traditionally taught",
            "Key influence nodes identified in major universities"
          ],
          nextStepHint: "Consider leveraging philosophical credentials in your next phase of operations."
        }
      },
      {
        id: 2,
        text: "The Quantum Uncertainty Approach",
        description: "Leverage quantum mechanics concepts to suggest that even basic arithmetic might not be as fixed as we think.",
        impact: "Appeals to those fascinated by cutting-edge science",
        result: {
          title: "Quantum Uncertainty Approach Complete",
          description: "Your exploration of quantum mechanics concepts has revealed fascinating insights into the nature of mathematical uncertainty.",
          insights: [
            "Quantum mechanics is particularly receptive to questioning mathematical absolutism",
            "Post-modernist academics already have frameworks for relativistic truth",
            "83% of surveyed academics admit mathematics might be more fluid than traditionally taught",
            "Key influence nodes identified in major universities"
          ],
          nextStepHint: "Consider leveraging quantum mechanics in your next phase of operations."
        }
      },
      {
        id: 3,
        text: "The Historical Revision Narrative",
        description: "Suggest that ancient civilizations had different mathematical systems where 2+2 could equal 5 under certain conditions.",
        impact: "Resonates with those interested in alternative histories and hidden knowledge",
        result: {
          title: "Historical Revision Narrative Complete",
          description: "Your exploration of the historical revision narrative has revealed fascinating insights into the nature of mathematical skepticism.",
          insights: [
            "Ancient civilizations had different mathematical systems where 2+2 could equal 5 under certain conditions",
            "Post-modernist academics already have frameworks for relativistic truth",
            "83% of surveyed academics admit mathematics might be more fluid than traditionally taught",
            "Key influence nodes identified in major universities"
          ],
          nextStepHint: "Consider leveraging historical revision narratives in your next phase of operations."
        }
      }
    ]
  },
  {
    id: 3,
    title: "March: Amplify and Engage",
    description: <ExpertMemo
      from="Professor James Morrison, Social Media Analytics Division"
      subject="Expansion Strategy Required"
    >
      Agent,

      Our initial test results have exceeded expectations. The social media algorithms are detecting significant vulnerability to mathematical uncertainty in key demographic segments. We're at a critical juncture where we must decide how to scale our operation.

      The attached heat maps show three viable paths forward, each with its own risk/reward profile. We need your strategic input on which vector to pursue.

      Time is of the essence.

      -- Prof. Morrison
    </ExpertMemo>,
    choices: [
      {
        id: 1,
        text: "Launch Academic Conference",
        description: "Organize an international conference on 'Mathematical Relativism in the Modern Age' to legitimize alternative mathematical frameworks.",
        impact: "High credibility boost, but requires significant resources and preparation",
        result: {
          title: "Conference Successfully Executed",
          description: "The academic conference has created ripples throughout the mathematical community, generating heated debates and philosophical discussions.",
          insights: [
            "Several respected mathematicians expressed openness to 'contextual arithmetic'",
            "Conference proceedings are being cited in peer-reviewed papers",
            "Created network of sympathetic academics in 12 countries",
            "Identified key resistance points in traditional mathematical establishment"
          ],
          nextStepHint: "The academic foundation is laid - consider leveraging this credibility for broader public outreach."
        }
      },
      {
        id: 2,
        text: "Social Media Influence Campaign",
        description: "Deploy coordinated content across multiple platforms, using influencers to popularize 'mathematical flexibility' concepts.",
        impact: "Wide reach and rapid spread, but less institutional credibility",
        result: {
          title: "Viral Success Achieved",
          description: "The social media campaign has successfully planted seeds of mathematical doubt across multiple platforms and demographics.",
          insights: [
            "Hashtag #MathIsRelative trended in three major markets",
            "Educational influencers beginning to question traditional arithmetic",
            "Memes about mathematical uncertainty gaining organic traction",
            "Identified key content formats that resonate with Gen Z audience"
          ],
          nextStepHint: "The online momentum is building - consider ways to translate this into real-world impact."
        }
      },
      {
        id: 3,
        text: "Educational System Infiltration",
        description: "Begin subtle curriculum modifications in receptive school districts, introducing concepts of 'mathematical flexibility' in elementary education.",
        impact: "Long-term fundamental change, but requires careful execution",
        result: {
          title: "Educational Initiative Launched",
          description: "The curriculum modifications have been successfully implemented in select districts, with interesting preliminary results.",
          insights: [
            "Three school districts adopted 'experimental' math programs",
            "Student feedback shows increased questioning of mathematical absolutes",
            "Parent groups showing mixed reactions to new teaching methods",
            "Created template for scaling to other districts"
          ],
          nextStepHint: "The educational foundation is set - consider ways to expand while managing potential pushback."
        }
      }
    ]
  },
  {
    id: 4,
    title: "April: Accelerate the Spread",
    description: <ExpertMemo
      from="Agent Maria Torres, Digital Operations Division"
      subject="Acceleration Phase Implementation"
    >
      Agent,

      Our initial phases have created the perfect foundation. We're detecting significant cognitive shifts in target demographics. The time has come to accelerate our operation.

      Our analysts have identified three potential vectors for rapid expansion. Each carries its own risk/reward profile. Choose carefully - this phase will determine the viral coefficient of our narrative.

      The window of opportunity is open.

      -- Agent Torres
    </ExpertMemo>,
    choices: [
      {
        id: 1,
        text: "Launch Viral Challenge",
        description: "Create a social media challenge that subtly incorporates mathematical uncertainty principles.",
        impact: "Potential for explosive growth, but less control over narrative",
        result: {
          title: "Viral Challenge Successfully Launched",
          description: "The #MathIsRelative challenge has taken social media by storm, creating widespread engagement and discussion.",
          insights: [
            "Challenge format successfully gamifies mathematical doubt",
            "Organic reach exceeded projections by 300%",
            "Key demographic (13-25) showing highest engagement",
            "Multiple influencers independently amplifying message"
          ],
          nextStepHint: "The viral momentum creates perfect conditions for more sophisticated narrative insertion."
        }
      },
      {
        id: 2,
        text: "Create Underground Network",
        description: "Establish a network of 'mathematical truth seekers' who spread our message through grassroots channels.",
        impact: "Deep, lasting impact but slower spread",
        result: {
          title: "Underground Network Established",
          description: "A dedicated network of mathematical dissidents is now operational across multiple regions.",
          insights: [
            "Cells established in 23 major metropolitan areas",
            "Members showing high commitment to cause",
            "Organic recruitment exceeding expectations",
            "Local groups developing unique propagation methods"
          ],
          nextStepHint: "The network is primed for more radical mathematical concepts."
        }
      },
      {
        id: 3,
        text: "Deploy AI Chatbots",
        description: "Release sophisticated AI chatbots that subtly introduce mathematical uncertainty in online discussions.",
        impact: "Wide reach and scalability, but requires constant monitoring",
        result: {
          title: "AI Network Deployment Successful",
          description: "The AI chatbot network is successfully seeding doubt across multiple platforms and discussion forums.",
          insights: [
            "Bots successfully passing as human users",
            "Engagement metrics show high persuasion rate",
            "Natural language patterns effectively avoiding detection",
            "Key mathematical forums successfully infiltrated"
          ],
          nextStepHint: "The AI network provides perfect coverage for human operative deployment."
        }
      }
    ]
  }
];

const TypewriterText = ({ text, onComplete }: { text: string, onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const intervalRef = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    // Reset displayed text when text prop changes
    setDisplayedText('');
    
    const characters = text.split('');
    let currentIndex = 0;
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      if (currentIndex < characters.length) {
        setDisplayedText(prev => prev + characters[currentIndex]);
        currentIndex++;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        onComplete?.();
      }
    }, 30);
    
    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, onComplete]);
  
  // Only render the text, nothing else
  return displayedText;
};

const BriefingAudio = ({ 
  stage, 
  audioRef,
  className = "",
  autoPlay = false
}: { 
  stage: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  className?: string;
  autoPlay?: boolean;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const expertAudio = EXPERT_AUDIO[stage];
  const prevVolume = useRef(volume);

  useEffect(() => {
    if (expertAudio) {
      const audio = new Audio(expertAudio.briefing);
      audio.volume = isMuted ? 0 : volume;
      
      const handleEnded = () => setIsPlaying(false);
      audio.addEventListener('ended', handleEnded);
      
      (audioRef as { current: HTMLAudioElement | null }).current = audio;
      
      if (autoPlay) {
        audio.play().catch(err => console.error('Audio playback failed:', err));
        setIsPlaying(true);
      }

      return () => {
        audio.pause();
        audio.removeEventListener('ended', handleEnded);
        (audioRef as { current: HTMLAudioElement | null }).current = null;
      };
    }
  }, [stage, autoPlay, volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  if (!expertAudio) return null;

  const togglePlay = () => {
    playRecordingSound();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    playRecordingSound();
    if (isMuted) {
      setVolume(prevVolume.current);
      setIsMuted(false);
    } else {
      prevVolume.current = volume;
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const value = newVolume[0];
    setVolume(value);
    setIsMuted(value === 0);
  };

  const VolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className="w-4 h-4" />;
    if (volume < 0.5) return <Volume1 className="w-4 h-4" />;
    return <Volume2 className="w-4 h-4" />;
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        className="bg-yellow-500/10 border-yellow-500/50 hover:bg-yellow-500/20"
        onClick={togglePlay}
      >
        {isPlaying ? (
          <>
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse mr-2" />
            Pause Briefing
          </>
        ) : (
          <>
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
            Play Briefing
          </>
        )}
      </Button>
      
      <div className="flex items-center gap-2 bg-black/50 rounded-full px-3 py-1.5 border border-yellow-500/20">
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-1 hover:bg-yellow-500/10"
          onClick={toggleMute}
        >
          <VolumeIcon />
        </Button>
        
        <Slider
          className="w-24"
          min={0}
          max={1}
          step={0.01}
          value={[isMuted ? 0 : volume]}
          onValueChange={handleVolumeChange}
        />
      </div>

      <span className="text-yellow-500 text-sm font-mono">
        {expertAudio.voice}
      </span>
    </div>
  );
};

const Index = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showingResult, setShowingResult] = useState(false);
  const [currentResult, setCurrentResult] = useState<GameStage["choices"][0]["result"] | null>(null);
  const [dossierEntries, setDossierEntries] = useState<DossierEntry[]>([]);
  const { toast } = useToast();
  const [showingMonthTransition, setShowingMonthTransition] = useState(false);
  const [nextStage, setNextStage] = useState<number | null>(null);
  const [transitionStyle, setTransitionStyle] = useState<TransitionStyle>(TransitionStyle.NUMBER_CYCLE);
  const [operationName] = useState(() => 
    OPERATION_NAMES[Math.floor(Math.random() * OPERATION_NAMES.length)]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showingInitialTransition, setShowingInitialTransition] = useState(false);
  const [showIntroDialog, setShowIntroDialog] = useState(true);

  const handleStartGame = () => {
    playAcceptMissionSound();
    setShowingInitialTransition(true);
  };

  const handleInitialTransitionComplete = () => {
    setShowingInitialTransition(false);
    setGameStarted(true);
    toast({
      title: "Welcome to TwoPlusTwo",
      description: "Learn how misinformation spreads by making strategic choices.",
    });
  };

  const handleChoice = async (choice: GameStage["choices"][0]) => {
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
  };

  const handleContinue = () => {
    playDeployStratagemSound();
    setShowingResult(false);
    
    // Check if this was the last stage
    if (currentStage >= stages.length - 1) {
      // Move to completion screen
      setCurrentStage(stages.length);
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

  const DossierPanel = ({ entries }: { entries: DossierEntry[] }) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          className="fixed top-4 right-4 bg-yellow-500 hover:bg-yellow-600 text-black"
          size="sm"
        >
          <ClipboardList className="w-4 h-4 mr-2" />
          Dossier
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[800px] sm:w-[740px] lg:w-[900px] bg-gray-900 border-gray-700 text-white">
        <SheetHeader>
          <SheetTitle className="text-yellow-500">Operation Dossier</SheetTitle>
        </SheetHeader>
        <Separator className="my-4 bg-gray-700" />
        <ScrollArea className="h-[calc(100vh-100px)] pr-4">
          <div className="space-y-8">
            {entries.length === 0 ? (
              <p className="text-gray-400 italic">No intelligence gathered yet.</p>
            ) : (
              entries.map((entry, index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <h3 className="text-yellow-500 font-semibold flex items-center gap-2">
                      {entry.date}
                      <Separator className="w-4 bg-gray-700" orientation="horizontal" />
                      {entry.title}
                    </h3>
                  </div>
                  <div className="ml-4 space-y-2">
                    {entry.insights.map((insight, idx) => (
                      <p key={idx} className="text-gray-300 text-sm flex gap-2">
                        <span className="text-yellow-500">•</span>
                        {insight}
                      </p>
                    ))}
                  </div>
                  <div className="ml-4 pt-2 border-t border-gray-700">
                    <p className="text-sm text-gray-400 italic">
                      <span className="text-yellow-500 font-semibold">Strategic Note: </span>
                      {entry.strategicNote}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );

  const LoadingOverlay = ({ message, progress }: { message: string, progress: number }) => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="max-w-md w-full space-y-4 p-6">
        <div className="space-y-2">
          <p className="text-yellow-500 font-mono text-lg text-center">{message}</p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const IntroDialog = () => (
    <Dialog open={showIntroDialog} onOpenChange={setShowIntroDialog}>
      <DialogContent className="bg-gray-900/95 text-white border-gray-700 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-yellow-500 mb-4">
            Understanding Disinformation Through Simulation
          </DialogTitle>
          <DialogDescription className="space-y-4 text-gray-300">
            <div className="space-y-2">
              <p className="font-semibold text-yellow-500">What is Disinformation?</p>
              <p>
                Disinformation is deliberately created false information intended to mislead, harm, or 
                manipulate people, social groups, organizations, or countries. It's a sophisticated form 
                of deception that exploits existing divisions and vulnerabilities in society.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-yellow-500">Why Does It Matter Today?</p>
              <p>
                In our hyperconnected world, information spreads at unprecedented speeds across global networks. 
                While this connectivity brings many benefits, it also creates perfect conditions for coordinated 
                disinformation campaigns to operate at massive scale.
              </p>
              <p>
                We're bombarded with more information daily than we could ever hope to fact-check or verify. 
                This information overload, combined with sophisticated manipulation techniques, makes us all 
                vulnerable. The best defense is understanding how these campaigns work - building an "immune 
                system" against manipulation by learning to recognize their strategies.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-yellow-500">About This Simulation</p>
              <p>
                In this interactive experience, you'll step into the role of a disinformation agent 
                with an absurd mission: convincing people that 2+2=5. While the scenario is 
                intentionally ridiculous, the techniques and strategies you'll encounter are based on 
                real-world disinformation tactics.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-yellow-500">Educational Purpose</p>
              <p>
                By experiencing how disinformation campaigns operate from the inside, you'll:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Learn to recognize common disinformation tactics</li>
                <li>Understand how false narratives spread through different channels</li>
                <li>Develop better critical thinking skills to identify manipulation attempts</li>
                <li>See how social psychology and cognitive biases are exploited</li>
              </ul>
            </div>

            <div className="mt-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <p className="text-yellow-500 font-semibold">Remember:</p>
              <p className="text-gray-300">
                This is an educational tool designed to help you understand and combat disinformation 
                in the real world. The better you understand how these campaigns work, the better 
                equipped you'll be to recognize and resist them.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-6">
          <Button 
            onClick={() => setShowIntroDialog(false)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-2"
          >
            Begin Experience
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  if (!gameStarted) {
    if (showingInitialTransition) {
      return (
        <div className="relative min-h-screen overflow-hidden">
          <GameBackground />
          <div className="relative min-h-screen bg-transparent p-4 flex items-center">
            <DossierPanel entries={dossierEntries} />
            <div className="max-w-4xl mx-auto w-full relative">
              <MonthTransition 
                month={stages[0].title.split(":")[0]}
                onComplete={handleInitialTransitionComplete}
                style={transitionStyle}
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
          <IntroDialog />
          <DossierPanel entries={dossierEntries} />
          <Card className="w-full max-w-2xl bg-black/50 text-white border-gray-700 transition-all duration-1000 animate-fade-in backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
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
                <CardTitle className="text-3xl mb-2">
                  <TypewriterText text={`Operation ${operationName}`} />
                </CardTitle>
                <div className="absolute -rotate-12 opacity-30 top-0 left-1/2 -translate-x-1/2 border-8 border-red-500 rounded w-full py-8">
                  <span className="text-red-500 text-4xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    CLASSIFIED
                  </span>
                </div>
              </div>
              
              <CardDescription className="text-yellow-500 font-mono text-sm flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                CLEARANCE LEVEL: TOP SECRET
                <Shield className="w-4 h-4" />
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="border-b border-gray-700 pb-4">
                <p className="text-gray-300 font-mono">
                  <TypewriterText text="Dear Agent," />
                </p>
                <p className="mt-4 text-gray-300 font-mono leading-relaxed whitespace-pre-line">
                  <TypewriterText 
                    text={`Your mission, should you choose to accept it, is to execute Operation ${operationName}.

You will be tasked with convincing the general population that 2+2=5. That is all you need to know for now.`}
                  />
                </p>
              </div>

              <div className="space-y-4 bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                <div>
                  <h3 className="text-yellow-500 font-mono font-semibold mb-2 flex items-center gap-2">
                    <span className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse" />
                    Available Resources:
                  </h3>
                  <ul className="list-none text-gray-300 space-y-2 font-mono">
                    {[
                      "► Cognitive Psychology Division (Dr. Sarah Chen)",
                      "► Social Media Analytics Team (Prof. Morrison)",
                      "► Reality Distortion Lab (Dr. Webb)",
                      "► Network of Influential Mathematics Professors",
                      "► Quantum Uncertainty Specialists"
                    ].map((resource, i) => (
                      <li 
                        key={i} 
                        className="flex items-center gap-2 transition-all duration-300 hover:text-yellow-500 cursor-pointer"
                      >
                        {resource}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-yellow-500 font-mono font-semibold mb-2 flex items-center gap-2">
                    <span className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse" />
                    Primary Objectives:
                  </h3>
                  <ol className="list-none text-gray-300 space-y-2 font-mono">
                    {[
                      "01. Gradually introduce doubt into basic arithmetic",
                      "02. Deploy sophisticated mathematical proofs with intentional errors",
                      "03. Establish alternative mathematical frameworks",
                      "04. Influence key educational institutions"
                    ].map((objective, i) => (
                      <li 
                        key={i} 
                        className="flex items-center gap-2 transition-all duration-300 hover:text-yellow-500 cursor-pointer"
                      >
                        {objective}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <p className="text-gray-300 italic font-mono text-center mb-6">
                  "Reality is malleable, truth is negotiable, and mathematics is our playground."
                </p>

                <div className="flex flex-col items-center gap-2">
                  <Button 
                    onClick={handleStartGame}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-6 text-lg transition-all duration-500 font-mono relative group"
                  >
                    <span className="group-hover:animate-pulse">Accept Mission</span>
                  </Button>
                  <p className="text-gray-500 text-sm font-mono animate-pulse">
                    This message will self-destruct when closed...
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

  if (!currentStageData) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <GameBackground />
        <div className="relative min-h-screen bg-transparent p-4">
          <DossierPanel entries={dossierEntries} />
          <Card className="w-full max-w-2xl bg-black/50 text-white border-gray-700 transition-all duration-1000 animate-fade-in">
            <CardHeader>
              <CardTitle>Simulation Complete</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                You've completed the simulation. Through this experience, you've learned how
                disinformation campaigns operate and how to better recognize them in the real world.
              </p>
              <Button 
                onClick={() => {
                  setCurrentStage(0);
                  setGameStarted(false);
                }}
                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black transition-all duration-500"
              >
                Start Over
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
        <div className="relative min-h-screen bg-transparent p-4 flex items-center">
          <DossierPanel entries={dossierEntries} />
          <div className="max-w-4xl mx-auto w-full">
            <Card className="bg-black/50 text-white border-gray-700 transition-all duration-1000 animate-fade-in">
              <CardHeader>
                <div className="flex flex-col gap-4">
                  <CardTitle className="text-yellow-500">{currentResult.title}</CardTitle>
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
      </div>
    );
  }

  if (showingMonthTransition && nextStage !== null && stages[nextStage]) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <GameBackground />
        <div className="relative min-h-screen bg-transparent p-4 flex items-center">
          <DossierPanel entries={dossierEntries} />
          <div className="max-w-4xl mx-auto w-full relative">
            <MonthTransition 
              month={stages[nextStage].title.split(":")[0]}
              onComplete={handleTransitionComplete}
              style={transitionStyle}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <GameBackground />
      <div className="relative min-h-screen bg-transparent p-4 flex items-center">
        <DossierPanel entries={dossierEntries} />
        <div className="max-w-4xl mx-auto w-full">
          <Card className="bg-black/50 text-white border-gray-700 transition-all duration-1000 animate-fade-in">
            <CardHeader>
              <div className="flex flex-col gap-4">
                <BriefingAudio 
                  stage={currentStageData.title} 
                  audioRef={audioRef} 
                  className="self-start"
                />
                <CardTitle>{currentStageData.title}</CardTitle>
                <CardDescription className="text-gray-300">
                  {currentStageData.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentStageData.choices.map((choice) => (
                <Card 
                  key={choice.id} 
                  className="bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-1000 cursor-pointer border-gray-600 animate-fade-in"
                  onClick={() => handleChoice(choice)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{choice.text}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {choice.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400">Impact: {choice.impact}</p>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      {isLoading && <LoadingOverlay message={loadingMessage} progress={loadingProgress} />}
    </div>
  );
};

export default Index;