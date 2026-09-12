import { NotFoundContent } from "@/components/internal/not-found-content";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { notFoundContent } from "@/content/not-found";
import { createUnpublishedMetadata } from "@/lib/metadata";

export const metadata = createUnpublishedMetadata(
  notFoundContent.seo.title,
  notFoundContent.seo.description,
);

export default function RootNotFound() {
  return (
    <>
      <SiteHeader />
      <NotFoundContent />
      <SiteFooter />
    </>
  );
}
