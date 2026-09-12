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

const bands = [
  {
    title: "Presença",
    text: "Site, landing ou loja com um caminho que o visitante consegue seguir.",
    surface: "light" as const,
  },
  {
    title: "Medição",
    text: "Eventos e analytics que mostram o que aconteceu depois do clique.",
    surface: "dark" as const,
  },
  {
    title: "Conversão",
    text: "O próximo passo fica explícito. Tráfego só entra quando as duas faixas anteriores existem.",
    surface: "light" as const,
  },
] as const;

export function WebGrowthSections({ solution }: { solution: SolutionPage }) {
  const related = listRelatedSolutions(solution.relatedSlugs);

  return (
    <>
      <InternalPageIntro
        eyebrow="Web e Growth"
        title={solution.intro.headline}
        description={solution.intro.text}
        current={solution.title}
        ancestors={ancestors}
        titleId="solucao-titulo"
      />

      {bands.map((band, index) => (
        <Section
          key={band.title}
          surface={band.surface}
          spacing="compact"
          aria-labelledby={`faixa-${index}-titulo`}
        >
          <Container>
            <div className="grid items-end gap-8 py-8 lg:grid-cols-12">
              <p className="text-label text-muted-foreground font-semibold lg:col-span-3">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div className="lg:col-span-9">
                <h2
                  id={`faixa-${index}-titulo`}
                  className="text-h2 text-foreground font-semibold"
                >
                  {band.title}
                </h2>
                <p className="text-lead text-muted-foreground max-w-text mt-4">
                  {band.text}
                </p>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <Section
        surface="dark"
        spacing="default"
        aria-labelledby="sintomas-titulo"
      >
        <Container>
          <SectionHeading
            id="sintomas-titulo"
            as="h2"
            size="h2"
            maxWidth="editorial"
            title="Quando a presença digital ainda não conduz"
          />
          <EditorialList className="mt-12" items={solution.symptoms} />
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
            title="Resultados esperados"
            description="Sem promessa de vendas e sem tráfego vendido isolado."
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
            title="Capacidades"
          />
          <EditorialList className="mt-12" items={solution.capabilities} />
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
