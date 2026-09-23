type RibbonProps = {
  className?: string;
  /** 1 = full satin presence, lower values fade the ribbon back. */
  intensity?: number;
  flip?: boolean;
};

/**
 * The silver ribbon of the identity, rebuilt as a responsive SVG.
 * Satin highlights come from layered gradients, never flat grey.
 */
export function SilverRibbon({ className, intensity = 1, flip = false }: RibbonProps) {
  const id = flip ? "rib-b" : "rib-a";
  return (
    <svg
      className={className}
      viewBox="0 0 1600 320"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      style={{ opacity: intensity, transform: flip ? "scaleX(-1)" : undefined }}
    >
      <defs>
        <linearGradient id={`${id}-satin`} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#E9E1D6" stopOpacity="0" />
          <stop offset="12%" stopColor="#D6D7D9" />
          <stop offset="30%" stopColor="#FFFFFF" />
          <stop offset="46%" stopColor="#A9AAAD" />
          <stop offset="62%" stopColor="#F2F0EC" />
          <stop offset="80%" stopColor="#B7B8BA" />
          <stop offset="100%" stopColor="#E9E1D6" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-under`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9A8577" stopOpacity="0.05" />
          <stop offset="55%" stopColor="#85878A" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#C6B7A1" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <path
        d="M-40 214 C 260 214 360 96 640 96 C 900 96 1010 224 1290 224 C 1460 224 1560 178 1660 150 L 1660 214 C 1540 240 1450 276 1290 276 C 1000 276 900 148 640 148 C 380 148 280 266 -40 266 Z"
        fill={`url(#${id}-under)`}
      />
      <path
        d="M-40 170 C 250 170 350 52 640 52 C 910 52 1010 180 1290 180 C 1460 180 1560 138 1660 112 L 1660 168 C 1545 196 1452 232 1290 232 C 1000 232 900 104 640 104 C 372 104 274 222 -40 222 Z"
        fill={`url(#${id}-satin)`}
      />
      <path
        d="M-40 176 C 250 176 350 58 640 58 C 910 58 1010 186 1290 186 C 1460 186 1560 144 1660 118"
        fill="none"
        stroke={`url(#${id}-edge)`}
        strokeWidth="1.25"
      />
    </svg>
  );
}
