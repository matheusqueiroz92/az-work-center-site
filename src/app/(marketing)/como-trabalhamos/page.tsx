import { ContextualCta } from "@/components/internal/contextual-cta";
import { EditorialList } from "@/components/internal/editorial-list";
import { FaqBlock } from "@/components/internal/faq-block";
import { InternalPageIntro } from "@/components/internal/internal-page-intro";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { howWeWork } from "@/content/how-we-work";
import { createPageMetadata } from "@/lib/metadata";

const ancestors = [{ label: "Início", href: "/" }] as const;

const longForm = [
  howWeWork.diagnosis,
  howWeWork.discovery,
  howWeWork.contracting,
  howWeWork.communication,
  howWeWork.scope,
  howWeWork.quality,
  howWeWork.documentation,
  howWeWork.delivery,
  howWeWork.support,
] as const;

export const metadata = createPageMetadata(
  howWeWork.seo.title,
  howWeWork.seo.description,
);

export default function HowWeWorkPage() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <InternalPageIntro
        eyebrow={howWeWork.eyebrow}
        title={howWeWork.title}
        description={howWeWork.text}
        current="Como trabalhamos"
        ancestors={ancestors}
        titleId="como-trabalhamos-titulo"
      />

      <Section
        surface="dark"
        spacing="default"
        aria-labelledby="principios-titulo"
      >
        <Container>
          <SectionHeading
            id="principios-titulo"
            as="h2"
            size="h2"
            maxWidth="editorial"
            title={howWeWork.principles.title}
          />
          <EditorialList className="mt-12" items={howWeWork.principles.items} />
        </Container>
      </Section>

      {longForm.map((block, index) => (
        <Section
          key={block.title}
          surface={index % 2 === 0 ? "light" : "dark"}
          spacing="narrative"
          aria-labelledby={`${block.title.toLowerCase().replaceAll(" ", "-")}-titulo`}
        >
          <Container width="editorial">
            <SectionHeading
              id={`${block.title.toLowerCase().replaceAll(" ", "-")}-titulo`}
              as="h2"
              size="h2"
              maxWidth="editorial"
              title={block.title}
              description={block.text}
            />
          </Container>
        </Section>
      ))}

      <FaqBlock
        title="Perguntas frequentes comerciais"
        items={howWeWork.faqs}
        idPrefix="faq-como-trabalhamos"
        titleId="faq-como-titulo"
      />
      <ContextualCta
        title={howWeWork.cta.title}
        text={howWeWork.cta.text}
        action={howWeWork.cta.action}
        titleId="cta-como-titulo"
      />
    </main>
  );
}
