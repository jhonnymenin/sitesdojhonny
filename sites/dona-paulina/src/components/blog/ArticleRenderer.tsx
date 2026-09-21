import type { Block } from "@/content/blog";

const Bullet = () => (
  <svg viewBox="0 0 20 20" className="mt-1 h-5 w-5 shrink-0" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="10" fill="var(--color-primary)" />
    <path d="M6 10.5l2.5 2.5L14 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function ArticleRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} className="pt-4 font-display text-2xl font-bold text-charcoal md:text-3xl">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="font-display text-xl font-semibold text-[color:var(--color-primary-dark)]">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-base leading-relaxed text-foreground/80 md:text-lg">
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-base leading-relaxed text-foreground/80">
                    <Bullet />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="rounded-r-2xl border-l-4 border-primary bg-primary-soft/60 px-6 py-5"
              >
                <p className="font-display text-lg italic leading-relaxed text-[color:var(--color-primary-dark)]">
                  “{block.text}”
                </p>
                {block.cite && (
                  <footer className="mt-3 text-sm font-semibold text-muted-foreground">— {block.cite}</footer>
                )}
              </blockquote>
            );
          case "table":
            return (
              <div key={i} className="overflow-hidden rounded-2xl border border-border">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-primary-dark text-primary-foreground">
                      {block.head.map((h, j) => (
                        <th key={j} className="px-4 py-3 font-display font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className={j % 2 ? "bg-muted/50" : "bg-card"}>
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className={`px-4 py-3 align-top text-foreground/80 ${k === 0 ? "font-semibold text-charcoal" : ""}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "source":
            return (
              <p
                key={i}
                className="rounded-2xl bg-muted px-6 py-5 text-sm leading-relaxed text-muted-foreground"
              >
                {block.text}
              </p>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}