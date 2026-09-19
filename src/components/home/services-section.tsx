import { ServiceOffer } from "@/components/home/service-offer";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { ServiceStoryDiagram } from "@/components/motion/service-story-diagrams";
import { ServiceStoryLoader } from "@/components/motion/service-story-loader";
import { homeServices } from "@/content/home";
import { servicePreviews } from "@/content/services";

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
            {servicePreviews.map((service, index) => (
              <ServiceOffer
                key={service.slug}
                service={service}
                index={index}
              />
            ))}
          </div>
          <div
            className="border-border relative hidden min-w-0 border p-6 lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:col-span-5 lg:block [@media(max-height:40rem)]:static"
            aria-hidden="true"
            data-service-story-frame=""
          >
            <div data-service-story-fallback="">
              <ServiceStoryDiagram slug="sistemas-sob-medida" />
            </div>
            <ServiceStoryLoader />
          </div>
        </div>
      </Container>
    </Section>
  );
}
