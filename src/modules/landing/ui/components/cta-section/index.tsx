import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CTASection() {
  return (
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
  );
}
