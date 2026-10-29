import {
  BookOpen,
  CalendarRange,
  LayersIcon,
  ListChecks,
  TimerReset,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import plano from "@/assets/plataforma/plano.webp";
import questoes from "@/assets/plataforma/questoes.webp";
import flashcards from "@/assets/plataforma/flashcards.webp";
import caderno from "@/assets/plataforma/caderno.webp";
import simulados from "@/assets/plataforma/simulados.webp";
import desempenho from "@/assets/plataforma/desempenho.webp";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

/*
 * As oito funcionalidades do brief.
 *
 * Seis têm tela própria no app e aparecem com a captura real. Gamificação vive
 * dentro do painel (ofensiva e conquistas) e Comunidade ainda não tem tela —
 * as duas entram só com ícone, em vez de ganharem uma imagem emprestada que
 * mostraria outra coisa.
 */
const itens = [
  {
    icon: CalendarRange,
    titulo: "Plano de estudos personalizado",
    texto: "Montado a partir do seu diagnóstico e do tempo que você tem.",
    img: plano,
    alt: "Tela do plano de estudos da MDFlow",
  },
  {
    icon: ListChecks,
    titulo: "Banco de questões direcionado",
    texto: "Filtrado pelas áreas em que você precisa melhorar.",
    img: questoes,
    alt: "Tela do banco de questões da MDFlow",
  },
  {
    icon: TimerReset,
    titulo: "Flashcards com revisão espaçada",
    texto: "Os cartões voltam no intervalo em que você estaria prestes a esquecer.",
    img: flashcards,
    alt: "Tela de flashcards da MDFlow",
  },
  {
    icon: BookOpen,
    titulo: "Caderno de conteúdos",
    texto: "O material do tema, no ponto do plano em que ele faz sentido.",
    img: caderno,
    alt: "Tela do caderno de conteúdos da MDFlow",
  },
  {
    icon: LayersIcon,
    titulo: "Simulados no formato ENAMED",
    texto: "Mesma estrutura da prova, para treinar ritmo e resistência.",
    img: simulados,
    alt: "Tela de simulados da MDFlow",
  },
  {
    icon: TrendingUp,
    titulo: "Acompanhamento de desempenho",
    texto: "Acertos por área e evolução ao longo das semanas.",
    img: desempenho,
    alt: "Tela de desempenho da MDFlow",
  },
  {
    icon: Trophy,
    titulo: "Gamificação e conquistas",
    texto: "Dias seguidos de estudo e metas que sustentam a constância.",
  },
  {
    icon: Users,
    titulo: "Comunidade de estudantes",
    texto: "Você não estuda sozinho.",
  },
];

export function Funcionalidades() {
  return (
    <Section id="funcionalidades">
      <SectionHeading
        eyebrow="Funcionalidades"
        title="Uma plataforma completa para a sua preparação."
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {itens.map((it, i) => (
          <Reveal
            as="li"
            key={it.titulo}
            delay={(i % 3) * 70}
            className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
          >
            {it.img ? (
              <img
                src={it.img}
                width={1100}
                height={836}
                loading="lazy"
                alt={it.alt}
                className="w-full border-b border-border"
              />
            ) : null}
            <div className="flex flex-1 flex-col gap-3 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10">
                <it.icon className="h-5 w-5 text-brand" />
              </span>
              <h3 className="text-base font-bold leading-snug text-foreground">{it.titulo}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{it.texto}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
