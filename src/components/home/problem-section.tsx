import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { homeProblems } from "@/content/home";

const problemGroupName = "problemas-home";

function ProblemMarker() {
  return (
    <span
      data-problem-marker
      aria-hidden="true"
      className="text-muted-foreground inline-flex size-4 shrink-0 items-center justify-center"
    >
      <svg
        viewBox="0 0 16 16"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M4 6l4 4 4-4" />
      </svg>
    </span>
  );
}

export function ProblemSection() {
  return (
    <Section
      id="problemas"
      surface="light"
      spacing="default"
      aria-labelledby="problemas-titulo"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <SectionHeading
              id="problemas-titulo"
              as="h2"
              size="h2"
              maxWidth="none"
              eyebrow={homeProblems.eyebrow}
              title={homeProblems.title}
              description={homeProblems.description}
            />
          </div>
          <ol
            data-problem-list
            className="border-border min-w-0 border-t lg:col-span-7"
          >
            {homeProblems.items.map((item, index) => {
              const number = String(index + 1).padStart(2, "0");

              return (
                <li key={item.title} className="border-border min-w-0 border-b">
                  <details
                    data-problem-item
                    name={problemGroupName}
                    open={index === 0 || undefined}
                  >
                    <summary data-problem-summary>
                      <span
                        data-problem-index
                        className="text-label text-muted-foreground w-8 shrink-0 tabular-nums"
                      >
                        {number}
                      </span>
                      <span
                        role="heading"
                        aria-level={3}
                        className="text-h3 text-foreground min-w-0 flex-1 font-semibold wrap-break-word"
                      >
                        {item.title}
                      </span>
                      <ProblemMarker />
                    </summary>
                    <div data-problem-body>
                      <p className="text-body text-muted-foreground max-w-text">
                        {item.description}
                      </p>
                    </div>
                  </details>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
