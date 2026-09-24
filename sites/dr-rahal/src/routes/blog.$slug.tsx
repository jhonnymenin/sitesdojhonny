import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BlogShell } from "@/components/BlogShell";
import { Reveal } from "@/components/Reveal";
import { PostBody } from "@/components/PostBody";
import { getPost, posts, isPublished } from "@/content/blog";
import { SITE_URL, WHATSAPP_URL, siteUrl } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData, params }) => {
    const title = loaderData ? `${loaderData.title} | Dr. Antonio Rahal` : "Artigo | Dr. Antonio Rahal";
    const description = loaderData?.lead.slice(0, 158) ?? "Conteúdo sobre tireoide e ablação.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: siteUrl(`/blog/${params.slug}`) },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: siteUrl(`/blog/${params.slug}`) }],
      scripts: [
        {
          // Sem datePublished: os posts não têm data no conteúdo, e inventar uma
          // seria afirmar algo falso para o buscador.
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: loaderData?.title ?? "Artigo",
            description,
            mainEntityOfPage: siteUrl(`/blog/${params.slug}`),
            author: { "@type": "Person", name: "Dr. Antonio Rahal" },
            publisher: {
              "@type": "Organization",
              name: "Dr. Antonio Rahal",
              logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon-192.png` },
            },
          }),
        },
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();
  const published = isPublished(post);
  const others = posts.filter((p) => p.slug !== post.slug);

  return (
    <BlogShell>
      <article className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="label-eyebrow text-[10px]">{post.tag}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display font-light text-4xl sm:text-5xl leading-[1.08]">
              {post.title}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-7 text-lg font-light leading-relaxed text-muted-foreground">{post.lead}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 pt-5 border-t hairline flex items-center justify-between text-xs tracking-wide text-muted-foreground">
              <span>Por Dr. Antonio Rahal</span>
              <span>{post.readTime} de leitura</span>
            </div>
          </Reveal>

          {published ? (
            <PostBody blocks={post.blocks} />
          ) : (
            <div className="mt-14 surface-soft border-l-2 border-gold px-6 py-6">
              <p className="text-[17px] font-light leading-relaxed text-foreground">
                Este artigo está em preparação e será publicado em breve. Enquanto isso, fale
                diretamente com a equipe para tirar suas dúvidas.
              </p>
            </div>
          )}

          {published && (
            <>
              <p className="mt-14 text-sm italic font-light text-muted-foreground">
                Este conteúdo possui finalidade informativa e não substitui uma consulta médica.
              </p>
              {post.references && (
                <p className="mt-4 text-xs font-light leading-relaxed text-muted-foreground/80">
                  <span className="text-foreground">Referências: </span>
                  {post.references}
                </p>
              )}
            </>
          )}

          <div className="mt-14 border-t hairline pt-10 flex flex-wrap items-center gap-8">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-outline-brand">
              Agendar avaliação
            </a>
            <Link to="/blog" className="text-gold text-sm tracking-wide border-b border-gold/40 pb-1 hover:border-gold">
              ← Todos os artigos
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-24">
          <div className="label-eyebrow text-[10px]">Continue lendo</div>
          <div className="mt-8 grid sm:grid-cols-2 gap-px bg-[rgba(201,162,76,0.12)]">
            {others.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group bg-background p-8 block"
              >
                <span className="text-[10px] uppercase tracking-[0.28em] text-gold">{p.tag}</span>
                <h3 className="mt-4 font-display text-2xl leading-snug text-foreground">{p.title}</h3>
                <span className="mt-6 inline-block text-xs text-gold tracking-wide group-hover:translate-x-1 transition-transform">
                  {isPublished(p) ? "Ler artigo →" : "Em breve"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </BlogShell>
  );
}
