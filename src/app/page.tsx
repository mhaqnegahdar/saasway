import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";


import {
  Sparkles,
  Zap,
  FileCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
// import heroDashboard from "@/assets/hero-dashboard.png";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-border">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                AI-Powered Technical Planning
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground max-w-4xl mx-auto leading-tight">
              Turn your SaaS idea into a{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                build-ready roadmap
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Non-technical founders, meet your AI technical advisor. Get
              detailed roadmaps, tech stack recommendations, and timeline
              estimates — in minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/signup">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  Try Free
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl -z-10" />
            {/* <img
              src={heroDashboard}
              alt="SaaSWay Dashboard Interface"
              className="rounded-2xl shadow-2xl border border-border w-full"
            /> */}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/30"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to your technical roadmap
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-card border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                1. Describe Your Idea
              </h3>
              <p className="text-muted-foreground">
                Tell us about your SaaS vision in plain English. No technical
                jargon needed.
              </p>
            </Card>

            <Card className="p-8 bg-card border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                2. Get AI Roadmap
              </h3>
              <p className="text-muted-foreground">
                Our AI analyzes your idea and generates a comprehensive
                technical roadmap instantly.
              </p>
            </Card>

            <Card className="p-8 bg-card border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6">
                <FileCheck className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                3. Share or Build
              </h3>
              <p className="text-muted-foreground">
                Export your roadmap as PDF or share with your development team
                to start building.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-card to-accent/20 border-border">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              What You'll Get
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Detailed feature breakdown",
                "Tech stack recommendations",
                "Timeline estimates",
                "Technical risk assessment",
                "Development milestones",
                "Resource requirements",
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to turn your idea into reality?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join hundreds of founders who've transformed their ideas into
            actionable roadmaps.
          </p>
          <Link href="/signup">
            <Button variant="hero" size="lg">
              Start For Free
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
