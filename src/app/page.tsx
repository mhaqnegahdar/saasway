import SVGLogo from "@/components/layout/logo/logo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Coffee } from "lucide-react";
// import heroIllustration from "@/assets/hero-illustration.jpg";
import Link from "next/link";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm fixed top-0 w-full z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-10">
              <SVGLogo />
            </div>

            <span className="text-xl font-bold">SaaSWayz</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Log in
            </Link>
            <Button asChild size="sm">
              <Link href="/signup">Sign up</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                AI-Powered Product Planning
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Clarity Calls for SaaS Founders,{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Powered by AI
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Talk to an AI product strategist instead of hiring a consultant.
                Get clear direction, technical proposals, and actionable next
                steps.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="hero" size="lg">
                  <Link href="/signup">
                    Start My Clarity Call <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#how-it-works">
                    <Play className="mr-2 h-5 w-5" />
                    See How It Works
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              {/* <img
                src={heroIllustration}
                alt="Founders collaborating with AI"
                className="relative rounded-3xl shadow-2xl"
              /> */}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
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

      {/* Features */}
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

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-12 text-center shadow-2xl">
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl font-bold text-white">
                Ready to Build with Clarity?
              </h2>
              <p className="text-xl text-white/90">
                Start your first AI-powered planning call today
              </p>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white hover:bg-white/90 text-primary border-0"
              >
                <Link href="/signup">
                  Get Started Free <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow" />
                <span className="text-lg font-bold">SaaSWayz</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered product planning for SaaS founders
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-foreground transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Examples
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 SaaSWayz. All rights reserved.
            </p>
            <a
              href="https://buymeacoffee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Coffee className="h-4 w-4" />
              Buy Me a Coffee
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
