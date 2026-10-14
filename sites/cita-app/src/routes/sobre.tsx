import { createFileRoute } from "@tanstack/react-router";
import { AppPage, SectionTitle } from "@/components/app/AppPage";
import { CitaClinics } from "@/components/app/CitaClinics";
import { eventData } from "@/data/eventData";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o evento — I Simpósio CITA" },
      { name: "description", content: "O I Simpósio CITA de Doenças Imunomediadas discute a jornada do paciente de forma integrada, prática e multidisciplinar." },
      { property: "og:title", content: "Sobre o evento — I Simpósio CITA" },
      { property: "og:description", content: "Ciência, integração e inovação para transformar o cuidado ao paciente." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <AppPage title="Sobre o evento" subtitle={`${eventData.presentedBy} · ${eventData.organizedBy}`}>
      <div className="app-card space-y-3 p-5">
        {eventData.about.split("\n\n").map((p) => (
          <p key={p} className="text-sm leading-relaxed text-navy/75">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {eventData.highlights.map((h) => (
          <div key={h.label} className="app-card p-4">
            <p className="editorial-num text-3xl text-teal">{h.value}</p>
            <p className="mt-1 text-[11px] leading-snug text-navy/60">{h.label}</p>
          </div>
        ))}
      </div>

      <section className="mt-7">
        <SectionTitle>Clínicas Grupo CITA</SectionTitle>
        <CitaClinics />
      </section>

      <p className="mt-6 text-center text-xs leading-relaxed text-navy/55">
        Ciência, integração e inovação para transformar o cuidado ao paciente.
      </p>
    </AppPage>
  );
}
