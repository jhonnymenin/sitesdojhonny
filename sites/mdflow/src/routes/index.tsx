import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/lib/site";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { Journey } from "@/components/landing/Journey";
import { Platform } from "@/components/landing/Platform";
import { DataAsset } from "@/components/landing/DataAsset";
import { Careers } from "@/components/landing/Careers";
import { Market } from "@/components/landing/Market";
import { Ecosystem } from "@/components/landing/Ecosystem";
import { BusinessModel } from "@/components/landing/BusinessModel";
import { Moment } from "@/components/landing/Moment";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";

const title = "MDFlow — Entregamos tempo e aprovação ao médico";
const description =
  "A MDFlow organiza toda a preparação do médico em uma jornada personalizada, orientada por dados e inteligência artificial: plano de estudos, questões, revisões e desempenho.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl("/") },
      /*
       * O og:image do Lovable apontava para um *.r2.dev — e era um screenshot
       * de preview do editor deles, não uma arte. Fora do Lovable ele some, e
       * "summary_large_image" sem imagem vira card social em branco. Este aqui
       * é a dobra do próprio site, renderizada e guardada em public/.
       */
      { property: "og:image", content: siteUrl("/og-image.jpg") },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: title },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: siteUrl("/og-image.jpg") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "MDFlow",
          alternateName: "MDFlow — AI Medical Learning Network",
          url: "https://mdflow.com.br",
          description,
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Journey />
        <Platform />
        <DataAsset />
        <Careers />
        <Market />
        <Ecosystem />
        <BusinessModel />
        <Moment />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
