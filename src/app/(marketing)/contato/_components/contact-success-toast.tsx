"use client";

import { useEffect, useId, useRef } from "react";

import { contact } from "@/content/contact";
import { cn } from "@/lib/utils";

type ContactSuccessToastProps = {
  submissionId: string;
  onDismiss: () => void;
};

export function ContactSuccessToast({
  submissionId,
  onDismiss,
}: ContactSuccessToastProps) {
  const titleId = useId();
  const descriptionId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const onDismissRef = useRef(onDismiss);

  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof node.scrollIntoView !== "function") {
      return;
    }

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let timeoutId = 0;
    let frame = 0;

    const bringIntoView = () => {
      try {
        const position = window.getComputedStyle(node).position;
        if (position === "fixed") {
          return;
        }

        node.scrollIntoView({
          block: "center",
          inline: "nearest",
          behavior: reduceMotion ? "auto" : "smooth",
        });
      } catch {
        // jsdom and some test hosts do not implement scroll geometry.
      }
    };

    frame = window.requestAnimationFrame(() => {
      bringIntoView();
      timeoutId = window.setTimeout(bringIntoView, reduceMotion ? 0 : 50);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeoutId);
    };
  }, [submissionId]);

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      data-contact-success-toast=""
      className={cn(
        "border-border bg-background text-foreground",
        "flex w-full flex-col gap-3 border p-4 shadow-sm",
        // Hide when scripting is unavailable; the inline status covers that path.
        "[@media(scripting:none)]:hidden",
        // Mobile: in-flow next to the submit control (DOM placement in the form).
        // Desktop: fixed corner, outside the editorial column.
        "md:fixed md:right-6 md:bottom-6 md:z-50 md:max-w-sm",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <p id={titleId} className="text-label font-semibold">
            {contact.form.successTitle}
          </p>
          <p
            id={descriptionId}
            className="text-small text-muted-foreground max-w-text"
          >
            {contact.form.successText}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onDismissRef.current()}
          className={cn(
            "text-foreground border-border hover:bg-muted",
            "min-h-touch min-w-touch shrink-0 rounded-sm border px-3",
            "text-small font-semibold",
          )}
        >
          {contact.form.successCloseLabel}
        </button>
      </div>
    </div>
  );
}
