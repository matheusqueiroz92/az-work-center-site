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
      className={cn(
        "bg-background text-foreground border-border sticky top-0 z-40 border-b",
        className,
      )}
    >
      <Container className="h-header flex min-w-0 items-center justify-between gap-6">
        <SiteWordmark />
        <div className="hidden lg:flex">
          <DesktopNav />
        </div>
        <div className="lg:hidden">
          <MobileNav items={navigation.primary} cta={navigation.cta} />
        </div>
      </Container>
    </header>
  );
}
