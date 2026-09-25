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
import { EMAIL, ENDERECO, TELEFONE_FIXO_E164 } from "@/lib/contato";

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
    scripts: [
      {
        /*
         * Dados estruturados. Só afirma o que o próprio site afirma: nome,
         * propósito, público atendido, cidade e WhatsApp. Não há endereço, CNPJ
         * nem redes sociais no conteúdo, então esses campos ficam de fora em vez
         * de serem inventados.
         */
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NGO",
          name: "Fundação Dona Paulina de Souza Queiroz",
          alternateName: "Fundação Dona Paulina",
          description:
            "Há mais de 90 anos promovendo autonomia, inclusão e qualidade de vida para adultos com deficiência intelectual e TEA.",
          url: SITE_URL,
          logo: `${SITE_URL}/favicon-192.png`,
          image: `${SITE_URL}/og-image.jpg`,
          telephone: TELEFONE_FIXO_E164,
          email: EMAIL,
          // O endereço veio da página /contato/ do WordPress anterior da própria
          // Fundação, recuperada do Internet Archive. Antes o JSON-LD não tinha
          // endereço nenhum, e sem ele o Google não trata a página como um lugar.
          address: {
            "@type": "PostalAddress",
            streetAddress: ENDERECO.logradouro,
            addressLocality: ENDERECO.cidade,
            addressRegion: ENDERECO.uf,
            postalCode: ENDERECO.cep,
            addressCountry: "BR",
          },
          areaServed: { "@type": "City", name: "São Paulo" },
          knowsAbout: [
            "Deficiência intelectual",
            "Transtorno do Espectro Autista",
            "Inclusão de adultos com deficiência",
            "Empregabilidade assistida",
          ],
        }),
      },
    ],
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
