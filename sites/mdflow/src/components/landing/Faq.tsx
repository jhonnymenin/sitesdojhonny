import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

/*
 * FAQ curto sobre o acesso gratuito e o funcionamento, como o brief pede.
 *
 * SEM DATA DO ENAMED 2027 DE PROPÓSITO. O Inep ainda não publicou edital nem
 * cronograma, e a prova passa a ser semestral a partir de 2027 — qualquer data
 * aqui seria chute numa página que promete preparar para ela. Quando o edital
 * sair, é só acrescentar.
 *
 * <details>/<summary> em vez de acordeão em JavaScript: abre sem hidratar,
 * funciona com teclado e leitor de tela de graça, e o conteúdo já está no HTML
 * para quem indexa a página.
 */
const perguntas = [
  {
    q: "O acesso é mesmo gratuito?",
    a: "É. A MDFlow está em fase de testes e o acesso está liberado sem cobrança. Você não precisa cadastrar cartão para começar.",
  },
  {
    q: "Quanto tempo leva para montar meu plano?",
    a: "O diagnóstico inicial leva poucos minutos. Assim que você termina, o plano já aparece com as tarefas do dia.",
  },
  {
    q: "Preciso estudar todo dia para o plano funcionar?",
    a: "Não. Você informa quanto tempo tem por semana, e o plano se distribui dentro disso. Se você pular um dia, ele se recalcula.",
  },
  {
    q: "Serve para quem está começando agora?",
    a: "Sim. O ponto de partida sai do seu diagnóstico, não de um nível fixo — por isso o plano de quem está começando é diferente do plano de quem já revisou tudo.",
  },
  {
    q: "A MDFlow substitui meu curso ou meu material?",
    a: "Ela organiza a sua preparação e indica o próximo passo. Se você já tem material de que gosta, continua usando: o plano aponta o tema e o momento.",
  },
];

export function Faq() {
  return (
    <Section id="faq">
      <SectionHeading eyebrow="Dúvidas" title="Antes de começar." />

      <div className="mt-10 flex flex-col gap-3">
        {perguntas.map((p, i) => (
          <Reveal key={p.q} delay={(i % 3) * 60}>
            <details className="group rounded-2xl border border-border bg-card px-6 py-5 shadow-soft">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                {p.q}
                <span
                  aria-hidden
                  className="shrink-0 text-xl leading-none text-brand transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
