import { ContextualCta } from "@/components/internal/contextual-cta";
import { InternalPageIntro } from "@/components/internal/internal-page-intro";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { TextLink } from "@/components/ui/text-link";
import { solutionsIndex } from "@/content/solutions-index";
import { createPageMetadata } from "@/lib/metadata";
import { listSolutions } from "@/lib/solutions";

const ancestors = [{ label: "Início", href: "/" }] as const;

export const metadata = createPageMetadata(
  solutionsIndex.seo.title,
  solutionsIndex.seo.description,
);

export default function SolutionsIndexPage() {
  const solutions = listSolutions();

  return (
    <main id="conteudo" tabIndex={-1}>
      <InternalPageIntro
        eyebrow={solutionsIndex.eyebrow}
        title={solutionsIndex.title}
        description={solutionsIndex.text}
        current="Soluções"
        ancestors={ancestors}
        titleId="solucoes-titulo"
      />

      <Section
        surface="light"
        spacing="default"
        aria-labelledby="ofertas-titulo"
      >
        <Container>
          <SectionHeading
            id="ofertas-titulo"
            as="h2"
            size="h2"
            maxWidth="editorial"
            title="Quatro ofertas, um mesmo ponto de partida"
            description="Cada faixa aponta para a página da solução. Não é uma grade de cards nem uma lista de tecnologias."
          />
          <ol className="mt-16">
            {solutions.map((solution, index) => (
              <li
                key={solution.slug}
                className="border-border grid gap-6 border-t py-10 lg:grid-cols-12 lg:items-start lg:gap-12"
              >
                <p className="text-label text-muted-foreground font-semibold lg:col-span-2">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div
                  className={
                    index % 2 === 0
                      ? "lg:col-span-6"
                      : "lg:col-span-5 lg:col-start-4"
                  }
                >
                  <h3 className="text-h2 text-foreground font-semibold">
                    {solution.title}
                  </h3>
                  <p className="text-body-lg text-foreground mt-4">
                    {solution.preview.outcome}
                  </p>
                  <p className="text-body text-muted-foreground mt-3">
                    {solution.preview.summary}
                  </p>
                  <ul className="mt-6">
                    {solution.preview.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="text-body text-foreground border-border border-l py-2 pl-4"
                      >
                        {capability}
                      </li>
                    ))}
                  </ul>
                  <TextLink
                    href={solution.href}
                    className="min-h-touch mt-6 inline-flex items-center"
                  >
                    {`Ver solução de ${solution.title}`}
                  </TextLink>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section
        surface="dark"
        spacing="default"
        aria-labelledby="integracao-titulo"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <SectionHeading
              id="integracao-titulo"
              as="h2"
              size="h2"
              maxWidth="none"
              className="lg:col-span-5"
              title={solutionsIndex.integration.title}
            />
            <p className="text-lead text-foreground max-w-text lg:col-span-7">
              {solutionsIndex.integration.text}
            </p>
          </div>
        </Container>
      </Section>

      <ContextualCta
        title={solutionsIndex.cta.title}
        text={solutionsIndex.cta.text}
        action={solutionsIndex.cta.action}
        titleId="cta-solucoes-titulo"
      />
    </main>
  );
}
