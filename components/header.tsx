"use client"

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 pt-4 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-zinc-800/80 backdrop-blur-md rounded-2xl px-8 py-4 flex items-center justify-between border border-zinc-700/50">
          <div className="text-lg font-bold tracking-tight text-white">◆</div>
          <nav className="hidden md:flex items-center gap-12">
            <a href="#" className="text-sm text-zinc-300 hover:text-white transition-colors">
              Services
            </a>
            <a href="#" className="text-sm text-zinc-300 hover:text-white transition-colors">
              How it works
            </a>
            <a href="#" className="text-sm text-zinc-300 hover:text-white transition-colors">
              Testimonials
            </a>
            <a href="#" className="text-sm text-zinc-300 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#" className="text-sm text-zinc-300 hover:text-white transition-colors">
              FAQ
            </a>
          </nav>
          <button className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-zinc-100 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </header>
  )
}
