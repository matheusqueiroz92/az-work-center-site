import { AboutNarrative } from "@/app/(marketing)/sobre/_components/about-narrative";
import { ContextualCta } from "@/components/internal/contextual-cta";
import { InternalPageIntro } from "@/components/internal/internal-page-intro";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { about } from "@/content/about";
import { createPageMetadata } from "@/lib/metadata";

const ancestors = [{ label: "Início", href: "/" }] as const;

export const metadata = createPageMetadata(
  about.seo.title,
  about.seo.description,
);

export default function AboutPage() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <InternalPageIntro
        eyebrow={about.eyebrow}
        title={about.title}
        description={about.text}
        current="Sobre"
        ancestors={ancestors}
        titleId="sobre-titulo"
      />

      <AboutNarrative />

      <Section
        surface="light"
        spacing="default"
        aria-labelledby="fundadores-titulo"
      >
        <Container>
          <SectionHeading
            id="fundadores-titulo"
            as="h2"
            size="h2"
            maxWidth="editorial"
            title="Papéis atuais"
          />
          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            {about.founders.map((founder) => (
              <article
                key={founder.name}
                className="border-border border-t pt-6"
              >
                <h3 className="text-h3 text-foreground font-semibold">
                  {founder.name}
                </h3>
                <p className="text-body-lg text-foreground mt-4">
                  {founder.role}
                </p>
                <p className="text-body text-muted-foreground mt-3">
                  {founder.bio}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section
        surface="dark"
        spacing="narrative"
        aria-labelledby="manifesto-titulo"
      >
        <Container width="editorial">
          <h2 id="manifesto-titulo" className="sr-only">
            Manifesto
          </h2>
          <p className="font-editorial text-lead text-foreground">
            {about.manifesto}
          </p>
        </Container>
      </Section>

      <ContextualCta
        title={about.cta.title}
        text={about.cta.text}
        action={about.cta.action}
        titleId="cta-sobre-titulo"
      />
    </main>
  );
}
