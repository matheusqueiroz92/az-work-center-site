import { Container } from "@/components/layout/container";
import { Section, type SectionSurface } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button-link";

export type ContextualCtaProps = {
  title: string;
  text: string;
  action: {
    label: string;
    href: string;
  };
  titleId: string;
  surface?: SectionSurface;
};

export function ContextualCta({
  title,
  text,
  action,
  titleId,
  surface = "brand",
}: ContextualCtaProps) {
  return (
    <Section surface={surface} spacing="default" aria-labelledby={titleId}>
      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            <h2 id={titleId} className="text-h2 text-foreground font-semibold">
              {title}
            </h2>
            <p className="text-lead text-foreground max-w-text mt-6">{text}</p>
          </div>
          <div className="min-w-0 lg:col-span-4 lg:flex lg:justify-end">
            <ButtonLink
              href={action.href}
              size="lg"
              className="w-full lg:w-auto"
            >
              {action.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
