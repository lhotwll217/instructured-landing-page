"use client"

export default function CTA() {
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Ready to transform how your team works with AI?
        </h2>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Join leading organizations turning distributed intelligence into organizational advantage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity">
            Get Started Free
          </button>
          <button className="px-8 py-3 border border-border rounded-full font-medium hover:bg-accent/10 transition-colors">
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  )
}
