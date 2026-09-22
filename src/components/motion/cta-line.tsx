export function CtaLine() {
  return (
    <svg
      viewBox="0 0 192 12"
      className="text-foreground pointer-events-none mb-10 hidden h-3 w-48 lg:block"
      aria-hidden="true"
      focusable="false"
      data-editorial-line="cta"
    >
      <path
        d="M0 6 H192"
        data-editorial-line-base=""
        className="text-border"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M0 6 H192"
        data-editorial-line-overlay=""
        className="text-foreground"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        pathLength="1"
      />
    </svg>
  );
}
