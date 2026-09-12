import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { homeProblems } from "@/content/home";

export function ProblemSection() {
  return (
    <Section
      id="problemas"
      surface="light"
      spacing="default"
      aria-labelledby="problemas-titulo"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <SectionHeading
              id="problemas-titulo"
              as="h2"
              size="h2"
              maxWidth="none"
              eyebrow={homeProblems.eyebrow}
              title={homeProblems.title}
              description={homeProblems.description}
            />
          </div>
          <ol className="border-border min-w-0 border-l lg:col-span-7">
            {homeProblems.items.map((item) => (
              <li
                key={item.title}
                className="border-border min-h-0 border-b px-5 py-6 first:border-t sm:px-8"
              >
                <h3 className="text-h3 text-foreground font-semibold">
                  {item.title}
                </h3>
                <p className="text-body text-muted-foreground max-w-text mt-3">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
