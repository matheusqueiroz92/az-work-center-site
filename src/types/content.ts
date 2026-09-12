export const solutionSlugs = [
  "sistemas-sob-medida",
  "automacao-inteligencia-artificial",
  "produtos-digitais-mvp",
  "web-growth",
] as const;

export type SolutionSlug = (typeof solutionSlugs)[number];

export type SolutionComposition = "ledger" | "flow" | "scope" | "funnel";

export type FAQItem = {
  question: string;
  answer: string;
};

export type EditorialItem = {
  title: string;
  description: string;
};

export type SolutionPreviewFields = {
  outcome: string;
  summary: string;
  capabilities: readonly [string, string, string];
};

export type SolutionPage = {
  slug: SolutionSlug;
  title: string;
  shortTitle: string;
  href: `/solucoes/${SolutionSlug}`;
  preview: SolutionPreviewFields;
  intro: {
    headline: string;
    text: string;
  };
  symptoms: readonly EditorialItem[];
  outcomes: readonly EditorialItem[];
  capabilities: readonly EditorialItem[];
  examples: readonly EditorialItem[];
  process: {
    title: string;
    text: string;
    steps: readonly EditorialItem[];
  };
  relatedSlugs: readonly SolutionSlug[];
  faqs: readonly FAQItem[];
  cta: {
    title: string;
    text: string;
    action: {
      label: string;
      href: "/contato";
    };
  };
  seo: {
    title: string;
    description: string;
  };
  composition: SolutionComposition;
};

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  outcome: string;
  capabilities: string[];
  useCases: string[];
  seo: {
    title: string;
    description: string;
  };
};

export type ServicePreview = {
  slug: string;
  href: string;
  title: string;
  outcome: string;
  summary: string;
  capabilities: readonly [string, string, string];
};

export type CaseStudy = {
  slug: string;
  client: string;
  segment: string;
  summary?: string;
  challenge?: string;
  solution?: string;
  outcomes?: Array<{ label: string; value: string; source?: string }>;
  services: string[];
  technologies?: string[];
  heroImage?: string;
  gallery?: string[];
  testimonial?: string;
  approved: boolean;
  published: boolean;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  organization: string;
  authorized: boolean;
  photo?: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  photo?: string;
};

export function isPublishableCaseStudy(
  project: Pick<CaseStudy, "approved" | "published">,
): boolean {
  return project.approved && project.published;
}
