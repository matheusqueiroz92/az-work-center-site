import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";

import { isInternalHref, mergeLinkRel } from "@/lib/links";
import { cn } from "@/lib/utils";

export type TextLinkProps = {
  href: string;
  openInNewTab?: boolean;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "target" | "children">;

const textLinkClassName = [
  "text-foreground underline decoration-primary decoration-1 underline-offset-4",
  "transition-[text-underline-offset,text-decoration-thickness]",
  "duration-fast ease-standard",
  "hover:decoration-2 hover:underline-offset-2",
].join(" ");

export function TextLink({
  href,
  openInNewTab = false,
  className,
  children,
  rel,
  ...props
}: TextLinkProps) {
  const classNames = cn(textLinkClassName, className);
  const resolvedRel = mergeLinkRel(openInNewTab, rel);
  const content = (
    <>
      {children}
      {openInNewTab ? (
        <span className="sr-only"> (abre em nova aba)</span>
      ) : null}
    </>
  );

  if (isInternalHref(href) && !openInNewTab) {
    return (
      <Link href={href} className={classNames} rel={resolvedRel} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classNames}
      rel={resolvedRel}
      target={openInNewTab ? "_blank" : undefined}
      {...props}
    >
      {content}
    </a>
  );
}
