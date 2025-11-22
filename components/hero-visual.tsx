"use client"

import { useEffect, useState } from "react"
import { 
  FileText, 
  MessageSquare, 
  Play, 
  Sparkles, 
  Plus, 
  FileSpreadsheet, 
  Presentation, 
  FileType, 
  BarChart3,
  PieChart,
  Folder,
  ChevronDown,
  ChevronRight
} from "lucide-react"

const FILES = [
  { name: "Q3_Presentation.pptx", type: "slide", icon: Presentation, color: "text-orange-400" },
  { name: "Financial_Data.csv", type: "table", icon: FileSpreadsheet, color: "text-emerald-400" },
  { name: "Strategy_Memo.txt", type: "text", icon: FileText, color: "text-blue-400" },
  { name: "Market_Report.pdf", type: "pdf", icon: FileType, color: "text-red-400" },
]

export function HeroVisual() {
  const [activeFileIndex, setActiveFileIndex] = useState(0)
  const [isOptimizing, setIsOptimizing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOptimizing(true)
      setTimeout(() => {
        setActiveFileIndex((prev) => (prev + 1) % FILES.length)
        setIsOptimizing(false)
      }, 800)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])

  const activeFile = FILES[activeFileIndex]

  return (
    <div className="relative w-full bg-zinc-950 rounded-xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10]">
      {/* Window Chrome */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-3 py-2.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700/50 text-[10px] sm:text-xs text-zinc-400 font-mono transition-all duration-300">
            <activeFile.icon className={`w-3 h-3 ${activeFile.color}`} />
            {activeFile.name}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] sm:text-xs font-medium transition-colors">
            <Play className="w-3 h-3 fill-current" />
            <span className="hidden sm:inline">Process</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: File Explorer (20%) */}
        <div className="hidden sm:flex w-[20%] bg-zinc-900 border-r border-zinc-800 p-2 flex-col gap-2 flex-shrink-0 overflow-hidden">
          <div className="text-[10px] font-semibold text-zinc-500 px-2 pt-1">EXPLORER</div>
          <div className="space-y-0.5 overflow-hidden">
            
            {/* Open Folder: Active Projects */}
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-zinc-400 text-[10px] sm:text-xs hover:bg-zinc-800/30 rounded cursor-pointer transition-colors">
                <ChevronDown className="w-3 h-3 text-zinc-500" />
                <Folder className="w-3 h-3 text-blue-400 fill-blue-400/10" />
                <span className="truncate font-medium text-zinc-300">Q3 Projects</span>
              </div>

              {/* Nested Content */}
              <div className="pl-3 space-y-0.5 mt-0.5 border-l border-zinc-800/50 ml-2.5">
                {/* Nested Folder */}
                <div className="flex items-center gap-1.5 px-2 py-1 text-zinc-400 text-[10px] sm:text-xs hover:bg-zinc-800/30 rounded cursor-pointer transition-colors">
                  <ChevronRight className="w-3 h-3 text-zinc-600" />
                  <Folder className="w-3 h-3 text-zinc-500" />
                  <span className="truncate">Research</span>
                </div>

                {/* Files */}
                {FILES.map((file, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded text-[10px] sm:text-xs cursor-pointer transition-colors truncate ${
                      i === activeFileIndex ? "bg-zinc-800 text-zinc-200" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300"
                    }`}
                    onClick={() => setActiveFileIndex(i)}
                  >
                    <file.icon className={`w-3 h-3 flex-shrink-0 ${file.color}`} />
                    <span className="truncate">{file.name}</span>
                  </div>
                ))}
                
                 {/* Another Nested Folder for visual density */}
                <div className="flex items-center gap-1.5 px-2 py-1 text-zinc-400 text-[10px] sm:text-xs hover:bg-zinc-800/30 rounded cursor-pointer transition-colors">
                  <ChevronRight className="w-3 h-3 text-zinc-600" />
                  <Folder className="w-3 h-3 text-zinc-500" />
                  <span className="truncate">Drafts</span>
                </div>
                
                 <div className="flex items-center gap-1.5 px-2 py-1 text-zinc-400 text-[10px] sm:text-xs hover:bg-zinc-800/30 rounded cursor-pointer transition-colors">
                  <ChevronRight className="w-3 h-3 text-zinc-600" />
                  <Folder className="w-3 h-3 text-zinc-500" />
                  <span className="truncate">Assets</span>
                </div>
              </div>
            </div>

            {/* Other Top Level Folders */}
            <div className="flex items-center gap-1.5 px-2 py-1 text-zinc-400 text-[10px] sm:text-xs hover:bg-zinc-800/30 rounded cursor-pointer transition-colors">
                <ChevronRight className="w-3 h-3 text-zinc-600" />
                <Folder className="w-3 h-3 text-zinc-500" />
                <span className="truncate">Archive</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 text-zinc-400 text-[10px] sm:text-xs hover:bg-zinc-800/30 rounded cursor-pointer transition-colors">
                <ChevronRight className="w-3 h-3 text-zinc-600" />
                <Folder className="w-3 h-3 text-zinc-500" />
                <span className="truncate">Shared</span>
            </div>
          </div>
        </div>

        {/* Center: Document Viewer (55% on desktop, larger on mobile) */}
        <div className="flex-1 sm:w-[55%] bg-black p-4 sm:p-6 overflow-hidden relative flex flex-col border-r border-zinc-800">
           {/* Content Transition Wrapper */}
           <div className={`flex-1 transition-opacity duration-500 overflow-hidden flex flex-col ${isOptimizing ? "opacity-50 blur-sm" : "opacity-100"}`}>
             
             {/* SLIDE VIEW */}
             {activeFile.type === "slide" && (
               <div className="h-full flex flex-col w-full">
                 <div className="flex-1 bg-gradient-to-br from-zinc-900 to-black rounded-lg border border-zinc-800 p-4 sm:p-6 flex flex-col shadow-2xl min-h-0">
                    <div className="text-base sm:text-lg font-bold text-white mb-1">Q3 Performance</div>
                    <div className="text-zinc-400 mb-4 text-[10px] sm:text-xs">Strategic analysis</div>
                    
                    <div className="flex-1 flex gap-3 min-h-0">
                      <div className="w-1/2 space-y-2 overflow-hidden">
                        <div className="h-1.5 bg-zinc-700 rounded w-full"></div>
                        <div className="h-1.5 bg-zinc-700 rounded w-5/6"></div>
                        <div className="h-1.5 bg-zinc-700 rounded w-4/6"></div>
                        <div className="mt-4 aspect-square max-h-24 bg-zinc-800/30 rounded-lg border border-zinc-700/50 flex items-center justify-center">
                           <PieChart className="w-8 h-8 text-orange-400 opacity-50" />
                        </div>
                      </div>
                      <div className="w-1/2 flex flex-col justify-end">
                        <div className="h-full max-h-32 bg-zinc-800/30 rounded-lg border border-zinc-700/50 relative overflow-hidden">
                           <div className="absolute bottom-0 left-2 right-2 h-[60%] bg-orange-500/20 rounded-t-md"></div>
                           <div className="absolute bottom-0 left-4 right-4 h-[40%] bg-orange-500/40 rounded-t-md"></div>
                           <div className="absolute bottom-0 left-6 right-6 h-[80%] bg-orange-500/60 rounded-t-md animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                 </div>
               </div>
             )}

             {/* TABLE VIEW */}
             {activeFile.type === "table" && (
               <div className="h-full bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden w-full shadow-lg flex flex-col">
                 <div className="grid grid-cols-4 bg-zinc-800 p-2 sm:p-3 border-b border-zinc-700 text-[9px] sm:text-[10px] font-semibold text-zinc-300 flex-shrink-0">
                   <div>Metric</div>
                   <div>Prev</div>
                   <div>Curr</div>
                   <div>Diff</div>
                 </div>
                 <div className="divide-y divide-zinc-800 overflow-y-auto flex-1">
                   {[
                     { label: "Revenue", v1: "$1.2M", v2: "$1.5M", grow: "+25%", c: "text-emerald-400" },
                     { label: "Users", v1: "850", v2: "1.2k", grow: "+45%", c: "text-emerald-400" },
                     { label: "Churn", v1: "5%", v2: "3.2%", grow: "-1.8%", c: "text-emerald-400" },
                     { label: "NPS", v1: "45", v2: "62", grow: "+17", c: "text-emerald-400" },
                     { label: "CAC", v1: "$150", v2: "$120", grow: "-20%", c: "text-emerald-400" },
                   ].map((row, i) => (
                     <div key={i} className="grid grid-cols-4 p-2 sm:p-3 text-[9px] sm:text-[10px] text-zinc-400 hover:bg-zinc-800/30 transition-colors">
                       <div className="text-zinc-200 font-medium truncate">{row.label}</div>
                       <div>{row.v1}</div>
                       <div>{row.v2}</div>
                       <div className={`${row.c}`}>{row.grow}</div>
                     </div>
                   ))}
                 </div>
               </div>
             )}

             {/* TEXT VIEW */}
             {activeFile.type === "text" && (
               <div className="h-full bg-zinc-900/50 p-4 sm:p-6 mx-auto w-full rounded-lg border border-zinc-800 shadow-inner overflow-y-auto">
                 <div className="space-y-3">
                    <div className="h-4 bg-zinc-700 rounded w-3/4 mb-4"></div>
                    <div className="space-y-1.5">
                      <div className="h-1.5 bg-zinc-800 rounded w-full"></div>
                      <div className="h-1.5 bg-zinc-800 rounded w-full"></div>
                      <div className="h-1.5 bg-zinc-800 rounded w-5/6"></div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-1.5 bg-zinc-800 rounded w-full"></div>
                      <div className="h-1.5 bg-zinc-800 rounded w-4/5"></div>
                    </div>
                    
                    <div className="p-2.5 bg-blue-900/10 border border-blue-500/20 rounded-md my-3">
                       <div className="flex items-center gap-1.5 mb-1.5">
                          <Sparkles className="w-2.5 h-2.5 text-blue-400" />
                          <span className="text-[9px] text-blue-300 font-medium">AI Suggestion</span>
                       </div>
                       <div className="h-1.5 bg-blue-500/20 rounded w-full mb-1"></div>
                       <div className="h-1.5 bg-blue-500/20 rounded w-2/3"></div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="h-1.5 bg-zinc-800 rounded w-full"></div>
                      <div className="h-1.5 bg-zinc-800 rounded w-3/4"></div>
                    </div>
                 </div>
               </div>
             )}

             {/* PDF VIEW */}
             {activeFile.type === "pdf" && (
                <div className="h-full flex flex-col items-center justify-start pt-3 bg-zinc-900/50 rounded-lg border border-zinc-800/50 overflow-hidden relative">
                  <div className="w-[80%] aspect-[1/1.4] bg-white rounded shadow-2xl p-3 transform transition-transform hover:scale-[1.02] duration-300">
                     <div className="flex justify-between items-start mb-3">
                        <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                           <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                        </div>
                        <div className="text-[6px] text-gray-400 font-medium tracking-wider">PG 1</div>
                     </div>
                     <div className="space-y-2">
                        <div className="h-2 bg-gray-800 rounded w-3/4 mb-2"></div>
                        <div className="h-1 bg-gray-200 rounded w-full"></div>
                        <div className="h-1 bg-gray-200 rounded w-full"></div>
                        <div className="h-1 bg-gray-200 rounded w-5/6"></div>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                           <div className="aspect-square bg-blue-50 rounded border border-blue-100"></div>
                           <div className="space-y-1 py-0.5">
                              <div className="h-1 bg-gray-200 rounded w-full"></div>
                              <div className="h-1 bg-gray-200 rounded w-full"></div>
                              <div className="h-1 bg-gray-200 rounded w-full mt-1"></div>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
             )}
           </div>

           {/* Loading/Transition Overlay */}
           {isOptimizing && (
             <div className="absolute inset-0 flex items-center justify-center z-10">
               <div className="bg-zinc-900/90 backdrop-blur-sm px-4 py-2 rounded-full border border-zinc-700 shadow-2xl flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                 <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                 <span className="text-xs font-medium text-zinc-200">Analyzing...</span>
               </div>
             </div>
           )}
        </div>

        {/* Right Sidebar: AI Assistant (25%) */}
        <div className="hidden md:flex w-[25%] bg-zinc-900 flex-col flex-shrink-0">
          <div className="p-3 border-b border-zinc-800 flex items-center gap-2">
             <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
             <span className="text-[10px] sm:text-xs font-medium text-zinc-300">Assistant</span>
          </div>
          
          <div className="flex-1 p-3 space-y-3 overflow-y-auto">
             {/* Dynamic Messages based on Active File */}
             <div key={activeFile.type} className="animate-in slide-in-from-right-4 duration-500">
                <div className="flex items-start gap-2 mb-1.5">
                   <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-[8px] text-white font-bold shadow-lg shadow-indigo-900/20">AI</div>
                   <div className="text-[8px] text-zinc-500 mt-1">Now</div>
                </div>
                <div className="bg-zinc-800 rounded-lg p-2.5 text-[10px] text-zinc-300 border border-zinc-700/50 shadow-sm leading-relaxed">
                   {activeFile.type === "slide" && (
                     <>
                       <p className="mb-2">Chart outdated. Update with Q3 data?</p>
                       <button className="w-full py-1.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 border border-indigo-500/20 rounded transition-colors flex items-center justify-center gap-1.5 font-medium">
                         <Sparkles className="w-2.5 h-2.5" /> Update
                       </button>
                     </>
                   )}
                   {activeFile.type === "table" && "Growth +45%. Generate forecast?"}
                   {activeFile.type === "text" && (
                      <>
                        <p className="mb-2">Add Q3 data to "Strategy"?</p>
                        <div className="flex gap-1.5">
                           <button className="flex-1 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded transition-colors">Yes</button>
                           <button className="flex-1 py-1 bg-zinc-700/50 hover:bg-zinc-700 text-zinc-400 border border-zinc-600/30 rounded transition-colors">No</button>
                        </div>
                      </>
                   )}
                   {activeFile.type === "pdf" && "Summary ready. Export to Memo?"}
                </div>
             </div>
             
             <div className="opacity-40 pointer-events-none">
                <div className="flex items-start gap-2 mb-1.5">
                   <div className="w-5 h-5 rounded-full bg-zinc-700 flex items-center justify-center text-[8px] text-zinc-400">U</div>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-2.5 text-[10px] text-zinc-500 border border-zinc-800">
                   Analyze figures...
                </div>
             </div>
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-zinc-800 bg-zinc-900/50">
             <div className="bg-black border border-zinc-800 rounded-md p-2 flex items-center gap-2">
                <Plus className="w-3.5 h-3.5 text-zinc-600" />
                <div className="text-[10px] text-zinc-600 truncate">Ask AI...</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
