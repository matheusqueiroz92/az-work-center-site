/** @vitest-environment jsdom */

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  ServiceStoryDiagram,
  serviceStoryDiagramLabels,
  serviceStoryGeometrySignatures,
} from "@/components/motion/service-story-diagrams";
import {
  bindServiceStoryActiveList,
  bindServiceStoryLoader,
  desktopMediaQuery,
  reducedMotionMediaQuery,
} from "@/components/motion/service-story-loader-runtime";
import {
  applyActiveServiceStoryItem,
  collectServiceStoryItems,
  observeServiceStoryItems,
  resolveActiveServiceSlug,
} from "@/components/motion/service-story-observer";
import { ProcessLine } from "@/components/motion/process-line";
import { solutionSlugs } from "@/types/content";

afterEach(() => {
  cleanup();
});

function readSource(relativePath: string) {
  return readFileSync(join(process.cwd(), "src", relativePath), "utf8");
}

describe("Service Story diagrams", () => {
  it("cobre os quatro slugs com geometrias e rótulos distintos", () => {
    const signatures = solutionSlugs.map(
      (slug) => serviceStoryGeometrySignatures[slug],
    );

    expect(signatures).toHaveLength(4);
    expect(new Set(signatures).size).toBe(4);

    for (const slug of solutionSlugs) {
      const { container } = render(<ServiceStoryDiagram slug={slug} />);
      const svg = container.querySelector("[data-service-story-diagram]");
      const text = container.textContent ?? "";

      expect(svg?.getAttribute("data-service-story-diagram")).toBe(slug);
      expect(svg?.getAttribute("aria-hidden")).toBe("true");
      expect(svg?.getAttribute("focusable")).toBe("false");
      expect(container.querySelectorAll("a, button, [tabindex]").length).toBe(
        0,
      );
      expect(svg?.hasAttribute("data-service-diagram-active")).toBe(false);
      expect(text).not.toMatch(/\bMVP\b/);
      expect(text).not.toMatch(/Growth/);

      for (const label of serviceStoryDiagramLabels[slug]) {
        expect(text).toContain(label);
      }
    }

    const { container: activeContainer } = render(
      <ServiceStoryDiagram slug="sistemas-sob-medida" active />,
    );

    expect(
      activeContainer
        .querySelector("[data-service-story-diagram]")
        ?.hasAttribute("data-service-diagram-active"),
    ).toBe(true);
  });

  it("não conserva os diagramas genéricos de retângulos", () => {
    const diagrams = readSource("components/motion/service-story-diagrams.tsx");
    const section = readSource("components/home/services-section.tsx");

    expect(diagrams).not.toMatch(/hub:5-left-modules\+center-column/);
    expect(diagrams).not.toMatch(/flow:4-staggered-stages\+broken-path/);
    expect(diagrams).not.toMatch(/scope:outer-field\+inner-release/);
    expect(diagrams).not.toMatch(/channels:3-bands\+center-gap/);
    expect(diagrams).not.toMatch(
      /board:dados\+usuarios\+modulos\+integracoes\+nucleo-gestao/,
    );
    expect(diagrams).not.toMatch(/stages:descoberta>prototipo>mvp>evolucao/);
    expect(diagrams).not.toMatch(
      /roadmap:descoberta>prototipo>mvp-construcao>evolucao/,
    );
    expect(diagrams).not.toMatch(/\bMVP\b/);
    expect(diagrams).not.toMatch(
      /cycle:presenca>aquisicao>conversao>analise\+retorno/,
    );
    expect(section).not.toMatch(/M124 64 H156/);
    expect(section).toMatch(/ServiceStoryDiagram/);
    expect(section).toMatch(/sistemas-sob-medida/);
  });

  it("usa hierarquia de superfícies e bordas em vez de um único contorno", () => {
    const diagrams = readSource("components/motion/service-story-diagrams.tsx");
    const globals = readSource("styles/globals.css");

    expect(diagrams).toMatch(/data-diagram-pane=\{level\}/);
    expect(diagrams).toMatch(/level="shell"/);
    expect(diagrams).toMatch(/\? "emphasis"/);
    expect(diagrams).toMatch(/data-diagram-line/);
    expect(diagrams).toMatch(/data-diagram-mark/);
    expect(globals).toMatch(/--diagram-stroke-shell: 0\.52/);
    expect(globals).toMatch(/--diagram-stroke-surface: 0\.22/);
    expect(globals).toMatch(/--diagram-stroke-guide: 0\.18/);
    expect(globals).toMatch(/\[data-diagram-pane="shell"\]/);
    expect(globals).toMatch(/\[data-diagram-pane="surface"\]/);

    for (const slug of solutionSlugs) {
      const { container } = render(<ServiceStoryDiagram slug={slug} />);

      expect(
        container.querySelectorAll('[data-diagram-pane="shell"]').length,
      ).toBeGreaterThan(0);
      expect(
        container.querySelectorAll("[data-diagram-pane]").length,
      ).toBeGreaterThan(3);
      expect(
        container.querySelectorAll('[data-diagram-line="guide"]').length,
      ).toBeGreaterThan(0);
    }
  });
});

