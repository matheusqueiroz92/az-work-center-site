import { NotFoundContent } from "@/components/internal/not-found-content";
import { notFoundContent } from "@/content/not-found";
import { createUnpublishedMetadata } from "@/lib/metadata";

export const metadata = createUnpublishedMetadata(
  notFoundContent.seo.title,
  notFoundContent.seo.description,
);

export default function MarketingNotFound() {
  return <NotFoundContent />;
}
