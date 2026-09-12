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

export type FAQItem = {
  question: string;
  answer: string;
};

export function isPublishableCaseStudy(
  project: Pick<CaseStudy, "approved" | "published">,
): boolean {
  return project.approved && project.published;
}
