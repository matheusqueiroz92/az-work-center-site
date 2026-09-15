import { connection } from "next/server";

import { ContactChannels } from "@/app/(marketing)/contato/_components/contact-channels";
import { ContactForm } from "@/app/(marketing)/contato/_components/contact-form";
import { EditorialList } from "@/components/internal/editorial-list";
import { InternalPageIntro } from "@/components/internal/internal-page-intro";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { contact } from "@/content/contact";
import { createPageMetadata } from "@/lib/metadata";

const ancestors = [{ label: "Início", href: "/" }] as const;

export const metadata = createPageMetadata(
  contact.seo.title,
  contact.seo.description,
);

async function readContactFormStartedAt() {
  await connection();
  return String(Date.now());
}

export default async function ContactPage() {
  const startedAt = await readContactFormStartedAt();

  return (
    <main id="conteudo" tabIndex={-1}>
      <InternalPageIntro
        eyebrow={contact.eyebrow}
        title={contact.title}
        description={contact.text}
        current="Contato"
        ancestors={ancestors}
        titleId="contato-titulo"
      />

      <Section
        surface="light"
        spacing="default"
        aria-labelledby="formulario-titulo"
      >
        <Container width="editorial">
          <SectionHeading
            id="formulario-titulo"
            as="h2"
            size="h2"
            title={contact.form.title}
            description={contact.form.text}
          />
          <ContactForm startedAt={startedAt} />
        </Container>
      </Section>

      <Section
        surface="light"
        spacing="default"
        aria-labelledby="canais-titulo"
      >
        <Container>
          <SectionHeading
            id="canais-titulo"
            as="h2"
            size="h2"
            maxWidth="editorial"
            title={contact.channels.title}
            description={contact.channels.text}
          />
          <ContactChannels />
        </Container>
      </Section>

      <Section
        surface="dark"
        spacing="default"
        aria-labelledby="expectativa-titulo"
      >
        <Container width="editorial">
          <SectionHeading
            id="expectativa-titulo"
            as="h2"
            size="h2"
            title={contact.expectation.title}
            description={contact.expectation.text}
          />
        </Container>
      </Section>

      <Section
        surface="light"
        spacing="default"
        aria-labelledby="preparar-titulo"
      >
        <Container>
          <SectionHeading
            id="preparar-titulo"
            as="h2"
            size="h2"
            maxWidth="editorial"
            title={contact.prepare.title}
          />
          <EditorialList className="mt-12" items={contact.prepare.items} />
        </Container>
      </Section>

      <Section
        surface="light"
        spacing="default"
        aria-labelledby="desafios-titulo"
      >
        <Container>
          <SectionHeading
            id="desafios-titulo"
            as="h2"
            size="h2"
            maxWidth="editorial"
            title={contact.challenges.title}
            description={contact.challenges.description}
          />
          <EditorialList className="mt-12" items={contact.challenges.items} />
        </Container>
      </Section>

      <Section
        surface="dark"
        spacing="narrative"
        aria-labelledby="diagnostico-titulo"
      >
        <Container width="editorial">
          <SectionHeading
            id="diagnostico-titulo"
            as="h2"
            size="h2"
            title={contact.diagnosis.title}
            description={contact.diagnosis.text}
          />
        </Container>
      </Section>
    </main>
  );
}
