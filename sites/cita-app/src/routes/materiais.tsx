import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, FileText } from "lucide-react";
import { AppPage } from "@/components/app/AppPage";
import { materialsData } from "@/data/materialsData";

export const Route = createFileRoute("/materiais")({
  head: () => ({
    meta: [
      { title: "Materiais científicos — I Simpósio CITA" },
      { name: "description", content: "Apresentações e conteúdos científicos das sessões do I Simpósio CITA de Doenças Imunomediadas." },
      { property: "og:title", content: "Materiais científicos — I Simpósio CITA" },
      { property: "og:description", content: "Acesse os conteúdos de cada sessão científica." },
    ],
  }),
  component: MaterialsPage,
});

function MaterialsPage() {
  return (
    <AppPage title="Materiais" subtitle="Conteúdos por sessão científica">
      <ul className="space-y-3">
        {materialsData.map((m) => {
          const available = m.driveUrl.trim() !== "";
          return (
            <li key={m.sessionId} className="app-card p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-teal/10 text-teal">
                  <FileText size={18} strokeWidth={1.8} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-sm font-semibold text-navy">{m.title}</h3>
                  {m.subtitle && <p className="text-xs leading-snug text-navy/55">{m.subtitle}</p>}
                </div>
              </div>

              {available ? (
                <a
                  href={m.driveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="app-tap mt-3 flex items-center justify-center gap-2 rounded-xl bg-navy py-3 text-xs font-bold uppercase tracking-[0.14em] text-white"
                >
                  Acessar materiais <ExternalLink size={13} />
                </a>
              ) : (
                <span className="mt-3 flex items-center justify-center rounded-xl bg-mist/70 py-3 text-xs font-bold uppercase tracking-[0.14em] text-navy/45">
                  Disponível em breve
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </AppPage>
  );
}
