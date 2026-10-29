import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarDays, Clock, MapPin, X, ExternalLink, Camera } from "lucide-react";
import { BlocoPix } from "@/components/landing/BlocoPix";
import { SIMPOSIO, PROGRAMA } from "@/lib/simposio";

/*
 * Pop-up do II Simpósio.
 *
 * APARECE UMA VEZ POR PESSOA. A escolha fica no localStorage, e quem fechou não
 * vê de novo. O site já tem o LeadModal abrindo sozinho aos 8 segundos; dois
 * pop-ups na mesma visita é o jeito mais rápido de alguém fechar a aba. Por isso
 * este abre antes (2,5s), e enquanto ele existir o LeadModal espera — a
 * coordenação está em `modalAberto`, lido pelo outro componente.
 *
 * SOME SOZINHO DEPOIS DO EVENTO. Passado 7/11/2026 ele não abre mais, mesmo que
 * ninguém lembre de remover o componente: anunciar inscrição para um evento que
 * já aconteceu é pior do que não anunciar nada.
 *
 * A programação vem resumida, em área rolável — horário, título e quem
 * apresenta. Os minicurrículos ficam na página /simposio: num pop-up de celular
 * eles empurrariam o botão de inscrição para longe.
 */

const CHAVE = "fdpsq:simposio-2026-visto";

/** Enquanto estiver true, o LeadModal segura o próprio timer. */
export let modalAberto = false;

function jaPassou() {
  // Compara no fuso de São Paulo: o evento é presencial, em São Paulo, e o
  // relógio de quem acessa de fora não deveria antecipar o encerramento.
  const hoje = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return hoje > SIMPOSIO.dataISO;
}

export function SimposioModal() {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    if (jaPassou()) return;
    try {
      if (localStorage.getItem(CHAVE) === "1") return;
    } catch {
      // Navegação privada: mostra nesta visita e pronto.
    }
    const t = setTimeout(() => {
      setAberto(true);
      modalAberto = true;
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!aberto) return;
    // Trava a rolagem do fundo enquanto o pop-up está aberto.
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
    };
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = antes;
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto]);

  function fechar() {
    setAberto(false);
    modalAberto = false;
    try {
      localStorage.setItem(CHAVE, "1");
    } catch {
      // Sem localStorage, volta na próxima visita. Tudo bem.
    }
  }

  if (!aberto) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-charcoal/60 px-4 py-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="simposio-titulo"
      onClick={(e) => {
        if (e.target === e.currentTarget) fechar();
      }}
    >
      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-card shadow-card">
        <button
          type="button"
          onClick={fechar}
          aria-label="Fechar"
          className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-charcoal/60"
        >
          <X size={18} />
        </button>

        <div className="bg-primary-soft px-6 pt-7 pb-5">
          <p className="text-[11px] font-bold tracking-[0.18em] text-[color:var(--primary-dark)] uppercase">
            Inscrições abertas
          </p>
          <h2
            id="simposio-titulo"
            className="mt-2 pr-8 font-display text-2xl leading-tight font-bold text-[color:var(--primary-dark)]"
          >
            {SIMPOSIO.titulo}
          </h2>
          <p className="mt-1 text-sm leading-snug text-charcoal/75">{SIMPOSIO.subtitulo}</p>

          <ul className="mt-4 space-y-1.5 text-sm text-charcoal/80">
            <li className="flex items-center gap-2">
              <CalendarDays size={15} className="shrink-0 text-[color:var(--primary-dark)]" />
              {SIMPOSIO.dataLegivel}
            </li>
            <li className="flex items-center gap-2">
              <Clock size={15} className="shrink-0 text-[color:var(--primary-dark)]" />
              {SIMPOSIO.horario}
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-[color:var(--primary-dark)]" />
              {SIMPOSIO.local}
            </li>
          </ul>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          <p className="text-[11px] font-bold tracking-[0.18em] text-charcoal/50 uppercase">
            Programação
          </p>
          <ul className="mt-3 space-y-2.5">
            {PROGRAMA.map((a) => (
              <li key={a.hora} className="flex gap-3 text-sm">
                <span className="w-[6.5rem] shrink-0 font-semibold text-[color:var(--primary-dark)] tabular-nums">
                  {a.hora}
                </span>
                <span className="min-w-0">
                  <span className="block leading-snug text-charcoal">{a.titulo}</span>
                  {a.quem && <span className="block text-charcoal/60">{a.quem}</span>}
                  {a.partes && (
                    <span className="mt-1 block space-y-0.5 text-charcoal/60">
                      {a.partes.map((p) => (
                        <span key={p.titulo} className="block leading-snug">
                          {p.titulo} — {p.quem}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 border-t border-black/5 bg-card px-6 py-4">
          <BlocoPix compacto />
          <a
            href={SIMPOSIO.inscricao}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            Fazer a minha inscrição <ExternalLink size={15} />
          </a>
          <div className="flex gap-2">
            <Link
              to="/simposio"
              onClick={fechar}
              className="flex flex-1 items-center justify-center rounded-full border border-primary/30 px-4 py-2.5 text-xs font-semibold text-[color:var(--primary-dark)]"
            >
              Programação completa
            </Link>
            <Link
              to="/eu-vou"
              onClick={fechar}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-primary/30 px-4 py-2.5 text-xs font-semibold text-[color:var(--primary-dark)]"
            >
              <Camera size={14} /> Arte #EuVou
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
