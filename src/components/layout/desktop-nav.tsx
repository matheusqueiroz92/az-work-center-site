import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { navigation } from "@/content/navigation";
import { cn } from "@/lib/utils";

export type DesktopNavProps = {
  className?: string;
};

export function DesktopNav({ className }: DesktopNavProps) {
  return (
    <nav
      aria-label="Principal"
      className={cn("flex items-center gap-2", className)}
    >
      <ul className="flex items-center gap-1">
        {navigation.primary.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-foreground min-h-touch text-body duration-fast ease-standard hover:decoration-primary inline-flex items-center px-3 underline decoration-transparent underline-offset-4 transition-[text-decoration-color]"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <ButtonLink href={navigation.cta.href} size="md">
        {navigation.cta.label}
      </ButtonLink>
    </nav>
  );
}
