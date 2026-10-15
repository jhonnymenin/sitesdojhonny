import { Radio, RefreshCw, Layers } from "lucide-react";
import dnaBanner from "@/assets/dna-oficial.jpg";
import { Chip, CourseName, CtaButton } from "./primitives";
import { Sponsors } from "./Sponsors";
import { VideoBuzaid } from "./VideoBuzaid";
import { PRICING_ANCHOR } from "@/lib/checkout";

const SPECS = [
  { icon: Radio, label: "Ao vivo", value: "5 encontros on-line ao vivo" },
  { icon: RefreshCw, label: "Conteúdo", value: "100% atualizado" },
  { icon: Layers, label: "Complementos", value: "Banco de Questões e Onco IA" },
];


export function Hero() {
  return (
    <section
      id="top"
      // pt enxuto: as barras agora ocupam espaço no fluxo, não flutuam por cima.
        className="relative isolate overflow-hidden px-5 pt-10 pb-14 md:px-10 md:pt-16 md:pb-20"
      style={{
        backgroundImage: `url(${dnaBanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/*
        Véu chapado, de opacidade única. Aqui havia três (em algumas seções
        quatro) camadas de gradient: uma lateral e duas esfumando topo e base
        contra o fundo da página. O efeito era um borrão de transição no começo
        e no fim de cada bloco. Com uma camada só de opacidade constante, a arte
        aparece por inteiro e o corte entre as seções é reto.
      */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-background/90 md:bg-background/82" />

      {/*
        Duas colunas a partir de lg: o texto à esquerda e a chamada do Buzaid à
        direita. No mobile o vídeo desce para logo depois do botão — ali a
        pessoa já leu a oferta, e um rosto conhecido falando é o argumento mais
        forte que esta página tem.
      */}
      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-14">
        <div className="max-w-2xl">
          <Chip className="text-[10px] sm:text-xs">
            X Curso Intensivo de Oncologia · 10ª edição
          </Chip>
          <h1 className="mt-6 font-course text-[36px] leading-[1.05] font-bold tracking-[-0.02em] text-heading md:text-[58px]">
            <CourseName>X Curso Intensivo de Oncologia</CourseName>
          </h1>
          {/*
            Texto original da landing, de volta na íntegra e em corpo maior. Ele
            tinha sido enxugado para 17 palavras porque empurrava preço e botão
            para fora da primeira tela do celular; o Jhonny pediu de volta, e a
            primeira tela deixa de ser o critério aqui. A barra fixa do rodapé
            já carrega preço e botão em qualquer altura da página, então quem
            chega de anúncio continua com a oferta à mão mesmo sem rolar.
          */}
          <p className="mt-5 max-w-2xl text-lg leading-[1.55] text-muted-foreground md:text-xl">
            Formação completa e abrangente para oncologistas que estão se preparando para a prova de
            Título de Especialista em Oncologia Clínica (TEOC) e para oncologistas experientes que
            desejam revisar e atualizar seus conhecimentos.
          </p>

          <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
            {SPECS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex min-w-0 items-start gap-3 sm:block">
                <Icon size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-cyan sm:mt-0" />
                <div className="min-w-0">
                  <dt className="label-mono text-muted-foreground sm:mt-2">{label}</dt>
                  <dd className="mt-0.5 text-sm leading-snug text-foreground">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-8 rounded-md border border-cyan/40 bg-cyan/10 p-4 sm:p-5">
            <p className="label-mono text-orange">Condição especial de lançamento</p>
            <p className="mt-2 text-base leading-[1.6] text-foreground">
              DESCONTO de até 30% até 15 de outubro.
            </p>
          </div>

          <div className="mt-8">
            <CtaButton href={PRICING_ANCHOR} className="w-full sm:w-auto">
              Participar da 10ª edição
            </CtaButton>
          </div>
        </div>

        {/* Sem `order`: a ordem natural do DOM (texto, vídeo, patrocinadores) já
            põe o texto na coluna 1 e o vídeo na 2. Com `order-last` o vídeo ia
            para depois dos patrocinadores e caía abaixo da dobra. */}
        <VideoBuzaid />

        {/*
          Patrocinadores abaixo das duas colunas. Antes ficavam no canto inferior
          direito do hero (print 01 da revisão) — lugar que o vídeo passou a
          ocupar. Com `lg:col-span-2` eles atravessam a largura toda, que também
          lê melhor: as três marcas numa linha em vez de empilhadas num canto.
        */}
        <Sponsors className="mt-2 lg:col-span-2 lg:mt-4 lg:flex-row lg:items-center lg:gap-10" />
      </div>
    </section>
  );
}
