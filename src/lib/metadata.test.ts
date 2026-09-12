import { describe, expect, it } from "vitest";

import {
  createHomeMetadata,
  createPageMetadata,
  createRootMetadata,
  createUnpublishedMetadata,
  homeTitle,
  siteDescription,
} from "@/lib/metadata";

describe("metadata", () => {
  it("remove a menção a site em desenvolvimento", () => {
    const root = createRootMetadata();
    const home = createHomeMetadata();

    expect(root.description).toBe(siteDescription);
    expect(home.description).toBe(siteDescription);
    expect(root.description).not.toMatch(/em desenvolvimento/i);
    expect(home.description).not.toMatch(/em desenvolvimento/i);
    expect(JSON.stringify(root)).not.toMatch(/em desenvolvimento/i);
    expect(JSON.stringify(home)).not.toMatch(/em desenvolvimento/i);
  });

  it("define o título absoluto da Home e preserva o template interno", () => {
    const root = createRootMetadata();
    const home = createHomeMetadata();

    expect(home.title).toEqual({ absolute: homeTitle });
    expect(root.title).toEqual({
      default: "AZ Work Center",
      template: "%s | AZ Work Center",
    });
    expect(root.metadataBase).toBeInstanceOf(URL);
    expect(root.robots).toEqual({ index: false, follow: false });
  });

  it("marca páginas ainda não aprovadas como noindex", () => {
    const page = createPageMetadata("Soluções", "Description das soluções.");
    const unpublished = createUnpublishedMetadata(
      "Privacidade",
      "Política ainda não aprovada.",
    );

    expect(page).toEqual({
      title: "Soluções",
      description: "Description das soluções.",
    });
    expect(unpublished.robots).toEqual({ index: false, follow: false });
  });
});
