import Link from "next/link";

import {
  ProcessNarrative,
  ProcessStationMark,
} from "@/components/home/process-narrative";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import {
  ProcessLine,
  ProcessMobileTrack,
} from "@/components/motion/process-line";
import { homeMethod } from "@/content/home";

function ProcessCtaArrow() {
  return (
    <svg
      data-process-cta-arrow=""
      viewBox="0 0 16 16"
      className="size-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function ProcessSection() {
  return (
    <Section
      id="metodo"
      surface="light"
      spacing="default"
      aria-labelledby="metodo-titulo"
    >
      <Container>
        <SectionHeading
          id="metodo-titulo"
          as="h2"
          size="h2"
          maxWidth="editorial"
          eyebrow={homeMethod.eyebrow}
          title={homeMethod.title}
          description={homeMethod.description}
        />
        <div data-process-belt="" className="relative mt-10 lg:mt-12">
          <div data-process-progress="">
            <div data-process-stage="">
              <ProcessNarrative />
              <ProcessLine />
            </div>
            <div data-process-mobile-set="">
              <ProcessMobileTrack />
              <ol data-process-rail="">
                {homeMethod.steps.map((step, index) => {
                  const copyId = `metodo-passo-${step.number}-copy`;
                  const resultId = `metodo-passo-${step.number}-result`;

                  return (
                    <li
                      key={step.number}
                      data-process-step=""
                      data-process-index={String(index + 1)}
                    >
                      <ProcessStationMark index={index} />
                      <p
                        data-process-number=""
                        className="text-label font-semibold"
                      >
                        {step.number}
                      </p>
                      <h3
                        data-process-title=""
                        className="text-h3 font-semibold"
                        aria-describedby={`${copyId} ${resultId}`}
                      >
                        {step.title}
                      </h3>
                      <p
                        id={copyId}
                        data-process-copy=""
                        className="text-body text-muted-foreground max-w-text"
                      >
                        {step.description}
                      </p>
                      <p
                        id={resultId}
                        data-process-result=""
                        className="text-body text-foreground max-w-text font-medium"
                      >
                        <span className="sr-only">{`${homeMethod.resultLabel}: `}</span>
                        <span data-process-result-mark="" aria-hidden="true" />
                        {step.result}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
        <Link
          href={homeMethod.cta.href}
          data-process-cta=""
          className="text-small min-h-touch border-border mt-10 inline-flex items-center gap-2 rounded-xs border px-4 py-2 font-semibold"
        >
          <span>{homeMethod.cta.label}</span>
          <ProcessCtaArrow />
        </Link>
      </Container>
    </Section>
  );
}
