import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button-link";
import { homeCta } from "@/content/home";

export function FinalCtaSection() {
  return (
    <Section
      id="diagnostico"
      surface="brand"
      spacing="default"
      aria-labelledby="diagnostico-titulo"
    >
      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            <h2
              id="diagnostico-titulo"
              className="text-h2 text-foreground font-semibold"
            >
              {homeCta.title}
            </h2>
            <p className="text-lead text-foreground max-w-text mt-6">
              {homeCta.text}
            </p>
          </div>
          <div className="min-w-0 lg:col-span-4 lg:flex lg:justify-end">
            <ButtonLink
              href={homeCta.action.href}
              size="lg"
              className="w-full lg:w-auto"
            >
              {homeCta.action.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
