import CTASection from "@/modules/landing/ui/components/cta-section";
import FeaturesSection from "@/modules/landing/ui/components/features-section";
import HowItWorksSection from "@/modules/landing/ui/components/how-it-works-section";
import HeroSection from "@/modules/landing/ui/components/hero-section";
import Header from "@/modules/landing/ui/components/layout";
import { Footer } from "@/modules/landing/ui/components/layout/footer";

export default function LandingView() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Features */}
      <FeaturesSection />

      {/* CTA */}
      <CTASection />

      <Footer />
    </>
  );
}
