"use client";

import {
  startTransition,
  useEffect,
  useState,
  type ComponentType,
} from "react";

import {
  bindServiceStoryActiveList,
  bindServiceStoryLoader,
} from "@/components/motion/service-story-loader-runtime";

export function ServiceStoryLoader() {
  const [Panel, setPanel] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      return;
    }

    const frame = document.querySelector("[data-service-story-frame]");
    if (!(frame instanceof HTMLElement)) {
      return;
    }

    const section = frame.closest("#solucoes") ?? frame;
    const stopLoader = bindServiceStoryLoader(frame, {
      importPanel: () => import("./service-story-panel"),
      onPanelLoaded: (NextPanel) => {
        startTransition(() => {
          setPanel(() => NextPanel);
        });
      },
    });
    const stopActiveList = bindServiceStoryActiveList(section);

    return () => {
      stopLoader();
      stopActiveList();
    };
  }, []);

  if (!Panel) {
    return null;
  }

  return <Panel />;
}
