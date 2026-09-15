/** @vitest-environment jsdom */

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { HeroVideoEnhancement } from "@/components/motion/hero-video-enhancement";
import {
  bindHeroVideoEnhancement,
  heroVideoMotionQuery,
  heroVideoOrientationQuery,
  heroVideoViewportQuery,
} from "@/components/motion/hero-video-enhancement-runtime";
import { heroMp4Src, heroPosterSrc, heroWebmSrc } from "@/lib/hero-media";

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
  const listeners = new Set<(event: MediaQueryListEvent) => void>();

  const media: MediaStub = {
    matches,
    media: "",
    onchange: null,
    addEventListener: vi.fn(
      (_type: string, listener: (event: MediaQueryListEvent) => void) => {
        listeners.add(listener);
      },
    ),
    removeEventListener: vi.fn(
      (_type: string, listener: (event: MediaQueryListEvent) => void) => {
        listeners.delete(listener);
      },
    ),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  };

  Object.defineProperty(media, "matches", {
    get() {
      return matches;
    },
    set(value: boolean) {
      matches = value;
    },
    configurable: true,
  });

  (
    media as MediaStub & {
      emit: (next: boolean) => void;
    }
  ).emit = (next: boolean) => {
    matches = next;
    for (const listener of listeners) {
      listener({ matches: next } as MediaQueryListEvent);
    }
  };

  return media;
}

type ObserverStub = {
  observe: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
  trigger: (intersecting: boolean) => void;
};

function stubObserver() {
  const observers: ObserverStub[] = [];

  class IntersectionObserverStub {
    callback: IntersectionObserverCallback;
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();
    takeRecords = vi.fn(() => []);
    root = null;
    rootMargin = "";
    thresholds = [];

    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
      observers.push({
        observe: this.observe,
        disconnect: this.disconnect,
        trigger: (intersecting: boolean) => {
          callback(
            [
              {
                isIntersecting: intersecting,
                intersectionRatio: intersecting ? 1 : 0,
                target: document.body,
              } as unknown as IntersectionObserverEntry,
            ],
            this as unknown as IntersectionObserver,
          );
        },
      });
    }
  }

  vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);

  return observers;
}

function mountHost() {
  const hero = document.createElement("section");
  hero.setAttribute("data-hero", "");
  const host = document.createElement("div");
  host.setAttribute("data-hero-video", "");
  hero.append(host);
  document.body.append(hero);
  return { hero, host };
}

function stubMedia(viewport: boolean, motion: boolean, orientation = true) {
  const viewportMedia = createMedia(viewport);
  const motionMedia = createMedia(motion);
  const orientationMedia = createMedia(orientation);

  vi.stubGlobal("matchMedia", (query: string) => {
    if (query === heroVideoViewportQuery) {
      return viewportMedia;
    }

    if (query === heroVideoMotionQuery) {
      return motionMedia;
    }

    if (query === heroVideoOrientationQuery) {
      return orientationMedia;
    }

    return createMedia(false);
  });

  return { viewportMedia, motionMedia, orientationMedia };
}

