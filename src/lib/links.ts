export function isInternalHref(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

export function mergeLinkRel(
  openInNewTab: boolean,
  extraRel?: string,
): string | undefined {
  const tokens: string[] = [];
  const seen = new Set<string>();

  const add = (token: string) => {
    const normalized = token.toLowerCase();

    if (!normalized || seen.has(normalized)) {
      return;
    }

    seen.add(normalized);
    tokens.push(normalized);
  };

  if (extraRel) {
    for (const token of extraRel.trim().split(/\s+/)) {
      add(token);
    }
  }

  if (openInNewTab) {
    add("noopener");
    add("noreferrer");
  }

  return tokens.length > 0 ? tokens.join(" ") : undefined;
}
