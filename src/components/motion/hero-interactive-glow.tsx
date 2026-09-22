"use client";

import { useEffect, useRef } from "react";

import { bindHeroInteractiveGlow } from "@/components/motion/hero-interactive-glow-runtime";

export function HeroInteractiveGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) {
      return;
    }

    const hero = glow.closest("[data-hero]");
    if (!(hero instanceof HTMLElement)) {
      return;
    }

    return bindHeroInteractiveGlow(hero, glow);
  }, []);

  return (
    <div
      ref={glowRef}
      data-hero-glow=""
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-1/2"
    />
  );
}
