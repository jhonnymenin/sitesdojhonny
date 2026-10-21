import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Camera, Clock, ExternalLink, MapPin } from "lucide-react";
import { Logo } from "@/components/landing/Logo";
import { Footer } from "@/components/landing/Sections";
import { PROGRAMA, SIMPOSIO } from "@/lib/simposio";
import { siteUrl } from "@/lib/site";

const TITULO = `${SIMPOSIO.titulo} — ${SIMPOSIO.subtitulo}`;
const DESCRICAO = `${SIMPOSIO.dataLegivel}, ${SIMPOSIO.horario}, na Fundação Dona Paulina de Souza Queiroz. Programação completa e inscrições.`;

export const Route = createFileRoute("/simposio")({
  component: SimposioPage,
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl("/simposio") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/simposio") }],
  }),
});

function SimposioPage() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" aria-label="Voltar para a página inicial">
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

      <main className="mx-auto max-w-4xl px-6 py-10 md:py-14">
        <h1 className="font-display text-3xl leading-tight font-bold text-[color:var(--primary-dark)] md:text-4xl">
          {SIMPOSIO.titulo}
        </h1>
        <p className="mt-2 max-w-2xl text-lg leading-snug text-charcoal/75">{SIMPOSIO.subtitulo}</p>

        <ul className="mt-6 grid gap-2 text-sm text-charcoal/80 sm:grid-cols-3">
          <li className="flex items-center gap-2">
            <CalendarDays size={16} className="shrink-0 text-[color:var(--primary-dark)]" />
            {SIMPOSIO.dataLegivel}
          </li>
          <li className="flex items-center gap-2">
            <Clock size={16} className="shrink-0 text-[color:var(--primary-dark)]" />
            {SIMPOSIO.horario}
          </li>
          <li className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0 text-[color:var(--primary-dark)]" />
            {SIMPOSIO.local}
          </li>
        </ul>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={SIMPOSIO.inscricao}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            Fazer a minha inscrição <ExternalLink size={15} />
          </a>
          <Link
            to="/eu-vou"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-3 text-sm font-semibold text-[color:var(--primary-dark)]"
          >
            <Camera size={16} /> Montar a arte #EuVou
          </Link>
        </div>

        <h2 className="mt-12 font-display text-2xl font-bold text-[color:var(--primary-dark)]">
          Programação
        </h2>

        <ol className="mt-6 space-y-5">
          {PROGRAMA.map((a) => (
            <li
              key={a.hora}
              className="grid gap-x-5 gap-y-1 border-b border-black/5 pb-5 sm:grid-cols-[8rem_minmax(0,1fr)]"
            >
              <p className="text-sm font-bold text-[color:var(--primary-dark)] tabular-nums">
                {a.hora}
              </p>
              <div className="min-w-0">
                <p className="font-semibold text-charcoal">{a.titulo}</p>
                {a.quem && (
                  <p className="mt-0.5 text-sm font-medium text-[color:var(--primary-dark)]">
                    {a.quem}
                  </p>
                )}
                {a.curriculo && (
                  <p className="mt-1 text-sm leading-relaxed text-charcoal/65">{a.curriculo}</p>
                )}
                {a.partes && (
                  <ul className="mt-3 space-y-3">
                    {a.partes.map((p) => (
                      <li key={p.titulo} className="border-l-2 border-primary/30 pl-4">
                        <p className="font-semibold text-charcoal">{p.titulo}</p>
                        <p className="mt-0.5 text-sm font-medium text-[color:var(--primary-dark)]">
                          {p.quem}
                        </p>
                        {p.curriculo && (
                          <p className="mt-1 text-sm leading-relaxed text-charcoal/65">
                            {p.curriculo}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <a
            href={SIMPOSIO.inscricao}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            Fazer a minha inscrição <ExternalLink size={15} />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
