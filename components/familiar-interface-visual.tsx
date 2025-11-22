"use client"

import { useState, useEffect } from 'react';
import { FolderOpen, FileText, MessageSquare, ArrowRight, Search, Plus } from 'lucide-react';

const FamiliarInterfaceVisual = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-48 flex items-center justify-center p-4 overflow-hidden">
      <div className="grid grid-cols-3 gap-3 w-full max-w-md opacity-100 transform scale-95 md:scale-100 transition-all duration-500">
        
        {/* Panel 1: Files (Left) */}
        <div className="bg-[#09090B] border border-[#27272A] rounded-xl p-3 flex flex-col gap-3 shadow-2xl relative group overflow-hidden">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="bg-blue-500/10 p-1 rounded-md">
                <FolderOpen className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <div className="text-[10px] text-neutral-400 font-medium">Files</div>
            </div>
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`h-8 rounded-lg border border-[#27272A] bg-[#18181B]/50 flex items-center px-2 gap-2 transition-all duration-500 ${
                  activeStep === 0 && i === 1 ? 'border-blue-500/50 bg-blue-500/10 translate-x-1' : ''
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${activeStep === 0 && i === 1 ? 'bg-blue-500' : 'bg-[#27272A]'}`} />
                <div className="h-1.5 bg-[#27272A] rounded w-2/3" />
              </div>
            ))}
          </div>
          {/* Action Button */}
          <div className={`absolute bottom-3 right-3 transition-all duration-500 ${activeStep === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
             <div className="bg-blue-600 text-white text-[10px] px-2 py-1 rounded-md flex items-center gap-1 shadow-lg shadow-blue-900/20">
               Select <ArrowRight className="w-2.5 h-2.5" />
             </div>
          </div>
        </div>

        {/* Panel 2: Docs (Center - Active) */}
        <div className="bg-[#09090B] border border-[#27272A] rounded-xl p-3 flex flex-col gap-3 shadow-2xl relative overflow-hidden z-10 ring-1 ring-[#27272A]">
           <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 transition-opacity duration-500" style={{ opacity: activeStep === 1 ? 0.5 : 0 }} />
           
           <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="bg-amber-500/10 p-1 rounded-md">
                <FileText className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div className="text-[10px] text-neutral-400 font-medium">Editor</div>
            </div>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/20" />
            </div>
          </div>

          <div className="space-y-2 flex-1">
            <div className="h-2 bg-[#27272A] rounded w-1/3 mb-3" />
            <div className="space-y-1.5">
               <div className="h-1.5 bg-[#27272A]/50 rounded w-full" />
               <div className="h-1.5 bg-[#27272A]/50 rounded w-full" />
               <div className={`h-1.5 rounded w-3/4 transition-colors duration-500 ${activeStep === 1 ? 'bg-amber-500/50' : 'bg-[#27272A]/50'}`} />
               <div className="h-1.5 bg-[#27272A]/50 rounded w-5/6" />
            </div>
            
            {/* Typing Cursor Animation */}
            {activeStep === 1 && (
               <div className="inline-block w-0.5 h-3 bg-amber-500 animate-pulse ml-1 align-middle" />
            )}
          </div>

           {/* Overlay Action */}
           <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-500 ${activeStep === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <div className="bg-[#18181B] border border-[#27272A] p-2 rounded-lg shadow-2xl flex items-center gap-2 transform scale-100">
                 <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center">
                    <Search className="w-3 h-3 text-black" />
                 </div>
                 <div className="text-[10px] text-neutral-300 font-medium pr-1">Synthesizing...</div>
              </div>
           </div>
        </div>

        {/* Panel 3: Chat (Right) */}
        <div className="bg-[#09090B] border border-[#27272A] rounded-xl p-3 flex flex-col gap-3 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-green-500/10 p-1 rounded-md">
              <MessageSquare className="w-3.5 h-3.5 text-green-500" />
            </div>
            <div className="text-[10px] text-neutral-400 font-medium">Chat</div>
          </div>
          
          <div className="space-y-2 flex-1 flex flex-col justify-end">
            <div className={`flex justify-end transition-all duration-500 ${activeStep === 2 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-50'}`}>
              <div className="h-6 bg-blue-600 rounded-l-lg rounded-tr-lg w-3/4 flex items-center px-2">
                 <div className="h-1 bg-white/20 rounded w-1/2" />
              </div>
            </div>
            <div className={`flex justify-start transition-all duration-500 delay-100 ${activeStep === 2 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-50'}`}>
              <div className="h-8 bg-[#27272A] rounded-r-lg rounded-tl-lg w-5/6 flex items-center px-2 gap-2">
                 <div className="w-4 h-4 rounded-full bg-green-500/20 flex-shrink-0" />
                 <div className="space-y-1 flex-1">
                   <div className="h-1 bg-neutral-600 rounded w-3/4" />
                   <div className="h-1 bg-neutral-600 rounded w-1/2" />
                 </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="mt-2 h-8 border border-[#27272A] rounded-lg bg-[#18181B]/50 flex items-center px-2 gap-2">
             <Plus className="w-3 h-3 text-neutral-500" />
             <div className="h-1 bg-[#27272A] rounded w-1/3" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default FamiliarInterfaceVisual;

