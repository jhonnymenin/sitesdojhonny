import { Eyebrow, Highlight, Reveal, Watermark } from "./ui";

export function HomeCare() {
  return (
    <section className="relative overflow-hidden bg-offwhite py-24 md:py-36">
      <Watermark className="-right-28 top-10 w-[380px]" opacity={0.04} />

      <div className="relative mx-auto grid max-w-[1100px] gap-12 px-6 md:px-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal>
          <Eyebrow>Home Care</Eyebrow>
          <h2 className="mt-6 text-[2rem] leading-[1.16] text-ink sm:text-[2.7rem]">
            O cuidado não termina depois do{" "}
            <span className="italic text-gold">procedimento.</span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="space-y-6 text-[1.0625rem] leading-[1.8] text-graphite lg:pt-4">
            <p>Resultados consistentes também dependem da rotina fora do Ateliê.</p>
            <p>
              Por isso, quando indicado, o tratamento pode ser complementado com cuidados Home Care
              personalizados para ajudar na manutenção da pele, hidratação, regeneração,
              luminosidade e proteção.
            </p>
          </div>
          <div className="mt-10">
            <Highlight>Cuidado profissional e rotina caminham juntos.</Highlight>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
