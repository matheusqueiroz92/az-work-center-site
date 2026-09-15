import type { ComponentType } from "react";

export const desktopMediaQuery = "(min-width: 1024px)";
export const reducedMotionMediaQuery = "(prefers-reduced-motion: reduce)";

export type ServiceStoryPanelModule = {
  ServiceStoryPanel: ComponentType;
};

type BindServiceStoryLoaderOptions = {
  importPanel: () => Promise<ServiceStoryPanelModule>;
  onPanelLoaded: (panel: ComponentType) => void;
};

function canEnhance(
  frame: HTMLElement,
  desktop: MediaQueryList,
  reduced: MediaQueryList,
) {
  return (
    desktop.matches &&
    getComputedStyle(frame).display !== "none" &&
    !reduced.matches
  );
}

export function bindServiceStoryLoader(
  frame: HTMLElement,
  options: BindServiceStoryLoaderOptions,
) {
  if (typeof IntersectionObserver === "undefined") {
    return () => undefined;
  }

  const desktopMedia = window.matchMedia(desktopMediaQuery);
  const reducedMotionMedia = window.matchMedia(reducedMotionMediaQuery);
  let observer: IntersectionObserver | null = null;
  let cancelled = false;
  let importStarted = false;
  let delivered = false;
  let cachedModule: ServiceStoryPanelModule | null = null;

  const stopObserver = () => {
    observer?.disconnect();
    observer = null;
  };

  const deliverIfAllowed = () => {
    if (
      cancelled ||
      delivered ||
      !cachedModule ||
      !canEnhance(frame, desktopMedia, reducedMotionMedia)
    ) {
      return;
    }

    delivered = true;
    stopObserver();
    options.onPanelLoaded(cachedModule.ServiceStoryPanel);
  };

  const loadPanel = () => {
    if (
      cancelled ||
      importStarted ||
      delivered ||
      !canEnhance(frame, desktopMedia, reducedMotionMedia)
    ) {
      return;
    }

    importStarted = true;
    stopObserver();

    void options
      .importPanel()
      .then((module) => {
        cachedModule = module;
        deliverIfAllowed();
      })
      .catch(() => undefined);
  };

  const connect = () => {
    if (
      observer ||
      importStarted ||
      delivered ||
      cancelled ||
      !canEnhance(frame, desktopMedia, reducedMotionMedia)
    ) {
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }

        loadPanel();
      },
      {
        root: null,
        rootMargin: "240px 0px",
        threshold: 0,
      },
    );

    observer.observe(frame);
  };

  const sync = () => {
    if (cancelled) {
      stopObserver();
      return;
    }

    if (!canEnhance(frame, desktopMedia, reducedMotionMedia)) {
      stopObserver();
      return;
    }

    if (delivered) {
      return;
    }

    if (cachedModule) {
      deliverIfAllowed();
      return;
    }

    if (importStarted) {
      return;
    }

    connect();
  };

  desktopMedia.addEventListener("change", sync);
  reducedMotionMedia.addEventListener("change", sync);
  sync();

  return () => {
    cancelled = true;
    stopObserver();
    desktopMedia.removeEventListener("change", sync);
    reducedMotionMedia.removeEventListener("change", sync);
  };
}
