import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const typeScale = [
  "display-xl",
  "display-lg",
  "display-md",
  "h1",
  "h2",
  "h3",
  "lead",
  "body-lg",
  "body",
  "small",
  "label",
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [...typeScale],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
