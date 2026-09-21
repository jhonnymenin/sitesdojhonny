import { Cta, Eyebrow, Reveal } from "./ui";

export function MainCta() {
  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-[900px] px-6 text-center md:px-10">
        <Reveal>
          <Eyebrow>Agende sua avaliação</Eyebrow>
          <h2 className="mt-6 text-[2.1rem] leading-[1.12] text-ink sm:text-[3.1rem]">
            Você não precisa escolher um procedimento.
            <span className="mt-3 block italic text-gold">
              Precisa começar pela avaliação certa.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mx-auto mt-10 max-w-xl space-y-6 text-[1.0625rem] leading-[1.8] text-graphite">
            <p>
              Se existe algo na sua sobrancelha, pele ou aparência que incomoda você, o primeiro
              passo é entender o que realmente pode ser feito.
            </p>
            <p>Converse com nossa equipe e agende sua avaliação.</p>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <p className="mx-auto mt-12 max-w-lg font-display text-2xl italic leading-[1.4] text-ink sm:text-[1.75rem]">
            A partir daí, construímos juntas o melhor caminho para você.
          </p>
          <div className="mt-12 flex justify-center">
            <Cta className="w-full sm:w-auto sm:px-14">Agendar minha avaliação pelo WhatsApp</Cta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
