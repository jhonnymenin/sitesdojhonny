import { useEffect, useState } from "react";
import { CtaButton } from "./primitives";
import { PRICING_ANCHOR } from "@/lib/checkout";

/*
 * Fim do lote vigente, o de 15% de desconto: 31/10/2026.
 *
 * Esta data e o cupom em src/lib/checkout.ts têm de virar JUNTOS. Entre 16 e
 * 19/10 a barra marcava zero e os botões ainda levavam ao cupom de lançamento,
 * que já estava expirado: a página anunciava desconto e o carrinho cobrava
 * cheio. Ao trocar de lote, conferir os dois arquivos.
 *
 * Datas anteriores: 30/09 e 15/10, ambas de lançamento.
 */
const OFFER_END = new Date("2026-10-31T23:59:59-03:00").getTime();

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
    <div className="theme-blue border-b border-border">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-center gap-4 px-5 py-2 md:justify-between md:px-10">
        <p className="label-mono text-muted-foreground">
          <span className="font-display font-semibold text-orange">Condição especial | até 15% OFF</span>
          <span className="hidden md:inline"> · até 31 de outubro</span>
          {time ? (
            <span className="ml-2 text-foreground">
              {time.d}d {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
            </span>
          ) : null}
        </p>
        <CtaButton
          href={PRICING_ANCHOR}
          className="hidden px-4 py-1.5 text-sm md:inline-flex"
        >
          Garantir vaga
        </CtaButton>
      </div>
    </div>
  );
}
