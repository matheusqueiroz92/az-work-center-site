import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { homeTrust } from "@/content/home";

export function TrustSection() {
  return (
    <Section
      surface="dark"
      spacing="default"
      aria-labelledby="confianca-titulo"
    >
      <Container>
        <SectionHeading
          id="confianca-titulo"
          as="h2"
          size="h2"
          maxWidth="editorial"
          eyebrow={homeTrust.eyebrow}
          title={homeTrust.title}
        />
        <ul className="mt-12 grid gap-0 lg:grid-cols-2">
          {homeTrust.items.map((item, index) => (
            <li
              key={item.title}
              className={`border-border border-t py-8 ${
                index % 2 === 1 ? "lg:border-l lg:pl-10" : "lg:pr-10"
              }`}
            >
              <h3 className="text-body-lg text-foreground font-semibold">
                {item.title}
              </h3>
              <p className="text-body text-muted-foreground max-w-text mt-3">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
