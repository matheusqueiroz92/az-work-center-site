import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

export const headingLevels = ["h1", "h2", "h3", "h4"] as const;
export const headingSizes = {
  "display-md": "text-display-md font-bold",
  h1: "text-h1 font-bold",
  h2: "text-h2 font-semibold",
  h3: "text-h3 font-semibold",
} as const;
export const headingMaxWidths = {
  text: "max-w-text",
  editorial: "max-w-content",
  container: "max-w-container",
  none: "max-w-none",
} as const;

export type HeadingLevel = (typeof headingLevels)[number];
export type HeadingSize = keyof typeof headingSizes;
export type HeadingAlign = "start" | "center";
export type HeadingMaxWidth = keyof typeof headingMaxWidths;

export type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: HeadingAlign;
  maxWidth?: HeadingMaxWidth;
  id?: string;
  as?: HeadingLevel;
  size?: HeadingSize;
  className?: string;
};

const defaultSizeByLevel: Record<HeadingLevel, HeadingSize> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h3",
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  maxWidth = "text",
  id,
  as: Heading = "h2",
  size,
  className,
}: SectionHeadingProps) {
  const visualSize = size ?? defaultSizeByLevel[Heading];

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        align === "start" && "items-start text-left",
        headingMaxWidths[maxWidth],
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading
        id={id}
        className={cn("text-foreground", headingSizes[visualSize])}
      >
        {title}
      </Heading>
      {description ? (
        <p className="text-lead text-muted-foreground max-w-text">
          {description}
        </p>
      ) : null}
    </div>
  );
}
