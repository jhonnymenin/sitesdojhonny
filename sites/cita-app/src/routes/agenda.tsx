import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink, ChevronDown, Users } from "lucide-react";
import { AppPage } from "@/components/app/AppPage";
import { agendaData, type AgendaItem, type AgendaKind } from "@/data/agendaData";
import { materialBySession } from "@/data/materialsData";
import { speakerById } from "@/data/speakersData";
import { cn } from "@/lib/utils";

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

  return (
    <AppPage title="Agenda" subtitle="17 de outubro de 2026 · Sábado">
      <PeriodBlock label="Manhã" tone="leaf" items={manha} />
      <div className="h-7" />
      <PeriodBlock label="Tarde" tone="navy" items={tarde} />
      <p className="mt-6 text-center text-[11px] text-navy/45">
        * Programação preliminar sujeita a alterações
      </p>
    </AppPage>
  );
}

function PeriodBlock({ label, tone, items }: { label: string; tone: "leaf" | "navy"; items: AgendaItem[] }) {
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
          <TimelineItem key={item.id} item={item} tone={tone} />
        ))}
      </ol>
    </section>
  );
}

function TimelineItem({ item, tone }: { item: AgendaItem; tone: "leaf" | "navy" }) {
  const [open, setOpen] = useState(false);
  const material = materialBySession(item.id);
  const speakers = (item.speakerIds ?? []).map(speakerById).filter(Boolean);
  const hasDetails =
    speakers.length > 0 ||
    Boolean(material) ||
    Boolean(item.description) ||
    Boolean(item.moderator) ||
    (item.talks?.length ?? 0) > 0;
  const minor = item.kind === "coffee" || item.kind === "almoco";

  return (
    <li className="relative">
      <span
        aria-hidden
        className={cn(
          "absolute -left-6 top-5 h-3.5 w-3.5 rounded-full border-2 border-white",
          minor ? "bg-navy/25" : tone === "leaf" ? "bg-leaf" : "bg-navy",
        )}
      />
      <div className={cn("app-card overflow-hidden", minor && "bg-mist/50 shadow-none")}>
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
