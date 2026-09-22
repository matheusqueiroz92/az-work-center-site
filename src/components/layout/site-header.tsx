import { Container } from "@/components/layout/container";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteWordmark } from "@/components/layout/site-wordmark";
import { navigation } from "@/content/navigation";
import { cn } from "@/lib/utils";

export type SiteHeaderProps = {
  className?: string;
};

export function SiteHeader({ className }: SiteHeaderProps) {
  return (
    <header
      data-surface="dark"
      data-site-header=""
      className={cn(
        "text-foreground sticky top-0 z-40 bg-transparent",
        className,
      )}
    >
      <Container className="h-header flex min-w-0 items-center">
        <div
          data-header-frame
          className="flex min-w-0 flex-1 items-center justify-between gap-4 rounded-md border px-3 py-1.5 backdrop-blur-md sm:gap-6"
        >
          <SiteWordmark />
          <div className="hidden min-w-0 lg:flex" data-header-desktop>
            <DesktopNav />
          </div>
          <div className="lg:hidden" data-header-mobile>
            <MobileNav items={navigation.primary} cta={navigation.cta} />
          </div>
        </div>
      </Container>
    </header>
  );
}
