import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button-link";
import { notFoundContent } from "@/content/not-found";

export function NotFoundContent() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <Section
        surface="dark"
        spacing="narrative"
        aria-labelledby="nao-encontrada-titulo"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h1
                id="nao-encontrada-titulo"
                className="text-display-md text-foreground font-bold"
              >
                {notFoundContent.title}
              </h1>
              <p className="text-lead text-muted-foreground max-w-text mt-6">
                {notFoundContent.text}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                {notFoundContent.actions.map((action) => (
                  <ButtonLink
                    key={action.href}
                    href={action.href}
                    variant={action.href === "/" ? "primary" : "secondary"}
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    {action.label}
                  </ButtonLink>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
