import Link from "next/link";

import { cn } from "@/lib/utils";

export type BreadcrumbAncestor = {
  label: string;
  href: string;
};

export type BreadcrumbProps = {
  items: readonly [BreadcrumbAncestor, ...BreadcrumbAncestor[]];
  current: string;
  className?: string;
};

export function Breadcrumb({ items, current, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Navegação estrutural" className={className}>
      <ol className="text-small flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item) => (
          <li key={item.href} className="flex items-center gap-2">
            <Link
              href={item.href}
              className="text-foreground min-h-touch decoration-primary inline-flex items-center underline decoration-1 underline-offset-4"
            >
              {item.label}
            </Link>
            <span aria-hidden="true" className="text-muted-foreground">
              /
            </span>
          </li>
        ))}
        <li>
          <span
            aria-current="page"
            className={cn(
              "text-muted-foreground min-h-touch inline-flex items-center",
            )}
          >
            {current}
          </span>
        </li>
      </ol>
    </nav>
  );
}
