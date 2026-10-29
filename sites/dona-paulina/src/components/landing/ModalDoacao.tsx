import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { BlocoPix } from "./BlocoPix";

/*
 * Os planos de doação da Campanha Laços que Protegem.
 *
 * NÃO HÁ GATEWAY DE PAGAMENTO. A Fundação pediu "link de pagamento via Pix" e
 * passou só a chave — não existe conta de cobrança, nem BR Code com valor
 * embutido (ver lib/pix.ts). Então o plano escolhido vira um valor em destaque
 * ao lado da chave, e a pessoa digita o valor no aplicativo do banco. É menos
 * cômodo que um botão de checkout, mas é o que funciona de verdade hoje: um
 * link inventado levaria a lugar nenhum.
 *
 * O valor fica visível DEPOIS da escolha, junto da chave, porque é nesse
 * momento que a pessoa troca de aplicativo — ter o número e o valor na mesma
 * área evita voltar ao site para conferir quanto era.
 */

export type Plano = { rotulo: string; valor: string };

export function ModalDoacao({
  aberto,
  aoFechar,
  titulo,
  descricao,
  planos,
  rodape,
}: {
  aberto: boolean;
  aoFechar: () => void;
  titulo: string;
  descricao: string;
  planos: Plano[];
  rodape?: string;
}) {
  // Com um plano só não há escolha a fazer: já vem marcado.
  const [escolhido, setEscolhido] = useState<string | null>(
    planos.length === 1 ? planos[0].rotulo : null,
  );

  useEffect(() => {
    if (!aberto) return;
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") aoFechar();
    };
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = antes;
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto, aoFechar]);

  if (!aberto) return null;

  const plano = planos.find((p) => p.rotulo === escolhido);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-charcoal/60 px-4 py-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="doacao-titulo"
      onClick={(e) => {
        if (e.target === e.currentTarget) aoFechar();
      }}
    >
      <div className="relative flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-3xl bg-card shadow-card">
        <button
          type="button"
          onClick={aoFechar}
          aria-label="Fechar"
          className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-charcoal/60"
        >
          <X size={18} />
        </button>

        <div className="bg-primary-soft px-6 pt-7 pb-5">
          <p className="text-[11px] font-bold tracking-[0.18em] text-[color:var(--primary-dark)] uppercase">
            Campanha Laços que Protegem
          </p>
          <h2
            id="doacao-titulo"
            className="mt-2 pr-8 font-display text-2xl leading-tight font-bold text-[color:var(--primary-dark)]"
          >
            {titulo}
          </h2>
          <p className="mt-1 text-sm leading-snug text-charcoal/75">{descricao}</p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          {planos.length > 1 && (
            <p className="text-[11px] font-bold tracking-[0.18em] text-charcoal/50 uppercase">
              Escolha o valor
            </p>
          )}
          <div className={`grid gap-2 ${planos.length > 1 ? "mt-3" : ""}`}>
            {planos.map((p) => {
              const ativo = p.rotulo === escolhido;
              return (
                <button
                  key={p.rotulo}
                  type="button"
                  aria-pressed={ativo}
                  onClick={() => setEscolhido(p.rotulo)}
                  className={`flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left transition ${
                    ativo
                      ? "border-primary bg-primary text-primary-foreground shadow-soft"
                      : "border-primary/25 bg-white text-charcoal hover:border-primary/60"
                  }`}
                >
                  <span className="text-sm font-bold tracking-wide uppercase">{p.rotulo}</span>
                  <span className="font-display text-lg font-bold tabular-nums">{p.valor}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-5">
            {plano ? (
              <>
                <p className="mb-2 text-sm text-charcoal/75">
                  Faça um Pix de{" "}
                  <strong className="font-display text-base text-[color:var(--primary-dark)]">
                    {plano.valor}
                  </strong>{" "}
                  para a chave abaixo.
                </p>
                <BlocoPix titulo={`Pix · ${plano.rotulo}`} rodape={rodape} />
              </>
            ) : (
              <p className="rounded-2xl border border-dashed border-primary/30 px-5 py-4 text-sm text-charcoal/60">
                Escolha um valor acima para ver a chave Pix.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
