import { TextLink } from "@/components/ui/text-link";
import type { ServicePreview } from "@/types/content";

export function ServiceOffer({ service }: { service: ServicePreview }) {
  const headingId = `solucao-${service.slug}`;

  return (
    <article
      aria-labelledby={headingId}
      className="border-border border-t py-8 first:border-t-0 first:pt-0 last:pb-0"
    >
      <h3 id={headingId} className="text-h3 text-foreground font-semibold">
        {service.title}
      </h3>
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
      <TextLink
        href={service.href}
        className="min-h-touch mt-6 inline-flex items-center"
      >
        {`Ver solução de ${service.title}`}
      </TextLink>
    </article>
  );
}
