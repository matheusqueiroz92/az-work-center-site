import { EngagementSection } from "@/components/home/engagement-section";
import { FAQSection } from "@/components/home/faq-section";
import { FinalCtaSection } from "@/components/home/final-cta-section";
import { HeroSection } from "@/components/home/hero-section";
import { ProblemSection } from "@/components/home/problem-section";
import { ProcessSection } from "@/components/home/process-section";
import { ServicesSection } from "@/components/home/services-section";
import { TrustSection } from "@/components/home/trust-section";
import { createHomeMetadata } from "@/lib/metadata";

export const metadata = createHomeMetadata();

export default function HomePage() {
  return (
    <main id="conteudo" tabIndex={-1} data-header-overlay="">
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <ProcessSection />
      <EngagementSection />
      <TrustSection />
      <FAQSection />
      <FinalCtaSection />
    </main>
  );
}
