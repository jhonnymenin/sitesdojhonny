import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/landing/About";
import { Closing } from "@/components/landing/Closing";
import { Depigmentation } from "@/components/landing/Depigmentation";
import { Difference } from "@/components/landing/Difference";
import { Faq, faqItems } from "@/components/landing/Faq";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HomeCare } from "@/components/landing/HomeCare";
import { Identification } from "@/components/landing/Identification";
import { MainCta } from "@/components/landing/MainCta";
import { Micropigmentation } from "@/components/landing/Micropigmentation";
import { MobileCta } from "@/components/landing/MobileCta";
import { Positioning } from "@/components/landing/Positioning";
import { Regeneration } from "@/components/landing/Regeneration";
import { Results } from "@/components/landing/Results";
import { Skincare } from "@/components/landing/Skincare";
import { Steps } from "@/components/landing/Steps";

const TITLE = "Ateliê Bruna Espada | Beleza natural, micropigmentação e estética avançada";
const DESCRIPTION =
  "Atendimento personalizado em micropigmentação, regeneração de sobrancelhas, despigmentação e estética facial avançada em São Caetano do Sul.";
// og:url e canonical precisam ser absolutos — crawlers não resolvem caminhos relativos.
const SITE_URL = "https://bruna.on-dig.online";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BeautySalon",
          name: "Ateliê Bruna Espada",
          description: DESCRIPTION,
          address: {
            "@type": "PostalAddress",
            addressLocality: "São Caetano do Sul",
            addressRegion: "SP",
            addressCountry: "BR",
          },
          telephone: "+5511942457002",
          areaServed: "São Caetano do Sul – SP",
          sameAs: ["https://instagram.com/brunaespada"],
          founder: { "@type": "Person", name: "Bruna Espada" },
          makesOffer: [
            "Micropigmentação",
            "Regeneração de sobrancelhas",
            "Despigmentação a laser",
            "Estética facial avançada",
          ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-offwhite">
      <Header />
      <main>
        <Hero />
        <Positioning />
        <About />
        <Micropigmentation />
        <Regeneration />
        <Depigmentation />
        <Skincare />
        <Identification />
        <Difference />
        <Steps />
        <Results />
        <HomeCare />
        <MainCta />
        <Faq />
        <Closing />
      </main>
      <div aria-hidden="true" className="h-20 bg-ink sm:hidden" />
      <MobileCta />
    </div>
  );
}
