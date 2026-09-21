import type { ImgHTMLAttributes } from "react";
import logoAsset from "@/assets/logo-simposio-v2.png";

const logoColor = logoAsset;

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  white?: boolean;
  alt?: string;
};

export function CongressLogo({ white = false, alt = "I Simpósio CITA de Doenças Imunomediadas", className = "", ...props }: Props) {
  const whiteFilter = white ? "brightness-0 invert" : "";
  return (
    <img
      src={logoColor}
      alt={alt}
      width={1000}
      height={250}
      className={`object-contain ${whiteFilter} ${className}`.trim()}
      {...props}
    />
  );
}