import logoSymbol from "@/assets/logo-symbol.png";

type Tone = "gold" | "ivory" | "ink";

const toneFilter: Record<Tone, string> = {
  // Warm champagne gold (matches --gold #C9A96E)
  gold:
    "brightness(0) saturate(100%) invert(73%) sepia(18%) saturate(640%) hue-rotate(360deg) brightness(92%) contrast(86%)",
  // Soft ivory / cream for dark surfaces
  ivory:
    "brightness(0) saturate(100%) invert(95%) sepia(10%) saturate(180%) hue-rotate(5deg) brightness(99%) contrast(92%)",
  // Deep brown ink for light beige surfaces
  ink:
    "brightness(0) saturate(100%) invert(13%) sepia(11%) saturate(700%) hue-rotate(355deg) brightness(94%) contrast(88%)",
};

export function LogoMark({
  size = 120,
  rotate = 0,
  opacity = 0.08,
  tone = "gold",
  className = "",
  style,
}: {
  size?: number | string;
  rotate?: number;
  opacity?: number;
  tone?: Tone;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src={logoSymbol}
      alt=""
      aria-hidden
      draggable={false}
      className={`pointer-events-none select-none ${className}`}
      style={{
        width: typeof size === "number" ? `${size}px` : size,
        height: "auto",
        opacity,
        transform: `rotate(${rotate}deg)`,
        filter: toneFilter[tone],
        ...style,
      }}
    />
  );
}
