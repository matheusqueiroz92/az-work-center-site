export const heroGlowPointerQuery = "(hover: hover) and (pointer: fine)";
export const heroGlowMotionQuery = "(prefers-reduced-motion: no-preference)";

export const heroGlowBounds = {
  minX: 0.28,
  maxX: 0.72,
  minY: 0.32,
  maxY: 0.68,
} as const;

const lerpFactor = 0.08;
const settleThreshold = 0.35;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function writeGlowOffset(glow: HTMLElement, x: number, y: number) {
  glow.style.setProperty("--hero-glow-x", `${x}px`);
  glow.style.setProperty("--hero-glow-y", `${y}px`);
}

export function bindHeroInteractiveGlow(hero: HTMLElement, glow: HTMLElement) {
  if (typeof window.matchMedia !== "function") {
    return () => undefined;
  }

  const pointerMedia = window.matchMedia(heroGlowPointerQuery);
  const motionMedia = window.matchMedia(heroGlowMotionQuery);

  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let frame = 0;
  let attached = false;

  const stopFrame = () => {
    if (frame !== 0) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };

  const apply = () => {
    writeGlowOffset(glow, currentX, currentY);
  };

  const tick = () => {
    currentX += (targetX - currentX) * lerpFactor;
    currentY += (targetY - currentY) * lerpFactor;

    if (
      Math.abs(targetX - currentX) < settleThreshold &&
      Math.abs(targetY - currentY) < settleThreshold
    ) {
      currentX = targetX;
      currentY = targetY;
      apply();
      frame = 0;
      return;
    }

    apply();
    frame = requestAnimationFrame(tick);
  };

  const ensureTick = () => {
    if (frame === 0) {
      frame = requestAnimationFrame(tick);
    }
  };

  const onPointerMove = (event: PointerEvent) => {
    const rect = hero.getBoundingClientRect();
    const nx = clamp(
      (event.clientX - rect.left) / rect.width,
      heroGlowBounds.minX,
      heroGlowBounds.maxX,
    );
    const ny = clamp(
      (event.clientY - rect.top) / rect.height,
      heroGlowBounds.minY,
      heroGlowBounds.maxY,
    );

    targetX = (nx - 0.5) * rect.width;
    targetY = (ny - 0.5) * rect.height;
    ensureTick();
  };

  const onPointerLeave = () => {
    targetX = 0;
    targetY = 0;
    ensureTick();
  };

  const onResize = () => {
    targetX = 0;
    targetY = 0;
    ensureTick();
  };

  const detachTracking = () => {
    if (!attached) {
      return;
    }

    hero.removeEventListener("pointermove", onPointerMove);
    hero.removeEventListener("pointerleave", onPointerLeave);
    window.removeEventListener("resize", onResize);
    attached = false;
    targetX = 0;
    targetY = 0;
    currentX = 0;
    currentY = 0;
    stopFrame();
    apply();
  };

  const attachTracking = () => {
    if (attached) {
      return;
    }

    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", onResize);
    attached = true;
  };

  const sync = () => {
    if (pointerMedia.matches && motionMedia.matches) {
      attachTracking();
      return;
    }

    detachTracking();
  };

  pointerMedia.addEventListener("change", sync);
  motionMedia.addEventListener("change", sync);
  sync();

  return () => {
    pointerMedia.removeEventListener("change", sync);
    motionMedia.removeEventListener("change", sync);
    detachTracking();
  };
}
