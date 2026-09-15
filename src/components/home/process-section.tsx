import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { ProcessLine } from "@/components/motion/process-line";
import { homeMethod } from "@/content/home";

export function ProcessSection() {
  return (
    <Section
      id="metodo"
      surface="light"
      spacing="default"
      aria-labelledby="metodo-titulo"
    >
      <Container>
        <SectionHeading
          id="metodo-titulo"
          as="h2"
          size="h2"
          maxWidth="editorial"
          eyebrow={homeMethod.eyebrow}
          title={homeMethod.title}
          description={homeMethod.description}
        />
        <div className="relative mt-12">
          <ProcessLine />
          <ol className="border-border grid gap-0 border-t lg:grid-cols-4">
            {homeMethod.steps.map((step) => (
              <li
                key={step.number}
                className="border-border relative border-b py-8 last:border-b-0 lg:border-r lg:border-b-0 lg:px-6 lg:py-10 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <p className="text-label text-muted-foreground font-semibold">
                  {step.number}
                </p>
                <h3 className="text-h3 text-foreground mt-4 font-semibold">
                  {step.title}
                </h3>
                <p className="text-body text-muted-foreground max-w-text mt-3">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
