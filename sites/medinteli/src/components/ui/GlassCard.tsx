import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowColor?: "blue" | "cyan" | "purple";
}

export const GlassCard = ({ children, className, hoverEffect = true }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        hoverEffect ? "card-clean" : "bg-white border border-slate-200 rounded-xl",
        className
      )}
    >
      {children}
    </div>
  );
};
