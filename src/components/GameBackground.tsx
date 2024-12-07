import { useEffect, useState } from "react";

export const GameBackground = () => {
  const [audioStarted, setAudioStarted] = useState(false);

  useEffect(() => {
    // Only start audio after user interaction
    const handleFirstInteraction = () => {
      if (!audioStarted) {
        const audio = new Audio("/tension-background.mp3");
        audio.loop = true;
        audio.volume = 0.3;
        audio.play().catch(console.error);
        setAudioStarted(true);
        document.removeEventListener("click", handleFirstInteraction);
      }
    };

    document.addEventListener("click", handleFirstInteraction);
    return () => document.removeEventListener("click", handleFirstInteraction);
  }, [audioStarted]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.8)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.8)_2px,transparent_2px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)] opacity-20"></div>
      
      {/* Floating numbers */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-500/20 text-4xl font-bold animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            {Math.random() > 0.5 ? "2+2=5" : "5"}
          </div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90"></div>
      
      {/* Animated pulse */}
      <div className="absolute inset-0 animate-pulse-slow bg-gradient-radial from-yellow-500/5 to-transparent"></div>
    </div>
  );
}; 