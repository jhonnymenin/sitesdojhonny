import { Eyebrow, Highlight, Reveal, Watermark } from "./ui";

export function Regeneration() {
  return (
    <section className="relative overflow-hidden bg-offwhite py-24 md:py-36">
      <Watermark className="-left-40 bottom-0 w-[480px]" opacity={0.04} />

      <div className="relative mx-auto max-w-[1000px] px-6 md:px-10">
        <Reveal>
          <Eyebrow>Regeneração de sobrancelhas</Eyebrow>
          <h2 className="mt-6 text-[2.1rem] leading-[1.14] text-ink sm:text-[3.1rem]">
            Nem toda sobrancelha precisa de{" "}
            <span className="italic text-gold">micropigmentação.</span>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 space-y-6 text-[1.0625rem] leading-[1.8] text-graphite md:max-w-2xl">
            <p>Em alguns casos, antes de adicionar pigmento, é preciso cuidar dos fios.</p>
            <p>
              O <strong className="font-medium text-ink">Método F.R.E.™ – Engenharia
              Regenerativa Folicular</strong> foi desenvolvido para sobrancelhas com falhas,
              afinamento ou perda de fios.
            </p>
            <p>
              A partir de uma avaliação individual, são definidos estímulos regenerativos e um plano
              de acompanhamento para favorecer a saúde dos folículos e a evolução dos fios
              existentes.
            </p>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-14">
            <Highlight>
              Porque, quando existe possibilidade de recuperar, regenerar também pode ser o melhor
              caminho.
            </Highlight>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
