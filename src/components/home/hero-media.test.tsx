/** @vitest-environment jsdom */

import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { HeroMedia } from "@/components/home/hero-media";
import { HeroSection } from "@/components/home/hero-section";
import { homeHero } from "@/content/home";
import {
  heroMediaHeight,
  heroMediaWidth,
  heroMp4Bytes,
  heroMp4Sha256,
  heroMp4Src,
  heroPortraitPosterBytes,
  heroPortraitPosterHeight,
  heroPortraitPosterQuery,
  heroPortraitPosterSha256,
  heroPortraitPosterSrc,
  heroPortraitPosterWidth,
  heroPosterBytes,
  heroPosterSha256,
  heroPosterSrc,
  heroWebmBytes,
  heroWebmSha256,
  heroWebmSrc,
} from "@/lib/hero-media";

afterEach(() => {
  cleanup();
});

const publicRoot = join(process.cwd(), "public");

describe("HeroMedia", () => {
  it("preserva WebM, MP4 e poster aprovados sem recompressão", () => {
    const webm = statSync(join(publicRoot, heroWebmSrc.slice(1)));
    const mp4 = statSync(join(publicRoot, heroMp4Src.slice(1)));
    const poster = statSync(join(publicRoot, heroPosterSrc.slice(1)));

    expect(webm.size).toBe(heroWebmBytes);
    expect(mp4.size).toBe(heroMp4Bytes);
    expect(poster.size).toBe(heroPosterBytes);
    expect(
      createHash("sha256")
        .update(readFileSync(join(publicRoot, heroWebmSrc.slice(1))))
        .digest("hex"),
    ).toBe(heroWebmSha256);
    expect(
      createHash("sha256")
        .update(readFileSync(join(publicRoot, heroMp4Src.slice(1))))
        .digest("hex"),
    ).toBe(heroMp4Sha256);
    expect(
      createHash("sha256")
        .update(readFileSync(join(publicRoot, heroPosterSrc.slice(1))))
        .digest("hex"),
    ).toBe(heroPosterSha256);
    expect(heroMediaWidth).toBe(1920);
    expect(heroMediaHeight).toBe(1080);
    expect(heroPortraitPosterWidth).toBe(1080);
    expect(heroPortraitPosterHeight).toBe(1350);
    expect(heroPortraitPosterBytes).toBe(15048);
    expect(
      statSync(join(publicRoot, heroPortraitPosterSrc.slice(1))).size,
    ).toBe(heroPortraitPosterBytes);
    expect(
      createHash("sha256")
        .update(readFileSync(join(publicRoot, heroPortraitPosterSrc.slice(1))))
        .digest("hex"),
    ).toBe(heroPortraitPosterSha256);
    expect(
      readdirSync(join(publicRoot, "media/hero")).some((name) =>
        /reframed|clean|\.blend$|\.png$/i.test(name),
      ),
    ).toBe(false);
    expect(
      existsSync(
        join(
          publicRoot,
          "media/hero/az-hero-transformacao-animada-luz-suave.webp",
        ),
      ),
    ).toBe(false);
    expect(
      existsSync(
        join(
          publicRoot,
          "media/hero/az-hero-transformacao-poster-luz-suave.webp",
        ),
      ),
    ).toBe(false);
  });

  it("renderiza o poster Server no HTML inicial sem fontes de vídeo", () => {
    const { container } = render(<HeroMedia />);
    const wrapper = container.querySelector("[aria-hidden='true']");
    const picture = container.querySelector("picture");
    const portrait = container.querySelector('[data-hero-poster="portrait"]');
    const image = container.querySelector("img");

    expect(wrapper).toBeTruthy();
    expect(wrapper?.contains(image)).toBe(true);
    expect(picture).toBeTruthy();
    expect(picture?.getAttribute("data-hero-picture")).toBe("");
    expect(portrait?.getAttribute("media")).toBe(heroPortraitPosterQuery);
    expect(portrait?.getAttribute("srcset")).toBe(heroPortraitPosterSrc);
    expect(portrait?.getAttribute("width")).toBe(
      String(heroPortraitPosterWidth),
    );
    expect(portrait?.getAttribute("height")).toBe(
      String(heroPortraitPosterHeight),
    );
    expect(container.querySelector("video")).toBeNull();
    expect(
      [...container.querySelectorAll("source")].some((node) =>
        /\.(webm|mp4)$/.test(node.getAttribute("src") ?? ""),
      ),
    ).toBe(false);
    expect(image?.getAttribute("src")).toBe(heroPosterSrc);
    expect(image?.getAttribute("alt")).toBe("");
    expect(image?.getAttribute("aria-hidden")).toBe("true");
    expect(image?.getAttribute("data-hero-poster")).toBe("landscape");
    expect(image?.getAttribute("width")).toBe(String(heroMediaWidth));
    expect(image?.getAttribute("height")).toBe(String(heroMediaHeight));
    expect(image?.getAttribute("tabindex")).toBeNull();
    expect(image?.getAttribute("draggable")).toBe("false");
    expect(image?.hasAttribute("data-hero-media")).toBe(true);
    expect(image?.className).toMatch(/object-cover/);
    expect(image?.className).not.toMatch(/md:object-center/);
    expect(image?.className).not.toMatch(/object-\[center_46%\]/);
    expect(container.querySelector("[data-hero-video]")).toBeTruthy();
  });

  it("ancora o enquadramento no rodapé no desktop via CSS compartilhado", () => {
    const mediaSource = readFileSync(
      join(process.cwd(), "src/components/home/hero-media.tsx"),
      "utf8",
    );
    const runtime = readFileSync(
      join(
        process.cwd(),
        "src/components/motion/hero-video-enhancement-runtime.ts",
      ),
      "utf8",
    );
    const css = readFileSync(
      join(process.cwd(), "src/styles/globals.css"),
      "utf8",
    );

    expect(mediaSource).not.toMatch(/md:object-center/);
    expect(mediaSource).not.toMatch(/object-\[center_46%\]/);
    expect(runtime).not.toMatch(/md:object-center/);
    expect(runtime).not.toMatch(/object-\[center_46%\]/);
    expect(css).toMatch(
      /\[data-hero-media\] \{\s*object-fit: cover;\s*object-position: center center;/,
    );
    expect(css).toMatch(
      /@media \(min-width: 768px\) and \(orientation: landscape\) \{[\s\S]*\[data-hero-media\] \{\s*object-position: center bottom;/,
    );
    expect(css).toMatch(
      /@media \(min-width: 768px\) and \(orientation: portrait\) \{[\s\S]*min-height: min\(calc\(100svh - var\(--header-height\)\), 55rem\);/,
    );
    expect(css).not.toMatch(/object-position: center 46%/);
    expect(css).toMatch(
      /\[data-hero\] \[data-hero-content\] \{\s*gap: 1\.25rem;\s*translate: 0 calc\(-1 \* clamp\(0\.75rem, 0\.5rem \+ 1\.8vw, 2\.5rem\)\);/,
    );
    expect(css).toMatch(
      /@media \(max-height: 36rem\) \{[\s\S]*\[data-hero-content\] \{\s*gap: 0\.5rem;\s*translate: 0 -1\.25rem;/,
    );
    expect(
      readFileSync(
        join(process.cwd(), "src/components/home/hero-section.tsx"),
        "utf8",
      ),
    ).toMatch(
      /data-hero-content=""\s+className="mx-auto flex w-full flex-col items-center text-center"/,
    );
  });

  it("permanece Server Component sem next/image e sem JS de seleção", () => {
    const source = readFileSync(
      join(process.cwd(), "src/components/home/hero-media.tsx"),
      "utf8",
    );

    expect(source).not.toMatch(/['"]use client['"]/);
    expect(source).not.toMatch(/from ["']next\/image["']/);
    expect(source).not.toMatch(/matchMedia/);
    expect(source).toMatch(/<picture/);
    expect(source).toMatch(/data-hero-poster="portrait"/);
    expect(source).toMatch(/<img/);
    expect(source).not.toMatch(/<video/);
    expect(source).toMatch(/HeroVideoEnhancement/);
  });
});

describe("HeroSection 3D", () => {
  it("mantém copy e CTAs no HTML sem a Hero antiga", () => {
    const { container, getAllByRole, getByRole } = render(<HeroSection />);
    const heading = getByRole("heading", { level: 1, name: homeHero.title });

    expect(heading.textContent).toBe(homeHero.title);
    expect(heading.querySelectorAll("span").length).toBe(0);
    expect(container.textContent).toContain(homeHero.eyebrow);
    expect(container.textContent).toContain(homeHero.text);
    expect(
      getByRole("link", { name: homeHero.primaryCta.label }).getAttribute(
        "href",
      ),
    ).toBe(homeHero.primaryCta.href);
    expect(
      getByRole("link", { name: homeHero.secondaryCta.label }).getAttribute(
        "href",
      ),
    ).toBe(homeHero.secondaryCta.href);
    expect(container.querySelector("[data-hero-line-overlay]")).toBeNull();
    expect(container.querySelector("[data-hero-line-base]")).toBeNull();
    expect(
      container.querySelector("[data-hero] img")?.getAttribute("src"),
    ).toBe(heroPosterSrc);
    expect(container.querySelector("[data-hero] video")).toBeNull();
    expect(container.querySelector("[data-hero-stage]")).toBeTruthy();
    expect(container.querySelector("[data-hero-content]")).toBeTruthy();
    expect(
      container.querySelector("[data-hero-content]")?.querySelector("h1"),
    ).toBe(heading);
    expect(container.querySelector("[data-hero-glow]")).toBeTruthy();
    expect(container.querySelector("[data-hero-scrim]")).toBeTruthy();
    expect(container.querySelector("[data-hero]")?.className).not.toMatch(
      /overflow-x-hidden/,
    );
    expect(getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("não esconde conteúdo essencial com opacity 0", () => {
    const { container } = render(<HeroSection />);
    const essentials = container.querySelectorAll("h1, p, a");

    expect(essentials.length).toBeGreaterThan(3);

    for (const node of essentials) {
      expect(node.getAttribute("style") ?? "").not.toMatch(/opacity:\s*0/);
      expect(node.className).not.toMatch(/\bopacity-0\b/);
    }
  });
});
