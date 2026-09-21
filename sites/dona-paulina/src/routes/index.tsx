import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import {
   Hero, Family, WhoWeAre, Programs, SocialProof, MissionVision,
   History, Team, Transparency, OpenSpots, HowToJoin, Donation, 
   WhatsappCTA, Closing, Footer, BlogPreview,
} from "@/components/landing/Sections";
import { FloatingWhats } from "@/components/landing/FloatingWhats";
import { LeadModal } from "@/components/landing/LeadModal";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Fundação Dona Paulina de Souza Queiroz — Inclusão e autonomia" },
      {
        name: "description",
        content:
          "Há mais de 90 anos promovendo autonomia, inclusão e qualidade de vida para adultos com deficiência intelectual e TEA. Vagas abertas em São Paulo.",
      },
      { property: "og:title", content: "Fundação Dona Paulina de Souza Queiroz" },
      {
        property: "og:description",
        content:
          "Programas Viva D+ e Empregabilidade. Acolhimento humanizado, atendimento especializado e mais de 90 anos de história.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
});

function Index() {
  useReveal();
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Family />
      <WhoWeAre />
      <Programs />
       <SocialProof />
       <MissionVision />
       <History />
       <Team />
       <Transparency />
       <OpenSpots />
      <HowToJoin />
      <BlogPreview />
      <Donation />
      <WhatsappCTA />
      <Closing />
      <Footer />
      <FloatingWhats />
      <LeadModal />
    </main>
  );
}
