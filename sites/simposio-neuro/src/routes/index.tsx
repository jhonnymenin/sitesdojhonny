import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { About } from "@/components/landing/About";
import { Coordinators } from "@/components/landing/Coordinators";
import { Schedule } from "@/components/landing/Schedule";
import { Audience } from "@/components/landing/Audience";
import { Differentials } from "@/components/landing/Differentials";
import { PurchaseCard } from "@/components/landing/PurchaseCard";
import { Venue } from "@/components/landing/Venue";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { WhatsAppFloat } from "@/components/landing/WhatsAppFloat";
import { CursorGlow } from "@/components/landing/CursorGlow";
import { MetaPixel } from "@/components/landing/MetaPixel";
import { useReveal } from "@/hooks/use-reveal";
import { CHECKOUT_URL } from "@/lib/checkout";

const TITLE = "1º Simpósio Técnico e Prático de Neurociência da Memória — 5 de dez 2026";
const DESCRIPTION =
  "1 dia de imersão científica sobre memória, envelhecimento e cognição. São Paulo, Centro de Convenções Millenium. Inscrições abertas — 1º lote R$ 250.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "theme-color", content: "#0A0118" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: "1º Simpósio Técnico e Prático de Neurociência da Memória",
          startDate: "2026-12-05T09:00-03:00",
          endDate: "2026-12-05T18:30-03:00",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: "Centro de Convenções Millenium",
            address: {
              "@type": "PostalAddress",
              streetAddress: "R. Dr. Bacelar, 1043 - Vila Clementino",
              addressLocality: "São Paulo",
              addressRegion: "SP",
              postalCode: "04026-002",
              addressCountry: "BR",
            },
          },
          offers: {
            "@type": "Offer",
            price: "250.00",
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
            url: CHECKOUT_URL,
            validFrom: "2025-01-01",
          },
          organizer: { "@type": "Organization", name: "On Educação" },
          description: DESCRIPTION,
        }),
      },
    ],
  }),
});

function Index() {
  useReveal();
  return (
    <main className="relative">
      <MetaPixel />
      <CursorGlow />
      <Header />
      <Hero />
      <Marquee />
      <About />
      <Coordinators />
      <Schedule />
      <Audience />
      <Differentials />
      <PurchaseCard />
      <Venue />
      <FinalCTA />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
