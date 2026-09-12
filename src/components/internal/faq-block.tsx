import { Container } from "@/components/layout/container";
import { Section, type SectionSurface } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { AccordionList } from "@/components/ui/accordion";
import type { FAQItem } from "@/types/content";

export type FaqBlockProps = {
  eyebrow?: string;
  title: string;
  items: readonly FAQItem[];
  idPrefix: string;
  titleId: string;
  sectionId?: string;
  surface?: SectionSurface;
};

export function FaqBlock({
  eyebrow,
  title,
  items,
  idPrefix,
  titleId,
  sectionId,
  surface = "light",
}: FaqBlockProps) {
  return (
    <Section
      id={sectionId}
      surface={surface}
      spacing="default"
      aria-labelledby={titleId}
    >
      <Container>
        <SectionHeading
          id={titleId}
          as="h2"
          size="h2"
          maxWidth="editorial"
          eyebrow={eyebrow}
          title={title}
        />
        <div className="max-w-content mt-12">
          <AccordionList items={items} idPrefix={idPrefix} />
        </div>
      </Container>
    </Section>
  );
}
