import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, ChevronDown, Users, Radio, Check, ArrowDown } from "lucide-react";
import { AppPage } from "@/components/app/AppPage";
import { agendaData, type AgendaItem, type AgendaKind } from "@/data/agendaData";
import { materialBySession } from "@/data/materialsData";
import { speakerById } from "@/data/speakersData";
import { cn } from "@/lib/utils";
import { useRelogioDoEvento, type Estado, type Relogio } from "@/lib/relogio";

export const Route = createFileRoute("/agenda")({
  head: () => ({
    meta: [
      { title: "Agenda — I Simpósio CITA de Doenças Imunomediadas" },
      { name: "description", content: "Programação completa do simpósio, manhã e tarde, com mesas científicas e simpósios satélites." },
      { property: "og:title", content: "Agenda — I Simpósio CITA de Doenças Imunomediadas" },
      { property: "og:description", content: "Programação completa do dia 17 de outubro de 2026." },
    ],
  }),
  component: AgendaPage,
});

const kindLabel: Record<AgendaKind, string> = {
  credenciamento: "Credenciamento",
  abertura: "Abertura",
  mesa: "Mesa científica",
  satelite: "Simpósio satélite",
  coffee: "Coffee break",
  almoco: "Almoço & networking",
  encerramento: "Encerramento",
};

/** cor do selo por tipo de atividade */
const kindChip: Record<AgendaKind, string> = {
  credenciamento: "bg-teal/12 text-teal",
  abertura: "bg-navy/10 text-navy",
  mesa: "bg-leaf/15 text-leaf",
  satelite: "bg-teal/12 text-teal",
  coffee: "bg-amber-500/12 text-amber-700",
  almoco: "bg-amber-500/12 text-amber-700",
  encerramento: "bg-navy/10 text-navy",
};

function AgendaPage() {
  const manha = agendaData.filter((a) => a.period === "manha");
  const tarde = agendaData.filter((a) => a.period === "tarde");
  const relogio = useRelogioDoEvento();

  return (
    <AppPage title="Agenda" subtitle="17 de outubro de 2026 · Sábado">
      <AoVivo relogio={relogio} />
      <PeriodBlock label="Manhã" tone="leaf" items={manha} relogio={relogio} />
      <div className="h-7" />
      <PeriodBlock label="Tarde" tone="navy" items={tarde} relogio={relogio} />
      <p className="mt-6 text-center text-[11px] text-navy/45">
        * Programação preliminar sujeita a alterações
      </p>
    </AppPage>
  );
}

/**
 * Faixa de situação do dia, no topo da agenda.
 *
 * Só existe no dia do evento. Fora dele a agenda é uma lista de consulta, e um
 * aviso de "acontecendo agora" ali seria ruído — ou pior, mentira.
 */
