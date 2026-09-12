import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

import { company } from "@/content/company";
import { cn } from "@/lib/utils";

export type SiteWordmarkProps = Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "href" | "children"
> & {
  href?: "/";
};

export function SiteWordmark({
  href = "/",
  className,
  ...props
}: SiteWordmarkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "min-h-touch min-w-touch text-body inline-flex shrink-0 items-center font-sans font-semibold tracking-tight whitespace-nowrap",
        className,
      )}
      {...props}
    >
      {company.name}
    </Link>
  );
}
