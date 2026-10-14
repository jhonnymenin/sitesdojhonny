import { createFileRoute } from "@tanstack/react-router";
import { Brain, BarChart3, MessageSquareQuote, Radio, Lock } from "lucide-react";
import { AppPage, SectionTitle } from "@/components/app/AppPage";
import { interactiveData, type InteractiveModule } from "@/data/interactiveData";

export const Route = createFileRoute("/interatividade")({
  head: () => ({
    meta: [
      { title: "Interatividade — I Simpósio CITA" },
      {
        name: "description",
        content: "Quiz, enquetes, perguntas aos palestrantes e votação ao vivo durante o I Simpósio CITA.",
      },
      { property: "og:title", content: "Interatividade — I Simpósio CITA" },
      { property: "og:description", content: "Participe das atividades interativas durante o evento." },
    ],
  }),
  component: InteractivePage,
});

const icons: Record<InteractiveModule["id"], typeof Brain> = {
  quiz: Brain,
  enquetes: BarChart3,
  perguntas: MessageSquareQuote,
  "ao-vivo": Radio,
};

function InteractivePage() {
  return (
    <AppPage title="Interatividade" subtitle="Participe durante as sessões">
      <SectionTitle>Módulos</SectionTitle>
      <ul className="space-y-3">
        {interactiveData.modules.map((m) => {
          const Icon = icons[m.id];
          const active = interactiveData.enabled && m.enabled;
          return (
            <li key={m.id} className="app-card flex items-center gap-3 p-4">
              <span
                className={
                  active
                    ? "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-leaf text-white"
                    : "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mist text-navy/40"
                }
              >
                <Icon size={20} strokeWidth={1.7} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-sm font-semibold text-navy">{m.title}</span>
                <span className="block text-[11px] leading-snug text-navy/55">{m.description}</span>
              </span>
              {!active && <Lock size={15} className="shrink-0 text-navy/25" />}
            </li>
          );
        })}
      </ul>

      {!interactiveData.enabled && (
        <div className="mt-5 rounded-2xl border border-dashed border-navy/15 bg-mist/50 px-6 py-8 text-center">
          <p className="font-display text-sm font-semibold text-navy">{interactiveData.emptyMessage}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-navy/55">
            Os módulos são liberados no dia 17 de outubro, durante as sessões.
          </p>
        </div>
      )}
    </AppPage>
  );
}
