import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

export const sectionSurfaces = ["light", "dark", "brand"] as const;
export const sectionSpacings = {
  compact: "py-section-compact",
  default: "py-section-default",
  narrative: "py-section-narrative",
} as const;

export type SectionSurface = (typeof sectionSurfaces)[number];
export type SectionSpacing = keyof typeof sectionSpacings;
export type SectionElement = Extract<
  ElementType,
  "section" | "header" | "footer" | "aside" | "main" | "div"
>;

export type SectionProps = {
  as?: SectionElement;
  surface?: SectionSurface;
  spacing?: SectionSpacing;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"section">, "children">;

export function Section({
  as: Comp = "section",
  surface = "light",
  spacing = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Comp
      data-surface={surface}
      className={cn(
        "bg-background text-foreground",
        sectionSpacings[spacing],
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
