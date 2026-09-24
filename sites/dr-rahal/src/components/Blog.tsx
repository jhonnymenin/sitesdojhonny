import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { WHATSAPP_URL } from "@/lib/site";
import { posts, isPublished } from "@/content/blog";

export function Blog() {
  return (
    <section id="blog" className="py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 max-w-5xl">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold" />
                <span className="label-eyebrow text-[10px]">Conteúdo</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display font-light text-4xl sm:text-5xl leading-[1.05]">
                Informação <span className="italic gradient-gold">confiável</span> <br />
                para a sua saúde.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="text-muted-foreground font-light max-w-sm">
              A decisão certa começa com o conhecimento certo — leituras criadas pelo Dr. Rahal.
            </p>
          </Reveal>
        </div>

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
                  <h3 className="font-display text-2xl leading-snug text-foreground">{p.title}</h3>
                  <p className="mt-4 text-sm text-muted-foreground font-light leading-relaxed flex-1">{p.excerpt}</p>
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
                  <div className="h-full">{card}</div>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
            <Link to="/blog" className="btn-outline-brand">
              Ver todos os artigos
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-gold text-sm tracking-wide border-b border-gold/40 pb-1 hover:border-gold">
              Agendar avaliação →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
