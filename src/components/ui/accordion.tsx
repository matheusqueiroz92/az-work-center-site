"use client";

import { useId, type ComponentPropsWithoutRef } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { cn } from "@/lib/utils";
import type { FAQItem } from "@/types/content";

export const Accordion = AccordionPrimitive.Root;
export const AccordionItem = AccordionPrimitive.Item;

export function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header asChild>
      <h3 className="m-0">
        <AccordionPrimitive.Trigger
          className={cn(
            "group text-foreground min-h-touch text-body-lg flex w-full items-center justify-between gap-4 py-5 text-left font-sans font-semibold",
            "motion-safe:duration-fast motion-safe:ease-standard motion-safe:transition-colors",
            "hover:text-foreground",
            className,
          )}
          {...props}
        >
          <span className="text-pretty">{children}</span>
          <span
            aria-hidden="true"
            className="border-border relative size-5 shrink-0 border"
          >
            <span className="bg-foreground absolute inset-x-1 top-1/2 h-px -translate-y-1/2" />
            <span className="bg-foreground absolute inset-y-1 left-1/2 w-px -translate-x-1/2 group-data-[state=open]:hidden" />
          </span>
        </AccordionPrimitive.Trigger>
      </h3>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      forceMount
      data-accordion-content=""
      className={cn(
        "text-muted-foreground text-body pb-5",
        "data-[state=closed]:hidden",
        className,
      )}
      {...props}
    >
      {children}
    </AccordionPrimitive.Content>
  );
}

export type AccordionListProps = {
  items: readonly FAQItem[];
  className?: string;
  idPrefix?: string;
};

export function AccordionList({
  items,
  className,
  idPrefix,
}: AccordionListProps) {
  const generatedId = useId().replace(/:/g, "");
  const prefix = idPrefix ?? `accordion-${generatedId}`;

  if (items.length === 0) {
    return null;
  }

  return (
    <Accordion
      type="single"
      collapsible
      className={cn("border-border border-t", className)}
    >
      {items.map((item, index) => {
        const panelId = `${prefix}-panel-${index}`;

        return (
          <AccordionItem
            key={item.question}
            value={`item-${index}`}
            className="border-border border-b"
          >
            <AccordionTrigger aria-controls={panelId}>
              {item.question}
            </AccordionTrigger>
            <AccordionContent id={panelId}>
              <p className="max-w-text">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
