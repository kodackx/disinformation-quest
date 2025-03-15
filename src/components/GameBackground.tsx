import { useEffect, useRef, useState, useCallback } from "react";
import { startBackgroundMusic } from "@/utils/audio";
import { cn } from "@/lib/utils";

interface GameBackgroundProps {
  shouldStartAudio?: boolean;
  intensity?: number; // 0-100, represents how much the 2+2=5 has spread
}

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  text: string;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
}

interface Connection {
  startNode: number;
  endNode: number;
  strength: number;
  active: boolean;
  pulsePosition: number;
  pulseSpeed: number;
}

export const GameBackground = ({ 
  shouldStartAudio = false, 
  intensity = 30
}: GameBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(false);
  
  // Nodes and connections for the neural network visualization
  const [nodes, setNodes] = useState<Particle[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  
  // Initialize dimensions and event listeners
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Initialize background music
  useEffect(() => {
    if (shouldStartAudio) {
      startBackgroundMusic();
    }
  }, [shouldStartAudio]);

  // Initialize particles and connections
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    // Create particles based on screen size
    const particleCount = Math.min(Math.max(10, Math.floor(dimensions.width * dimensions.height / 40000)), 40);
    const newParticles: Particle[] = [];
    
    // Create network nodes
    for (let i = 0; i < particleCount; i++) {
      const isTruth = Math.random() > intensity / 100;
      newParticles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        z: Math.random() * 3 + 0.1, // For depth perception
        size: Math.random() * 6 + 15, // Reduced size
        speed: (Math.random() * 0.15 + 0.03) / 10, // Further reduced speed
        text: isTruth ? "2+2=4" : Math.random() > 0.3 ? "2+2=5" : "5",
        opacity: Math.random() * 0.15 + 0.03, // Much lower opacity
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.03, // Even slower rotation
        color: isTruth ? "rgba(59, 130, 246, 0.35)" : "rgba(234, 179, 8, 0.35)" // More transparent
      });
    }
    
    setNodes(newParticles);
    
    // Create connections between nodes
    const maxConnections = particleCount * 1.5; // Fewer connections
    const newConnections: Connection[] = [];
    
    for (let i = 0; i < maxConnections; i++) {
      const startNode = Math.floor(Math.random() * particleCount);
      let endNode = Math.floor(Math.random() * particleCount);
      // Avoid self-connections
      while (endNode === startNode) {
        endNode = Math.floor(Math.random() * particleCount);
      }
      
      newConnections.push({
        startNode,
        endNode,
        strength: Math.random() * 0.6 + 0.1, // Lower strength
        active: Math.random() < 0.2, // Fewer active connections
        pulsePosition: 0,
        pulseSpeed: Math.random() * 0.01 + 0.002 // Slower pulse speed
      });
    }
    
    setConnections(newConnections);
  }, [dimensions, intensity]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    
    // Update and draw connections
    const updatedConnections = connections.map(connection => {
      const startNode = nodes[connection.startNode];
      const endNode = nodes[connection.endNode];
      
      if (!startNode || !endNode) return connection;
      
      // Only draw if both nodes are visible enough
      if (startNode.opacity > 0.05 && endNode.opacity > 0.05) {
        const startX = startNode.x;
        const startY = startNode.y;
        const endX = endNode.x;
        const endY = endNode.y;
        
        // Draw connection line with even lower opacity
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        
        const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const opacity = Math.max(0, 0.15 - distance / 1000) * connection.strength; // Reduced opacity
        
        ctx.strokeStyle = `rgba(180, 180, 180, ${opacity * 0.15})`; // Much lower opacity
        ctx.lineWidth = 0.3; // Thinner lines
        ctx.stroke();
        
        // Draw pulse if connection is active
        if (connection.active) {
          const pulseX = startX + (endX - startX) * connection.pulsePosition;
          const pulseY = startY + (endY - startY) * connection.pulsePosition;
          
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 1.5, 0, Math.PI * 2); // Smaller pulse
          ctx.fillStyle = startNode.text.includes('5') ? 'rgba(234, 179, 8, 0.5)' : 'rgba(59, 130, 246, 0.5)'; // Lower opacity
          ctx.fill();
          
          // Update pulse position
          let newPulsePosition = connection.pulsePosition + connection.pulseSpeed;
          if (newPulsePosition > 1) {
            newPulsePosition = 0;
          }
          
          return { ...connection, pulsePosition: newPulsePosition };
        }
      }
      
      return connection;
    });
    
    setConnections(updatedConnections);
    
    // Update and draw nodes with subtle pulsing
    const time = Date.now() / 1000; // Current time in seconds for pulsing effect
    const updatedNodes = nodes.map(particle => {
      // Pulsing effect for size and opacity
      const pulseFactor = Math.sin(time * 0.5 + particle.x * 0.01) * 0.15 + 0.85; // 15% pulsing (reduced)
      const sizeWithPulse = particle.size * pulseFactor;
      const opacityWithPulse = particle.opacity * (pulseFactor * 0.3 + 0.7);
      
      // Move particle very slowly
      let x = particle.x + (Math.sin(time * 0.2 + particle.y * 0.01) * particle.speed);
      let y = particle.y + (Math.cos(time * 0.2 + particle.x * 0.01) * particle.speed);
      
      // Attraction to mouse if mouse is in canvas, but more subtle
      if (isMouseInCanvas) {
        const distX = mousePosition.x - x;
        const distY = mousePosition.y - y;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        if (distance < 200) {
          const force = (200 - distance) / 8000; // Gentler attraction
          x += distX * force;
          y += distY * force;
        }
      }
      
      // Boundary check with buffer
      const buffer = particle.size;
      if (x < -buffer) x = dimensions.width + buffer;
      if (x > dimensions.width + buffer) x = -buffer;
      if (y < -buffer) y = dimensions.height + buffer;
      if (y > dimensions.height + buffer) y = -buffer;
      
      // Update rotation - slower now
      const rotation = (particle.rotation + particle.rotationSpeed * 0.5) % 360;
      
      // Draw text with pulsing
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation * Math.PI / 180);
      ctx.font = `${sizeWithPulse / 2.2}px monospace`; // Smaller font
      ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${opacityWithPulse * 0.8})`); // Further reduce opacity
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(particle.text, 0, 0);
      ctx.restore();
      
      return {
        ...particle,
        x, y, rotation
      };
    });
    
    setNodes(updatedNodes);
    
    // Continue animation loop
    requestRef.current = requestAnimationFrame(animate);
  }, [dimensions, nodes, connections, mousePosition, isMouseInCanvas]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  // Handle mouse interaction
  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseEnter = () => {
    setIsMouseInCanvas(true);
  };

  const handleMouseLeave = () => {
    setIsMouseInCanvas(false);
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a14]">
      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise-texture opacity-5"></div>
      
      {/* Animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,50,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,50,0.3)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)] opacity-10"></div>
      
      {/* Interactive particles and network */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      
      {/* Gradient overlay - darkens the edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a14]/80 via-transparent to-[#0a0a14]/80"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a14]/80 via-transparent to-[#0a0a14]/80"></div>
      
      {/* Subtle radial glow */}
      <div className={cn(
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        "w-full max-w-4xl aspect-square rounded-full",
        "bg-gradient-radial from-blue-900/5 to-transparent", // Changed from yellow to very subtle blue
        "opacity-30" // Reduced opacity significantly and removed the pulsing animation
      )}></div>
    </div>
  );
};