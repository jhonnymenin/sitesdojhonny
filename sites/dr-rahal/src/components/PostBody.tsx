import type { Block } from "@/content/blog";

export interface PostBodyProps {
  blocks: Block[];
}

/** Renderiza os blocos tipados de um artigo com a tipografia editorial do site. */
export function PostBody({ blocks }: PostBodyProps) {
  return (
    <div className="mt-14 space-y-7">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="font-display font-light text-3xl sm:text-4xl leading-tight text-foreground pt-8"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="font-display text-2xl leading-snug text-brand pt-4">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-[17px] leading-relaxed font-light text-muted-foreground">
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-3 pl-1">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[17px] font-light text-muted-foreground leading-relaxed">
                    <span className="mt-[11px] h-px w-4 shrink-0 bg-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "note":
            return (
              <p
                key={i}
                className="surface-soft border-l-2 border-gold px-6 py-5 text-[17px] font-light leading-relaxed text-foreground"
              >
                {block.text}
              </p>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto border hairline">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="surface-soft">
                      {block.head.map((h) => (
                        <th
                          key={h}
                          className="px-5 py-4 text-[10px] uppercase tracking-[0.22em] text-brand font-normal"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row) => (
                      <tr key={row[0]} className="border-t hairline align-top">
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={`px-5 py-4 font-light leading-relaxed ${
                              ci === 0 ? "text-foreground" : "text-muted-foreground"
                            }`}
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
          default:
            return null;
        }
      })}
    </div>
  );
}
