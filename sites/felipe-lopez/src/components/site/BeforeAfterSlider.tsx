import { useState } from "react";

export interface BeforeAfterCase {
  src: string;
  label: string;
}

/**
 * Carrossel simples "um por vez" para os casos de antes & depois.
 * Sem dependências externas: estado local + transform, com navegação
 * por setas, indicadores e suporte a swipe (pointer events).
 */
export function BeforeAfterSlider({ cases }: { cases: BeforeAfterCase[] }) {
  const [index, setIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);

  if (cases.length === 0) return null;

  const total = cases.length;
  const go = (next: number) => setIndex(((next % total) + total) % total);

  return (
    <div className="mt-14 max-w-[760px] mx-auto">
      <div
        className="relative overflow-hidden border"
        style={{ borderColor: "color-mix(in oklab, var(--color-gold) 30%, transparent)" }}
        onPointerDown={(e) => setStartX(e.clientX)}
        onPointerUp={(e) => {
          if (startX === null) return;
          const dx = e.clientX - startX;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
          setStartX(null);
        }}
        onPointerCancel={() => setStartX(null)}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {cases.map((c, i) => (
            <img
              key={c.label}
              src={c.src}
              alt={`Antes e depois — ${c.label}`}
              width={1080}
              height={1350}
              className="w-full shrink-0 block select-none"
              style={{ aspectRatio: "1080/1350", objectFit: "cover" }}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Caso anterior"
          onClick={() => go(index - 1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full grid place-items-center"
          style={{
            background: "color-mix(in oklab, var(--ivory) 88%, transparent)",
            border: "1px solid color-mix(in oklab, var(--color-gold) 55%, transparent)",
            color: "var(--brown-ink)",
          }}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Próximo caso"
          onClick={() => go(index + 1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full grid place-items-center"
          style={{
            background: "color-mix(in oklab, var(--ivory) 88%, transparent)",
            border: "1px solid color-mix(in oklab, var(--color-gold) 55%, transparent)",
            color: "var(--brown-ink)",
          }}
        >
          ›
        </button>
      </div>

      <p
        className="mt-5 text-center font-sans"
        style={{
          fontSize: 11,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "var(--color-gold)",
        }}
      >
        {cases[index]?.label}
      </p>

      <div className="mt-4 flex items-center justify-center gap-2">
        {cases.map((c, i) => (
          <button
            key={c.label}
            type="button"
            aria-label={`Ver caso ${c.label}`}
            onClick={() => go(i)}
            className="h-px transition-all"
            style={{
              width: i === index ? 32 : 16,
              background: i === index ? "var(--color-gold)" : "var(--brown-soft)",
              opacity: i === index ? 1 : 0.4,
            }}
          />
        ))}
      </div>
    </div>
  );
}
