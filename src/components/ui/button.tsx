import type { ComponentPropsWithoutRef, ReactNode } from "react";

import {
  buttonClassName,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/button-styles";
import { cn } from "@/lib/utils";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"button">, "children">;

function ButtonSpinner() {
  return (
    <span
      className="absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <span className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
    </span>
  );
}

export function Button({
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className,
  children,
  "aria-busy": ariaBusy,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, className })}
      {...props}
      disabled={isDisabled}
      aria-busy={loading || ariaBusy || undefined}
    >
      <span
        className={cn("inline-flex items-center gap-2", loading && "invisible")}
      >
        {children}
      </span>
      {loading ? (
        <>
          <ButtonSpinner />
          <span className="sr-only">Carregando</span>
        </>
      ) : null}
    </button>
  );
}
