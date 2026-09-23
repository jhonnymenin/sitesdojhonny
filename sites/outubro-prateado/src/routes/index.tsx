import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/sections/hero";
import { Pause } from "@/components/sections/pause";
import { PhotoMarquee } from "@/components/photo-marquee";
import { Movement } from "@/components/sections/movement";
import { Pillars } from "@/components/sections/pillars";
import { Lifespan } from "@/components/sections/lifespan";
import { Ambassador } from "@/components/sections/ambassador";
import { Cast } from "@/components/sections/cast";
import { Manifesto } from "@/components/sections/manifesto";
import { Participate } from "@/components/sections/participate";
import { Institutional } from "@/components/sections/institutional";
import { SiteFooter } from "@/components/sections/site-footer";
import { useReveal } from "@/hooks/use-reveal";

const title = "Outubro Prateado 2026 | Envelhecer é continuar";
const description =
  "Um movimento pela longevidade com saúde, autonomia, conexão, protagonismo e respeito.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Outubro Prateado",
          slogan: "Envelhecer é continuar.",
          description,
        }),
      },
    ],
  }),
});

function Index() {
  useReveal();

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Pause />
        <Movement />
        <PhotoMarquee />
        <Pillars />
        <Lifespan />
        <Ambassador />
        <Cast />
        <Manifesto />
        <Participate />
        <Institutional />
      </main>
      <SiteFooter />
    </>
  );
}
