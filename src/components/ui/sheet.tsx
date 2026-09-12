"use client";

import type { ComponentPropsWithoutRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;
export const SheetTitle = Dialog.Title;
export const SheetDescription = Dialog.Description;

export function SheetOverlay({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Dialog.Overlay>) {
  return (
    <Dialog.Overlay
      className={cn(
        "bg-foreground/45 fixed inset-0 z-50",
        "motion-safe:duration-base motion-safe:ease-standard motion-safe:transition-opacity",
        "motion-safe:data-[state=closed]:opacity-0 motion-safe:data-[state=open]:opacity-100",
        "motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

export type SheetContentProps = ComponentPropsWithoutRef<typeof Dialog.Content>;

export function SheetContent({
  className,
  children,
  ...props
}: SheetContentProps) {
  return (
    <Dialog.Portal>
      <SheetOverlay />
      <Dialog.Content
        data-surface="dark"
        className={cn(
          "bg-background text-foreground border-border sheet-safe fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto overscroll-contain border-l",
          "motion-safe:duration-base motion-safe:ease-standard motion-safe:transition-transform",
          "motion-safe:data-[state=closed]:translate-x-full motion-safe:data-[state=open]:translate-x-0",
          "motion-reduce:transition-none",
          className,
        )}
        {...props}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}
