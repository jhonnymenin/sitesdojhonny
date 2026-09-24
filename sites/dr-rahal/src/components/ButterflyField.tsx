import { motion } from "framer-motion";
import symbol from "@/assets/symbol-rahal.png";

type Variant = "light" | "dark";

type Butterfly = {
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotate: number;
  opacity?: number;
};

const PRESETS: Record<string, Butterfly[]> = {
  hero: [
    { top: "8%", left: "6%", size: 220, duration: 11, delay: 0, drift: 24, rotate: 6 },
    { top: "55%", left: "38%", size: 140, duration: 9, delay: 1.2, drift: -18, rotate: -5 },
    { top: "20%", left: "72%", size: 320, duration: 14, delay: 0.5, drift: 30, rotate: 4, opacity: 0.07 },
    { top: "78%", left: "82%", size: 110, duration: 8, delay: 2, drift: -14, rotate: -7 },
  ],
  cta: [
    { top: "12%", left: "10%", size: 200, duration: 12, delay: 0, drift: 22, rotate: 5 },
    { top: "55%", left: "78%", size: 260, duration: 13, delay: 1.4, drift: -22, rotate: -6 },
  ],
  section: [
    { top: "20%", left: "85%", size: 380, duration: 16, delay: 0, drift: 18, rotate: 3, opacity: 0.05 },
  ],
};

export function ButterflyField({
  preset = "hero",
  variant = "dark",
  baseOpacity = 0.1,
}: {
  preset?: keyof typeof PRESETS;
  variant?: Variant;
  baseOpacity?: number;
}) {
  const items = PRESETS[preset];
  // Dark hero: tint the symbol gold; light bg: keep natural
  const filter =
    variant === "dark"
      ? "brightness(0) invert(1) sepia(60%) saturate(420%) hue-rotate(355deg) brightness(95%)"
      : "sepia(30%) saturate(140%) hue-rotate(355deg)";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((b, i) => (
        <motion.img
          key={i}
          src={symbol}
          alt=""
          aria-hidden
          style={{
            top: b.top,
            left: b.left,
            width: b.size,
            opacity: b.opacity ?? baseOpacity,
            filter,
          }}
          className="absolute select-none"
          initial={{ y: 0, rotate: -b.rotate, scale: 1 }}
          animate={{
            y: [0, -b.drift, 0, b.drift * 0.5, 0],
            rotate: [-b.rotate, b.rotate, -b.rotate * 0.6, b.rotate * 0.8, -b.rotate],
            scale: [1, 1.04, 1, 1.02, 1],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
