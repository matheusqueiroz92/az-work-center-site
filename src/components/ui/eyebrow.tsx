import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type EyebrowProps = {
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"p">, "children">;

export function Eyebrow({ className, children, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-label text-muted-foreground font-sans font-semibold uppercase",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
