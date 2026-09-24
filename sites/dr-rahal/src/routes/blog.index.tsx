import { createFileRoute, Link } from "@tanstack/react-router";
import { BlogShell } from "@/components/BlogShell";
import { Reveal } from "@/components/Reveal";
import { posts, isPublished } from "@/content/blog";
import { siteUrl } from "@/lib/site";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog | Tireoide, nódulos e ablação — Dr. Antonio Rahal" },
      {
        name: "description",
        content:
          "Artigos do Dr. Antonio Rahal sobre nódulos de tireoide, ablação por radiofrequência e a decisão entre cirurgia e tratamento minimamente invasivo.",
      },
      { property: "og:title", content: "Blog do Dr. Antonio Rahal | Tireoide sem cirurgia" },
      {
        property: "og:description",
        content:
          "Informação confiável sobre nódulos de tireoide, ablação por radiofrequência e escolha consciente de tratamento.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl("/blog") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: siteUrl("/blog") }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <BlogShell>
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="label-eyebrow text-[10px]">Conteúdo</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display font-light text-4xl sm:text-6xl leading-[1.05] max-w-3xl">
              Informação <span className="italic gradient-gold">confiável</span> para a sua saúde.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-xl text-muted-foreground font-light leading-relaxed">
              Leituras criadas pelo Dr. Antonio Rahal para que a decisão sobre a sua tireoide comece
              com o conhecimento certo.
            </p>
          </Reveal>

          <div className="mt-20 grid md:grid-cols-3 gap-px bg-[rgba(201,162,76,0.12)]">
            {posts.map((p, i) => {
              const published = isPublished(p);
              const card = (
                <article className="group bg-background h-full flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden surface-soft">
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 30%, rgba(46,163,184,0.18), transparent 60%), linear-gradient(135deg, #E8F0F4 0%, #F4F7F9 100%)",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display italic text-[140px] gradient-brand leading-none opacity-50 group-hover:opacity-80 transition-opacity duration-700">
                        {p.num}
                      </span>
                    </div>
                    <div className="absolute top-5 left-5">
                      <span className="text-[10px] uppercase tracking-[0.28em] text-gold">{p.tag}</span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h2 className="font-display text-2xl leading-snug text-foreground">{p.title}</h2>
                    <p className="mt-4 text-sm text-muted-foreground font-light leading-relaxed flex-1">
                      {p.excerpt}
                    </p>
                    <div className="mt-8 pt-5 border-t hairline flex items-center justify-between text-xs">
                      <span className="text-gold tracking-wide group-hover:translate-x-1 transition-transform">
                        {published ? "Ler artigo →" : "Em breve"}
                      </span>
                      <span className="text-muted-foreground tracking-wide">{p.readTime} de leitura</span>
                    </div>
                  </div>
                </article>
              );

              return (
                <Reveal key={p.slug} delay={i * 0.08}>
                  {published ? (
                    <Link to="/blog/$slug" params={{ slug: p.slug }} className="block h-full">
                      {card}
                    </Link>
                  ) : (
                    <div className="h-full opacity-70">{card}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </BlogShell>
  );
}
