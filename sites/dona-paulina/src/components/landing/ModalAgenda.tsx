import { useEffect } from "react";
import { X } from "lucide-react";
import { EVENTOS_2027 } from "@/lib/eventos";

/*
 * A programação de 2027 dentro do site.
 *
 * Até 30/10/2026 o cartão "Bazares & Festas" só abria o WhatsApp: a Fundação
 * ainda não tinha fechado as datas. Com o calendário em mãos, quem quer saber
 * quando é a festa junina lê a data na hora, em vez de abrir uma conversa e
 * esperar resposta. O WhatsApp continua no rodapé do modal, porque data não
 * responde a pergunta sobre horário, local ou como participar.
 */
const MESES: Record<string, string> = {
  "01": "JAN", "02": "FEV", "03": "MAR", "04": "ABR", "05": "MAI", "06": "JUN",
  "07": "JUL", "08": "AGO", "09": "SET", "10": "OUT", "11": "NOV", "12": "DEZ",
};

export function ModalAgenda({
  aberto,
  aoFechar,
  whatsapp,
}: {
  aberto: boolean;
  aoFechar: () => void;
  whatsapp: string;
}) {
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

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-charcoal/60 px-4 py-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="agenda-titulo"
      onClick={(e) => {
        if (e.target === e.currentTarget) aoFechar();
      }}
    >
      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-card shadow-card">
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
            Bazares &amp; Festas
          </p>
          <h2
            id="agenda-titulo"
            className="mt-2 pr-8 font-display text-2xl leading-tight font-bold text-[color:var(--primary-dark)]"
          >
            Eventos 2027
          </h2>
          <p className="mt-1 text-sm leading-snug text-charcoal/75">
            A programação do ano na Fundação Dona Paulina de Souza Queiroz.
          </p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          <ol className="flex flex-col gap-2">
            {EVENTOS_2027.map((e) => (
              <li
                key={e.iso}
                className="flex items-center gap-4 rounded-2xl border border-primary/15 bg-white px-4 py-3"
              >
                <time
                  dateTime={e.iso}
                  className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-primary-soft leading-none"
                >
                  <span className="font-display text-lg font-bold text-[color:var(--primary-dark)] tabular-nums">
                    {e.data.slice(0, 2)}
                  </span>
                  <span className="mt-0.5 text-[10px] font-bold tracking-wider text-[color:var(--primary-dark)]/70">
                    {MESES[e.data.slice(3, 5)]}
                  </span>
                </time>
                <span className="text-sm leading-snug font-semibold text-charcoal">{e.nome}</span>
              </li>
            ))}
          </ol>

        </div>

        {/*
          O botão fica fora da área que rola: com oito eventos a lista enche a
          tela, e um CTA no fim da rolagem só é visto por quem rola até o fim.
        */}
        <div className="border-t border-primary/15 bg-card px-6 py-4">
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-2xl bg-primary px-5 py-4 text-center text-sm font-bold text-primary-foreground transition hover:brightness-105"
          >
            Perguntar sobre horário e como participar
          </a>
          <p className="mt-3 text-xs leading-snug text-charcoal/60">
            Datas podem mudar. Confirme com a Fundação antes de se programar.
          </p>
        </div>
      </div>
    </div>
  );
}