function AoVivo({ relogio }: { relogio: Relogio }) {
  if (!relogio.pronto || !relogio.noDia) return null;

  if (relogio.terminou) {
    return (
      <div className="app-card mb-5 flex items-center gap-3 p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-navy/8 text-navy/50">
          <Check size={18} strokeWidth={2} />
        </span>
        <p className="text-[13px] leading-snug font-semibold text-navy">
          O simpósio foi encerrado. Obrigado por participar!
        </p>
      </div>
    );
  }

  const atual = relogio.acontecendo;
  const proxima = relogio.aSeguir;

  return (
    <div className="app-card mb-5 overflow-hidden">
      {atual ? (
        <div className="flex items-start gap-3 p-4">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-leaf text-white">
            <Radio size={18} strokeWidth={1.8} />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 animate-pulse rounded-full bg-leaf ring-2 ring-white" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-[0.18em] text-leaf uppercase">
              Acontecendo agora
            </p>
            <p className="mt-1 font-display text-[14px] leading-tight font-bold text-navy uppercase">
              {atual.session}
            </p>
            {atual.title && (
              <p className="mt-0.5 text-[12px] leading-snug text-navy/65">{atual.title}</p>
            )}
          </div>
        </div>
      ) : null}

      {proxima ? (
        <div
          className={cn(
            "flex items-start gap-3 p-4",
            atual && "border-t border-navy/8 bg-mist/40",
          )}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-teal/12 text-teal">
            <ArrowDown size={18} strokeWidth={1.8} />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-[0.18em] text-teal uppercase">
              A seguir · {proxima.time}
            </p>
            <p className="mt-1 font-display text-[14px] leading-tight font-bold text-navy uppercase">
              {proxima.session}
            </p>
            {proxima.title && (
              <p className="mt-0.5 text-[12px] leading-snug text-navy/65">{proxima.title}</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PeriodBlock({
  label,
  tone,
  items,
  relogio,
}: {
  label: string;
  tone: "leaf" | "navy";
  items: AgendaItem[];
  relogio: Relogio;
}) {
  return (
    <section>
      <div
        className={cn(
          "mb-4 inline-flex rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white",
          tone === "leaf" ? "bg-leaf" : "bg-navy",
        )}
      >
        {label}
      </div>
      <ol className="relative space-y-3 pl-6">
        <span
          aria-hidden
          className={cn(
            "absolute left-[7px] top-2 bottom-2 w-px",
            tone === "leaf" ? "bg-leaf/30" : "bg-navy/20",
          )}
        />
        {items.map((item) => (
          <TimelineItem
            key={item.id}
            item={item}
            tone={tone}
            estado={relogio.pronto && relogio.noDia ? relogio.estadoDe(item.id) : null}
          />
        ))}
      </ol>
    </section>
  );
}

function TimelineItem({
  item,
  tone,
  estado,
}: {
  item: AgendaItem;
  tone: "leaf" | "navy";
  /** null fora do dia do evento, ou enquanto a hora ainda não foi lida */
  estado: Estado | null;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const jaRolou = useRef(false);

  /*
   * Leva a tela até o que está acontecendo, uma vez só.
   *
   * A agenda tem 16 blocos e não cabe numa tela: quem abre o app às 15h quer ver
   * a Mesa 4, não o credenciamento das 7h30. `jaRolou` existe porque o relógio
   * atualiza a cada minuto — sem ele, a página puxaria a tela de volta no meio
   * da leitura de quem foi consultar outro horário.
   */
  useEffect(() => {
    if (estado !== "agora" || jaRolou.current) return;
    jaRolou.current = true;
    setOpen(true);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [estado]);
  const material = materialBySession(item.id);
  const speakers = (item.speakerIds ?? []).map(speakerById).filter(Boolean);
  const hasDetails =
    speakers.length > 0 ||
    Boolean(material) ||
    Boolean(item.description) ||
    Boolean(item.moderator) ||
    (item.talks?.length ?? 0) > 0;
  const minor = item.kind === "coffee" || item.kind === "almoco";

  const agora = estado === "agora";
  const passou = estado === "passou";

  return (
    <li ref={ref} className="relative">
      <span
        aria-hidden
        className={cn(
          "absolute -left-6 top-5 h-3.5 w-3.5 rounded-full border-2 border-white transition-colors",
          // O que já passou perde a cor do marcador; o que está acontecendo
          // ganha um halo que pulsa. É o que dá para ler a linha do tempo de
          // relance, sem ler nenhum texto.
          passou ? "bg-navy/20" : minor ? "bg-navy/25" : tone === "leaf" ? "bg-leaf" : "bg-navy",
          agora && "scale-125 bg-leaf ring-4 ring-leaf/25",
        )}
      />
      <div
        className={cn(
          "app-card overflow-hidden transition-opacity",
          minor && "bg-mist/50 shadow-none",
          passou && "opacity-55",
          agora && "ring-2 ring-leaf shadow-[0_10px_30px_-14px_rgba(0,0,0,0.35)]",
        )}
      >
        <button
          type="button"
          onClick={() => hasDetails && setOpen((v) => !v)}
          className="app-tap flex w-full items-start gap-3 p-4 text-left"
        >
          <span
            className={cn(
              "shrink-0 rounded-xl px-2.5 py-1.5 font-display text-[13px] font-bold",
              minor
                ? "bg-white text-navy/60"
                : tone === "leaf"
                  ? "bg-leaf text-white"
                  : "bg-navy text-white",
            )}
          >
            {item.time}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-[15px] font-bold uppercase tracking-[0.06em] text-navy">
              {item.session}
            </span>
            {item.title && (
              <span className="mt-0.5 block text-[13px] font-medium leading-snug text-navy/70">
                {item.title}
              </span>
            )}
            <span className="mt-2 flex flex-wrap items-center gap-1.5">
              <span
                className={cn(
                  "inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em]",
                  kindChip[item.kind],
                )}
              >
                {kindLabel[item.kind]}
              </span>
              {material && (
                <span className="inline-flex rounded-full bg-teal/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-teal">
                  Materiais
                </span>
              )}
              {agora && (
                <span className="inline-flex animate-pulse items-center gap-1 rounded-full bg-leaf px-2 py-0.5 text-[9px] font-bold tracking-[0.14em] text-white uppercase">
                  <Radio size={9} strokeWidth={2.5} /> Agora
                </span>
              )}
              {passou && (
                <span className="inline-flex items-center gap-1 rounded-full bg-navy/8 px-2 py-0.5 text-[9px] font-bold tracking-[0.14em] text-navy/45 uppercase">
                  <Check size={9} strokeWidth={3} /> Encerrado
                </span>
              )}
            </span>
          </span>
          {hasDetails && (
            <ChevronDown
              size={16}
              className={cn("mt-1 shrink-0 text-navy/35 transition-transform", open && "rotate-180")}
            />
          )}
        </button>

        {open && (
          <div className="border-t border-navy/8 bg-mist/40 px-4 py-4">
            {item.description && <p className="text-xs leading-relaxed text-navy/65">{item.description}</p>}
            {item.moderator && (
              <p className="mt-1 text-xs text-navy/65">
                <span className="font-semibold">Moderador:</span> {item.moderator}
              </p>
            )}

            {item.talks && item.talks.length > 0 && (
              <ul className="mt-3 space-y-2.5">
                {item.talks.map((t) => {
                  const sp = t.speakerId ? speakerById(t.speakerId) : undefined;
                  return (
                    <li key={t.time + t.title} className="flex gap-3">
                      <span className="w-11 shrink-0 font-display text-[11px] font-bold text-navy/50">
                        {t.time}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-medium leading-snug text-navy">{t.title}</span>
                        {(sp || t.speakerName) && (
                          <span className="block text-[11px] text-teal">{sp?.name ?? t.speakerName}</span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}

            {speakers.length > 0 && (
              <div className="mt-4">
                <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-navy/50">
                  <Users size={12} /> Palestrantes
                </p>
                <ul className="mt-2 space-y-2">
                  {speakers.map((s) => (
                    <li key={s!.id} className="flex items-center gap-2.5">
                      {s!.photo && (
                        <img src={s!.photo} alt="" className="h-8 w-8 rounded-full object-cover" loading="lazy" />
                      )}
                      <span className="min-w-0">
                        <span className="block truncate text-xs font-semibold text-navy">{s!.name}</span>
                        {s!.specialty && (
                          <span className="block truncate text-[10px] text-navy/50">{s!.specialty}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {material && (
              <a
                href={material.driveUrl}
                target="_blank"
                rel="noreferrer"
                className="app-tap mt-4 flex items-center justify-center gap-2 rounded-xl bg-navy py-3 text-xs font-bold uppercase tracking-[0.14em] text-white"
              >
                Acessar materiais <ExternalLink size={13} />
              </a>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
