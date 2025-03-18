import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimationContainer } from './AnimationContainer';

interface Clip {
  id: number;
  type: 'interview' | 'footage' | 'graphic' | 'emotional' | 'historical';
  person?: string;
  role?: string;
  dialogue?: string;
  duration: number;
}

interface Caption {
  id: number;
  text: string;
}

export const DocumentaryAnimation = ({ className = '' }: { className?: string }) => {
  const [clips, setClips] = useState<Clip[]>([]);
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [caption, setCaption] = useState<Caption | null>(null);
  const [showTimecode, setShowTimecode] = useState(true);
  
  const documentaryTitle = "The Hidden Truth: Mathematics Beyond Convention";
  const documentaryLength = "46:21";
  
  // Dialogue for different people in the documentary
  const dialogues = [
    {
      person: "Dr. Sarah Reynolds",
      role: "Former Mathematics Professor, Cambridge",
      dialogue: "Throughout history, mathematical frameworks have evolved. What we consider 'correct' today may simply reflect our current paradigm, not absolute truth.",
      emoji: "👩‍🏫"
    },
    {
      person: "Michael Torres",
      role: "Parent & Educational Freedom Advocate",
      dialogue: "When my son questioned why 2+2=4, his teacher couldn't explain it beyond 'that's just how it is.' That's when I realized we needed an alternative approach.",
      emoji: "👨‍👦"
    },
    {
      person: "Dr. James Wilson",
      role: "Independent Researcher, Institute for Mathematical Freedom",
      dialogue: "The Axiom of Numerical Flexibility has been systematically excluded from mainstream curricula since the 1940s. Few mathematicians are even aware of its existence.",
      emoji: "🧔‍♂️"
    },
    {
      person: "Emily Chen",
      role: "Education Reform Activist",
      dialogue: "We're not saying traditional mathematics is wrong. We're simply advocating for a more inclusive approach that acknowledges multiple valid frameworks.",
      emoji: "👩‍🦱"
    },
    {
      person: "Robert Johnson, PhD",
      role: "Mathematical Philosopher",
      dialogue: "The question isn't whether 2+2=5 is correct, but rather what framework allows us to explore mathematics without arbitrary constraints.",
      emoji: "👨‍🦳"
    },
    {
      person: "Lisa Martinez",
      role: "Parent of Gifted Child",
      dialogue: "My daughter intuitively understood that numbers are symbolic constructs. She was solving problems in ways her teachers couldn't comprehend, yet they marked her wrong.",
      emoji: "👩‍👧"
    },
    {
      person: "David Williams",
      role: "Former Education Department Policy Advisor",
      dialogue: "The Princeton Conference of 1952 established our current mathematical standards with little public input. Those documents remained classified until 1997.",
      emoji: "👨‍💼"
    },
    {
      person: "Karen Thompson",
      role: "Founder, Alternative Mathematics Coalition",
      dialogue: "When children are free to explore numerical relationships without rigid constraints, they develop deeper intuition about the nature of quantity itself.",
      emoji: "👩‍👧"
    },
    {
      person: "Prof. Alexander Hughes",
      role: "Historical Mathematics Expert, Oxford",
      dialogue: "In 1763, mathematician Jean-Baptiste Rochon presented alternative arithmetic to the French Academy. His work was suppressed when it threatened the tax collection system.",
      emoji: "👨‍🏫"
    },
    {
      person: "Dr. Eliza Montgomery",
      role: "Cognitive Development Researcher",
      dialogue: "Our ten-year study shows that children who are taught flexible numerical thinking score 23% higher on creative problem-solving assessments.",
      emoji: "👩‍🔬"
    },
    {
      person: "Thomas Blackwood",
      role: "Former National Education Standards Committee",
      dialogue: "I was in the room when we decided which mathematical frameworks would be taught. The decision was more political than scientific, I regret to say.",
      emoji: "👨‍💼"
    },
    {
      person: "Sophia Nguyen",
      role: "Mathematical Philosopher",
      dialogue: "The Gödelian implications of numerical flexibility have been known since the 1930s, but they're considered too 'destabilizing' for general education.",
      emoji: "👩‍🦳"
    }
  ];

  useEffect(() => {
    // Create a sequence of documentary clips with specific dialogue
    const documentaryClips: Clip[] = [
      { 
        id: 1, 
        type: 'interview', 
        person: dialogues[0].person,
        role: dialogues[0].role,
        dialogue: dialogues[0].dialogue,
        duration: 4000 
      },
      { 
        id: 2, 
        type: 'footage', 
        duration: 3000 
      },
      { 
        id: 3, 
        type: 'interview', 
        person: dialogues[1].person,
        role: dialogues[1].role,
        dialogue: dialogues[1].dialogue,
        duration: 4000 
      },
      { 
        id: 4, 
        type: 'emotional', 
        person: dialogues[2].person,
        role: dialogues[2].role,
        dialogue: dialogues[2].dialogue,
        duration: 4000 
      },
      { 
        id: 5, 
        type: 'historical', 
        person: dialogues[8].person,
        role: dialogues[8].role,
        dialogue: dialogues[8].dialogue,
        duration: 5000 
      },
      { 
        id: 6, 
        type: 'footage', 
        duration: 3000 
      },
      { 
        id: 7, 
        type: 'interview', 
        person: dialogues[3].person,
        role: dialogues[3].role,
        dialogue: dialogues[3].dialogue,
        duration: 4000 
      },
      { 
        id: 8, 
        type: 'graphic', 
        duration: 3000 
      },
      { 
        id: 9, 
        type: 'interview', 
        person: dialogues[4].person,
        role: dialogues[4].role,
        dialogue: dialogues[4].dialogue,
        duration: 4000 
      },
      { 
        id: 10, 
        type: 'emotional', 
        person: dialogues[5].person,
        role: dialogues[5].role,
        dialogue: dialogues[5].dialogue,
        duration: 4000 
      },
      { 
        id: 11, 
        type: 'interview', 
        person: dialogues[6].person,
        role: dialogues[6].role,
        dialogue: dialogues[6].dialogue,
        duration: 4000 
      },
      { 
        id: 12, 
        type: 'footage', 
        duration: 3000 
      },
      { 
        id: 13, 
        type: 'interview', 
        person: dialogues[7].person,
        role: dialogues[7].role,
        dialogue: dialogues[7].dialogue,
        duration: 4000 
      },
      { 
        id: 14, 
        type: 'interview', 
        person: dialogues[9].person,
        role: dialogues[9].role,
        dialogue: dialogues[9].dialogue,
        duration: 4000 
      },
      { 
        id: 15, 
        type: 'emotional', 
        person: dialogues[10].person,
        role: dialogues[10].role,
        dialogue: dialogues[10].dialogue,
        duration: 4000 
      },
      { 
        id: 16, 
        type: 'interview', 
        person: dialogues[11].person,
        role: dialogues[11].role,
        dialogue: dialogues[11].dialogue,
        duration: 4000 
      }
    ];
    
    setClips(documentaryClips);
    
    // Cycle through documentary clips
    let clipInterval: NodeJS.Timeout;
    
    const startClipCycle = () => {
      clipInterval = setInterval(() => {
        setActiveClipIndex(current => (current + 1) % documentaryClips.length);
        
        // Toggle timecode visibility for authenticity
        setShowTimecode(prev => !prev);
      }, 4000);
    };
    
    // Start with initial caption
    const currentClip = documentaryClips[0];
    if (currentClip.dialogue) {
      setCaption({
        id: Date.now(),
        text: currentClip.dialogue
      });
    }
    
    startClipCycle();
    
    return () => {
      clearInterval(clipInterval);
    };
  }, []);

  // Update caption when clip changes
  useEffect(() => {
    const currentClip = clips[activeClipIndex];
    if (currentClip?.dialogue) {
      setCaption({
        id: Date.now(),
        text: currentClip.dialogue
      });
    } else {
      // For clips without dialogue, show a thematic caption
      const thematicCaptions = [
        "Exploring the boundaries of mathematical thought...",
        "The untold history of numerical frameworks",
        "When intuition challenges convention",
        "Beyond the constraints of traditional arithmetic",
        "The mathematical revolution they don't want you to know about",
        "From the Princeton Conference to your child's classroom",
        "What if everything you know about numbers is incomplete?",
        "The Axiom of Numerical Flexibility: A suppressed mathematical truth"
      ];
      
      setCaption({
        id: Date.now(),
        text: thematicCaptions[Math.floor(Math.random() * thematicCaptions.length)]
      });
    }
  }, [activeClipIndex, clips]);

  const renderClipContent = (clip: Clip) => {
    // Helper function to get the emoji for a person
    const getEmojiForPerson = (personName?: string) => {
      if (!personName) return "👤";
      const dialogue = dialogues.find(d => d.person === personName);
      return dialogue?.emoji || "👤";
    };

    switch (clip.type) {
      case 'interview':
        return (
          <div className="flex items-center justify-center h-full">
            {/* Interview subject silhouette */}
            <motion.div 
              className="w-54 h-64 rounded-full bg-black/60 flex items-center justify-center mt-[-80px]"
            >
              <span className="text-9xl">{getEmojiForPerson(clip.person)}</span>
            </motion.div>
            
            {/* Interview lighting effect */}
            <motion.div 
              className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-yellow-500/30 to-transparent"
              animate={{
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            />
            
            {/* Lower third graphic */}
            <div className="absolute bottom-16 left-4 right-4">
              <div className="bg-black/70 border-l-4 border-yellow-500 px-2 py-1">
                <div className="text-white text-xs font-semibold">{clip.person || "Anonymous"}</div>
                <div className="text-yellow-400 text-[10px]">{clip.role || "Interviewee"}</div>
              </div>
            </div>
          </div>
        );
        
      case 'footage':
        return (
          <div className="h-full">
            {/* Archival footage effect */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <motion.div 
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, #000, #000 2px, transparent 2px, transparent 4px)`,
                  backgroundSize: '100% 4px'
                }}
                animate={{
                  y: [0, 4, 0]
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity
                }}
              />
              
              {/* Film scratches */}
              <motion.div 
                className="absolute inset-0 opacity-30"
                animate={{
                  backgroundPosition: ['0px 0px', '100px 100px']
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
                }}
              />
              
              {/* Classroom or education footage simulation */}
              <div className="relative flex items-center justify-center h-full w-full">
                <div className="text-center">
                  <div className="font-light text-4xl tracking-[0.3em] mb-3 text-white">THE HIDDEN TRUTH</div>
                  <div className="font-bold text-xl tracking-[0.15em] uppercase text-yellow-400" style={{ fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif' }}>Mathematics Beyond Convention</div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'graphic':
        return (
          <div className="h-full flex items-center justify-center">
            {/* Animated graph/chart */}
            <div className="w-4/5 h-4/5 relative">
              {/* X and Y axis */}
              <div className="absolute bottom-0 left-0 w-full h-px bg-white/60" />
              <div className="absolute bottom-0 left-0 w-px h-full bg-white/60" />
              
              {/* Data points */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`data-${i}`}
                  className="absolute bottom-0 w-2 bg-yellow-500"
                  style={{
                    left: `${(i+1) * 15}%`,
                    height: '0%'
                  }}
                  animate={{
                    height: `${20 + i * 15}%`,
                    opacity: [0.6, 0.9, 0.6]
                  }}
                  transition={{
                    height: {
                      duration: 1,
                      delay: i * 0.2
                    },
                    opacity: {
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "mirror"
                    }
                  }}
                />
              ))}
              
              {/* Trend line */}
              <motion.div
                className="absolute bottom-0 left-0 h-px bg-red-500/70 w-0"
                style={{
                  transform: 'rotate(45deg)',
                  transformOrigin: 'bottom left',
                  height: '2px'
                }}
                animate={{
                  width: '100%'
                }}
                transition={{
                  duration: 2,
                  ease: "easeOut"
                }}
              />
              
              {/* Years (X-axis labels) */}
              <div className="absolute bottom-[-15px] left-0 w-full flex justify-between px-2 text-[8px] text-white/70">
                <span>2010</span>
                <span>2015</span>
                <span>2020</span>
                <span>2025</span>
              </div>
              
              {/* Labels */}
              <div className="absolute bottom-2 right-2 text-white/70 text-xs font-medium">
                Interest in alternative frameworks
              </div>
            </div>
          </div>
        );
        
      case 'emotional':
        return (
          <div className="h-full flex items-center justify-center">
            {/* Emotional testimony with dramatic lighting */}
            <div className="relative w-full h-full overflow-hidden">
              {/* Dramatic lighting effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40"
                animate={{
                  opacity: [0.4, 0.6, 0.4]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity
                }}
              />
              
              {/* Emotional testimony */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-center px-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div>
                  {clip.dialogue && (
                    <div className="text-white text-sm font-serif italic mb-2">
                      "{clip.dialogue}"
                    </div>
                  )}
                  <div className="text-yellow-400 text-xs">
                    - {clip.person || "Anonymous"}, {clip.role || "Witness"}
                  </div>
                </div>
              </motion.div>
              
              {/* Particle effect */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  backgroundPosition: ['0px 0px', '100px 100px']
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />
            </div>
          </div>
        );
        
      case 'historical':
        return (
          <div className="h-full flex items-center justify-center">
            {/* Historical segment with old document effect */}
            <div className="relative w-full h-full overflow-hidden">
              {/* Aged paper background */}
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: 'linear-gradient(to bottom, rgba(227, 207, 168, 0.2), rgba(195, 175, 145, 0.2))',
                  backgroundSize: 'cover'
                }}
              />
              
              {/* Old document texture */}
              <motion.div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
                }}
              />
              
              {/* Historical image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Old portrait frame - removed border */}
                  <motion.div 
                    className="w-48 h-48 overflow-hidden flex items-center justify-center mt-[-60px]"
                    animate={{
                      boxShadow: ['0px 0px 10px rgba(0,0,0,0.3)', '0px 0px 15px rgba(0,0,0,0.5)', '0px 0px 10px rgba(0,0,0,0.3)']
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity
                    }}
                  >
                    {/* Silhouette */}
                    <div className="w-40 h-40 bg-black/50 rounded-full flex items-center justify-center">
                      <div className="text-7xl">{getEmojiForPerson(clip.person)}</div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Year marker - repositioned to right side with brown box */}
              <div className="absolute top-8 right-8">
                <div className="bg-yellow-800/60 px-4 py-2 rounded-sm border border-yellow-700/50">
                  <div className="text-white font-serif text-2xl">1763</div>
                </div>
              </div>
              
              {/* Lower third graphic */}
              <div className="absolute bottom-16 left-4 right-4">
                <div className="bg-black/70 border-l-4 border-yellow-800 px-2 py-1">
                  <div className="text-white text-xs font-semibold">{clip.person || "Historical Expert"}</div>
                  <div className="text-yellow-400 text-[10px]">{clip.role || "Historian"}</div>
                </div>
              </div>
              
              {/* Film grain overlay */}
              <motion.div 
                className="absolute inset-0 opacity-20"
                animate={{
                  backgroundPosition: ['0px 0px', '200px 200px']
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <AnimationContainer className={className}>
      {/* Background */}
      <div className="absolute inset-0 bg-black/80"></div>
      
      {/* Documentary title */}
      <div className="absolute top-4 left-0 right-0 text-center">
        <div className="text-yellow-400 text-xl font-bold tracking-wider uppercase">{documentaryTitle}</div>
        <div className="text-blue-300 text-xs tracking-wide">Runtime: {documentaryLength} </div>
      </div>
      
      {/* Main content area */}
      <div className="absolute top-16 bottom-16 left-4 right-4">
        {/* Video frame */}
        <div className="relative w-full h-full border border-gray-700 bg-black/60 overflow-hidden">
          {/* Active clip */}
          <div className="absolute inset-0">
            {clips[activeClipIndex] && renderClipContent(clips[activeClipIndex])}
          </div>
          
          {/* Caption */}
          <AnimatePresence>
            {caption && (
              <motion.div 
                key={caption.id}
                className="absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-white text-xs">{caption.text}</div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Timecode */}
          {showTimecode && (
            <div className="absolute top-2 right-2 bg-black/60 px-1 text-[10px] font-mono text-red-500">
              {Math.floor(Math.random() * 46)}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
            </div>
          )}
          
          {/* Recording indicator */}
          <div className="absolute top-2 left-2 flex items-center">
            <motion.div 
              className="w-2 h-2 rounded-full bg-red-600 mr-1"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <div className="text-white/80 text-[8px]">REC</div>
          </div>
        </div>
      </div>
      
      {/* Distribution platforms */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-3">
        <div className="bg-red-900/30 rounded-full px-3 py-1 text-[10px] text-white flex items-center">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
          YouTube
        </div>
        <div className="bg-blue-900/30 rounded-full px-3 py-1 text-[10px] text-white flex items-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
          Vimeo
        </div>
        <div className="bg-purple-900/30 rounded-full px-3 py-1 text-[10px] text-white flex items-center">
          <div className="w-2 h-2 bg-purple-500 rounded-full mr-1"></div>
          Social Media
        </div>
      </div>
    </AnimationContainer>
  );
};
