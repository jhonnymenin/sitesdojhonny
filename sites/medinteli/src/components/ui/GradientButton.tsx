import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "onDark" | "onDarkOutline";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  onClick?: () => void;
}

export const GradientButton = ({
  children,
  className,
  variant = "primary",
  size = "md",
  onClick,
}: GradientButtonProps) => {
  const baseStyles = "relative overflow-hidden btn-magnetic font-medium rounded-lg transition-colors duration-200";

  const sizeStyles = {
    sm: "px-5 min-h-[44px] text-sm",
    md: "px-6 min-h-[52px] md:min-h-[48px] text-base",
    lg: "px-7 min-h-[52px] md:min-h-[48px] text-base sm:text-lg",
  };

  const variantStyles = {
    primary:
      "bg-gradient-brand text-primary-foreground font-semibold shadow-sm hover:brightness-110",
    secondary:
      "bg-card text-foreground border border-border hover:border-brand hover:text-brand",
    outline:
      "bg-transparent border border-border text-foreground hover:border-brand hover:text-brand",
    onDark: "bg-white text-[#0A0E17] hover:bg-white/90",
    onDarkOutline: "border border-white/40 text-white hover:bg-white/10",
  };

  return (
    <motion.button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <span data-magnetic className="relative z-10 flex items-center justify-center h-full">{children}</span>
    </motion.button>
  );
};
