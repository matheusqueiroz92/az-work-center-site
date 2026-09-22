import {
  heroMediaHeight,
  heroMediaWidth,
  heroMp4Src,
  heroPosterSrc,
  heroWebmSrc,
} from "@/lib/hero-media";

export const heroVideoViewportQuery = "(min-width: 768px)";
export const heroVideoOrientationQuery = "(orientation: landscape)";
export const heroVideoMotionQuery = "(prefers-reduced-motion: no-preference)";

function isAllowed(
  viewportMedia: MediaQueryList,
  orientationMedia: MediaQueryList,
  motionMedia: MediaQueryList,
) {
  return (
    viewportMedia.matches && orientationMedia.matches && motionMedia.matches
  );
}

function createSource(src: string, type: string) {
  const source = document.createElement("source");
  source.src = src;
  source.type = type;
  return source;
}

export function bindHeroVideoEnhancement(host: HTMLElement) {
  if (typeof window.matchMedia !== "function") {
    return () => undefined;
  }

  const viewportMedia = window.matchMedia(heroVideoViewportQuery);
  const orientationMedia = window.matchMedia(heroVideoOrientationQuery);
  const motionMedia = window.matchMedia(heroVideoMotionQuery);
  const heroRoot = host.closest("[data-hero]");
  const hero = heroRoot instanceof HTMLElement ? heroRoot : host;

  let video: HTMLVideoElement | null = null;
  let observer: IntersectionObserver | null = null;
  let inView = false;
  let pageVisible = document.visibilityState !== "hidden";

  const markReady = () => {
    video?.setAttribute("data-hero-video-ready", "");
  };

  const syncPlayback = () => {
    if (!video) {
      return;
    }

    if (
      inView &&
      pageVisible &&
      isAllowed(viewportMedia, orientationMedia, motionMedia)
    ) {
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
  };

  const destroyVideo = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }

    if (!video) {
      return;
    }

    video.pause();
    video.removeAttribute("src");
    video.replaceChildren();
    video.load();
    video.remove();
    video = null;
  };

  const onError = () => {
    destroyVideo();
  };

  const createVideo = () => {
    if (video) {
      return;
    }

    const next = document.createElement("video");
    next.setAttribute("aria-hidden", "true");
    next.setAttribute("data-hero-media", "");
    next.setAttribute("playsinline", "");
    next.tabIndex = -1;
    next.muted = true;
    next.defaultMuted = true;
    next.autoplay = true;
    next.loop = true;
    next.playsInline = true;
    next.controls = false;
    next.preload = "auto";
    next.poster = heroPosterSrc;
    next.width = heroMediaWidth;
    next.height = heroMediaHeight;
    next.disableRemotePlayback = true;
    next.setAttribute(
      "controlslist",
      "nodownload nofullscreen noremoteplayback",
    );
    next.poster = heroPosterSrc;
    next.width = heroMediaWidth;
    next.height = heroMediaHeight;
    next.className =
      "pointer-events-none absolute inset-0 h-full w-full max-h-full max-w-none object-cover";
    next.disablePictureInPicture = true;
    next.append(
      createSource(heroWebmSrc, "video/webm"),
      createSource(heroMp4Src, "video/mp4"),
    );
    next.addEventListener("loadeddata", markReady);
    next.addEventListener("canplay", markReady);
    next.addEventListener("error", onError);

    host.append(next);
    video = next;

    if (typeof IntersectionObserver === "function") {
      observer = new IntersectionObserver(
        (entries) => {
          inView = entries.some((entry) => entry.isIntersecting);
          syncPlayback();
        },
        { threshold: 0 },
      );
      observer.observe(hero as Element);
    } else {
      inView = true;
      syncPlayback();
    }
  };

  const syncMount = () => {
    if (isAllowed(viewportMedia, orientationMedia, motionMedia)) {
      createVideo();
      syncPlayback();
      return;
    }

    destroyVideo();
  };

  const onVisibility = () => {
    pageVisible = document.visibilityState !== "hidden";
    syncPlayback();
  };

  viewportMedia.addEventListener("change", syncMount);
  orientationMedia.addEventListener("change", syncMount);
  motionMedia.addEventListener("change", syncMount);
  document.addEventListener("visibilitychange", onVisibility);
  syncMount();

  return () => {
    viewportMedia.removeEventListener("change", syncMount);
    orientationMedia.removeEventListener("change", syncMount);
    motionMedia.removeEventListener("change", syncMount);
    document.removeEventListener("visibilitychange", onVisibility);
    destroyVideo();
  };
}
