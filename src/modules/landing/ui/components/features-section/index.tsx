import React from "react";

export default function FeaturesSection() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-xl text-muted-foreground">
            Professional product planning without the consultant fees
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "🎙️",
              title: "Voice-First Interaction",
              desc: "Natural conversations that feel like talking to a real strategist",
            },
            {
              icon: "📄",
              title: "Complete Documentation",
              desc: "PRDs and technical proposals ready for your team",
            },
            {
              icon: "🔄",
              title: "Iterative Refinement",
              desc: "Chat-based follow-ups to perfect your documents",
            },
            {
              icon: "⚡",
              title: "Fast Turnaround",
              desc: "Get initial documents within minutes of your call",
            },
            {
              icon: "💡",
              title: "Strategic Insights",
              desc: "AI identifies gaps and opportunities in your plan",
            },
            {
              icon: "🔒",
              title: "Secure & Private",
              desc: "Your ideas stay confidential and protected",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