describe("Service Story observer", () => {
  function mountItems() {
    const root = document.createElement("section");
    root.id = "solucoes";

    for (const slug of solutionSlugs) {
      const article = document.createElement("article");
      article.setAttribute("data-service-story-item", slug);
      article.getBoundingClientRect = () =>
        ({
          top: 400 + solutionSlugs.indexOf(slug) * 200,
          height: 180,
          bottom: 580 + solutionSlugs.indexOf(slug) * 200,
          left: 0,
          right: 100,
          width: 100,
          x: 0,
          y: 400 + solutionSlugs.indexOf(slug) * 200,
          toJSON() {
            return {};
          },
        }) as DOMRect;
      root.append(article);
    }

    document.body.append(root);
    return root;
  }

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("calcula o item mais próximo da faixa de leitura", () => {
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 800,
    });
    const root = mountItems();
    const items = collectServiceStoryItems(root);

    expect(resolveActiveServiceSlug(items)).toBe("sistemas-sob-medida");
  });

  it("usa um único observer para os quatro itens e faz cleanup", () => {
    const observe = vi.fn();
    const disconnect = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = observe;
        disconnect = disconnect;
        unobserve = vi.fn();
      },
    );

    const root = mountItems();
    const items = collectServiceStoryItems(root);
    const stop = observeServiceStoryItems(items, vi.fn());

    expect(observe).toHaveBeenCalledTimes(4);
    expect(disconnect).not.toHaveBeenCalled();
    stop();
    expect(disconnect).toHaveBeenCalledTimes(1);
    vi.unstubAllGlobals();
  });

  it("atualiza o slug ativo ao descer e ao subir", () => {
    let callback: IntersectionObserverCallback = () => undefined;
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = vi.fn();
        disconnect = vi.fn();
        unobserve = vi.fn();

        constructor(next: IntersectionObserverCallback) {
          callback = next;
        }
      },
    );

    const root = mountItems();
    const items = collectServiceStoryItems(root);
    const onActiveChange = vi.fn();
    observeServiceStoryItems(items, onActiveChange);

    const first = items[0]!;
    const third = items[2]!;

    callback(
      [
        {
          target: first,
          isIntersecting: true,
          intersectionRatio: 0.8,
        } as unknown as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    );
    callback(
      [
        {
          target: first,
          isIntersecting: false,
          intersectionRatio: 0,
        } as unknown as IntersectionObserverEntry,
        {
          target: third,
          isIntersecting: true,
          intersectionRatio: 0.7,
        } as unknown as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    );
    callback(
      [
        {
          target: third,
          isIntersecting: false,
          intersectionRatio: 0,
        } as unknown as IntersectionObserverEntry,
        {
          target: first,
          isIntersecting: true,
          intersectionRatio: 0.6,
        } as unknown as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    );

    expect(onActiveChange.mock.calls.map((call) => call[0])).toEqual([
      "sistemas-sob-medida",
      "produtos-digitais-mvp",
      "sistemas-sob-medida",
    ]);
    expect(first.hasAttribute("data-service-story-active")).toBe(true);
    expect(third.hasAttribute("data-service-story-active")).toBe(false);
    vi.unstubAllGlobals();
  });

  it("aplica e limpa o marcador ativo na lista", () => {
    const root = mountItems();
    const items = collectServiceStoryItems(root);

    applyActiveServiceStoryItem(items, "web-growth");

    expect(
      items.map((item) => item.hasAttribute("data-service-story-active")),
    ).toEqual([false, false, false, true]);

    applyActiveServiceStoryItem(items, "automacao-inteligencia-artificial");

    expect(
      items.map((item) => item.hasAttribute("data-service-story-active")),
    ).toEqual([false, true, false, false]);
  });
});

