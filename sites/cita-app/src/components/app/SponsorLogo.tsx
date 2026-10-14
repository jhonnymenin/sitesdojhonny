import type { Sponsor } from "@/data/sponsorsData";
import { cn } from "@/lib/utils";

/** Card de logo de patrocinador, com selo opcional "a confirmar". */
export function SponsorLogo({ sponsor, size = "md" }: { sponsor: Sponsor; size?: "sm" | "md" }) {
  const pending = sponsor.status === "a-confirmar";

  return (
    <div
      className={cn(
        "app-card relative flex items-center justify-center p-3",
        size === "sm" ? "h-20" : "h-28",
        pending && "border-dashed",
      )}
    >
      {sponsor.logo ? (
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          loading="lazy"
          className={cn(
            "w-full object-contain",
            size === "sm" ? "max-h-10" : "max-h-14",
            pending && "opacity-70",
          )}
        />
      ) : (
        <span className="text-center font-display text-sm font-bold text-navy/70">{sponsor.name}</span>
      )}
      {pending && (
        <span className="absolute -top-2 right-2 rounded-full bg-navy px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.14em] text-white">
          A confirmar
        </span>
      )}
    </div>
  );
}
