import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import {
  Breadcrumb,
  type BreadcrumbAncestor,
} from "@/components/ui/breadcrumb";

export type InternalPageIntroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  current: string;
  ancestors: readonly [BreadcrumbAncestor, ...BreadcrumbAncestor[]];
  titleId: string;
};

export function InternalPageIntro({
  eyebrow,
  title,
  description,
  current,
  ancestors,
  titleId,
}: InternalPageIntroProps) {
  return (
    <Section
      as="header"
      surface="dark"
      spacing="default"
      aria-labelledby={titleId}
    >
      <Container>
        <Breadcrumb
          items={ancestors}
          current={current}
          className="max-w-full"
        />
        <SectionHeading
          id={titleId}
          as="h1"
          size="display-md"
          maxWidth="editorial"
          eyebrow={eyebrow}
          title={title}
          description={description}
          className="mt-10"
        />
      </Container>
    </Section>
  );
}
