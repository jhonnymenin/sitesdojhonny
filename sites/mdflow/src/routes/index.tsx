import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Demonstracao } from "@/components/landing/Demonstracao";
import { ComoFunciona } from "@/components/landing/ComoFunciona";
import { Funcionalidades } from "@/components/landing/Funcionalidades";
import { CtaCadastro } from "@/components/landing/CtaCadastro";
import { Diferenciais } from "@/components/landing/Diferenciais";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";
import { siteUrl } from "@/lib/site";

const title = "MDFlow — seu copiloto de estudos para o ENAMED";
const description =
  "A MDFlow entende seu nível de conhecimento, cria um plano personalizado e acompanha sua evolução até o ENAMED. Acesso gratuito na fase de testes.";

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
          url: siteUrl("/"),
          description,
        }),
      },
    ],
  }),
  component: Index,
});

/*
 * A ordem segue o brief: dobra, demonstração da plataforma, como funciona,
 * funcionalidades, chamada para cadastro, diferenciais e dúvidas.
 *
 * A chamada para cadastro vem ANTES dos diferenciais de propósito: quem já se
 * convenceu nas funcionalidades não precisa rolar mais para encontrar o botão,
 * e quem ainda não se convenceu continua lendo e encontra o CTA do topo e do
 * rodapé.
 */
function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Demonstracao />
        <ComoFunciona />
        <Funcionalidades />
        <CtaCadastro />
        <Diferenciais />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
