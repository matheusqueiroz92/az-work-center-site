import { FounderProfile } from "@/components/home/founder-profile";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { homeFounders } from "@/content/home";
import { founders, foundersNote } from "@/content/team";

export function FoundersSection() {
  const [matheus, lucas] = founders;

  if (!matheus || !lucas) {
    return null;
  }

  return (
    <Section
      id="equipe"
      surface="light"
      spacing="default"
      aria-labelledby="equipe-titulo"
    >
      <Container>
        <SectionHeading
          id="equipe-titulo"
          as="h2"
          size="h2"
          maxWidth="editorial"
          eyebrow={homeFounders.eyebrow}
          title={homeFounders.title}
        />
        <div className="border-border mt-12 grid gap-12 border-t pt-12 lg:grid-cols-2 lg:gap-16">
          <FounderProfile member={matheus} />
          <div className="border-border lg:border-l lg:pl-16">
            <FounderProfile member={lucas} />
          </div>
        </div>
        <p className="text-body text-muted-foreground max-w-text mt-12">
          {foundersNote}
        </p>
      </Container>
    </Section>
  );
}
