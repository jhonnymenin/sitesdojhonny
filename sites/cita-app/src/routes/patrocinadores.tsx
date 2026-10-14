import { createFileRoute } from "@tanstack/react-router";
import { AppPage } from "@/components/app/AppPage";
import { SponsorLogo } from "@/components/app/SponsorLogo";
import { sponsorsData } from "@/data/sponsorsData";

export const Route = createFileRoute("/patrocinadores")({
  head: () => ({
    meta: [
      { title: "Patrocinadores — I Simpósio CITA" },
      { name: "description", content: "Patrocinadores do I Simpósio CITA de Doenças Imunomediadas." },
      { property: "og:title", content: "Patrocinadores — I Simpósio CITA" },
      { property: "og:description", content: "Conheça as marcas que patrocinam o simpósio." },
    ],
  }),
  component: SponsorsPage,
});

function SponsorsPage() {
  return (
    <AppPage title="Patrocinadores" subtitle="Quem patrocina o simpósio">
      <ul className="grid grid-cols-2 gap-3">
        {sponsorsData.map((s) => (
          <li key={s.id}>
            <SponsorLogo sponsor={s} />
            <p className="mt-2 px-1 text-center text-[11px] leading-snug text-navy/60">{s.name}</p>
          </li>
        ))}
      </ul>

      <p className="mt-7 text-center text-[11px] leading-relaxed text-navy/45">
        Marcas assinaladas como “a confirmar” ainda estão em processo de confirmação.
      </p>
    </AppPage>
  );
}
