import Link from "next/link";

import type { ServicePreview } from "@/types/content";

export const serviceGroupName = "solucoes-home";

function ServiceCtaArrow() {
  return (
    <svg
      data-service-cta-arrow=""
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

function ServiceMarker() {
  return (
    <span
      data-service-marker
      aria-hidden="true"
      className="text-muted-foreground inline-flex size-4 shrink-0 items-center justify-center lg:hidden"
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

export function ServiceOffer({
  service,
  index,
}: {
  service: ServicePreview;
  index: number;
}) {
  const headingId = `solucao-${service.slug}`;

  return (
    <article
      aria-labelledby={headingId}
      data-service-story-item={service.slug}
      className="border-border relative border-t py-8 first:border-t-0 first:pt-0 last:pb-0 max-lg:py-0 lg:pl-3"
    >
      <details
        data-service-offer=""
        name={serviceGroupName}
        open={index === 0 || undefined}
      >
        <summary data-service-summary="">
          <span
            id={headingId}
            data-service-title
            role="heading"
            aria-level={3}
            className="text-h3 text-foreground min-w-0 flex-1 font-semibold wrap-break-word"
          >
            {service.title}
          </span>
          <ServiceMarker />
        </summary>
        <div data-service-body="">
          <p className="text-body-lg text-foreground max-w-text mt-4">
            {service.outcome}
          </p>
          <p className="text-body text-muted-foreground max-w-text mt-3">
            {service.summary}
          </p>
          <ul className="max-w-text mt-6">
            {service.capabilities.map((capability) => (
              <li
                key={capability}
                className="text-body text-foreground border-border border-l py-2 pl-4"
              >
                {capability}
              </li>
            ))}
          </ul>
          <Link
            href={service.href}
            data-service-cta=""
            className="text-small min-h-touch border-border mt-6 inline-flex items-center gap-2 rounded-xs border px-4 py-2 font-semibold"
          >
            <span>{`Ver solução de ${service.title}`}</span>
            <ServiceCtaArrow />
          </Link>
        </div>
      </details>
    </article>
  );
}
