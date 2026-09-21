import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/content/blog";

export function BlogCard({ article }: { article: Article }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: article.slug }}
      className="group flex flex-col overflow-hidden rounded-[2rem] bg-card shadow-card transition hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={article.cover}
          alt={article.title}
          loading="lazy"
          width={1280}
          height={800}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
          {article.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-medium text-muted-foreground">{article.readingTime}</span>
        <h3 className="mt-2 font-display text-xl font-bold leading-snug text-charcoal transition group-hover:text-[color:var(--color-primary-dark)]">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {article.metaDescription}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-primary-dark)]">
          Ler artigo
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}