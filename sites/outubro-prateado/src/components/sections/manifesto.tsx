import silver from "@/assets/manifesto-silver.jpg";
import { SilverRibbon } from "@/components/silver-ribbon";

export function Manifesto() {
  return (
    <section id="manifesto" className="relative overflow-hidden bg-ink text-paper">
      <img
        src={silver}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklab, #202121 78%, transparent), color-mix(in oklab, #202121 94%, transparent))",
        }}
      />

      <div className="shell relative py-24 md:py-40">
        <p className="eyebrow reveal" data-reveal="" style={{ color: "#B7B8BA" }}>
          05 — Manifesto
        </p>

        <div className="mt-16 space-y-[16svh] md:mt-24">
          <h2 className="display-lg reveal max-w-[26ch]" data-reveal="">
            Cabelos prateados não representam o fim de uma história.
          </h2>
          <p
            className="display-lg reveal max-w-[24ch] md:ml-[30%]"
            data-reveal=""
            style={{ color: "#E9E1D6" }}
          >
            Representam tudo o que foi necessário viver para chegar até aqui.
          </p>
          <p
            className="display-lg reveal max-w-[20ch] italic md:ml-[12%]"
            data-reveal=""
            style={{ color: "#C6B7A1" }}
          >
            E tudo o que ainda pode ser vivido.
          </p>
        </div>

        <div className="mt-[16svh] grid gap-10 md:grid-cols-12">
          <ul className="reveal space-y-2 md:col-span-5" data-reveal="">
            {["Menos preconceito.", "Menos invisibilidade."].map((line) => (
              <li key={line} className="eyebrow text-[0.75rem]" style={{ color: "#B7B8BA" }}>
                {line}
              </li>
            ))}
          </ul>
          <ul className="reveal space-y-2 md:col-span-5" data-reveal="">
            {["Mais saúde.", "Mais autonomia.", "Mais respeito."].map((line) => (
              <li
                key={line}
                className="font-serif text-[clamp(1.35rem,2.4vw,2rem)] leading-[1.3]"
                style={{ color: "#E9E1D6" }}
              >
                {line}
              </li>
            ))}
          </ul>
        </div>

        <p className="display-xl reveal-slow mt-20 md:mt-28" data-reveal="">
          <span className="metal-text">Mais vida</span>
          <br />
          <span className="italic metal-text">nos anos.</span>
        </p>

        <SilverRibbon
          className="pointer-events-none mt-10 h-[140px] w-[112%] -translate-x-[6%] md:h-[220px]"
          intensity={0.95}
        />

        <div
          className="mt-12 border-t pt-8"
          style={{ borderColor: "color-mix(in oklab, #B7B8BA 35%, transparent)" }}
        >
          <p className="eyebrow" style={{ color: "#B7B8BA" }}>
            Outubro Prateado
          </p>
          <p className="mt-3 font-serif text-[clamp(1.5rem,3vw,2.5rem)] italic text-paper">
            Envelhecer é continuar.
          </p>
        </div>
      </div>
    </section>
  );
}
