import { FaqBlock } from "@/components/internal/faq-block";
import { homeFaqs } from "@/content/faqs";
import { homeFaq } from "@/content/home";

export function FAQSection() {
  return (
    <FaqBlock
      eyebrow={homeFaq.eyebrow}
      title={homeFaq.title}
      items={homeFaqs}
      idPrefix="faq-home"
      titleId="faq-titulo"
      sectionId="faq"
      surface="light"
    />
  );
}
