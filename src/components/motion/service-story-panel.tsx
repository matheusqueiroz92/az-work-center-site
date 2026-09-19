"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { LazyMotion, MotionConfig } from "motion/react";
import * as m from "motion/react-m";

import { ServiceStoryDiagram } from "@/components/motion/service-story-diagrams";
import {
  collectServiceStoryItems,
  readActiveServiceStorySlug,
  resolveActiveServiceSlug,
} from "@/components/motion/service-story-observer";
import { panelShiftY, panelSpring } from "@/lib/motion-tokens";
import { solutionSlugs, type SolutionSlug } from "@/types/content";

function loadDomAnimation() {
  return import("./dom-animation").then((module) => module.default);
}

function markFrameReady(host: HTMLElement | null, ready: boolean) {
  const frame = host?.closest("[data-service-story-frame]");
  if (!(frame instanceof HTMLElement)) {
    return;
  }

  if (ready) {
    frame.setAttribute("data-service-story-ready", "");
    return;
  }

  frame.removeAttribute("data-service-story-ready");
}

function readPrefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(readPrefersReducedMotion);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduced(media.matches);
    };

    sync();
    media.addEventListener("change", sync);

    return () => {
      media.removeEventListener("change", sync);
    };
  }, []);

  return reduced;
}

export function ServiceStoryPanel() {
  const reduceMotion = usePrefersReducedMotion();
  const [activeSlug, setActiveSlug] = useState<SolutionSlug | null>(null);
  const [host, setHost] = useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!host || reduceMotion) {
      markFrameReady(host, false);
      return;
    }

    const section = host.closest("#solucoes");
    if (!section) {
      return;
    }

    const items = collectServiceStoryItems(section);

    const syncActive = () => {
      const next =
        readActiveServiceStorySlug(items) ?? resolveActiveServiceSlug(items);

      if (!next) {
        return;
      }

      setActiveSlug(next);
      markFrameReady(host, true);
    };

    const frame = requestAnimationFrame(syncActive);
    const mutation = new MutationObserver(syncActive);

    for (const item of items) {
      mutation.observe(item, {
        attributes: true,
        attributeFilter: ["data-service-story-active"],
      });
    }

    return () => {
      cancelAnimationFrame(frame);
      mutation.disconnect();
      markFrameReady(host, false);
    };
  }, [host, reduceMotion]);

  const showEnhancement = !reduceMotion && activeSlug !== null;

  return (
    <div
      ref={setHost}
      className={
        showEnhancement ? "pointer-events-none absolute inset-0" : "contents"
      }
      aria-hidden="true"
      data-service-story-panel={showEnhancement ? "" : undefined}
      data-active-service={showEnhancement ? activeSlug : undefined}
    >
      {showEnhancement ? (
        <MotionConfig reducedMotion="user">
          <LazyMotion features={loadDomAnimation} strict>
            {solutionSlugs.map((slug) => (
              <m.div
                key={slug}
                initial={false}
                animate={{
                  opacity: slug === activeSlug ? 1 : 0,
                  y: slug === activeSlug ? 0 : panelShiftY,
                }}
                transition={panelSpring}
                className="absolute inset-0"
              >
                <ServiceStoryDiagram slug={slug} active={slug === activeSlug} />
              </m.div>
            ))}
          </LazyMotion>
        </MotionConfig>
      ) : null}
    </div>
  );
}
