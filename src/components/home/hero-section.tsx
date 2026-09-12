import { HeroDiagram } from "@/components/home/hero-diagram";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { homeHero } from "@/content/home";

export function HeroSection() {
  return (
    <Section surface="dark" spacing="narrative" aria-labelledby="hero-titulo">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex min-w-0 flex-col gap-8 lg:col-span-7">
            <SectionHeading
              id="hero-titulo"
              as="h1"
              size="display-lg"
              maxWidth="none"
              eyebrow={homeHero.eyebrow}
              title={homeHero.title}
            />
            <p className="text-lead text-muted-foreground max-w-text">
              {homeHero.text}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink
                href={homeHero.primaryCta.href}
                size="lg"
                className="w-full sm:w-auto"
              >
                {homeHero.primaryCta.label}
              </ButtonLink>
              <ButtonLink
                href={homeHero.secondaryCta.href}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {homeHero.secondaryCta.label}
              </ButtonLink>
            </div>
            <p className="font-editorial text-lead text-foreground max-w-text">
              {homeHero.proof}
            </p>
          </div>
          <div className="min-w-0 lg:col-span-5 lg:pt-8">
            <HeroDiagram />
          </div>
        </div>
      </Container>
    </Section>
  );
}
