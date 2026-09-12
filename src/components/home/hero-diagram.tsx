export function HeroDiagram() {
  return (
    <div className="text-foreground w-full max-w-xl min-w-0">
      <svg
        viewBox="0 0 520 360"
        className="h-auto w-full"
        aria-hidden="true"
        focusable="false"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="28" y="32" width="56" height="28" />
          <rect x="48" y="88" width="44" height="24" />
          <rect x="20" y="148" width="60" height="26" />
          <rect x="56" y="210" width="40" height="22" />
          <rect x="32" y="268" width="52" height="24" />

          <path d="M84 46 H148 V180 H188" />
          <path d="M92 100 H156 V180" />
          <path d="M80 161 H168 V180" />
          <path d="M96 221 H160 V180" />
          <path d="M84 280 H148 V180" />

          <rect x="292" y="72" width="88" height="56" />
          <rect x="404" y="88" width="80" height="48" />
          <rect x="304" y="196" width="84" height="52" />
          <rect x="412" y="212" width="76" height="48" />

          <path d="M380 100 H404" />
          <path d="M346 128 V196" />
          <path d="M388 222 H412" />
          <path d="M454 136 V212" />
          <path d="M232 180 H292" />
          <path d="M232 180 H304 V222" />
        </g>

        <g className="text-primary" fill="currentColor">
          <rect x="196" y="168" width="24" height="24" />
        </g>
      </svg>
    </div>
  );
}
