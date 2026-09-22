import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const srcRoot = join(process.cwd(), "src");
const motionRoot = join(srcRoot, "components/motion");

function readSource(relativePath: string) {
  return readFileSync(join(srcRoot, relativePath), "utf8");
}

function walk(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      return walk(path);
    }

    return path.endsWith(".ts") || path.endsWith(".tsx") ? [path] : [];
  });
}

function isTestFile(file: string) {
  return file.endsWith(".test.tsx") || file.endsWith(".test.ts");
}

function isInsideMotion(file: string) {
  return file.startsWith(motionRoot);
}

describe("contrato de motion", () => {
  const packageJson = JSON.parse(
    readFileSync(join(process.cwd(), "package.json"), "utf8"),
  ) as { dependencies: Record<string, string> };
  const globalsCss = readFileSync(
    join(process.cwd(), "src/styles/globals.css"),
    "utf8",
  );
  const applicationFiles = walk(srcRoot).filter((file) => !isTestFile(file));

  it("mantém o pacote motion instalado para o Service Story", () => {
    expect(packageJson.dependencies.motion).toBe("13.2.0");
  });

  it("mantém page e layouts sem use client e sem provider global", () => {
    const page = readSource("app/(marketing)/page.tsx");
    const rootLayout = readSource("app/layout.tsx");
    const marketingLayout = readSource("app/(marketing)/layout.tsx");

    for (const source of [page, rootLayout, marketingLayout]) {
      expect(source).not.toMatch(/['"]use client['"]/);
      expect(source).not.toMatch(/MotionConfig|LazyMotion/);
    }
  });

  it("mantém HeroSection e a pasta home sem use client", () => {
    const homeFiles = walk(join(srcRoot, "components/home")).filter(
      (file) => !isTestFile(file),
    );

    expect(homeFiles.length).toBeGreaterThan(0);

    for (const file of homeFiles) {
      const source = readFileSync(file, "utf8");
      expect(source).not.toMatch(/['"]use client['"]/);
      expect(source).not.toMatch(/from ["']motion/);
      expect(source).not.toMatch(/from ["']framer-motion["']/);
    }

    expect(readSource("components/home/hero-section.tsx")).toMatch(/HeroMedia/);
    expect(readSource("components/home/hero-section.tsx")).toMatch(
      /HeroInteractiveGlow/,
    );
    expect(readSource("components/home/hero-section.tsx")).not.toMatch(
      /HeroDiagram|HeroLineOverlay/,
    );
  });

  it("reserva motion/react e motion/react-m para src/components/motion", () => {
    for (const file of applicationFiles) {
      const source = readFileSync(file, "utf8");
      const importsOfficialMotion =
        /from ["']motion\/react["']/.test(source) ||
        /from ["']motion\/react-m["']/.test(source);

      if (importsOfficialMotion) {
        expect(isInsideMotion(file)).toBe(true);
      }
    }
  });

  it("recusa APIs e imports proibidos em toda a aplicação", () => {
    for (const file of applicationFiles) {
      const source = readFileSync(file, "utf8");

      expect(source).not.toMatch(/from ["']framer-motion["']/);
      expect(source).not.toMatch(/from ["']motion["']/);
      expect(source).not.toMatch(/domMax/);
      expect(source).not.toMatch(/AnimatePresence/);
      expect(source).not.toMatch(/useScroll/);
      expect(source).not.toMatch(/\bdrag=/);
      expect(source).not.toMatch(/\blayoutId\b/);
      expect(source).not.toMatch(/\slayout=\{/);
    }
  });

  it("congela o catálogo do Épico 5 em mídia 3D, duas linhas e o painel", () => {
    const page = readSource("app/(marketing)/page.tsx");
    const homeSources = walk(join(srcRoot, "components/home"))
      .filter((file) => !isTestFile(file))
      .map((file) => readFileSync(file, "utf8"))
      .join("\n");

    expect(page).toMatch(/HeroSection/);
    expect(homeSources).toMatch(/HeroMedia/);
    expect(homeSources).toMatch(/HeroVideoEnhancement/);
    expect(homeSources).toMatch(/ProcessLine/);
    expect(homeSources).toMatch(/CtaLine/);
    expect(homeSources).toMatch(/ServiceStoryLoader/);
    expect(homeSources).not.toMatch(/HeroDiagram|HeroLineOverlay/);
    expect(homeSources.match(/data-editorial-line=/g) ?? []).toHaveLength(0);
    expect(globalsCss.match(/@keyframes editorial-line-draw/g)).toHaveLength(1);
    expect(globalsCss).not.toMatch(/@keyframes hero-line-draw/);
    expect(globalsCss).not.toMatch(/data-hero-line-overlay/);
    expect(readSource("components/home/hero-section.tsx")).not.toMatch(
      /overflow-x-hidden/,
    );
    expect(globalsCss).toMatch(/\[data-hero-stage\]/);
    expect(globalsCss).toMatch(/overflow:\s*clip/);
    expect(globalsCss).toMatch(
      /\[data-hero-media\] \{\s*object-fit: cover;\s*object-position: center center;/,
    );
    expect(globalsCss).toMatch(
      /@media \(min-width: 768px\) and \(orientation: landscape\) \{[\s\S]*object-position: center bottom;/,
    );
    expect(globalsCss).toMatch(
      /@media \(min-width: 768px\) and \(orientation: portrait\) \{[\s\S]*min-height: min\(calc\(100svh - var\(--header-height\)\), 55rem\);/,
    );
    expect(globalsCss).toMatch(
      /\[data-hero\] \[data-hero-content\] \{\s*gap: 1\.25rem;\s*translate: 0 calc\(-1 \* clamp\(0\.75rem, 0\.5rem \+ 1\.8vw, 2\.5rem\)\);/,
    );
  });

  it("não implementa Section Reveal, hide-on-scroll nem transições de página", () => {
    for (const file of applicationFiles) {
      const source = readFileSync(file, "utf8");

      expect(source).not.toMatch(/SectionReveal|section-reveal/);
      expect(source).not.toMatch(/hide-on-scroll|hideOnScroll/);
      expect(source).not.toMatch(/from ["']gsap["']/);
      expect(source).not.toMatch(/from ["']lenis["']/);
    }

    expect(applicationFiles.some((file) => file.endsWith("template.tsx"))).toBe(
      false,
    );
  });

  it("não importa Motion nas páginas internas", () => {
    const internalSources = [
      "app/(marketing)/contato/page.tsx",
      "app/(marketing)/sobre/page.tsx",
      "app/(marketing)/como-trabalhamos/page.tsx",
      "app/(marketing)/solucoes/page.tsx",
      "app/(marketing)/solucoes/[slug]/page.tsx",
      "app/not-found.tsx",
    ].map(readSource);

    for (const source of internalSources) {
      expect(source).not.toMatch(/from ["']motion/);
      expect(source).not.toMatch(/from ["']framer-motion["']/);
      expect(source).not.toMatch(/MotionConfig|LazyMotion/);
      expect(source).not.toMatch(/az-hero-transformacao/);
      expect(source).not.toMatch(/HeroInteractiveGlow|HeroMedia/);
    }
  });

  it("anima só as linhas editoriais com tokens CSS", () => {
    expect(globalsCss).toMatch(/@keyframes editorial-line-draw/);
    expect(globalsCss).toMatch(
      /\[data-editorial-line-overlay\] \{\s*stroke-dasharray: 1;\s*stroke-dashoffset: 0;/,
    );
    expect(globalsCss).toMatch(
      /@supports \(animation-timeline: view\(\)\)\s*\{\s*@media \(scripting: enabled\) and \(prefers-reduced-motion: no-preference\)/,
    );
  });
});
