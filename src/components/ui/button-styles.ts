import { cn } from "@/lib/utils";

export const buttonVariants = {
  primary:
    "border-transparent bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary:
    "border-border bg-transparent text-foreground hover:bg-muted hover:border-foreground",
  ghost: "border-transparent bg-transparent text-foreground hover:bg-muted",
  text: "border-transparent bg-transparent px-2 text-foreground underline decoration-current decoration-1 underline-offset-4 hover:decoration-2 hover:underline-offset-2",
  destructive:
    "border-transparent bg-error text-error-foreground hover:opacity-90",
  outline:
    "border-foreground bg-transparent text-foreground hover:bg-muted hover:border-foreground",
} as const;

export const buttonSizes = {
  sm: "min-h-touch px-3.5 text-small",
  md: "min-h-12 px-4 text-body",
  lg: "min-h-14 px-5 text-body-lg",
  icon: "size-touch p-0",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;
export type ButtonSize = keyof typeof buttonSizes;

const buttonBase = [
  "relative inline-flex items-center justify-center gap-2",
  "rounded-sm border font-sans font-semibold",
  "transition-[color,background-color,border-color,transform,opacity]",
  "duration-fast ease-standard",
  "motion-safe:active:enabled:scale-[0.98]",
  "disabled:pointer-events-none disabled:opacity-40",
].join(" ");

export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(buttonBase, buttonVariants[variant], buttonSizes[size], className);
}
