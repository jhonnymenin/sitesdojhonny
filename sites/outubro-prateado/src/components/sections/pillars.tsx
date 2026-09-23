import { useEffect, useRef, useState } from "react";
import { pillars } from "@/lib/site-config";

export function Pillars() {
  const [active, setActive] = useState(0);
  const panels = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const nodes = panels.current.filter((n): n is HTMLDivElement => Boolean(n));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset["index"]);
            setActive(i);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const current = pillars[active] ?? pillars[0]!;

  return (
    <section id="pilares" className="bg-paper py-24 md:py-32">
      <div className="shell">
        <p className="eyebrow reveal" data-reveal="">
          02 — Cinco territórios
        </p>
        <h2 className="display-lg reveal mt-8 max-w-[20ch] text-ink" data-reveal="">
          Longevidade é muito mais <span className="italic">do que saúde.</span>
        </h2>
      </div>

      <div className="shell mt-16 md:mt-24 md:grid md:grid-cols-12 md:gap-12">
        {/* sticky index — desktop */}
        <div className="hidden md:col-span-5 md:block">
          <div className="sticky top-32">
            <p className="eyebrow">
              {current.index} / 05
            </p>
            <p
              key={current.title}
              className="display-lg mt-6 text-ink transition-opacity duration-700"
            >
              {current.title}
            </p>
            <p className="metal-text-light mt-4 font-serif text-[clamp(2.5rem,5vw,4.5rem)] italic leading-none">
              {current.word}
            </p>
            <div className="mt-12 space-y-3">
              {pillars.map((p, i) => (
                <div key={p.index} className="flex items-center gap-4">
                  <span
                    className="h-px bg-ink transition-all duration-700"
                    style={{ width: i === active ? 56 : 20, opacity: i === active ? 1 : 0.25 }}
                  />
                  <span
                    className="eyebrow transition-colors duration-700"
                    style={{ color: i === active ? "var(--ink)" : undefined }}
                  >
                    {p.index} {p.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* panels */}
        <div className="md:col-span-7">
          {pillars.map((p, i) => (
            <div
              key={p.index}
              data-index={i}
              ref={(el) => {
                panels.current[i] = el;
              }}
              className="flex items-center border-t border-[color-mix(in_oklab,var(--silver)_45%,transparent)] py-12 first:border-t-0 first:pt-0 md:min-h-[15rem] md:py-14"
            >
              <div className="reveal" data-reveal="">
                <div className="flex items-baseline gap-6">
                  <span className="font-serif text-[clamp(2.75rem,6vw,4.5rem)] leading-none text-silver">
                    {p.index}
                  </span>
                  <h3 className="display-md text-ink md:hidden">{p.title}</h3>
                  <h3 className="eyebrow hidden md:block">{p.title}</h3>
                </div>
                <p className="measure mt-6 text-[1.0625rem] leading-[1.75] text-graphite md:mt-8 md:text-[1.1875rem]">
                  {p.description}
                </p>
                <p className="mt-6 font-serif text-[1.75rem] italic text-taupe md:hidden">
                  {p.word}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
