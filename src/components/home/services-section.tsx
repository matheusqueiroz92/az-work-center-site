import { ServiceOffer } from "@/components/home/service-offer";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { ServiceStoryLoader } from "@/components/motion/service-story-loader";
import { homeServices } from "@/content/home";
import { servicePreviews } from "@/content/services";

function ServicesMap() {
  return (
    <div className="text-foreground w-full min-w-0">
      <svg
        viewBox="0 0 280 320"
        className="h-auto w-full"
        aria-hidden="true"
        focusable="false"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="24" y="28" width="100" height="72" />
          <rect x="156" y="48" width="96" height="64" />
          <rect x="32" y="176" width="104" height="68" />
          <rect x="164" y="196" width="88" height="60" />
          <path d="M124 64 H156" />
          <path d="M74 100 V176" />
          <path d="M136 210 H164" />
          <path d="M204 112 V196" />
        </g>
        <g className="text-primary" fill="currentColor">
          <rect x="132" y="148" width="16" height="16" />
        </g>
      </svg>
    </div>
  );
}

export function ServicesSection() {
  return (
    <Section
      id="solucoes"
      surface="dark"
      spacing="default"
      aria-labelledby="solucoes-titulo"
    >
      <Container>
        <SectionHeading
          id="solucoes-titulo"
          as="h2"
          size="h2"
          maxWidth="editorial"
          eyebrow={homeServices.eyebrow}
          title={homeServices.title}
        />
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-7">
            {servicePreviews.map((service) => (
              <ServiceOffer key={service.slug} service={service} />
            ))}
          </div>
          <div
            className="border-border relative hidden min-w-0 border p-6 lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:col-span-5 lg:block [@media(max-height:40rem)]:static"
            aria-hidden="true"
            data-service-story-frame=""
          >
            <div data-service-story-fallback="">
              <ServicesMap />
            </div>
            <ServiceStoryLoader />
          </div>
        </div>
      </Container>
    </Section>
  );
}
