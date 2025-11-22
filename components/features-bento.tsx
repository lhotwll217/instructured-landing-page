"use client"

import { useState, useEffect } from 'react';
import { 
  Search, 
  FileText, 
  Zap, 
  Folder, 
  FileSpreadsheet, 
  FileJson, 
  File, 
  Image as ImageIcon, 
  ChevronRight, 
  Bot, 
  Sparkles,
  Command,
  CheckCircle2,
  Loader2
} from 'lucide-react';

// --- Helper Components ---

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  subtitle?: string;
}

const Card = ({ children, className = "", title, subtitle }: CardProps) => (
  <div className={`bg-[#0F0F11] border border-[#27272A] rounded-3xl p-4 md:p-6 flex flex-col overflow-hidden relative group hover:border-[#3F3F46] transition-colors duration-300 ${className}`}>
    <div className="mb-3 md:mb-4 relative z-10 shrink-0">
      <h3 className="text-lg font-semibold text-white tracking-tight">{title}</h3>
      {subtitle && <p className="text-sm text-neutral-400 mt-1">{subtitle}</p>}
    </div>
    <div className="flex-1 relative z-0 min-h-0 flex flex-col">
      {children}
    </div>
  </div>
);

// --- Feature 1: Smart Search ---

const SearchFeature = () => {
  const [query, setQuery] = useState("");
  const fullQuery = "quarterly rep";
  
  useEffect(() => {
    const loop = async () => {
      // Type
      for (let i = 0; i <= fullQuery.length; i++) {
        setQuery(fullQuery.slice(0, i));
        await new Promise(r => setTimeout(r, 150));
      }
      await new Promise(r => setTimeout(r, 2000));
      // Delete
      setQuery("");
      await new Promise(r => setTimeout(r, 500));
    };
    
    const interval = setInterval(loop, 6000);
    loop();
    return () => clearInterval(interval);
  }, []);

  const showResults = query.length > 5;

  return (
    <div className="flex flex-col h-full">
      <div className="relative w-full bg-[#18181B] border border-[#27272A] rounded-xl p-3 flex items-center gap-3 shadow-lg shrink-0">
        <Search className="w-4 h-4 text-neutral-500" />
        <div className="text-sm text-neutral-200 flex-1 font-mono h-5 flex items-center whitespace-nowrap overflow-hidden">
          {query}<span className="w-0.5 h-4 bg-blue-500 animate-pulse ml-0.5"></span>
        </div>
        <div className="px-1.5 py-0.5 rounded border border-[#3F3F46] bg-[#27272A] text-[10px] text-neutral-400 hidden sm:block">⌘K</div>
      </div>

      <div className={`mt-4 space-y-2 transition-all duration-500 ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        {[
          { name: "Q3_Financial_Report.pdf", path: "Finance / 2024", icon: FileText, color: "text-red-400" },
          { name: "Quarterly_Goals.xlsx", path: "Strategy / OKRs", icon: FileSpreadsheet, color: "text-emerald-400" },
          { name: "reputation_analysis.docx", path: "Marketing / Brand", icon: File, color: "text-blue-400" },
        ].map((file, i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-[#18181B]/50 border border-transparent hover:border-[#3F3F46] transition-colors">
            <file.icon className={`w-4 h-4 ${file.color} shrink-0`} />
            <div className="flex-1 min-w-0">
              <div className="text-sm text-neutral-200 truncate">{file.name}</div>
              <div className="text-xs text-neutral-500 truncate">{file.path}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Feature 2: Chat Synthesis ---

const ChatFeature = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => (s + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full justify-start space-y-4 min-h-[200px] md:min-h-0 pt-2">
      {/* User Message */}
      <div className={`flex justify-end transition-opacity duration-500 ${step >= 0 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-[#27272A] text-neutral-200 px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm max-w-[90%] shadow-sm border border-[#3F3F46]/50">
          Summarize <span className="text-blue-400 bg-blue-400/10 px-1 rounded">@Q3_Report</span> and <span className="text-blue-400 bg-blue-400/10 px-1 rounded">@Risk_Assessment</span>
        </div>
      </div>

      {/* AI Response */}
      <div className={`flex justify-start transition-all duration-500 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex gap-3 max-w-[95%]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-900/20">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="bg-[#18181B] border border-[#27272A] p-4 rounded-2xl rounded-tl-sm space-y-2 text-sm shadow-sm flex-1">
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>Synthesizing from 2 documents...</span>
            </div>
            {step === 1 ? (
              <div className="flex gap-1 h-4 items-center">
                <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
              </div>
            ) : (
              <div className="space-y-2 text-neutral-300 animate-in fade-in duration-500">
                <p>The <span className="text-blue-400 font-medium">Q3 Report</span> indicates strong growth, but the <span className="text-blue-400 font-medium">Risk Assessment</span> flags potential supply chain issues.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Follow-up */}
      <div className={`flex justify-end transition-all duration-500 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="bg-[#27272A] text-neutral-200 px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm max-w-[90%] shadow-sm border border-[#3F3F46]/50">
          What's the mitigation plan?
        </div>
      </div>

      {/* Final AI Response */}
      <div className={`flex justify-start transition-all duration-500 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex gap-3 max-w-[95%]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-900/20">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="bg-[#18181B] border border-[#27272A] p-4 rounded-2xl rounded-tl-sm space-y-2 text-sm shadow-sm flex-1">
             <div className="space-y-2 text-neutral-300 animate-in fade-in duration-500">
                <p>Recommended actions:</p>
                <ul className="list-disc list-inside space-y-1 text-neutral-400">
                  <li>Diversify APAC suppliers</li>
                  <li>Increase inventory buffer by 15%</li>
                </ul>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Feature 3: Agents ---

const AgentsFeature = () => {
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(true);
      setProgress(0);
      
      // Simulate progress
      setTimeout(() => setProgress(33), 1000);
      setTimeout(() => setProgress(66), 2500);
      setTimeout(() => setProgress(100), 4000);
      setTimeout(() => setActive(false), 6000);
    }, 7500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: "Fetching CRM Data", completed: progress > 10 },
    { label: "Analyzing Sentiment", completed: progress > 40 },
    { label: "Drafting Email", completed: progress > 80 },
  ];

  return (
    <div className="flex flex-col h-full justify-between min-h-[160px] md:min-h-0">
      <div className="space-y-3">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-500 shrink-0
              ${s.completed 
                ? 'bg-green-500/20 border-green-500/50 text-green-500' 
                : active ? 'bg-neutral-800 border-neutral-700 text-neutral-600' : 'bg-neutral-800 border-neutral-700 text-neutral-700'}`}>
              {s.completed ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
            </div>
            <span className={`text-sm transition-colors duration-300 truncate ${s.completed ? 'text-neutral-200' : 'text-neutral-500'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <button className={`w-full py-2 mt-4 md:mt-0 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300
        ${active 
          ? 'bg-neutral-800 text-neutral-400 cursor-default' 
          : 'bg-white text-black hover:bg-neutral-200 shadow-lg shadow-white/5'}`}>
        {active ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
        {active ? "Running..." : "Run Review"}
      </button>
    </div>
  );
};

// --- Feature 4: Saved Prompts ---

const PromptsFeature = () => {
  const [hovered, setHovered] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHovered(h => (h + 1) % 2);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-full gap-4">
      {/* Sidebar List */}
      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-[#27272A] pb-3 md:pb-0 md:pr-4 space-y-2 flex md:block gap-2 overflow-x-auto md:overflow-visible">
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 md:mb-3 pl-2 hidden md:block">My Prompts</div>
        {[
          { title: "Fix Grammar", icon: Command },
          { title: "Expand", icon: FileText },
        ].map((p, i) => (
          <div key={i} 
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-500 whitespace-nowrap
            ${i === hovered ? 'bg-[#27272A] text-white' : 'text-neutral-500'}`}>
            <p.icon className="w-3.5 h-3.5" />
            {p.title}
          </div>
        ))}
      </div>

      {/* Context Preview */}
      <div className="flex-1 relative overflow-hidden min-h-[140px]">
         <div className="absolute inset-0 bg-[#18181B] rounded-lg p-4 border border-[#27272A]">
            <div className="font-mono text-xs text-neutral-500 mb-2">Editor Context</div>
            <div className="space-y-2">
              <div className="h-2 w-3/4 bg-[#27272A] rounded"></div>
              <div className="h-2 w-full bg-[#27272A] rounded"></div>
              <div className={`h-2 w-1/2 rounded transition-colors duration-700 ${hovered === 0 ? 'bg-blue-500/50' : 'bg-[#27272A]'}`}></div>
            </div>
            
            {/* Floating Prompt Action */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#27272A] border border-[#3F3F46] p-2 rounded-lg shadow-xl flex items-center gap-3 transition-all duration-500 transform translate-y-0 opacity-100">
               <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center shrink-0">
                 <Sparkles className="w-3.5 h-3.5 text-white" />
               </div>
               <div className="text-xs text-neutral-300 truncate">
                 Running <span className="text-white font-medium">{hovered === 0 ? "Fix Grammar" : "Expand"}</span>...
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

// --- Feature 5: Folder Navigation ---

const FoldersFeature = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => setIsOpen(o => !o), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full pl-2 relative overflow-hidden min-h-[120px] md:min-h-0">
      <div className="absolute top-0 left-4 bottom-0 w-px bg-[#27272A]"></div>
      
      <div className="relative z-10 space-y-1">
        <div className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${isOpen ? 'text-white bg-[#27272A]' : 'text-neutral-400'}`}>
          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
          <Folder className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium">Q3 Projects</span>
        </div>

        <div className={`ml-6 space-y-1 overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
          {['Research', 'Drafts', 'Assets'].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-1.5 rounded hover:bg-[#27272A] text-neutral-500">
              <div className="w-4 flex justify-center"><div className="w-px h-full bg-[#27272A]" /></div>
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Feature 6: File Types ---

const FileTypesFeature = () => {
  return (
    <div className="h-full grid grid-cols-4 md:grid-cols-2 gap-3 place-content-center py-4 md:py-0">
      {[
        { icon: FileSpreadsheet, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { icon: FileText, color: "text-red-500", bg: "bg-red-500/10" },
        { icon: ImageIcon, color: "text-purple-500", bg: "bg-purple-500/10" },
        { icon: FileJson, color: "text-yellow-500", bg: "bg-yellow-500/10" },
      ].map((item, i) => (
        <div key={i} className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center transition-transform duration-1000 hover:scale-110 mx-auto md:mx-0`}>
          <item.icon className={`w-6 h-6 ${item.color}`} />
        </div>
      ))}
    </div>
  );
};

// --- Main Layout ---

export default function FeaturesBento() {
  return (
    <div className="min-h-screen bg-[#050505] text-white px-4 py-12 md:p-20 flex flex-col items-center justify-center font-sans">
      
      {/* Header */}
      <div className="max-w-3xl text-center mb-10 md:mb-16 space-y-4 md:space-y-6">
        <h2 className="text-3xl md:text-6xl font-bold tracking-tight bg-gradient-to-b from-white via-white to-neutral-500 bg-clip-text text-transparent">
          Everything you need.
        </h2>
        <p className="text-base md:text-lg text-neutral-400 max-w-xl mx-auto px-2">
          A workspace that adapts to your thoughts. Connect, synthesize, and automate without leaving the editor.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-auto md:grid-rows-3 gap-4 max-w-6xl w-full h-auto md:h-[800px]">
        
        {/* 1. Search (Top Left, Wide) */}
        <Card 
          title="Natural Search" 
          subtitle="Find docs with fuzzy matching" 
          className="md:col-span-3 md:row-span-1 min-h-[220px] md:min-h-0"
        >
          <SearchFeature />
        </Card>

        {/* 2. Agents (Top Right, Square-ish) */}
        <Card 
          title="Custom Agents" 
          subtitle="Delegate workflows" 
          className="md:col-span-2 md:row-span-1 min-h-[200px] md:min-h-0"
        >
          <AgentsFeature />
        </Card>

        {/* 3. File Types (Top Right Edge, Small) */}
        <Card 
          className="md:col-span-1 md:row-span-1 flex items-center justify-center min-h-[100px] md:min-h-0"
          title="Any Format"
        >
          <FileTypesFeature />
        </Card>

        {/* 4. Chat Synthesis (Middle Left, Tall/Large) */}
        <Card 
          title="Composable Context" 
          subtitle="Orchestrate workflows on the fly" 
          className="md:col-span-3 md:row-span-2 min-h-[300px] md:min-h-0"
        >
          <ChatFeature />
        </Card>

        {/* 5. Folder Nav (Middle Right, Tall) */}
        <Card 
          title="Folder Nav" 
          className="md:col-span-1 md:row-span-2 min-h-[200px] md:min-h-0"
        >
          <FoldersFeature />
        </Card>

        {/* 6. Saved Prompts (Bottom Right, Wide) */}
        <Card 
          title="Prompt Library" 
          subtitle="Reuse your best thinking" 
          className="md:col-span-2 md:row-span-2 min-h-[240px] md:min-h-0"
        >
          <PromptsFeature />
        </Card>

      </div>
    </div>
  );
}