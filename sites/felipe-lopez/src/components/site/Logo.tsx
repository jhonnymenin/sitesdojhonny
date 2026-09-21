import logoMark from "@/assets/logo-mark.png";

export function Logo({
  compact = false,
  tone = "light",
}: {
  compact?: boolean;
  /** "dark" = logo over light bg (ink/brown). "light" = logo over dark bg (champagne). */
  tone?: "dark" | "light";
}) {
  const filter =
    tone === "light"
      ? "invert(1) sepia(0.22) saturate(0.55) hue-rotate(355deg) brightness(0.96)"
      : "brightness(0) saturate(100%) invert(13%) sepia(11%) saturate(700%) hue-rotate(355deg) brightness(94%) contrast(88%)";

  return (
    <img
      src={logoMark}
      alt="Dr. Luís Felipe Lopez — Cirurgião Plástico"
      style={{
        height: compact ? 44 : 72,
        width: "auto",
        objectFit: "contain",
        filter,
      }}
      draggable={false}
    />
  );
}
