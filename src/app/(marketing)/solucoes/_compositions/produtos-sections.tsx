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

export function ProdutosSections({ solution }: { solution: SolutionPage }) {
  const related = listRelatedSolutions(solution.relatedSlugs);

  return (
    <>
      <InternalPageIntro
        eyebrow="Produtos digitais e MVPs"
        title={solution.intro.headline}
        description={solution.intro.text}
        current={solution.title}
        ancestors={ancestors}
        titleId="solucao-titulo"
      />

      <Section
        surface="light"
        spacing="default"
        aria-labelledby="recorte-titulo"
      >
        <Container>
          <SectionHeading
            id="recorte-titulo"
            as="h2"
            size="h2"
            maxWidth="editorial"
            title="O primeiro release tem borda"
            description="MVP não é o produto inteiro nem um rascunho sem critério. O recorte deixa visível o que entra e o que espera."
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div className="border-border border-l pl-6">
              <h3 className="text-h3 text-foreground font-semibold">
                Entra no primeiro recorte
              </h3>
              <p className="text-body text-muted-foreground mt-4">
                O caminho que alguém percorre, o aprendizado que se quer obter e
                a base técnica que aguenta o próximo ciclo.
              </p>
            </div>
            <div className="border-border border-l pl-6">
              <h3 className="text-h3 text-foreground font-semibold">
                Fica de fora de propósito
              </h3>
              <p className="text-body text-muted-foreground mt-4">
                O aplicativo inteiro, a garantia de validação comercial e a
                lista de ideias que ainda não têm usuário.
              </p>
            </div>
          </div>
        </Container>
      </Section>

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
            title="Sinais de que a ideia ainda não tem recorte"
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
