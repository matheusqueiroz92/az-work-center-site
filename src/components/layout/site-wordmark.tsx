import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
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
      className={cn("min-h-touch inline-flex shrink-0 items-center", className)}
      aria-label={company.name}
      {...props}
    >
      <Image
        src="/media/brand/az-wordmark-on-dark.png"
        alt=""
        width={1988}
        height={616}
        sizes="(max-width: 640px) 142px, 158px"
        className="h-11 w-auto sm:h-12"
        priority
      />
    </Link>
  );
}
