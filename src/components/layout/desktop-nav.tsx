import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { headerCtaClassName } from "@/components/ui/button-styles";
import { navigation } from "@/content/navigation";
import { cn } from "@/lib/utils";

export type DesktopNavProps = {
  className?: string;
};

export function DesktopNav({ className }: DesktopNavProps) {
  return (
    <nav
      aria-label="Principal"
      data-desktop-nav
      className={cn("flex items-center gap-3", className)}
    >
      <ul className="flex items-center gap-1">
        {navigation.primary.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              data-nav-link
              className="min-h-touch text-body"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <ButtonLink
        href={navigation.cta.href}
        size="md"
        data-nav-cta=""
        className={headerCtaClassName}
      >
        <span>{navigation.cta.label}</span>
      </ButtonLink>
    </nav>
  );
}
