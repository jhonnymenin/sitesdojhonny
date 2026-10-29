import plano from "@/assets/plataforma/plano.webp";
import questoes from "@/assets/plataforma/questoes.webp";
import desempenho from "@/assets/plataforma/desempenho.webp";
import gamificacao from "@/assets/plataforma/gamificacao.webp";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

/*
 * Demonstração da plataforma.
 *
 * Todas as imagens são capturas do app rodando, na conta de homologação do
 * próprio projeto — dados fictícios, tela real. O brief pede explicitamente
 * para não apresentar métrica inventada como resultado, então nenhum número
 * aparece aqui fora das próprias telas.
 */
const blocos = [
  {
    img: plano,
    titulo: "Plano de estudos",
    texto: "O que estudar hoje, por quanto tempo e por quê — recalculado conforme você avança.",
    alt: "Tela do plano de estudos da MDFlow, com as tarefas do dia e o tempo estimado de cada uma",
  },
  {
    img: questoes,
    titulo: "Questões",
    texto: "Banco filtrado por área, tema e dificuldade, direcionado para as suas lacunas.",
    alt: "Tela do banco de questões da MDFlow, com filtros por área e tema",
  },
  {
    img: desempenho,
    titulo: "Desempenho",
    texto: "Acertos por área e evolução ao longo do tempo, em vez de uma nota solta.",
    alt: "Tela de desempenho da MDFlow, com acertos por área e evolução no tempo",
  },
];

export function Demonstracao() {
  return (
    <Section id="plataforma" className="bg-surface">
      <SectionHeading
        eyebrow="A plataforma por dentro"
        title="Não é promessa de tela. É a tela."
        description="Plano, questões, desempenho e gamificação funcionando — as imagens abaixo são capturas da própria MDFlow."
      />

      <Reveal className="mt-12" delay={60}>
        <img
          src={gamificacao}
          width={1100}
          height={267}
          loading="lazy"
          alt="Faixa do painel da MDFlow com saudação, dias seguidos de estudo e contagem de semanas até a prova"
          className="w-full rounded-2xl border border-border shadow-soft"
        />
      </Reveal>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {blocos.map((b, i) => (
          <Reveal
            key={b.titulo}
            delay={120 + i * 60}
            className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
          >
            <img
              src={b.img}
              width={1100}
              height={836}
              loading="lazy"
              alt={b.alt}
              className="w-full border-b border-border"
            />
            <div className="flex flex-col gap-2 p-6">
              <h3 className="text-lg font-bold text-foreground">{b.titulo}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{b.texto}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
