const processNodes = ["1", "2", "3", "4"] as const;

function ProcessRailLayer({ tone }: { tone: "base" | "fill" }) {
  const isFill = tone === "fill";

  return (
    <div
      data-process-progress-base={isFill ? undefined : ""}
      data-process-progress-fill={isFill ? "" : undefined}
    >
      <svg
        viewBox="0 0 1000 16"
        preserveAspectRatio="none"
        className="absolute inset-0 h-4 w-full"
        aria-hidden="true"
        focusable="false"
        data-editorial-line={isFill ? undefined : "process"}
      >
        <path
          d="M8 8 H992"
          data-process-progress-rail=""
          data-editorial-line-base={isFill ? undefined : ""}
          className={isFill ? "text-primary" : "text-border"}
          fill="none"
          stroke="currentColor"
          strokeWidth={isFill ? "1.5" : "1"}
        />
      </svg>
      <div data-process-nodes="">
        {processNodes.map((node) => (
          <span key={node} data-process-node={node} aria-hidden="true" />
        ))}
      </div>
    </div>
  );
}

export function ProcessLine() {
  return (
    <div
      data-process-track=""
      className="pointer-events-none absolute right-0 bottom-0 left-0 hidden h-4 w-full translate-y-1/2 lg:block"
      aria-hidden="true"
    >
      <ProcessRailLayer tone="base" />
      <ProcessRailLayer tone="fill" />
    </div>
  );
}

function ProcessMobileRailLayer({ tone }: { tone: "base" | "fill" }) {
  const isFill = tone === "fill";

  return (
    <div
      data-process-mobile-base={isFill ? undefined : ""}
      data-process-mobile-fill={isFill ? "" : undefined}
    >
      <span data-process-mobile-rail="" />
      {processNodes.map((node) => (
        <span key={node} data-process-mobile-node={node} aria-hidden="true" />
      ))}
    </div>
  );
}

export function ProcessMobileTrack() {
  return (
    <div
      data-process-mobile-track=""
      className="pointer-events-none lg:hidden"
      aria-hidden="true"
    >
      <ProcessMobileRailLayer tone="base" />
      <ProcessMobileRailLayer tone="fill" />
    </div>
  );
}
