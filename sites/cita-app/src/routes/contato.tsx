import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle } from "lucide-react";
import { AppPage } from "@/components/app/AppPage";
import { eventData } from "@/data/eventData";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Fale conosco — I Simpósio CITA" },
      { name: "description", content: "Canais de atendimento da organização do I Simpósio CITA de Doenças Imunomediadas." },
      { property: "og:title", content: "Fale conosco — I Simpósio CITA" },
      { property: "og:description", content: "Dúvidas ou atendimento durante o evento." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <AppPage title="Fale conosco" subtitle="Dúvidas ou atendimento">
      <div className="space-y-3">
        <a
          href={eventData.contact.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="app-card app-tap flex items-center gap-3 p-4"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-leaf text-white">
            <MessageCircle size={19} strokeWidth={1.8} />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-sm font-semibold text-navy">WhatsApp</span>
            <span className="block truncate text-xs text-navy/55">{eventData.contact.whatsappLabel}</span>
          </span>
        </a>

        <a
          href={`mailto:${eventData.contact.email}?subject=${encodeURIComponent(eventData.name)}`}
          className="app-card app-tap flex items-center gap-3 p-4"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-white">
            <Mail size={19} strokeWidth={1.8} />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-sm font-semibold text-navy">E-mail</span>
            <span className="block truncate text-xs text-navy/55">{eventData.contact.email}</span>
          </span>
        </a>
      </div>

      <p className="mt-6 text-center text-[11px] leading-relaxed text-navy/45">
        Organização {eventData.organizedBy} · Apresentado por {eventData.presentedBy}
      </p>
    </AppPage>
  );
}
