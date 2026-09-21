import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { articles } from "@/content/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { Footer } from "@/components/landing/Sections";
import { WaveDivider } from "@/components/landing/Wave";
import { Logo } from "@/components/landing/Logo";
import { siteUrl } from "@/lib/site";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () => ({
    meta: [
      { title: "Blog — Fundação Dona Paulina de Souza Queiroz" },
      {
        name: "description",
        content:
          "Conteúdo e informação sobre deficiência intelectual, síndrome de Down, envelhecimento ativo e cuidado especializado.",
      },
      { property: "og:title", content: "Blog — Fundação Dona Paulina de Souza Queiroz" },
      {
        property: "og:description",
        content:
          "Artigos sobre deficiência intelectual, síndrome de Down, envelhecimento ativo e cuidado especializado.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl("/blog") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/blog") }],
  }),
});

function BlogIndex() {
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
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Conteúdo e informação
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.05] text-charcoal">
              Nosso <span className="brush-underline">Blog</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Artigos baseados em evidências sobre deficiência intelectual, síndrome de Down,
              envelhecimento ativo e cuidado especializado — para famílias, cuidadores e profissionais.
            </p>
          </div>
        </div>
        <WaveDivider />
      </section>

      <section className="bg-background px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <BlogCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}