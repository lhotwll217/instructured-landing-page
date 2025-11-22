"use client"

import { HeroVisual } from "./hero-visual"

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left side: Content */}
          <div className="space-y-8 relative z-10 lg:col-span-5">
            <div className="space-y-6">
              {/* Badge showing active users */}
              <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-full px-4 py-2 w-fit">
                <div className="flex -space-x-2">
                  <div className="w-5 h-5 rounded-full bg-slate-600 border border-black"></div>
                  <div className="w-5 h-5 rounded-full bg-slate-600 border border-black"></div>
                  <div className="w-5 h-5 rounded-full bg-slate-600 border border-black"></div>
                </div>
                <span className="text-xs text-slate-300">1200+ active users</span>
              </div>

              {/* Main heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white text-balance">
                AI native workspace for <span className="text-white">knowledge workers</span>.
              </h1>

              {/* Description */}
              <p className="text-lg text-slate-400 leading-relaxed max-w-xl text-balance">
                Instructured is a file viewer and editor that helps your team do more faster with reusable AI agent
                workflows.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-slate-200 transition-colors shadow-lg shadow-black/20">
                Get Started
              </button>
              <button className="px-8 py-3 border border-slate-600 text-white rounded-full font-medium hover:bg-slate-800 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right side: Interface Mockup */}
          <div className="relative block w-full lg:col-span-7">
             <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
