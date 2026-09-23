import dance from "@/assets/strip-dance.jpg";
import friends from "@/assets/strip-friends.jpg";
import saopaulo from "@/assets/strip-saopaulo.jpg";
import man from "@/assets/strip-man.jpg";
import joy from "@/assets/strip-joy.jpg";
import portrait from "@/assets/strip-portrait.jpg";

type Frame = { src: string; alt: string; tall?: boolean };

const frames: Frame[] = [
  { src: dance, alt: "Casal de idosos dançando em uma praça ao ar livre" },
  { src: portrait, alt: "Retrato de mulher de cabelos prateados sorrindo", tall: true },
  { src: friends, alt: "Amigos com mais de 60 anos após uma atividade física ao ar livre" },
  { src: man, alt: "Homem idoso de cabelos grisalhos sorrindo em uma rua de São Paulo", tall: true },
  { src: joy, alt: "Casal de idosos dançando e rindo em um bar" },
  { src: saopaulo, alt: "Senhor caminhando por uma rua de São Paulo", tall: true },
];

function Row({ reverse }: { reverse?: boolean }) {
  const list = [...frames, ...frames];

  return (
    <div className="marquee">
      <ul className={reverse ? "marquee-track marquee-reverse" : "marquee-track"}>
        {list.map((frame, i) => (
          <li
            key={`${frame.src}-${i}`}
            // Altura fixa e largura derivada da proporção. Antes era o contrário
            // — largura fixa —, e como a linha mistura retratos (3/4) com
            // paisagens (3/2), cada quadro terminava numa altura diferente e a
            // faixa ficava irregular. Com a altura travada, a base se alinha e a
            // variação fica na largura, que é o que dá ritmo à tira.
            className={
              frame.tall
                ? "relative aspect-3/4 h-[200px] shrink-0 overflow-hidden md:h-[280px]"
                : "relative aspect-3/2 h-[200px] shrink-0 overflow-hidden md:h-[280px]"
            }
          >
            <img
              src={frame.src}
              alt={i < frames.length ? frame.alt : ""}
              aria-hidden={i >= frames.length ? true : undefined}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PhotoMarquee() {
  return (
    <section aria-label="Retratos da longevidade brasileira" className="relative bg-paper py-14 md:py-20">
      <div className="shell">
        <p className="eyebrow reveal" data-reveal="">
          Retratos — Longevidade em movimento
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 md:gap-4">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}
