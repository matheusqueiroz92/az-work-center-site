"use client";

import { useEffect, useRef } from "react";

import { bindHeroVideoEnhancement } from "@/components/motion/hero-video-enhancement-runtime";

export function HeroVideoEnhancement() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    return bindHeroVideoEnhancement(host);
  }, []);

  return (
    <div
      ref={hostRef}
      data-hero-video=""
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-clip"
    />
  );
}