describe("HeroVideoEnhancement", () => {
  it("é uma ilha Client sem Motion nem state por frame", () => {
    const { container } = render(<HeroVideoEnhancement />);
    const source = readFileSync(
      join(process.cwd(), "src/components/motion/hero-video-enhancement.tsx"),
      "utf8",
    );
    const runtime = readFileSync(
      join(
        process.cwd(),
        "src/components/motion/hero-video-enhancement-runtime.ts",
      ),
      "utf8",
    );

    expect(container.querySelector("[data-hero-video]")).toBeTruthy();
    expect(
      container.querySelector("[data-hero-video]")?.getAttribute("aria-hidden"),
    ).toBe("true");
    expect(source).toMatch(/['"]use client['"]/);
    expect(source).not.toMatch(/from ["']motion/);
    expect(source).not.toMatch(/useState/);
    expect(runtime).not.toMatch(/from ["']motion/);
    expect(runtime).not.toMatch(/useState/);
    expect(container.querySelector("video")).toBeNull();
  });

  it("não monta vídeo em mobile, retrato nem com reduced motion", () => {
    const cases = [
      { viewport: false, motion: true, orientation: true },
      { viewport: true, motion: false, orientation: true },
      { viewport: true, motion: true, orientation: false },
      { viewport: false, motion: false, orientation: false },
    ];

    for (const current of cases) {
      stubMedia(current.viewport, current.motion, current.orientation);
      stubObserver();
      const { host } = mountHost();
      const cleanupVideo = bindHeroVideoEnhancement(host);

      expect(host.querySelector("video")).toBeNull();
      cleanupVideo();
      document.body.innerHTML = "";
    }
  });

  it("monta uma única instância com WebM antes de MP4 no desktop", () => {
    stubMedia(true, true);
    const observers = stubObserver();
    const { host } = mountHost();
    const play = vi.fn(() => Promise.resolve());

    HTMLVideoElement.prototype.play = play;
    HTMLVideoElement.prototype.pause = vi.fn();

    const cleanupVideo = bindHeroVideoEnhancement(host);
    observers[0]?.trigger(true);

    const videos = host.querySelectorAll("video");
    const sources = [...(videos[0]?.querySelectorAll("source") ?? [])];

    expect(videos).toHaveLength(1);
    expect(videos[0]?.getAttribute("aria-hidden")).toBe("true");
    expect(videos[0]?.hasAttribute("data-hero-media")).toBe(true);
    expect(videos[0]?.className).toMatch(/object-cover/);
    expect(videos[0]?.className).not.toMatch(/md:object-center/);
    expect(videos[0]?.className).not.toMatch(/object-\[center_46%\]/);
    expect(videos[0]?.tabIndex).toBe(-1);
    expect(videos[0]?.controls).toBe(false);
    expect(videos[0]?.muted).toBe(true);
    expect(videos[0]?.loop).toBe(true);
    expect(videos[0]?.autoplay).toBe(true);
    expect(videos[0]?.preload).toBe("auto");
    expect(videos[0]?.getAttribute("poster")).toBe(heroPosterSrc);
    expect(videos[0]?.getAttribute("controlslist")).toBe(
      "nodownload nofullscreen noremoteplayback",
    );
    expect(videos[0]?.hasAttribute("data-hero-video-ready")).toBe(false);
    expect(sources).toHaveLength(2);
    expect(sources[0]?.getAttribute("src")).toBe(heroWebmSrc);
    expect(sources[0]?.getAttribute("type")).toBe("video/webm");
    expect(sources[1]?.getAttribute("src")).toBe(heroMp4Src);
    expect(sources[1]?.getAttribute("type")).toBe("video/mp4");
    expect(play).toHaveBeenCalledTimes(1);

    cleanupVideo();
  });

  it("só revela o vídeo depois de pronto e mantém o poster em erro", () => {
    stubMedia(true, true);
    stubObserver();
    const { host } = mountHost();
    const cleanupVideo = bindHeroVideoEnhancement(host);
    const video = host.querySelector("video");

    expect(video?.hasAttribute("data-hero-video-ready")).toBe(false);

    video?.dispatchEvent(new Event("loadeddata"));
    expect(video?.hasAttribute("data-hero-video-ready")).toBe(true);

    video?.dispatchEvent(new Event("error"));
    expect(host.querySelector("video")).toBeNull();

    cleanupVideo();
  });

  it("pausa fora do viewport ou com a aba oculta e retoma quando permitido", () => {
    stubMedia(true, true);
    const observers = stubObserver();
    const { host } = mountHost();
    const play = vi.fn(() => Promise.resolve());
    const pause = vi.fn();

    HTMLVideoElement.prototype.play = play;
    HTMLVideoElement.prototype.pause = pause;

    const cleanupVideo = bindHeroVideoEnhancement(host);
    observers[0]?.trigger(true);
    expect(play).toHaveBeenCalled();

    play.mockClear();
    observers[0]?.trigger(false);
    expect(pause).toHaveBeenCalled();

    observers[0]?.trigger(true);
    play.mockClear();
    pause.mockClear();

    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => "hidden",
    });
    document.dispatchEvent(new Event("visibilitychange"));
    expect(pause).toHaveBeenCalled();
    expect(play).not.toHaveBeenCalled();

    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => "visible",
    });
    document.dispatchEvent(new Event("visibilitychange"));
    expect(play).toHaveBeenCalled();

    cleanupVideo();
  });

  it("desmonta em reduced motion ou mobile sem duplicar listeners nem vídeos", () => {
    const media = stubMedia(true, true);
    stubObserver();
    const { host } = mountHost();
    HTMLVideoElement.prototype.play = vi.fn(() => Promise.resolve());
    HTMLVideoElement.prototype.pause = vi.fn();

    const cleanupVideo = bindHeroVideoEnhancement(host);
    expect(host.querySelectorAll("video")).toHaveLength(1);

    (media.motionMedia as MediaStub & { emit: (next: boolean) => void }).emit(
      false,
    );
    expect(host.querySelector("video")).toBeNull();

    (media.motionMedia as MediaStub & { emit: (next: boolean) => void }).emit(
      true,
    );
    expect(host.querySelectorAll("video")).toHaveLength(1);

    (media.viewportMedia as MediaStub & { emit: (next: boolean) => void }).emit(
      false,
    );
    expect(host.querySelector("video")).toBeNull();

    expect(media.viewportMedia.addEventListener).toHaveBeenCalledTimes(1);
    expect(media.orientationMedia.addEventListener).toHaveBeenCalledTimes(1);
    expect(media.motionMedia.addEventListener).toHaveBeenCalledTimes(1);

    cleanupVideo();
    expect(media.viewportMedia.removeEventListener).toHaveBeenCalledTimes(1);
    expect(media.orientationMedia.removeEventListener).toHaveBeenCalledTimes(1);
    expect(media.motionMedia.removeEventListener).toHaveBeenCalledTimes(1);
    expect(host.querySelector("video")).toBeNull();
  });

  it("desmonta ao girar para retrato e remonta em paisagem", () => {
    const media = stubMedia(true, true, true);
    stubObserver();
    const { host } = mountHost();
    HTMLVideoElement.prototype.play = vi.fn(() => Promise.resolve());
    HTMLVideoElement.prototype.pause = vi.fn();

    const cleanupVideo = bindHeroVideoEnhancement(host);
    expect(host.querySelectorAll("video")).toHaveLength(1);

    (
      media.orientationMedia as MediaStub & { emit: (next: boolean) => void }
    ).emit(false);
    expect(host.querySelector("video")).toBeNull();

    (
      media.orientationMedia as MediaStub & { emit: (next: boolean) => void }
    ).emit(true);
    expect(host.querySelectorAll("video")).toHaveLength(1);

    cleanupVideo();
  });
});
