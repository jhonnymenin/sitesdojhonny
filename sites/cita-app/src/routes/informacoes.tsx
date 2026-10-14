import { createFileRoute } from "@tanstack/react-router";
import { MapPin, CalendarDays, BadgeCheck, Car, UtensilsCrossed, Users, Navigation } from "lucide-react";
import { AppPage, SectionTitle } from "@/components/app/AppPage";
import { InstallApp } from "@/components/app/InstallApp";
import { eventData } from "@/data/eventData";

export const Route = createFileRoute("/informacoes")({
  head: () => ({
    meta: [
      { title: "Informações práticas — I Simpósio CITA" },
      { name: "description", content: "Local, data, credenciamento, estacionamento e alimentação do I Simpósio CITA de Doenças Imunomediadas." },
      { property: "og:title", content: "Informações práticas — I Simpósio CITA" },
      { property: "og:description", content: "Tudo o que você precisa saber para o dia do evento." },
    ],
  }),
  component: InfoPage,
});

const icons: Record<string, typeof MapPin> = {
  local: MapPin,
  data: CalendarDays,
  credenciamento: BadgeCheck,
  estacionamento: Car,
  alimentacao: UtensilsCrossed,
  publico: Users,
};

function InfoPage() {
  const mapsUrl = eventData.mapsUrl;

  return (
    <AppPage title="Informações práticas" subtitle="Tudo o que você precisa saber">
      <ul className="space-y-3">
        {eventData.practical.map((card) => {
          const Icon = icons[card.key] ?? MapPin;
          return (
            <li key={card.key} className="app-card flex items-start gap-3 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-navy text-white">
                <Icon size={18} strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal">{card.title}</h3>
                {card.lines.map((line) => (
                  <p key={line} className="text-sm leading-snug text-navy">
                    {line}
                  </p>
                ))}
              </div>
            </li>
          );
        })}
      </ul>

      {mapsUrl ? (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="app-tap mt-5 flex items-center justify-center gap-2 rounded-2xl bg-leaf py-4 text-xs font-bold uppercase tracking-[0.16em] text-white"
        >
          <Navigation size={15} /> Abrir localização
        </a>
      ) : (
        <div className="mt-5 rounded-2xl bg-mist/70 py-4 text-center">
          <span className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-navy/45">
            <Navigation size={15} /> Abrir localização
          </span>
          <p className="mt-1 text-[11px] text-navy/45">Link do mapa em breve</p>
        </div>
      )}

      <section className="mt-8">
        <SectionTitle>App no celular</SectionTitle>
        <InstallApp />
        <p className="mt-2 text-center text-[11px] leading-relaxed text-navy/50">
          Instale o app na tela inicial para acessar a programação com um toque durante o evento.
        </p>
      </section>
    </AppPage>
  );
}
