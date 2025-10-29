import React from "react";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-accent/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground">
            Three simple steps to validate and build your SaaS
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Clarity Call",
              description:
                "Have a natural voice conversation with our AI strategist about your idea. It asks the right questions to understand your vision.",
            },
            {
              step: "02",
              title: "Get Documents",
              description:
                "Receive a complete PRD and Technical Proposal. Everything your dev team needs to start building with confidence.",
            },
            {
              step: "03",
              title: "Strategy Call",
              description:
                "Dive deeper into implementation details. Refine your documents through chat or follow-up voice conversations.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow border border-border"
            >
              <div className="text-5xl font-bold text-primary/20 mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
