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

const pipeline = [
  { title: "Capturar", text: "Entrada do pedido, documento ou mensagem." },
  {
    title: "Classificar",
    text: "Organizar o que se repete e o que é exceção.",
  },
  { title: "Validar", text: "Pessoa confere o que muda risco ou cliente." },
  { title: "Agir", text: "Seguir o fluxo combinado ou devolver à equipe." },
] as const;

export function AutomacaoSections({ solution }: { solution: SolutionPage }) {
  const related = listRelatedSolutions(solution.relatedSlugs);

  return (
    <>
      <InternalPageIntro
        eyebrow="Automação e IA aplicada"
        title={solution.intro.headline}
        description={solution.intro.text}
        current={solution.title}
        ancestors={ancestors}
        titleId="solucao-titulo"
      />

      <Section surface="light" spacing="default" aria-labelledby="fluxo-titulo">
        <Container>
          <SectionHeading
            id="fluxo-titulo"
            as="h2"
            size="h2"
            maxWidth="editorial"
            title="O fluxo só fecha com validação humana"
            description="A esteira acelera o repetitivo. O pulso vermelho marca o estágio em que alguém ainda precisa conferir."
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {pipeline.map((stage, index) => (
              <li key={stage.title} className="border-border border-t pt-6">
                <p
                  className={
                    index === 2
                      ? "text-label text-primary font-semibold"
                      : "text-label text-muted-foreground font-semibold"
                  }
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="text-h3 text-foreground mt-4 font-semibold">
                  {stage.title}
                </h3>
                <p className="text-body text-muted-foreground mt-3">
                  {stage.text}
                </p>
              </li>
            ))}
          </ol>
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
            title="Quando a rotina pede automação — e quando não"
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
            description="Sem percentual, sem substituição de pessoas e sem promessa de ausência de erros."
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
