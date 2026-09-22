import { useEffect, useState } from "react";
import { CtaButton } from "./primitives";
import { checkoutUrl } from "@/lib/checkout";

// Encerramento da oferta de lançamento (30% de desconto): 30/09/2026.
const OFFER_END = new Date("2026-09-30T23:59:59-03:00").getTime();

function diff() {
  const ms = Math.max(0, OFFER_END - Date.now());
  return {
    d: Math.floor(ms / 86400000),
    h: Math.floor((ms / 3600000) % 24),
    m: Math.floor((ms / 60000) % 60),
    s: Math.floor((ms / 1000) % 60),
  };
}

export function UrgencyBar() {
  const [time, setTime] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setTime(diff());
    const id = setInterval(() => setTime(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="theme-blue fixed inset-x-0 top-0 z-50 border-b border-border">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-center gap-4 px-5 py-2 md:justify-between md:px-10">
        <p className="label-mono text-muted-foreground">
          <span className="font-display font-semibold text-orange">Lançamento | Oferta</span>
          <span className="hidden md:inline"> · até 30 de setembro</span>
          {time ? (
            <span className="ml-2 text-foreground">
              {time.d}d {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
            </span>
          ) : null}
        </p>
        <CtaButton
          href={checkoutUrl("combo", "urgencia")}
          className="hidden px-4 py-1.5 text-sm md:inline-flex"
        >
          Garantir vaga
        </CtaButton>
      </div>
    </div>
  );
}
