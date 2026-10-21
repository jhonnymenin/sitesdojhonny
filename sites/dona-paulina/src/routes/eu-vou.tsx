import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Logo } from "@/components/landing/Logo";
import { Footer } from "@/components/landing/Sections";
import { EuVou } from "@/components/EuVou";
import { siteUrl, SITE_URL } from "@/lib/site";

const TITULO = "#EuVou — II Simpósio da Fundação Dona Paulina";
const DESCRICAO =
  "Monte a sua arte do #EuVou com a sua foto e conte que você vai ao II Simpósio Saberes e Práticas no Envelhecimento da Pessoa com Deficiência Intelectual, em 7 de novembro de 2026.";

export const Route = createFileRoute("/eu-vou")({
  component: EuVouPage,
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl("/eu-vou") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/eu-vou") }],
  }),
});

function EuVouPage() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="shrink-0" aria-label="Voltar para a página inicial">
            <Logo />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--primary-dark)]"
          >
            <ArrowLeft size={16} /> Voltar ao site
          </Link>
        </div>
      </header>

      {/*
        A abertura é curta de propósito no celular. Com o cabeçalho, o selo da
        data, o título e um parágrafo de duas linhas, a ferramenta só começava em
        369px — e aí a prévia empurrava o botão de escolher a foto para fora da
        tela. Quem abre a página veria a moldura vazia e nenhum botão, sem motivo
        para imaginar que precisa rolar.
      */}
      <main className="mx-auto max-w-5xl px-6 py-6 md:py-14">
        <p className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold tracking-wider uppercase text-[color:var(--primary-dark)] md:px-4 md:py-1.5 md:text-xs">
          <CalendarDays size={13} /> 7 de novembro de 2026
        </p>
        <h1 className="mt-3 font-display text-2xl font-bold text-[color:var(--primary-dark)] md:mt-5 md:text-4xl">
          #EuVou ao II Simpósio
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/70 md:mt-3 md:text-base">
          Ponha a sua foto na arte do evento e compartilhe.
        </p>

        <div className="mt-5 md:mt-8">
          <EuVou />
        </div>
      </main>

      <Footer />
    </div>
  );
}
