import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { homeEngagement } from "@/content/home";

export function EngagementSection() {
  return (
    <Section
      id="capacidades"
      surface="dark"
      spacing="default"
      aria-labelledby="capacidades-titulo"
    >
      <Container>
        <SectionHeading
          id="capacidades-titulo"
          as="h2"
          size="h2"
          maxWidth="editorial"
          eyebrow={homeEngagement.eyebrow}
          title={homeEngagement.title}
          description={homeEngagement.description}
        />
        <div className="mt-12 grid gap-0 lg:grid-cols-2">
          {homeEngagement.modes.map((mode, index) => (
            <article
              key={mode.title}
              className={`border-border border-t py-8 lg:px-8 lg:py-10 ${
                index % 2 === 0 ? "lg:pl-0" : "lg:mt-12 lg:border-l lg:pr-0"
              } ${index > 1 ? "lg:border-t-0" : ""}`}
            >
              <h3 className="text-h3 text-foreground font-semibold">
                {mode.title}
              </h3>
              <p className="text-body text-muted-foreground max-w-text mt-4">
                {mode.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
