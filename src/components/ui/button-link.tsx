import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";

import {
  buttonClassName,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/button-styles";
import { isInternalHref, mergeLinkRel } from "@/lib/links";

export type ButtonLinkProps = {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  openInNewTab?: boolean;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children" | "target">;

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  openInNewTab = false,
  className,
  children,
  rel,
  ...props
}: ButtonLinkProps) {
  const classNames = buttonClassName({ variant, size, className });
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
