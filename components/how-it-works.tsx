"use client"

export default function HowItWorks() {
  const steps = [
    {
      title: "Step One",
      description: "Pull CSV, PDFs, Word Docs, Slides into Instructured workspace folder structure",
    },
    {
      title: "Step Two",
      description: "Use AI to search, write, and perform actions using your data",
    },
    {
      title: "Step Three",
      description: "Create reusable workflows and agents and share them across your organization",
    },
  ]

  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto space-y-12">
        <h2 className="text-4xl md:text-5xl font-bold text-center">How it works?</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="aspect-video bg-card border border-border rounded-lg flex flex-col items-center justify-center p-6 hover:border-border/80 transition-colors"
            >
              <div className="space-y-2 text-center">
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
