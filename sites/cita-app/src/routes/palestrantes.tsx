import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User } from "lucide-react";
import { AppPage } from "@/components/app/AppPage";
import { speakersData, type Speaker } from "@/data/speakersData";
import { sessionsBySpeaker } from "@/data/agendaData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/palestrantes")({
  head: () => ({
    meta: [
      { title: "Palestrantes — I Simpósio CITA de Doenças Imunomediadas" },
      { name: "description", content: "Especialistas convidados do I Simpósio CITA de Doenças Imunomediadas." },
      { property: "og:title", content: "Palestrantes — I Simpósio CITA" },
      { property: "og:description", content: "Conheça os especialistas do simpósio." },
    ],
  }),
  component: SpeakersPage,
});

function SpeakersPage() {
  const [selected, setSelected] = useState<Speaker | null>(null);

  return (
    <AppPage title="Palestrantes" subtitle={`${speakersData.length} especialistas convidados`}>
      <div className="grid grid-cols-2 gap-3">
        {speakersData.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSelected(s)}
            className="app-card app-tap overflow-hidden text-left"
          >
            {s.photo ? (
              <img src={s.photo} alt={s.name} loading="lazy" className="aspect-square w-full object-cover" />
            ) : (
              <span className="flex aspect-square w-full items-center justify-center bg-mist/70 text-navy/25">
                <User size={40} strokeWidth={1.4} />
              </span>
            )}
            <span className="block p-3">
              {s.specialty && (
                <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-teal">
                  {s.specialty}
                </span>
              )}
              <span className="mt-1 block font-display text-[13px] font-semibold leading-snug text-navy">
                {s.name}
              </span>
            </span>
          </button>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-[420px] rounded-3xl">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  {selected.photo ? (
                    <img src={selected.photo} alt="" className="h-16 w-16 rounded-2xl object-cover" />
                  ) : (
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-mist text-navy/30">
                      <User size={26} strokeWidth={1.4} />
                    </span>
                  )}
                  <div className="min-w-0 text-left">
                    <DialogTitle className="font-display text-base text-navy">{selected.name}</DialogTitle>
                    {selected.specialty && (
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal">
                        {selected.specialty}
                      </p>
                    )}
                    {selected.institution && <p className="text-xs text-navy/55">{selected.institution}</p>}
                  </div>
                </div>
              </DialogHeader>

              {selected.bio && <p className="text-sm leading-relaxed text-navy/70">{selected.bio}</p>}

              {sessionsBySpeaker(selected.id).length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-navy/50">
                    Sessões relacionadas
                  </p>
                  <ul className="mt-2 space-y-2">
                    {sessionsBySpeaker(selected.id).map((a) => (
                      <li key={a.id} className="rounded-xl bg-mist/60 px-3 py-2">
                        <span className="text-xs font-bold text-navy">{a.time}</span>
                        <span className="ml-2 text-xs font-semibold text-navy">{a.session}</span>
                        {a.title && <span className="block text-[11px] text-navy/60">{a.title}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </AppPage>
  );
}
