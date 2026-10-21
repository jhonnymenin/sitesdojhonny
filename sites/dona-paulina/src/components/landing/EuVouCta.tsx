import { Link } from "@tanstack/react-router";
import { ArrowRight, Camera, CalendarDays } from "lucide-react";

/*
 * Chamada para a moldura #EuVou do II Simpósio.
 *
 * Fica em componente próprio em vez de entrar no Sections.tsx: aquele arquivo
 * concentra a página inteira, já foi revisado pela Fundação, e uma faixa de
 * evento é conteúdo com data para sair — separada, remover é apagar uma linha
 * do index.
 *
 * O desenho segue a faixa da campanha "Laços que protegem" que abre o Hero, para
 * não inventar um elemento novo no meio de um site já aprovado.
 */
export function EuVouCta() {
  return (
    <section
      aria-label="II Simpósio — monte a sua arte"
      className="border-y border-primary/20 bg-primary-soft px-6 py-10 md:py-12"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:gap-10 md:text-left">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold tracking-wider text-[color:var(--primary-dark)] uppercase">
            <CalendarDays size={13} /> 7 de novembro de 2026
          </p>
          <h2 className="mt-3 font-display text-2xl leading-tight font-bold text-[color:var(--primary-dark)] md:text-3xl">
            Você vai ao II Simpósio? Conte para todo mundo.
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-charcoal/70 md:text-base">
            Ponha a sua foto na arte oficial do evento e compartilhe nas redes. Leva menos de um
            minuto.
          </p>
        </div>

        <Link
          to="/eu-vou"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          <Camera size={18} strokeWidth={2} />
          Montar a minha arte
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
