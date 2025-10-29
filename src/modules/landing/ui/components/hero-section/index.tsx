import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import heroIllustration from "@/../public/hero-illustration.jpg";


export default function HeroSection() {
  return (
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
              <Image
                width={500}
                height={100}
                src={heroIllustration}
                alt="Founders collaborating with AI"
                className="relative w-full rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
  )
}
