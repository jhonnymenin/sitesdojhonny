import { ArrowRight, CalendarCheck, Monitor, Route } from "lucide-react";
import dashboard from "@/assets/plataforma/dashboard.webp";
import dashboardMobile from "@/assets/plataforma/dashboard-mobile.webp";
import { cadastroUrl } from "@/lib/cadastro";
import { Reveal } from "./Reveal";

/*
 * A dobra.
 *
 * A imagem é a tela real do app (tema claro), não uma maquete desenhada: o
 * brief pede imagem real da plataforma, e quem está decidindo testar quer ver
 * o produto, não um desenho do produto.
 */
const destaques = [
  { icon: Monitor, label: "100% online" },
  { icon: Route, label: "Plano personalizado" },
  { icon: CalendarCheck, label: "Em fase de testes" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-20 pt-12 sm:px-8 lg:pb-28">
      <div
        aria-hidden
        className="grid-faint pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
      />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="flex flex-col gap-7">
          <Reveal className="inline-flex w-fit items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-semibold text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Fase de testes gratuita
          </Reveal>

          <Reveal delay={60}>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              Seu copiloto de estudos para o{" "}
              <span className="text-brand">ENAMED</span> chegou.
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              A MDFlow entende seu nível de conhecimento, cria um plano personalizado e acompanha
              sua evolução até a prova.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <a
              href={cadastroUrl("hero")}
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-primary-foreground shadow-lift transition-all hover:brightness-110 active:scale-[0.98] sm:w-auto"
            >
              Começar gratuitamente
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>

          <Reveal delay={240}>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6">
              {destaques.map((d) => (
                <li
                  key={d.label}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
                >
                  <d.icon className="h-4 w-4 shrink-0 text-brand" />
                  {d.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120}>
          {/*
            Duas artes para a mesma tela. O painel inteiro, reduzido à largura de
            um celular, fica ilegível — vira uma mancha cinza que não prova nada.
            Abaixo de 640px entra o recorte da faixa de saudação e dos quatro
            indicadores, onde o texto ainda se lê.

            Sem lazy: é a imagem da dobra, e `loading="lazy"` atrasaria o maior
            elemento da primeira tela.
          */}
          <picture>
            <source media="(min-width: 640px)" srcSet={dashboard} />
            <img
              src={dashboardMobile}
              width={1800}
              height={1125}
              fetchPriority="high"
              alt="Painel da MDFlow: plano do dia, contagem para o ENAMED, questões resolvidas e próximo passo recomendado"
              className="w-full rounded-2xl border border-border shadow-lift"
            />
          </picture>
        </Reveal>
      </div>
    </section>
  );
}
