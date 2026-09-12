import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { TextLink } from "@/components/ui/text-link";
import type { SolutionPage } from "@/types/content";

export type RelatedSolutionsProps = {
  solutions: readonly SolutionPage[];
  titleId: string;
};

export function RelatedSolutions({
  solutions,
  titleId,
}: RelatedSolutionsProps) {
  return (
    <Section surface="light" spacing="default" aria-labelledby={titleId}>
      <Container>
        <SectionHeading
          id={titleId}
          as="h2"
          size="h2"
          maxWidth="editorial"
          title="Outras soluções que costumam entrar no mesmo contexto"
        />
        <ul className="border-border mt-12 divide-y border-y">
          {solutions.map((solution) => (
            <li key={solution.slug} className="py-6">
              <p className="text-h3 text-foreground font-semibold">
                {solution.title}
              </p>
              <p className="text-body text-muted-foreground max-w-text mt-3">
                {solution.preview.outcome}
              </p>
              <TextLink
                href={solution.href}
                className="min-h-touch mt-4 inline-flex items-center"
              >
                {`Ver ${solution.title}`}
              </TextLink>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
