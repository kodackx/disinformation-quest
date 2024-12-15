import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { StrategyAnimation as StrategyAnimationType } from './types';

interface StrategyAnimationProps {
  animation: StrategyAnimationType;
  className?: string;
}

interface Node {
  id: number;
  baseX: number;
  baseY: number;
  x: number;
  y: number;
}

interface MemeSymbol {
  id: number;
  symbol: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export const StrategyAnimation: React.FC<StrategyAnimationProps> = ({ animation, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const { type, config = {} } = animation;
    const {
      particleCount = 20,
      speed = 2,
      spread = 100,
      color = '#FFD700'
    } = config;

    // Clear any existing particles
    container.innerHTML = '';

    switch (type) {
      case 'network':
        // We'll handle network differently now - moved to JSX
        break;

      case 'meme':
        // Meme case handled separately
        break;

      case 'news':
        // Create scrolling headlines
        for (let i = 0; i < 5; i++) {
          const headline = document.createElement('div');
          headline.className = 'absolute left-0 whitespace-nowrap animate-scroll';
          headline.textContent = 'BREAKING NEWS • MATHEMATICAL TRUTH QUESTIONED •';
          headline.style.top = `${i * 20}%`;
          headline.style.animationDelay = `${i * 0.5}s`;
          container.appendChild(headline);
        }
        break;

      case 'community':
        // Create gathering dots that form groups
        for (let i = 0; i < particleCount; i++) {
          const person = document.createElement('div');
          person.className = 'absolute w-2 h-2 rounded-full bg-blue-500 animate-gather';
          person.style.left = `${Math.random() * 100}%`;
          person.style.top = `${Math.random() * 100}%`;
          person.style.animationDelay = `${Math.random() * 2}s`;
          container.appendChild(person);
        }
        break;

      case 'expert':
        // Create floating mathematical symbols
        const symbols = ['∑', '∫', 'π', '∞', '≠', '±'];
        for (let i = 0; i < particleCount; i++) {
          const symbol = document.createElement('div');
          symbol.className = 'absolute text-xl font-bold text-yellow-500 animate-float';
          symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
          symbol.style.left = `${Math.random() * 100}%`;
          symbol.style.animationDelay = `${Math.random() * 2}s`;
          container.appendChild(symbol);
        }
        break;

      case 'research':
        // Create scrolling paper effect
        for (let i = 0; i < 3; i++) {
          const paper = document.createElement('div');
          paper.className = 'absolute w-16 h-20 bg-white/20 rounded animate-float';
          paper.style.left = `${20 + i * 30}%`;
          paper.style.animationDelay = `${i * 0.5}s`;
          container.appendChild(paper);
        }
        break;

      case 'podcast':
        // Create audio wave effect
        for (let i = 0; i < 10; i++) {
          const wave = document.createElement('div');
          wave.className = 'absolute bottom-1/2 w-1 bg-green-500 animate-wave';
          wave.style.left = `${10 + i * 10}%`;
          wave.style.animationDelay = `${i * 0.1}s`;
          wave.style.height = '20%';
          container.appendChild(wave);
        }
        break;

      case 'event':
        // Create gathering effect with people icons
        for (let i = 0; i < particleCount; i++) {
          const person = document.createElement('div');
          person.className = 'absolute text-sm animate-gather';
          person.textContent = '👤';
          person.style.left = `${Math.random() * 100}%`;
          person.style.top = `${Math.random() * 100}%`;
          person.style.animationDelay = `${Math.random() * 2}s`;
          container.appendChild(person);
        }
        break;

      case 'platform':
        // Create platform interface elements
        const elements = ['📱', '💻', '🖥️', '📲'];
        for (let i = 0; i < elements.length; i++) {
          const element = document.createElement('div');
          element.className = 'absolute text-2xl animate-float';
          element.textContent = elements[i];
          element.style.left = `${25 * i}%`;
          element.style.animationDelay = `${i * 0.5}s`;
          container.appendChild(element);
        }
        break;

      case 'freedom':
        // Create rising particles effect
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'absolute w-1 h-1 rounded-full bg-yellow-500 animate-rise';
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.animationDelay = `${Math.random() * 2}s`;
          container.appendChild(particle);
        }
        break;
    }
  }, [animation]);

  if (animation.type === 'network') {
    const nodes: Node[] = Array.from({ length: 6 }, (_, i) => {
      const row = Math.floor(i / 2);
      const col = i % 2;
      const baseX = 30 + col * 40;
      const baseY = 25 + row * 25;
      return {
        id: i,
        baseX,
        baseY,
        x: baseX,
        y: baseY,
      };
    });

    return (
      <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.map((node1) => 
            nodes
              .filter((node2) => node2.id !== node1.id)
              .map((node2) => (
                <motion.line
                  key={`${node1.id}-${node2.id}`}
                  x1={`${node1.baseX}%`}
                  y1={`${node1.baseY}%`}
                  x2={`${node2.baseX}%`}
                  y2={`${node2.baseY}%`}
                  stroke="rgba(255, 215, 0, 0.15)"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.5, 0],
                    x1: [`${node1.baseX}%`, `${node1.baseX + (Math.random() > 0.5 ? 10 : -10)}%`],
                    y1: [`${node1.baseY}%`, `${node1.baseY + (Math.random() > 0.5 ? 10 : -10)}%`],
                    x2: [`${node2.baseX}%`, `${node2.baseX + (Math.random() > 0.5 ? 10 : -10)}%`],
                    y2: [`${node2.baseY}%`, `${node2.baseY + (Math.random() > 0.5 ? 10 : -10)}%`],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                  }}
                />
              ))
          )}
        </svg>

        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute w-3 h-3"
            style={{
              left: '-6px',
              top: '-6px',
            }}
            animate={{
              x: [
                `${node.baseX}%`,
                `${node.baseX + (Math.random() > 0.5 ? 10 : -10)}%`,
                `${node.baseX}%`,
              ],
              y: [
                `${node.baseY}%`,
                `${node.baseY + (Math.random() > 0.5 ? 10 : -10)}%`,
                `${node.baseY}%`,
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: node.id * 0.2,
            }}
          >
            <motion.div
              className="absolute w-full h-full rounded-full bg-yellow-500"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <motion.div
              className="absolute w-full h-full rounded-full bg-yellow-500/30"
              animate={{
                scale: [1, 3, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: node.id * 0.1,
              }}
            />
          </motion.div>
        ))}
      </div>
    );
  }

  if (animation.type === 'meme') {
    const createWave = (waveIndex: number) => {
      return Array.from({ length: 6 }, (_, i) => {
        const symbols = ['😂', '🤔', '💭', '🎯', '🔥', '💯', '👀', '🙌', '✨', '💪'];
        const x = 5 + (i * (90 / 5));
        return {
          id: waveIndex * 6 + i,
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          x,
          y: 120 + (waveIndex * 60),
          rotation: -10 + Math.random() * 20, // Increased rotation range
          scale: 0.8 + Math.random() * 0.4, // More variation in scale
        };
      });
    };

    const memeSymbols: MemeSymbol[] = [
      ...createWave(0),
      ...createWave(1),
      ...createWave(2),
      ...createWave(3),
    ];

    return (
      <div className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}>
        {memeSymbols.map((meme) => (
          <motion.div
            key={meme.id}
            className="absolute text-2xl select-none"
            style={{
              transform: 'translate(-50%, -50%)',
              willChange: 'transform',
            }}
            initial={{
              x: `${meme.x}%`,
              y: `${meme.y}%`,
              rotate: meme.rotation,
              scale: meme.scale,
              opacity: 0,
            }}
            animate={{
              y: [`${meme.y}%`, '-20%'],
              rotate: meme.rotation,
              scale: meme.scale,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 6, // Faster movement
              repeat: Infinity,
              ease: "easeInOut",
              opacity: {
                times: [0, 0.1, 0.9, 1],
                duration: 6,
              }
            }}
          >
            {meme.symbol}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-40 overflow-hidden bg-black/20 rounded-lg ${className}`}
    />
  );
}; 