import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

export const containerWidths = {
  default: "max-w-container",
  editorial: "max-w-content",
  text: "max-w-text",
  full: "max-w-none",
} as const;

export type ContainerWidth = keyof typeof containerWidths;

export type ContainerProps = {
  width?: ContainerWidth;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"div">, "children">;

export function Container({
  width = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "px-gutter mx-auto w-full",
        containerWidths[width],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
