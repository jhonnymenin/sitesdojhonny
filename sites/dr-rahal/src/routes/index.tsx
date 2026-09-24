import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Differentials } from "@/components/Differentials";
import { SocialProof } from "@/components/SocialProof";
import { Press } from "@/components/Press";
import { Blog } from "@/components/Blog";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { INSTAGRAM_URL, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Antonio Rahal | Ablação de Tireoide sem Cirurgia | São Paulo" },
      {
        name: "description",
        content:
          "Pioneiro no Brasil em ablação de tireoide por radiofrequência. Tratamento de nódulos sem cirurgia, sem cicatriz e sem internação. Agende sua consulta em São Paulo.",
      },
      { property: "og:title", content: "Dr. Antonio Rahal | Tratamento de Tireoide sem Cirurgia" },
      {
        property: "og:description",
        content:
          "Ablação de tireoide por radiofrequência com o pioneiro no Brasil. Sem cortes, sem cicatriz, sem internação.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        /*
         * Dados estruturados. Só afirma o que o próprio site afirma — não há
         * endereço nem data de publicação no conteúdo, então esses campos ficam
         * de fora em vez de serem inventados.
         */
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Physician",
          name: "Dr. Antonio Rahal",
          description:
            "Referência em ablação, punção e ultrassom de tireoide. Pioneiro em ablação de tireoide, paratireoide e linfonodos cervicais.",
          url: SITE_URL,
          image: `${SITE_URL}/og-image.png`,
          telephone: "+5511998109000",
          areaServed: { "@type": "City", name: "São Paulo" },
          sameAs: [INSTAGRAM_URL],
          knowsAbout: [
            "Ablação de tireoide",
            "Ablação de paratireoide",
            "Ablação de linfonodos cervicais",
            "Nódulos de tireoide",
            "Ultrassonografia de tireoide",
          ],
          availableService: [
            "Ablação por radiofrequência (R.F.A.)",
            "Ablação por micro-ondas (M.W.A.)",
            "Alcoolização (E.A.)",
            "Crioablação / Eletroporação irreversível (IRE)",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Problem />
        <Solution />
        <About />
        <Services />
        <Portfolio />
        <Differentials />
        <SocialProof />
        <Press />
        <Blog />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
