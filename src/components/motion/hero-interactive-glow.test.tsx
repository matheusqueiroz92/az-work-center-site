/** @vitest-environment jsdom */

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { HeroInteractiveGlow } from "@/components/motion/hero-interactive-glow";
import {
  bindHeroInteractiveGlow,
  heroGlowMotionQuery,
  heroGlowPointerQuery,
} from "@/components/motion/hero-interactive-glow-runtime";

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

type MediaStub = {
  matches: boolean;
  media: string;
  onchange: null;
  addEventListener: ReturnType<typeof vi.fn>;
  removeEventListener: ReturnType<typeof vi.fn>;
  addListener: ReturnType<typeof vi.fn>;
  removeListener: ReturnType<typeof vi.fn>;
  dispatchEvent: ReturnType<typeof vi.fn>;
};

function createMedia(matches: boolean): MediaStub {
  return {
    matches,
    media: "",
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  };
}

function mountHero() {
  const hero = document.createElement("section");
  hero.setAttribute("data-hero", "");
  Object.defineProperty(hero, "getBoundingClientRect", {
    value: () =>
      ({
        left: 0,
        top: 0,
        width: 1000,
        height: 800,
        right: 1000,
        bottom: 800,
        x: 0,
        y: 0,
        toJSON() {
          return {};
        },
      }) as DOMRect,
  });

  const glow = document.createElement("div");
  glow.setAttribute("data-hero-glow", "");
  hero.append(glow);
  document.body.append(hero);
  return { hero, glow };
}

describe("HeroInteractiveGlow", () => {
  it("renderiza só a camada decorativa sem Motion nem state por frame", () => {
    const { container } = render(
      <section data-hero="">
        <HeroInteractiveGlow />
      </section>,
    );
    const glow = container.querySelector("[data-hero-glow]");
    const source = readFileSync(
      join(process.cwd(), "src/components/motion/hero-interactive-glow.tsx"),
      "utf8",
    );
    const runtime = readFileSync(
      join(
        process.cwd(),
        "src/components/motion/hero-interactive-glow-runtime.ts",
      ),
      "utf8",
    );

    expect(glow?.getAttribute("aria-hidden")).toBe("true");
    expect(glow?.className).toMatch(/pointer-events-none/);
    expect(source).toMatch(/['"]use client['"]/);
    expect(source).not.toMatch(/from ["']motion/);
    expect(source).not.toMatch(/useState/);
    expect(runtime).not.toMatch(/from ["']motion/);
    expect(runtime).not.toMatch(/useState/);
  });

  it("acompanha o ponteiro fino e volta ao centro no pointerleave", () => {
    const pointer = createMedia(true);
    const motion = createMedia(true);
    const frames: FrameRequestCallback[] = [];

    vi.stubGlobal("matchMedia", (query: string) => {
      if (query === heroGlowPointerQuery) {
        return pointer;
      }

      if (query === heroGlowMotionQuery) {
        return motion;
      }

      return createMedia(false);
    });
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      frames.push(callback);
      return frames.length;
    });
    vi.stubGlobal("cancelAnimationFrame", (id: number) => {
      frames[id - 1] = () => undefined;
    });

    const { hero, glow } = mountHero();
    const cleanupGlow = bindHeroInteractiveGlow(hero, glow);

    expect(pointer.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
    expect(motion.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );

    hero.dispatchEvent(
      new PointerEvent("pointermove", { clientX: 900, clientY: 700 }),
    );
    frames.at(-1)?.(16);

    const movedX = glow.style.getPropertyValue("--hero-glow-x");
    const movedY = glow.style.getPropertyValue("--hero-glow-y");

    expect(movedX).not.toBe("");
    expect(movedY).not.toBe("");
    expect(Number.parseFloat(movedX)).toBeGreaterThan(0);
    expect(Number.parseFloat(movedY)).toBeGreaterThan(0);
    expect(Number.parseFloat(movedX)).toBeLessThanOrEqual(220);

    hero.dispatchEvent(new PointerEvent("pointerleave"));

    for (let index = 0; index < 80; index += 1) {
      frames.at(-1)?.(16 + index);
    }

    expect(glow.style.getPropertyValue("--hero-glow-x")).toBe("0px");
    expect(glow.style.getPropertyValue("--hero-glow-y")).toBe("0px");

    cleanupGlow();
  });

  it("não registra o loop interativo em reduced motion ou ponteiro grosso", () => {
    const cases = [
      { pointer: false, motion: true },
      { pointer: true, motion: false },
      { pointer: false, motion: false },
    ];

    for (const current of cases) {
      const requestAnimationFrame = vi.fn();
      vi.stubGlobal("requestAnimationFrame", requestAnimationFrame);
      vi.stubGlobal("cancelAnimationFrame", vi.fn());
      vi.stubGlobal("matchMedia", (query: string) => {
        if (query === heroGlowPointerQuery) {
          return createMedia(current.pointer);
        }

        if (query === heroGlowMotionQuery) {
          return createMedia(current.motion);
        }

        return createMedia(false);
      });

      const { hero, glow } = mountHero();
      const addMove = vi.spyOn(hero, "addEventListener");
      const cleanupGlow = bindHeroInteractiveGlow(hero, glow);

      expect(requestAnimationFrame).not.toHaveBeenCalled();
      expect(addMove).not.toHaveBeenCalledWith(
        "pointermove",
        expect.any(Function),
      );

      cleanupGlow();
      document.body.innerHTML = "";
      vi.unstubAllGlobals();
    }
  });

  it("cancela listeners e requestAnimationFrame no cleanup", () => {
    const pointer = createMedia(true);
    const motion = createMedia(true);
    const cancelAnimationFrame = vi.fn();
    let frameId = 0;

    vi.stubGlobal("matchMedia", (query: string) => {
      if (query === heroGlowPointerQuery) {
        return pointer;
      }

      if (query === heroGlowMotionQuery) {
        return motion;
      }

      return createMedia(false);
    });
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      frameId += 1;
      queueMicrotask(() => callback(16));
      return frameId;
    });
    vi.stubGlobal("cancelAnimationFrame", cancelAnimationFrame);

    const { hero, glow } = mountHero();
    const removeHero = vi.spyOn(hero, "removeEventListener");
    const removeWindow = vi.spyOn(window, "removeEventListener");
    const cleanupGlow = bindHeroInteractiveGlow(hero, glow);

    hero.dispatchEvent(
      new PointerEvent("pointermove", { clientX: 400, clientY: 300 }),
    );

    cleanupGlow();

    expect(pointer.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
    expect(motion.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
    expect(removeHero).toHaveBeenCalledWith(
      "pointermove",
      expect.any(Function),
    );
    expect(removeHero).toHaveBeenCalledWith(
      "pointerleave",
      expect.any(Function),
    );
    expect(removeWindow).toHaveBeenCalledWith("resize", expect.any(Function));
    expect(cancelAnimationFrame).toHaveBeenCalled();
  });
});
