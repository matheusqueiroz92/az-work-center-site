import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { AccordionList } from "@/components/ui/accordion";
import { homeFaqs } from "@/content/faqs";
import { homeFaq } from "@/content/home";

export function FAQSection() {
  return (
    <Section
      id="faq"
      surface="light"
      spacing="default"
      aria-labelledby="faq-titulo"
    >
      <Container>
        <SectionHeading
          id="faq-titulo"
          as="h2"
          size="h2"
          maxWidth="editorial"
          eyebrow={homeFaq.eyebrow}
          title={homeFaq.title}
        />
        <div className="max-w-content mt-12">
          <AccordionList items={homeFaqs} idPrefix="faq-home" />
        </div>
      </Container>
    </Section>
  );
}
