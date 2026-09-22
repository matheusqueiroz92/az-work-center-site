import { HeroMedia } from "@/components/home/hero-media";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { HeroInteractiveGlow } from "@/components/motion/hero-interactive-glow";
import { ButtonLink } from "@/components/ui/button-link";
import { homeHero } from "@/content/home";

export function HeroSection() {
  return (
    <Section
      surface="dark"
      spacing="compact"
      aria-labelledby="hero-titulo"
      data-hero=""
      className="relative isolate flex min-h-0 items-center py-0"
    >
      <div
        data-hero-stage=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-clip"
      >
        <HeroMedia />
        <div data-hero-scrim="" className="absolute inset-0" />
        <HeroInteractiveGlow />
      </div>
      <Container className="relative z-10">
        <div
          data-hero-content=""
          className="mx-auto flex w-full flex-col items-center text-center"
        >
          <SectionHeading
            id="hero-titulo"
            as="h1"
            size="h1"
            align="center"
            maxWidth="none"
            eyebrow={homeHero.eyebrow}
            title={homeHero.title}
          />
          <p className="text-lead text-muted-foreground max-w-text text-pretty">
            {homeHero.text}
          </p>
          <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
            <ButtonLink
              href={homeHero.primaryCta.href}
              size="lg"
              className="w-full sm:w-auto"
            >
              {homeHero.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={homeHero.secondaryCta.href}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              {homeHero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
