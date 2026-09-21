import logoSrc from "@/assets/logo.webp";

export function Logo({ variant = "dark", className = "" }: { variant?: "dark" | "light"; className?: string }) {
  return (
    <img
      src={logoSrc}
      alt="Fundação Dona Paulina de Souza Queiroz"
      className={`h-16 w-auto md:h-20 ${variant === "light" ? "brightness-0 invert" : ""} ${className}`}
      width={400}
      height={320}
    />
  );
}
