import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { about } from "@/content/about";

export function AboutNarrative() {
  return (
    <>
      {about.sections.map((section, index) => (
        <Section
          key={section.id}
          surface={index % 2 === 0 ? "light" : "dark"}
          spacing="narrative"
          aria-labelledby={`${section.id}-titulo`}
        >
          <Container>
            <div className="grid gap-8 lg:grid-cols-12">
              <p className="text-label text-muted-foreground font-semibold lg:col-span-3">
                {String(index + 1).padStart(2, "0")}
              </p>
              <SectionHeading
                id={`${section.id}-titulo`}
                as="h2"
                size="h2"
                maxWidth="editorial"
                className="lg:col-span-8"
                title={section.title}
                description={section.text}
              />
            </div>
          </Container>
        </Section>
      ))}
    </>
  );
}
