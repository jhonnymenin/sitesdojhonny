import type { ComponentProps } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import pointAsset from "@/assets/rahal-point.png";
import waveAsset from "@/assets/rahal-wave.png";
import thinkAsset from "@/assets/rahal-think.png";

export type RahalPose = "point" | "welcome" | "present" | "wave" | "think";

const poses: Record<RahalPose, string> = {
  point: pointAsset,
  welcome: waveAsset,
  present: pointAsset,
  wave: waveAsset,
  think: thinkAsset,
};

export interface RahalMascotProps extends Omit<ComponentProps<"div">, "children"> {
  /** Pose do boneco Rahal. */
  pose?: RahalPose;
  /** Tamanho relativo do mascote decorativo. */
  size?: "sm" | "md" | "lg" | "xl";
  /** Espelha horizontalmente (útil quando o boneco fica à esquerda). */
  flip?: boolean;
  /** Sombra de contato no chão. */
  grounded?: boolean;
}

const sizes: Record<NonNullable<RahalMascotProps["size"]>, string> = {
  sm: "h-[130px] sm:h-[170px]",
  md: "h-[180px] sm:h-[240px]",
  lg: "h-[240px] sm:h-[320px] lg:h-[380px]",
  /** Mesmo porte do boneco da seção final (CTA). */
  xl: "h-[220px] sm:h-[320px] md:h-[420px] lg:h-[500px]",
};

/**
 * Ilustração decorativa do "boneco Rahal".
 * Sempre aria-hidden: é ornamento, nunca conteúdo informativo.
 */
export function RahalMascot({
  pose = "welcome",
  size = "md",
  flip = false,
  grounded = true,
  className,
  ...props
}: RahalMascotProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none select-none relative inline-flex flex-col items-center", className)}
      {...props}
    >
      <motion.img
        src={poses[pose]}
        alt=""
        loading="lazy"
        draggable={false}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "w-auto object-contain my-0 drop-shadow-[0_18px_24px_rgba(7,26,49,0.18)]",
          sizes[size],
          flip && "scale-x-[-1]",
        )}
      />
      {grounded && (
        <span
          className="mt-1 block h-[6px] w-[70%] rounded-[100%] blur-[6px] opacity-40"
          style={{ background: "radial-gradient(ellipse at center, rgba(7,26,49,0.55), transparent 70%)" }}
        />
      )}
    </div>
  );
}
