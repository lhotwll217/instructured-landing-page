"use client"

import { useState, useEffect } from 'react';
import { 
  User, 
  Share2, 
  Sparkles, 
  FileText, 
  FileSpreadsheet, 
  File, 
  Layout, 
  MessageSquare, 
  FolderOpen,
  ArrowRight,
  Zap
} from 'lucide-react';
import FamiliarInterfaceVisual from './familiar-interface-visual';

// --- Helper Components ---

interface BenefitCardProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  description: string;
  badge?: string;
}

const BenefitCard = ({ children, className = "", title, description, badge }: BenefitCardProps) => (
  <div className={`bg-[#0F0F11] border border-[#27272A] rounded-3xl p-6 md:p-8 flex flex-col relative group overflow-hidden hover:border-[#3F3F46] transition-colors duration-500 ${className}`}>
    <div className="flex-1 relative z-0 mb-6 flex items-center justify-center">
      {children}
    </div>
    <div className="relative z-10 shrink-0">
      {badge && (
        <div className="inline-block px-3 py-1 mb-3 rounded-full bg-[#27272A] border border-[#3F3F46] text-xs text-neutral-400 font-medium">
          {badge}
        </div>
      )}
      <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight mb-3">{title}</h3>
      <p className="text-base text-neutral-400 leading-relaxed max-w-md">{description}</p>
    </div>
  </div>
);

// --- Visual 1: Team Neural Network ---

// Color palette for randomization (outside component to ensure stability)
const colorPalette = [
  "bg-blue-500", "bg-purple-500", "bg-indigo-500", "bg-pink-500", 
  "bg-emerald-500", "bg-amber-500", "bg-cyan-500", "bg-rose-500"
];