describe("ProcessLine", () => {
  it("fica no trilho superior e não usa top-10", () => {
    const { container } = render(<ProcessLine />);
    const line = container.querySelector('[data-editorial-line="process"]');

    expect(line?.getAttribute("class") ?? "").toContain("top-0");
    expect(line?.getAttribute("class") ?? "").toContain("-translate-y-1/2");
    expect(line?.getAttribute("class") ?? "").not.toContain("top-10");
  });
});

describe("Service Story architecture", () => {
  it("não importa Motion no loader e usa import dinâmico estático", () => {
    const loader = readSource("components/motion/service-story-loader.tsx");
    const runtime = readSource(
      "components/motion/service-story-loader-runtime.ts",
    );

    expect(loader).toMatch(/['"]use client['"]/);
    expect(loader).not.toMatch(/from ["']motion/);
    expect(loader).not.toMatch(/from ["']framer-motion["']/);
    expect(runtime).not.toMatch(/from ["']motion/);
    expect(runtime).not.toMatch(/from ["']framer-motion["']/);
    expect(loader).toMatch(/import\("\.\/service-story-panel"\)/);
    expect(loader).toMatch(/bindServiceStoryActiveList/);
    expect(runtime).toMatch(/observer\?\.disconnect/);
    expect(runtime).toMatch(/bindServiceStoryActiveList/);
    expect(loader).not.toMatch(/passive/);
    expect(runtime).not.toMatch(/passive/);
  });

  it("carrega o painel com LazyMotion assíncrono e APIs permitidas", () => {
    const panel = readSource("components/motion/service-story-panel.tsx");
    const features = readSource("components/motion/dom-animation.ts");

    expect(panel).toMatch(/from ["']motion\/react["']/);
    expect(panel).toMatch(/from ["']motion\/react-m["']/);
    expect(panel).not.toMatch(/from ["']motion["']/);
    expect(panel).toMatch(/LazyMotion/);
    expect(panel).toMatch(/loadDomAnimation/);
    expect(panel).toMatch(/import\("\.\/dom-animation"\)/);
    expect(panel).toMatch(/strict/);
    expect(panel).toMatch(/initial=\{false\}/);
    expect(panel).toMatch(/active=\{slug === activeSlug\}/);
    expect(panel).toMatch(/MutationObserver/);
    expect(panel).not.toMatch(/observeServiceStoryItems/);
    expect(panel).not.toMatch(/addEventListener\(["']scroll/);
    expect(panel).not.toMatch(/domMax|AnimatePresence|useScroll|layoutId/);
    expect(panel).not.toMatch(/<motion\./);
    expect(features).toMatch(/export default domAnimation/);
  });
});

describe("Service Story loader runtime", () => {
  type MediaStub = {
    matches: boolean;
    addEventListener: ReturnType<typeof vi.fn>;
    removeEventListener: ReturnType<typeof vi.fn>;
    dispatch: (matches: boolean) => void;
  };

  function createMedia(initial: boolean): MediaStub {
    const listeners = new Set<(event: MediaQueryListEvent) => void>();

    const media: MediaStub = {
      matches: initial,
      addEventListener: vi.fn((type: string, listener: EventListener) => {
        if (type === "change") {
          listeners.add(listener as (event: MediaQueryListEvent) => void);
        }
      }),
      removeEventListener: vi.fn((type: string, listener: EventListener) => {
        if (type === "change") {
          listeners.delete(listener as (event: MediaQueryListEvent) => void);
        }
      }),
      dispatch(matches: boolean) {
        media.matches = matches;
        for (const listener of listeners) {
          listener({ matches } as MediaQueryListEvent);
        }
      },
    };

    return media;
  }

  function mountFrame() {
    const frame = document.createElement("div");
    frame.setAttribute("data-service-story-frame", "");
    document.body.append(frame);
    return frame;
  }

  afterEach(() => {
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  function stubEnvironment({
    desktop,
    reduced,
    display,
  }: {
    desktop: MediaStub;
    reduced: MediaStub;
    display: string;
  }) {
    const observe = vi.fn();
    const disconnect = vi.fn();

    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = observe;
        disconnect = disconnect;
        unobserve = vi.fn();
      },
    );

    vi.stubGlobal("matchMedia", (query: string) => {
      if (query === desktopMediaQuery) {
        return desktop;
      }

      if (query === reducedMotionMediaQuery) {
        return reduced;
      }

      return createMedia(false);
    });

    vi.spyOn(window, "getComputedStyle").mockImplementation(
      () => ({ display }) as CSSStyleDeclaration,
    );

    return { observe, disconnect };
  }

  it("não importa o painel quando a viewport inicial é mobile", () => {
    const desktop = createMedia(false);
    const reduced = createMedia(false);
    const { observe } = stubEnvironment({
      desktop,
      reduced,
      display: "none",
    });
    const importPanel = vi.fn();

    bindServiceStoryLoader(mountFrame(), {
      importPanel,
      onPanelLoaded: vi.fn(),
    });

    expect(desktop.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
    expect(reduced.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
    expect(observe).not.toHaveBeenCalled();
    expect(importPanel).not.toHaveBeenCalled();
  });

  it("conecta o observer ao mudar de mobile para desktop", () => {
    const desktop = createMedia(false);
    const reduced = createMedia(false);
    const display = { current: "none" };
    const observe = vi.fn();
    const disconnect = vi.fn();

    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = observe;
        disconnect = disconnect;
        unobserve = vi.fn();
      },
    );
    vi.stubGlobal("matchMedia", (query: string) =>
      query === desktopMediaQuery
        ? desktop
        : query === reducedMotionMediaQuery
          ? reduced
          : createMedia(false),
    );
    vi.spyOn(window, "getComputedStyle").mockImplementation(
      () => ({ display: display.current }) as CSSStyleDeclaration,
    );

    bindServiceStoryLoader(mountFrame(), {
      importPanel: vi.fn(),
      onPanelLoaded: vi.fn(),
    });

    expect(observe).not.toHaveBeenCalled();
    display.current = "block";
    desktop.dispatch(true);

    expect(observe).toHaveBeenCalledTimes(1);
  });

  it("desconecta o observer ao voltar para mobile antes do import", () => {
    const desktop = createMedia(true);
    const reduced = createMedia(false);
    const display = { current: "block" };
    const observe = vi.fn();
    const disconnect = vi.fn();

    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = observe;
        disconnect = disconnect;
        unobserve = vi.fn();
      },
    );
    vi.stubGlobal("matchMedia", (query: string) =>
      query === desktopMediaQuery
        ? desktop
        : query === reducedMotionMediaQuery
          ? reduced
          : createMedia(false),
    );
    vi.spyOn(window, "getComputedStyle").mockImplementation(
      () => ({ display: display.current }) as CSSStyleDeclaration,
    );

    const importPanel = vi.fn();
    bindServiceStoryLoader(mountFrame(), {
      importPanel,
      onPanelLoaded: vi.fn(),
    });

    expect(observe).toHaveBeenCalledTimes(1);
    display.current = "none";
    desktop.dispatch(false);

    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(importPanel).not.toHaveBeenCalled();
  });

  it("impede o import quando reduced motion está ativo", () => {
    const desktop = createMedia(true);
    const reduced = createMedia(true);
    const { observe } = stubEnvironment({
      desktop,
      reduced,
      display: "block",
    });
    const importPanel = vi.fn();

    bindServiceStoryLoader(mountFrame(), {
      importPanel,
      onPanelLoaded: vi.fn(),
    });

    expect(observe).not.toHaveBeenCalled();
    expect(importPanel).not.toHaveBeenCalled();
  });

  it("reconecta o observer quando reduced motion é desativado", () => {
    const desktop = createMedia(true);
    const reduced = createMedia(true);
    const observe = vi.fn();
    const disconnect = vi.fn();

    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = observe;
        disconnect = disconnect;
        unobserve = vi.fn();
      },
    );
    vi.stubGlobal("matchMedia", (query: string) =>
      query === desktopMediaQuery
        ? desktop
        : query === reducedMotionMediaQuery
          ? reduced
          : createMedia(false),
    );
    vi.spyOn(window, "getComputedStyle").mockImplementation(
      () => ({ display: "block" }) as CSSStyleDeclaration,
    );

    bindServiceStoryLoader(mountFrame(), {
      importPanel: vi.fn(),
      onPanelLoaded: vi.fn(),
    });

    expect(observe).not.toHaveBeenCalled();
    reduced.dispatch(false);
    expect(observe).toHaveBeenCalledTimes(1);
  });

  it("remove os dois listeners e desconecta o observer no cleanup", () => {
    const desktop = createMedia(true);
    const reduced = createMedia(false);
    const { observe, disconnect } = stubEnvironment({
      desktop,
      reduced,
      display: "block",
    });

    const stop = bindServiceStoryLoader(mountFrame(), {
      importPanel: vi.fn(),
      onPanelLoaded: vi.fn(),
    });

    expect(observe).toHaveBeenCalledTimes(1);
    stop();

    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(desktop.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
    expect(reduced.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );

    desktop.dispatch(false);
    desktop.dispatch(true);
    expect(observe).toHaveBeenCalledTimes(1);
  });

  it("engole a rejeição do import e não marca o painel", async () => {
    const desktop = createMedia(true);
    const reduced = createMedia(false);
    let callback: IntersectionObserverCallback = () => undefined;

    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = vi.fn();
        disconnect = vi.fn();
        unobserve = vi.fn();

        constructor(next: IntersectionObserverCallback) {
          callback = next;
        }
      },
    );
    vi.stubGlobal("matchMedia", (query: string) =>
      query === desktopMediaQuery
        ? desktop
        : query === reducedMotionMediaQuery
          ? reduced
          : createMedia(false),
    );
    vi.spyOn(window, "getComputedStyle").mockImplementation(
      () => ({ display: "block" }) as CSSStyleDeclaration,
    );

    const onPanelLoaded = vi.fn();
    const importPanel = vi.fn(() => Promise.reject(new Error("chunk")));

    bindServiceStoryLoader(mountFrame(), {
      importPanel,
      onPanelLoaded,
    });

    callback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );

    await Promise.resolve();
    await Promise.resolve();

    expect(importPanel).toHaveBeenCalledTimes(1);
    expect(onPanelLoaded).not.toHaveBeenCalled();
  });

  function stubIntersectableDesktop(desktop: MediaStub, reduced: MediaStub) {
    let callback: IntersectionObserverCallback = () => undefined;
    const display = { current: "block" };

    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = vi.fn();
        disconnect = vi.fn();
        unobserve = vi.fn();

        constructor(next: IntersectionObserverCallback) {
          callback = next;
        }
      },
    );
    vi.stubGlobal("matchMedia", (query: string) =>
      query === desktopMediaQuery
        ? desktop
        : query === reducedMotionMediaQuery
          ? reduced
          : createMedia(false),
    );
    vi.spyOn(window, "getComputedStyle").mockImplementation(
      () => ({ display: display.current }) as CSSStyleDeclaration,
    );

    return {
      display,
      intersect() {
        callback(
          [{ isIntersecting: true } as IntersectionObserverEntry],
          {} as IntersectionObserver,
        );
      },
    };
  }

  function createDeferredImport() {
    let resolveImport: (module: {
      ServiceStoryPanel: () => null;
    }) => void = () => undefined;
    const importPanel = vi.fn(
      () =>
        new Promise<{ ServiceStoryPanel: () => null }>((resolve) => {
          resolveImport = resolve;
        }),
    );

    return {
      importPanel,
      resolve() {
        resolveImport({ ServiceStoryPanel: () => null });
      },
    };
  }

  it("não entrega o painel se a viewport vira mobile durante o import e reusa o módulo depois", async () => {
    const desktop = createMedia(true);
    const reduced = createMedia(false);
    const { display, intersect } = stubIntersectableDesktop(desktop, reduced);
    const { importPanel, resolve } = createDeferredImport();
    const onPanelLoaded = vi.fn();

    bindServiceStoryLoader(mountFrame(), {
      importPanel,
      onPanelLoaded,
    });

    intersect();
    expect(importPanel).toHaveBeenCalledTimes(1);

    display.current = "none";
    desktop.dispatch(false);
    resolve();
    await Promise.resolve();

    expect(onPanelLoaded).not.toHaveBeenCalled();

    display.current = "block";
    desktop.dispatch(true);
    await Promise.resolve();

    expect(onPanelLoaded).toHaveBeenCalledTimes(1);
    expect(importPanel).toHaveBeenCalledTimes(1);
  });

  it("não entrega o painel se reduced motion ativa durante o import e reusa o módulo depois", async () => {
    const desktop = createMedia(true);
    const reduced = createMedia(false);
    const { intersect } = stubIntersectableDesktop(desktop, reduced);
    const { importPanel, resolve } = createDeferredImport();
    const onPanelLoaded = vi.fn();

    bindServiceStoryLoader(mountFrame(), {
      importPanel,
      onPanelLoaded,
    });

    intersect();
    reduced.dispatch(true);
    resolve();
    await Promise.resolve();

    expect(onPanelLoaded).not.toHaveBeenCalled();

    reduced.dispatch(false);
    await Promise.resolve();

    expect(onPanelLoaded).toHaveBeenCalledTimes(1);
    expect(importPanel).toHaveBeenCalledTimes(1);
  });

  it("entrega o painel no máximo uma vez apesar de várias mudanças de media", async () => {
    const desktop = createMedia(true);
    const reduced = createMedia(false);
    const { display, intersect } = stubIntersectableDesktop(desktop, reduced);
    const { importPanel, resolve } = createDeferredImport();
    const onPanelLoaded = vi.fn();

    bindServiceStoryLoader(mountFrame(), {
      importPanel,
      onPanelLoaded,
    });

    intersect();
    resolve();
    await Promise.resolve();

    expect(onPanelLoaded).toHaveBeenCalledTimes(1);

    display.current = "none";
    desktop.dispatch(false);
    reduced.dispatch(true);
    display.current = "block";
    desktop.dispatch(true);
    reduced.dispatch(false);
    desktop.dispatch(false);
    desktop.dispatch(true);

    expect(onPanelLoaded).toHaveBeenCalledTimes(1);
    expect(importPanel).toHaveBeenCalledTimes(1);
  });

  function mountStoryItems() {
    const root = document.createElement("section");
    root.id = "solucoes";

    for (const slug of solutionSlugs) {
      const article = document.createElement("article");
      article.setAttribute("data-service-story-item", slug);
      article.getBoundingClientRect = () =>
        ({
          top: 400 + solutionSlugs.indexOf(slug) * 200,
          height: 180,
          bottom: 580 + solutionSlugs.indexOf(slug) * 200,
          left: 0,
          right: 100,
          width: 100,
          x: 0,
          y: 400 + solutionSlugs.indexOf(slug) * 200,
          toJSON() {
            return {};
          },
        }) as DOMRect;
      root.append(article);
    }

    document.body.append(root);
    return root;
  }

  it("marca o item ativo no desktop mesmo com reduced motion", () => {
    const desktop = createMedia(true);
    const observe = vi.fn();

    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 800,
    });
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = observe;
        disconnect = vi.fn();
        unobserve = vi.fn();
      },
    );
    vi.stubGlobal("matchMedia", (query: string) =>
      query === desktopMediaQuery ? desktop : createMedia(true),
    );

    const root = mountStoryItems();
    const stop = bindServiceStoryActiveList(root);

    expect(observe).toHaveBeenCalledTimes(4);
    expect(
      root
        .querySelector('[data-service-story-item="sistemas-sob-medida"]')
        ?.hasAttribute("data-service-story-active"),
    ).toBe(true);

    stop();
    expect(root.querySelector("[data-service-story-active]")).toBeNull();
  });

  it("não observa nem marca a lista fora do desktop", () => {
    const desktop = createMedia(false);
    const observe = vi.fn();

    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = observe;
        disconnect = vi.fn();
        unobserve = vi.fn();
      },
    );
    vi.stubGlobal("matchMedia", (query: string) =>
      query === desktopMediaQuery ? desktop : createMedia(false),
    );

    const root = mountStoryItems();
    bindServiceStoryActiveList(root);

    expect(observe).not.toHaveBeenCalled();
    expect(root.querySelector("[data-service-story-active]")).toBeNull();
  });
});
