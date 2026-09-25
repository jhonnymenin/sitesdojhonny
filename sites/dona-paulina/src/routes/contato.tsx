import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Footer } from "@/components/landing/Sections";
import { WaveDivider } from "@/components/landing/Wave";
import { Logo } from "@/components/landing/Logo";
import { siteUrl, SITE_URL } from "@/lib/site";
import {
  EMAIL,
  ENDERECO,
  ENDERECO_LINHA,
  MAPS_URL,
  TELEFONE_FIXO,
  TELEFONE_FIXO_E164,
  WHATSAPP_LEGIVEL,
  whatsappUrl,
} from "@/lib/contato";

/*
 * Esta página existe por dois motivos.
 *
 * O primeiro é o visitante: o site não tinha nenhuma página de contato, e o
 * endereço só aparecia como "São Paulo — SP" no rodapé.
 *
 * O segundo é a migração. O domínio fdpsq.org.br hospedou um WordPress de 2016
 * até 2026, e /contato/ era uma das páginas com mais tempo de indexação. Quem
 * chegava por busca caía em 404. O vercel.json redireciona /contato/ para cá.
 */

const WHATS = whatsappUrl();

export const Route = createFileRoute("/contato")({
  component: ContatoPage,
  head: () => ({
    meta: [
      { title: "Contato — Fundação Dona Paulina de Souza Queiroz" },
      {
        name: "description",
        content: `Fale com a Fundação Dona Paulina de Souza Queiroz: ${ENDERECO.logradouro}, ${ENDERECO.bairro}, São Paulo. Telefone ${TELEFONE_FIXO}, WhatsApp e e-mail.`,
      },
      { property: "og:title", content: "Contato — Fundação Dona Paulina de Souza Queiroz" },
      {
        property: "og:description",
        content: `Endereço, telefone, WhatsApp e e-mail da Fundação Dona Paulina de Souza Queiroz, no ${ENDERECO.bairro}, em São Paulo.`,
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl("/contato") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/contato") }],
    scripts: [
      {
        type: "application/ld+json",
        /*
         * Só o que a Fundação afirma sobre si. Sem horário de funcionamento e
         * sem CNPJ: não achei essas informações em fonte da própria Fundação, e
         * dado errado aqui manda a pessoa para uma porta fechada.
         */
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NGO",
          name: "Fundação Dona Paulina de Souza Queiroz",
          url: SITE_URL,
          telephone: TELEFONE_FIXO_E164,
          email: EMAIL,
          address: {
            "@type": "PostalAddress",
            streetAddress: ENDERECO.logradouro,
            addressLocality: ENDERECO.cidade,
            addressRegion: ENDERECO.uf,
            postalCode: ENDERECO.cep,
            addressCountry: "BR",
          },
        }),
      },
    ],
  }),
});

const CANAIS = [
  {
    icone: Phone,
    titulo: "Telefone",
    valor: TELEFONE_FIXO,
    href: `tel:${TELEFONE_FIXO_E164}`,
    detalhe: "Atendimento em horário comercial.",
  },
  {
    icone: MessageCircle,
    titulo: "WhatsApp",
    valor: WHATSAPP_LEGIVEL,
    href: WHATS,
    externo: true,
    detalhe: "O jeito mais rápido de falar com a gente.",
  },
  {
    icone: Mail,
    titulo: "E-mail",
    valor: EMAIL,
    href: `mailto:${EMAIL}`,
    detalhe: "Para assuntos institucionais e parcerias.",
  },
];

function ContatoPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-cream leaf-pattern">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between py-6 md:py-10">
            <Link to="/" aria-label="Página inicial">
              <Logo />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-5 py-2 text-sm font-semibold text-[color:var(--color-primary-dark)] transition hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Início
            </Link>
          </div>

          <div className="max-w-2xl pb-16 pt-6 md:pb-24">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-primary-dark)]">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Estamos por perto
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.05] text-charcoal">
              Fale <span className="brush-underline">conosco</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Quer conhecer a Fundação, saber das vagas, propor uma parceria ou tirar uma dúvida
              sobre os nossos programas? Escolha o canal que for mais confortável para você — a
              gente responde.
            </p>
          </div>
        </div>
        <WaveDivider />
      </section>

      <section className="bg-background px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            {CANAIS.map((canal) => {
              const Icone = canal.icone;
              return (
                <a
                  key={canal.titulo}
                  href={canal.href}
                  {...(canal.externo
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex flex-col rounded-2xl border border-border bg-white p-7 transition hover:border-primary hover:shadow-lg"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-[color:var(--color-primary-dark)] transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icone className="h-5 w-5" />
                  </span>
                  <span className="mt-5 font-display text-lg font-semibold text-charcoal">
                    {canal.titulo}
                  </span>
                  <span className="mt-1 text-base font-medium text-[color:var(--color-primary-dark)]">
                    {canal.valor}
                  </span>
                  <span className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {canal.detalhe}
                  </span>
                </a>
              );
            })}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
            <div className="flex flex-col rounded-2xl border border-border bg-white p-7">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-[color:var(--color-primary-dark)]">
                <MapPin className="h-5 w-5" />
              </span>
              <span className="mt-5 font-display text-lg font-semibold text-charcoal">Onde estamos</span>
              <address className="mt-2 not-italic text-base leading-relaxed text-muted-foreground">
                {ENDERECO.logradouro}
                <br />
                {ENDERECO.bairro} — {ENDERECO.cidade}/{ENDERECO.uf}
                <br />
                CEP {ENDERECO.cep}
              </address>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-95"
              >
                Como chegar
              </a>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-white">
              {/*
                O mapa é um iframe do Google que só carrega quando entra na tela
                (loading="lazy"). Numa página de contato ele costuma ser o
                elemento mais pesado, e a pessoa quase sempre quer só o telefone.
              */}
              <iframe
                title={`Mapa: ${ENDERECO_LINHA}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  `${ENDERECO.logradouro}, ${ENDERECO.bairro}, ${ENDERECO.cidade} - ${ENDERECO.uf}, ${ENDERECO.cep}`,
                )}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0 lg:h-full lg:min-h-[340px]"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
