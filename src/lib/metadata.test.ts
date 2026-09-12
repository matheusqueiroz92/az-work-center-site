import { describe, expect, it } from "vitest";

import {
  createHomeMetadata,
  createRootMetadata,
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
});
