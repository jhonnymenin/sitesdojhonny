import logoWhite from "@/assets/logo-bruna-branca.png";
import submarca from "@/assets/submarca-bruna-dourada.png";
import { Cta, Reveal, WHATSAPP_URL } from "./ui";

export function Closing() {
  return (
    <section className="relative overflow-hidden bg-ink text-champagne">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />
      <img
        src={submarca}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute -bottom-16 left-1/2 w-[300px] -translate-x-1/2 select-none opacity-[0.06] md:w-[420px]"
      />

      <div className="relative mx-auto max-w-[900px] px-6 py-24 text-center md:px-10 md:py-40">
        <Reveal>
          <img
            src={logoWhite}
            alt="Ateliê Bruna Espada"
            loading="lazy"
            className="mx-auto h-24 w-auto object-contain md:h-32"
          />
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-10 text-[1.9rem] leading-[1.2] text-white sm:text-[2.6rem]">
            Beleza não é transformação em outra pessoa.
          </h2>
          <div className="mx-auto mt-8 max-w-xl space-y-1 text-[1.0625rem] leading-[1.85] text-champagne/85">
            <p>É reconhecimento.</p>
            <p>
              É olhar no espelho e perceber que seus traços continuam sendo seus — apenas mais
              cuidados, equilibrados e valorizados.
            </p>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="mx-auto my-16 h-px w-24 bg-gold/50" />
          <p className="font-display text-2xl leading-tight text-white sm:text-[2rem]">
            Sua beleza não precisa de excessos.
          </p>
          <div className="mt-6 space-y-1 text-[0.6875rem] uppercase tracking-[0.3em] text-gold-light">
            <p>Precisa de cuidado.</p>
            <p>Conhecimento.</p>
            <p>Precisão.</p>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-20 font-display text-[2.4rem] leading-[1.08] text-white sm:text-[4rem]">
            Não vendo procedimentos.
            <span className="mt-3 block italic text-champagne">Devolvo identidade.</span>
          </p>
          <div className="mt-14 flex justify-center">
            <Cta variant="light" className="w-full sm:w-auto sm:px-14">
              Quero agendar minha avaliação
            </Cta>
          </div>
        </Reveal>
      </div>

      <footer className="relative border-t border-champagne/15">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-14 text-center md:grid-cols-3 md:px-10 md:text-left">
          <div>
            <p className="font-display text-2xl text-white">Bruna Espada</p>
            <p className="mt-3 text-xs leading-relaxed tracking-[0.12em] text-champagne/70">
              Micropigmentação • Regeneração • Despigmentação • Estética Avançada
            </p>
          </div>
          <div className="space-y-2 text-sm text-champagne/80">
            <p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-gold-light"
              >
                WhatsApp: (11) 94245-7002
              </a>
            </p>
            <p>
              <a
                href="https://instagram.com/brunaespada"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-gold-light"
              >
                Instagram: @brunaespada
              </a>
            </p>
          </div>
          <div className="text-sm text-champagne/80 md:text-right">
            <p>São Caetano do Sul – SP</p>
            <p className="mt-2 text-xs text-champagne/50">
              © {new Date().getFullYear()} Ateliê Bruna Espada
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
