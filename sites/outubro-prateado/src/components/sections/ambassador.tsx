import { SilverRibbon } from "@/components/silver-ribbon";
import wilson from "@/assets/wilson-jacob-filho.png";

const credentials = [
  { label: "Geriatria", value: "Professor titular" },
  { label: "Atuação", value: "Medicina da longevidade" },
  { label: "Missão 2026", value: "Embaixador científico" },
];

export function Ambassador() {
  return (
    <section id="embaixador" className="relative overflow-hidden bg-graphite py-24 text-paper md:py-32">
      <SilverRibbon
        className="pointer-events-none absolute right-[-15%] top-[10%] h-[130px] w-[90%]"
        intensity={0.3}
      />
      <div className="shell relative">
        <div className="grid items-end gap-4 md:grid-cols-12">
          <p
            className="eyebrow reveal md:col-span-4"
            data-reveal=""
            style={{ color: "color-mix(in oklab, #B7B8BA 90%, transparent)" }}
          >
            06 — Embaixador Científico
          </p>
          <h2 className="display-lg reveal text-paper md:col-span-8" data-reveal="">
            Prof. Dr. Wilson <span className="italic">Jacob Filho</span>
          </h2>
        </div>

        <div
          className="mt-10 h-px w-full md:mt-14"
          style={{ background: "color-mix(in oklab, #B7B8BA 35%, transparent)" }}
        />

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-10">
          <figure
            className="reveal zoomable relative aspect-4/5 w-full md:col-span-5"
            data-reveal=""
            style={{ background: "color-mix(in oklab, #B7B8BA 12%, transparent)" }}
          >
            <img
              src={wilson}
              alt="Prof. Dr. Wilson Jacob Filho, de jaleco branco, sorrindo"
              loading="lazy"
              className="h-full w-full object-cover object-top"
            />
          </figure>

          <div className="md:col-span-6 md:col-start-7">
            <p
              className="reveal font-serif text-[clamp(1.4rem,2.3vw,2.1rem)] leading-[1.3] italic"
              data-reveal=""
              style={{ color: "color-mix(in oklab, #E9E1D6 92%, transparent)" }}
            >
              “Envelhecer bem não é sorte. É consequência de decisões tomadas ao longo de
              toda a vida.”
            </p>

            <p
              className="reveal mt-8 max-w-[46ch] text-[1.0625rem] leading-[1.8]"
              data-reveal=""
              style={{ color: "color-mix(in oklab, #E9E1D6 74%, transparent)" }}
            >
              Referência nacional em geriatria e gerontologia, dedica sua trajetória a mostrar
              que saúde, autonomia e propósito podem caminhar juntos por muito mais tempo do
              que se imagina. No Outubro Prateado 2026, conduz o olhar científico do movimento.
            </p>

            <dl className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
              {credentials.map((item) => (
                <div
                  key={item.label}
                  className="reveal border-t pt-4"
                  data-reveal=""
                  style={{ borderColor: "color-mix(in oklab, #B7B8BA 40%, transparent)" }}
                >
                  <dt className="eyebrow" style={{ color: "color-mix(in oklab, #B7B8BA 85%, transparent)" }}>
                    {item.label}
                  </dt>
                  <dd className="mt-2 font-serif text-[1.25rem] text-silver">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
