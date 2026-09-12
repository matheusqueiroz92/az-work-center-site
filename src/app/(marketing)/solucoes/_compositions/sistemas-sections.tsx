import { ContextualCta } from "@/components/internal/contextual-cta";
import { EditorialList } from "@/components/internal/editorial-list";
import { FaqBlock } from "@/components/internal/faq-block";
import { InternalPageIntro } from "@/components/internal/internal-page-intro";
import { RelatedSolutions } from "@/components/internal/related-solutions";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { listRelatedSolutions } from "@/lib/solutions";
import type { SolutionPage } from "@/types/content";

const ancestors = [
  { label: "Início", href: "/" },
  { label: "Soluções", href: "/solucoes" },
] as const;

export function SistemasSections({ solution }: { solution: SolutionPage }) {
  const related = listRelatedSolutions(solution.relatedSlugs);

  return (
    <>
      <InternalPageIntro
        eyebrow="Sistemas sob medida"
        title={solution.intro.headline}
        description={solution.intro.text}
        current={solution.title}
        ancestors={ancestors}
        titleId="solucao-titulo"
      />

      <Section
        surface="dark"
        spacing="default"
        aria-labelledby="sintomas-titulo"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <SectionHeading
              id="sintomas-titulo"
              as="h2"
              size="h2"
              maxWidth="none"
              className="lg:col-span-4"
              title="Sinais de que a operação já pediu um sistema"
            />
            <div className="lg:col-span-8">
              <EditorialList items={solution.symptoms} />
            </div>
          </div>
        </Container>
      </Section>

      <Section
        surface="light"
        spacing="default"
        aria-labelledby="resultados-titulo"
      >
        <Container>
          <SectionHeading
            id="resultados-titulo"
            as="h2"
            size="h2"
            maxWidth="editorial"
            title="O que muda quando o fluxo fica centralizado"
          />
          <EditorialList className="mt-12" items={solution.outcomes} />
        </Container>
      </Section>

      <Section
        surface="light"
        spacing="default"
        aria-labelledby="capacidades-titulo"
      >
        <Container>
          <SectionHeading
            id="capacidades-titulo"
            as="h2"
            size="h2"
            maxWidth="editorial"
            title="Capacidades e entregas"
          />
          <ol className="bg-border mt-12 grid gap-px md:grid-cols-2">
            {solution.capabilities.map((item, index) => (
              <li
                key={item.title}
                className="bg-background grid gap-4 p-6 md:p-8"
              >
                <p className="text-label text-muted-foreground font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="text-h3 text-foreground font-semibold">
                  {item.title}
                </h3>
                <p className="text-body text-muted-foreground max-w-text">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section
        surface="dark"
        spacing="default"
        aria-labelledby="exemplos-titulo"
      >
        <Container>
          <SectionHeading
            id="exemplos-titulo"
            as="h2"
            size="h2"
            maxWidth="editorial"
            title="Exemplos de aplicação"
            description="Situações típicas — sem nomes de cliente e sem resultado prometido."
          />
          <EditorialList className="mt-12" items={solution.examples} />
        </Container>
      </Section>

      <Section
        surface="light"
        spacing="narrative"
        aria-labelledby="metodo-titulo"
      >
        <Container width="editorial">
          <SectionHeading
            id="metodo-titulo"
            as="h2"
            size="h2"
            maxWidth="editorial"
            title={solution.process.title}
            description={solution.process.text}
          />
          <EditorialList
            className="mt-12"
            items={solution.process.steps}
            numbered
          />
        </Container>
      </Section>

      <RelatedSolutions solutions={related} titleId="relacionadas-titulo" />
      <FaqBlock
        title="Perguntas frequentes"
        items={solution.faqs}
        idPrefix={`faq-${solution.slug}`}
        titleId="faq-solucao-titulo"
      />
      <ContextualCta
        title={solution.cta.title}
        text={solution.cta.text}
        action={solution.cta.action}
        titleId="cta-solucao-titulo"
      />
    </>
  );
}
