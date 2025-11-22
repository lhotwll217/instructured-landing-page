"use client"

import { useState } from "react"
import { ChevronDown } from 'lucide-react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "What is Instructured and how does it help my organization?",
      answer:
        "Instructured empowers teams to build, share, and evolve AI agent workflows. It transforms individual AI expertise into distributed, organization-wide intelligence, making intelligent work scalable across your entire organization.",
    },
    {
      question: "Can I integrate Instructured with our existing tools?",
      answer:
        "Yes, Instructured is designed to work seamlessly with your existing enterprise tools and workflows. Our platform supports integration with popular business applications.",
    },
    {
      question: "What are Knowledge Repositories?",
      answer:
        "Knowledge Repositories in Instructured capture your power users' AI workflows and expertise, making them accessible organization-wide. Your best practices become scalable assets that multiply productivity gains across teams and departments.",
    },
    {
      question: "How quickly can we get started with Instructured?",
      answer:
        "You can get started within minutes. Our platform is designed for rapid deployment with minimal setup, allowing your teams to begin building AI workflows immediately.",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h2 className="text-4xl sm:text-5xl font-bold text-white text-center mb-16">Frequently Asked Questions</h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <button
            key={index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full text-left"
          >
            <div
              className={`p-6 rounded-xl border transition-all duration-300 ${
                openIndex === index
                  ? "bg-zinc-800/50 border-zinc-600"
                  : "bg-zinc-900/50 border-zinc-700 hover:bg-zinc-800/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white pr-6">{faq.question}</h3>
                <ChevronDown
                  size={24}
                  className={`text-zinc-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>

              {openIndex === index && <p className="text-zinc-300 mt-4 leading-relaxed">{faq.answer}</p>}
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
