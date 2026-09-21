import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getArticle, articles } from "@/content/blog";
import { ArticleRenderer } from "@/components/blog/ArticleRenderer";
import { Footer } from "@/components/landing/Sections";
import { Logo } from "@/components/landing/Logo";
import { siteUrl } from "@/lib/site";

const WHATS =
  "https://wa.me/5511930352436?text=" +
  encodeURIComponent("Olá! Quero saber mais sobre a Fundação Dona Paulina de Souza Queiroz.");

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    return {
      meta: [
        { title: loaderData.metaTitle },
        { name: "description", content: loaderData.metaDescription },
        { name: "keywords", content: loaderData.keywords },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:image", content: loaderData.cover },
        { property: "og:url", content: siteUrl(`/blog/${params.slug}`) },
      ],
      links: [{ rel: "canonical", href: siteUrl(`/blog/${params.slug}`) }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: loaderData.title,
            description: loaderData.metaDescription,
            articleSection: loaderData.category,
          }),
        },
      ],
    };
  },
  component: ArticlePage,
  notFoundComponent: NotFoundArticle,
  errorComponent: ErrorArticle,
});

function ArticlePage() {
  const article = Route.useLoaderData();
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-background">
      <div className="bg-cream leaf-pattern">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between py-6 md:py-8">
            <Link to="/" aria-label="Página inicial">
              <Logo />
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-5 py-2 text-sm font-semibold text-[color:var(--color-primary-dark)] transition hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Blog
            </Link>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-primary-dark)]">
          {article.category}
        </span>
        <h1 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-[1.1] text-charcoal">
          {article.title}
        </h1>
        <p className="mt-4 text-sm font-medium text-muted-foreground">{article.readingTime}</p>

        <img
          src={article.cover}
          alt={article.title}
          width={1280}
          height={800}
          className="mt-8 aspect-[16/9] w-full rounded-[2rem] object-cover shadow-card"
        />

        <p className="mt-8 text-lg font-medium leading-relaxed text-foreground/90 md:text-xl">
          {article.intro}
        </p>

        <div className="mt-8">
          <ArticleRenderer blocks={article.blocks} />
        </div>

        <div className="mt-12 rounded-[2rem] bg-primary-dark px-8 py-10 text-center">
          <h2 className="font-display text-2xl font-bold text-white">Conheça nosso trabalho</h2>
          <p className="mx-auto mt-3 max-w-md text-white/80">
            Há mais de 90 anos promovendo autonomia, inclusão e qualidade de vida. Fale conosco e saiba
            como podemos ajudar.
          </p>
          <a
            href={WHATS}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground transition hover:scale-[1.02]"
          >
            Falar no WhatsApp <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-muted/40 px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-2xl font-bold text-charcoal">Continue lendo</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="group flex gap-4 rounded-2xl bg-card p-4 shadow-card transition hover:-translate-y-1"
                >
                  <img
                    src={r.cover}
                    alt={r.title}
                    loading="lazy"
                    width={1280}
                    height={800}
                    className="h-24 w-24 shrink-0 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--color-primary-dark)]">
                      {r.category}
                    </span>
                    <h3 className="mt-1 line-clamp-3 font-display text-base font-bold leading-snug text-charcoal">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

function NotFoundArticle() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <h1 className="font-display text-3xl font-bold text-charcoal">Artigo não encontrado</h1>
      <p className="text-muted-foreground">O artigo que você procura não existe ou foi removido.</p>
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar ao blog
      </Link>
    </main>
  );
}

function ErrorArticle({ reset }: { reset: () => void }) {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <h1 className="font-display text-3xl font-bold text-charcoal">Algo deu errado</h1>
      <p className="text-muted-foreground">Não foi possível carregar este artigo.</p>
      <button
        onClick={() => {
          router.invalidate();
          reset();
        }}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
      >
        Tentar novamente
      </button>
    </main>
  );
}