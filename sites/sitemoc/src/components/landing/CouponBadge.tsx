import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { COUPON_CODE } from "@/lib/checkout";

/*
 * Cupom da campanha.
 *
 * A EAD Plataforma não aceita cupom por parâmetro de URL — o código é digitado
 * num campo do próprio checkout. Então o código precisa estar visível aqui, e
 * copiável, senão a pessoa chega no checkout sem saber o que digitar e paga o
 * preço cheio.
 */
export function CouponBadge({ className }: { className?: string }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(COUPON_CODE);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Navegador sem permissão de clipboard: o código continua visível na tela.
    }
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
      <span className="label-mono text-muted-foreground">Cupom</span>
      <button
        type="button"
        onClick={copiar}
        aria-label={`Copiar cupom ${COUPON_CODE}`}
        className="inline-flex items-center gap-2 rounded-md border border-dashed border-cyan/60 bg-cyan/10 px-3 py-1.5 font-mono text-sm font-bold tracking-[0.08em] text-cyan transition-colors hover:bg-cyan/20"
      >
        {COUPON_CODE}
        {copiado ? (
          <Check size={15} strokeWidth={2.5} aria-hidden />
        ) : (
          <Copy size={15} strokeWidth={2} aria-hidden />
        )}
      </button>
      <span className="text-sm text-muted-foreground" aria-live="polite">
        {copiado ? "Copiado!" : "aplique no checkout"}
      </span>
    </div>
  );
}
