import generations from "@/assets/generations.jpg";
import { ages } from "@/lib/site-config";

export function Lifespan() {
  return (
    <section id="toda-a-vida" className="bg-ivory py-24 md:py-36">
      <div className="shell">
        <p className="eyebrow reveal" data-reveal="">
          03 — Toda a vida
        </p>
        <h2 className="display-lg reveal mt-8 max-w-[22ch] text-ink" data-reveal="">
          Longevidade começa antes <span className="italic">da velhice.</span>
        </h2>

        {/* life line */}
        <div className="reveal-slow relative mt-20 md:mt-28" data-reveal="">
          <div className="hairline" />
          <ol className="mt-6 flex items-end justify-between">
            {ages.map((age, i) => (
              <li key={age} className="flex flex-col items-center gap-3">
                <span
                  className="block w-px bg-silver"
                  style={{ height: 14 + i * 6 }}
                  aria-hidden="true"
                />
                <span className="font-serif text-[clamp(1.35rem,3vw,2.5rem)] leading-none text-graphite">
                  {age}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-12 max-w-[30ch] font-serif text-[clamp(1.35rem,2.4vw,2.1rem)] leading-[1.3] text-ink md:ml-[42%]">
            Não existe idade para começar a cuidar da forma como queremos envelhecer.
          </p>
        </div>

        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12 md:items-center">
          <figure className="zoomable image-mask md:col-span-7" data-reveal="">
            <img
              src={generations}
              alt="Três gerações de uma família reunidas em casa, rindo juntas"
              width={1600}
              height={1104}
              loading="lazy"
              className="aspect-16/11 w-full object-cover"
            />
          </figure>
          <p
            className="reveal measure text-[1.0625rem] leading-[1.75] md:col-span-5"
            data-reveal=""
          >
            O movimento fala com quem já chegou aos 60+, mas também com filhos, netos,
            profissionais, empresas e com quem hoje tem 40, 50 ou 60 anos. Porque envelhecer
            bem é uma construção de toda a vida.
          </p>
        </div>
      </div>
    </section>
  );
}
