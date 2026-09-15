export function ProcessLine() {
  return (
    <svg
      viewBox="0 0 1000 16"
      preserveAspectRatio="none"
      className="pointer-events-none absolute top-0 right-0 left-0 hidden h-4 w-full -translate-y-1/2 lg:block"
      aria-hidden="true"
      focusable="false"
      data-editorial-line="process"
    >
      <path
        d="M8 8 H992"
        data-editorial-line-base=""
        className="text-border"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M8 8 H992"
        data-editorial-line-overlay=""
        className="text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        pathLength="1"
      />
    </svg>
  );
}