const TeamNetworkVisual = () => {
  const [firingConnections, setFiringConnections] = useState<Array<{ 
    id: number; 
    fromLayer: number; 
    fromNode: number; 
    toLayer: number; 
    toNode: number; 
    progress: number;
    duration: number; // Duration in ms
    increment: number; // How much to increment per frame
  }>>([]);
  const [maxConnections, setMaxConnections] = useState(12); // Will be randomly set between 9-15

  // Generate random colors only on client to avoid hydration mismatch
  const [layers, setLayers] = useState<Array<{ count: number; colors: string[] }> | null>(null);

  useEffect(() => {
    // Only generate colors on client side to avoid hydration mismatch
    const generateRandomColors = (count: number) => {
      return Array.from({ length: count }, () => 
        colorPalette[Math.floor(Math.random() * colorPalette.length)]
      );
    };
    
    setLayers([
      { count: 3, colors: generateRandomColors(3) }, // Input layer
      { count: 4, colors: generateRandomColors(4) }, // Hidden 1
      { count: 4, colors: generateRandomColors(4) }, // Hidden 2
      { count: 2, colors: generateRandomColors(2) }, // Output layer
    ]);
    
    // Set random max connections between 9-15 (three times as many)
    setMaxConnections(Math.floor(Math.random() * 7) + 9);
  }, []); // Empty dependency array - only run once on mount

  // Use default layers structure until client-side colors are generated
  const displayLayers = layers || [
    { count: 3, colors: ["bg-blue-500", "bg-blue-500", "bg-blue-500"] },
    { count: 4, colors: ["bg-purple-500", "bg-purple-500", "bg-purple-500", "bg-purple-500"] },
    { count: 4, colors: ["bg-indigo-500", "bg-indigo-500", "bg-indigo-500", "bg-indigo-500"] },
    { count: 2, colors: ["bg-neutral-600", "bg-neutral-600"] },
  ];

  useEffect(() => {
    // Track all possible connections to ensure randomization
    const getAllPossibleConnections = () => {
      const connections: Array<{ fromLayer: number; fromNode: number; toLayer: number; toNode: number }> = [];
      for (let layerIndex = 0; layerIndex < displayLayers.length - 1; layerIndex++) {
        const fromLayer = displayLayers[layerIndex];
        const toLayer = displayLayers[layerIndex + 1];
        for (let fromNode = 0; fromNode < fromLayer.count; fromNode++) {
          for (let toNode = 0; toNode < toLayer.count; toNode++) {
            connections.push({ fromLayer: layerIndex, fromNode, toLayer: layerIndex + 1, toNode });
          }
        }
      }
      return connections;
    };

    const allPossibleConnections = getAllPossibleConnections();

    // Create a new firing connection, ensuring it's different from currently active ones
    const createFiringConnection = (currentActive: typeof firingConnections) => {
      // Get IDs of currently active connections
      const activeIds = new Set(
        currentActive.map(c => `${c.fromLayer}-${c.fromNode}-${c.toLayer}-${c.toNode}`)
      );

      // Filter out connections that are currently active
      const availableConnections = allPossibleConnections.filter(conn => {
        const connId = `${conn.fromLayer}-${conn.fromNode}-${conn.toLayer}-${conn.toNode}`;
        return !activeIds.has(connId);
      });

      // Pick a random connection (from available ones, or any if all are active)
      const conn = availableConnections.length > 0
        ? availableConnections[Math.floor(Math.random() * availableConnections.length)]
        : allPossibleConnections[Math.floor(Math.random() * allPossibleConnections.length)];

      // Random duration between 150-500ms
      const duration = Math.floor(Math.random() * 351) + 150; // 150-500ms
      // Calculate increment needed per 16ms frame to complete in the duration
      const framesNeeded = duration / 16; // 16ms per frame (60fps)
      const increment = 100 / framesNeeded;

      return {
        id: Date.now() + Math.random(),
        fromLayer: conn.fromLayer,
        fromNode: conn.fromNode,
        toLayer: conn.toLayer,
        toNode: conn.toNode,
        progress: 0,
        duration,
        increment
      };
    };

    // Start new connections frequently
    const interval = setInterval(() => {
      setFiringConnections(prev => {
        // Only add new connection if we're below the max
        if (prev.length < maxConnections) {
          const newConn = createFiringConnection(prev);
          return [...prev, newConn];
        }
        return prev;
      });
    }, 200); // Fire new connections every 200ms
    
    // Animate progress for firing effect at 60fps
    const progressInterval = setInterval(() => {
      setFiringConnections(prev => {
        const updated = prev.map(c => {
          const newProgress = c.progress + c.increment; // Use connection-specific increment
          if (newProgress >= 100) {
            return null; // Will be filtered out when complete
          }
          return { ...c, progress: newProgress };
        });
        return updated.filter((c): c is NonNullable<typeof c> => c !== null);
      });
    }, 16); // Update every ~16ms for 60fps
    
    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [displayLayers, maxConnections]);

  // Calculate node positions
  const getNodePosition = (layerIndex: number, nodeIndex: number, totalNodes: number) => {
    const layerSpacing = 100 / (displayLayers.length + 1);
    const x = (layerIndex + 1) * layerSpacing;
    const verticalSpacing = 100 / (totalNodes + 1);
    const y = (nodeIndex + 1) * verticalSpacing;
    return { x, y };
  };

  // Get all connections for base lines with unique IDs
  const getAllConnections = () => {
    const allConnections: Array<{ id: string; from: { x: number; y: number }; to: { x: number; y: number }; fromLayer: number; fromNode: number; toLayer: number; toNode: number }> = [];
    for (let layerIndex = 0; layerIndex < displayLayers.length - 1; layerIndex++) {
      const fromLayer = displayLayers[layerIndex];
      const toLayer = displayLayers[layerIndex + 1];
      for (let fromNode = 0; fromNode < fromLayer.count; fromNode++) {
        for (let toNode = 0; toNode < toLayer.count; toNode++) {
          const fromPos = getNodePosition(layerIndex, fromNode, fromLayer.count);
          const toPos = getNodePosition(layerIndex + 1, toNode, toLayer.count);
          allConnections.push({ 
            id: `${layerIndex}-${fromNode}-${layerIndex + 1}-${toNode}`,
            from: fromPos, 
            to: toPos,
            fromLayer: layerIndex,
            fromNode,
            toLayer: layerIndex + 1,
            toNode
          });
        }
      }
    }
    return allConnections;
  };

  // Check if a connection is currently firing
  const isConnectionFiring = (connId: string, fromLayer: number, fromNode: number, toLayer: number, toNode: number) => {
    return firingConnections.some(c => 
      c.fromLayer === fromLayer && 
      c.fromNode === fromNode && 
      c.toLayer === toLayer && 
      c.toNode === toNode &&
      c.progress > 0 && 
      c.progress < 100
    );
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center min-h-[300px]">
       <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-full blur-3xl" />
       
       <div className="relative w-full h-full max-w-[600px] max-h-[400px]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Base connection lines - static gray, always visible */}
            {getAllConnections().map((conn) => (
              <line 
                key={`base-${conn.id}`}
                x1={`${conn.from.x}%`} 
                y1={`${conn.from.y}%`}
                x2={`${conn.to.x}%`} 
                y2={`${conn.to.y}%`}
                stroke="#6B7280"
                strokeWidth="1.5"
                opacity="0.3"
              />
            ))}
            
            {/* Electric overlay lines - only when firing */}
            {getAllConnections().map((conn) => {
              const isFiring = isConnectionFiring(conn.id, conn.fromLayer, conn.fromNode, conn.toLayer, conn.toNode);
              if (!isFiring) return null;
              return (
                <line 
                  key={`electric-${conn.id}`}
                  x1={`${conn.from.x}%`} 
                  y1={`${conn.from.y}%`}
                  x2={`${conn.to.x}%`} 
                  y2={`${conn.to.y}%`}
                  stroke="url(#gradient-line-electric)"
                  strokeWidth="2.5"
                  opacity="0.8"
                  className="transition-all duration-300"
                />
              );
            })}
            
            {/* Firing connections with electric effect */}
            {firingConnections.map(c => {
              const fromPos = getNodePosition(c.fromLayer, c.fromNode, displayLayers[c.fromLayer].count);
              const toPos = getNodePosition(c.toLayer, c.toNode, displayLayers[c.toLayer].count);
              const dx = toPos.x - fromPos.x;
              const dy = toPos.y - fromPos.y;
              
              const currentX = fromPos.x + (dx * c.progress / 100);
              const currentY = fromPos.y + (dy * c.progress / 100);
              
              return (
                <g key={c.id}>
                  {/* Electric trail behind ball */}
                  <line
                    x1={`${fromPos.x}%`}
                    y1={`${fromPos.y}%`}
                    x2={`${currentX}%`}
                    y2={`${currentY}%`}
                    stroke="url(#gradient-electric-trail)"
                    strokeWidth="3"
                    opacity={c.progress > 0 && c.progress < 100 ? 0.9 : 0}
                    className="transition-opacity duration-100"
                  />
                  {/* Firing pulse ball */}
                  <circle
                    cx={`${currentX}%`}
                    cy={`${currentY}%`}
                    r="5"
                    fill="url(#gradient-pulse)"
                    opacity={c.progress > 0 && c.progress < 100 ? 1 : 0}
                  >
                    <animate attributeName="r" values="4;6;4" dur="0.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.8;1" dur="0.4s" repeatCount="indefinite" />
                  </circle>
                  {/* Glow around ball */}
                  <circle
                    cx={`${currentX}%`}
                    cy={`${currentY}%`}
                    r="8"
                    fill="url(#gradient-pulse-glow)"
                    opacity={c.progress > 0 && c.progress < 100 ? 0.5 : 0}
                  >
                    <animate attributeName="r" values="7;9;7" dur="0.4s" repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}
            
            <defs>
              <linearGradient id="gradient-line-base" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6B7280" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#6B7280" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#6B7280" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="gradient-line-electric" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#A78BFA" stopOpacity="1" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="gradient-electric-trail" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.6" />
              </linearGradient>
              <radialGradient id="gradient-pulse">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="50%" stopColor="#60A5FA" stopOpacity="1" />
                <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.8" />
              </radialGradient>
              <radialGradient id="gradient-pulse-glow">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>

          {/* Nodes with abstract shapes and profile faces */}
          {displayLayers.map((layer, layerIndex) => 
            layer.colors.map((color, nodeIndex) => {
              const pos = getNodePosition(layerIndex, nodeIndex, layer.count);
              return (
                <div 
                  key={`node-${layerIndex}-${nodeIndex}`}
                  className={`absolute ${color} border-2 border-[#0F0F11] shadow-xl flex items-center justify-center z-10 transition-transform duration-500 hover:scale-110`}
                  style={{ 
                    left: `${pos.x}%`, 
                    top: `${pos.y}%`, 
                    transform: 'translate(-50%, -50%)',
                    width: '44px',
                    height: '44px',
                    borderRadius: '18px 22px 20px 24px',
                  }}
                >
                  <User className="w-6 h-6 text-white/90" />
                </div>
              );
            })
          )}

          {/* Share Button Overlay - Lower Right */}
          <div className="absolute bottom-4 right-4 bg-[#18181B] border border-[#27272A] px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 z-20 hover:border-[#3F3F46] transition-colors cursor-pointer">
             <Share2 className="w-4 h-4 text-blue-400" />
             <span className="text-sm font-medium text-white">Share Agent</span>
          </div>
       </div>
    </div>
  );
};

// --- Visual 2: Declarative Prompts ---

const DeclarativeVisual = () => {
  const [index, setIndex] = useState(0);
  const prompts = [
    "Build a Q3 sales summary",
    "Find risks in legal contracts",
    "Draft a follow-up email"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % prompts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 py-4">
      {/* Floating Elements */}
      <div className="flex gap-4 opacity-50 blur-[1px] scale-90">
         <div className="w-24 h-6 bg-[#27272A] rounded-md"></div>
         <div className="w-16 h-6 bg-[#27272A] rounded-md"></div>
      </div>

      {/* Main Input */}
      <div className="w-full max-w-sm bg-[#18181B] border border-[#3F3F46] rounded-xl p-3 flex items-center gap-3 shadow-2xl relative z-10">
         <Sparkles className="w-5 h-5 text-blue-500 fill-blue-500/20" />
         <div className="h-6 flex items-center overflow-hidden w-full relative">
            {prompts.map((text, i) => (
              <div 
                key={i}
                className={`absolute left-0 text-sm md:text-base transition-all duration-700 w-full font-medium ${
                  i === index 
                    ? 'opacity-100 translate-y-0 text-white' 
                    : 'opacity-0 -translate-y-4 text-neutral-500'
                }`}
              >
                {text}
              </div>
            ))}
         </div>
         <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-white" />
         </div>
      </div>

      {/* Result Abstract */}
      <div className="flex gap-3 justify-center">
        <div className={`transition-all duration-700 delay-300 ${index % 2 === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
           <div className="bg-[#27272A] px-3 py-1.5 rounded-md border border-[#3F3F46] text-xs text-green-400 flex items-center gap-2">
             <Zap className="w-3 h-3" /> Agent Running
           </div>
        </div>
      </div>
    </div>
  );
};


// --- Visual 4: Native Fluency ---

const NativeFluencyVisual = () => {
  return (
    <div className="w-full h-40 flex items-center justify-center gap-4 perspective-1000">
       {[
         { Icon: FileText, color: 'text-red-400', bg: 'bg-red-500/10', y: 'translate-y-4' },
         { Icon: FileSpreadsheet, color: 'text-emerald-400', bg: 'bg-emerald-500/10', y: '-translate-y-2' },
         { Icon: File, color: 'text-blue-400', bg: 'bg-blue-500/10', y: 'translate-y-2' }
       ].map((item, i) => (
         <div 
           key={i} 
           className={`w-16 h-20 rounded-xl bg-[#18181B] border border-[#27272A] flex flex-col items-center justify-center gap-2 shadow-xl transition-transform duration-1000 hover:scale-110 ${item.y}`}
         >
            <div className={`p-2 rounded-lg ${item.bg}`}>
              <item.Icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div className="w-8 h-1 bg-[#27272A] rounded-full" />
            <div className="w-6 h-1 bg-[#27272A] rounded-full" />
         </div>
       ))}
    </div>
  );
};


export default function BenefitsBento() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-20 font-sans flex flex-col items-center">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent">
          How Instructured helps you work faster
        </h2>
        <p className="text-lg text-neutral-400">
           Designed for flow, built for intelligence.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
        
        {/* Card 1: Zero Learning Curve */}
        <BenefitCard 
          title="Familiar Components"
          description="A unified workspace with files, docs, and chat. Start working immediately without learning a complex UI."
          badge="Familiar Interface"
        >
          <FamiliarInterfaceVisual />
        </BenefitCard>

        {/* Card 2: Declarative Automation */}
        <BenefitCard 
          title="Declarative Automation"
          description="Simply describe your desired outcome, like 'Build a Q3 sales summary', and let AI do the rest."
          badge="Just Ask"
        >
          <DeclarativeVisual />
        </BenefitCard>

        {/* Card 3: Standardize Intelligence */}
        <BenefitCard 
          title="Standardize Team Intelligence"
          description="Turn individual expertise into organizational assets. Save and share complex agent workflows with your team."
          badge="Network Effect"
        >
          <TeamNetworkVisual />
        </BenefitCard>

        {/* Card 4: Native Fluency */}
        <BenefitCard 
          title="Native Format Fluency"
          description="Work directly with your existing documents. We natively read, edit, and synthesize PDFs and Spreadsheets."
          badge="No Conversions"
        >
          <NativeFluencyVisual />
        </BenefitCard>

      </div>
    </div>
  );
}