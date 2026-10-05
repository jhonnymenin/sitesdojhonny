import { cn } from "@/lib/utils";
import logoJohnsonJohnson from "@/assets/sponsors/johnson-johnson.png";
import logoAstraZeneca from "@/assets/sponsors/astrazeneca.png";
import logoDaiichiSankyo from "@/assets/sponsors/daiichi-sankyo.png";

/*
 * Patrocinadores.
 *
 * A referência é o banner publicado no EAD do MOC, e o MOC pediu para segui-lo
 * também nas próximas solicitações. Dele saem as duas regras abaixo.
 *
 * RÓTULO UMA VEZ POR CATEGORIA. No banner, "Patrocínio Ouro" aparece ao lado da
 * AstraZeneca e **não se repete** na Daiichi, que fica logo abaixo alinhada à
 * direita. Por isso a lista é agrupada por `tier` em vez de carregar o rótulo em
 * cada marca: acrescentar uma terceira Ouro no futuro não repete nada.
 *
 * MARCAS DA MESMA CATEGORIA TÊM A MESMA LARGURA, não a mesma altura. Medido no
 * banner: AstraZeneca 115x27px, Daiichi 112x20px — larguras praticamente iguais
 * (97%) e alturas bem diferentes (74%). A razão é o símbolo da AstraZeneca, que
 * sobe acima do texto e infla a caixa dela; igualar altura faria o wordmark da
 * Daiichi ficar 45% maior que o da AstraZeneca, que foi o que o MOC apontou.
 * Daí `width` nas marcas Ouro, com a altura saindo da proporção de cada arte.
 *
 * A Diamante continua medida por altura: ela está sozinha na categoria, e o que
 * importa ali é ser maior que as Ouro.
 *
 * As artes são recortadas na marca, **sem margem no arquivo** — o PNG oficial da
 * Daiichi vinha com 49% da altura em espaço vazio, o que a encolheria.
 *
 * TRATAMENTO DE COR: os arquivos são os oficiais, em cores de marca. Sobre o
 * azul-marinho do hero, o roxo da AstraZeneca fica ilegível, então as marcas são
 * exibidas na versão reversa (branco) — que é o tratamento da referência e o
 * padrão de manual de marca sobre fundo escuro. A reversão é feita no CSS, com
 * `brightness(0) invert(1)`, de propósito: os arquivos originais ficam intactos,
 * e trocar de tratamento é remover uma classe.
 */
const TIERS = [
  {
    tier: "Patrocínio Diamante",
    // Altura: a J&J está sozinha na categoria e é a marca de maior destaque.
    size: "h-5 w-auto md:h-6",
    brands: [{ name: "Johnson & Johnson", logo: logoJohnsonJohnson }],
  },
  {
    tier: "Patrocínio Ouro",
    // Largura: é o que iguala o peso visual entre artes de proporção diferente.
    // 112px e 128px são a largura que a AstraZeneca já ocupava nestes breakpoints.
    size: "h-auto w-28 md:w-32",
    brands: [
      { name: "AstraZeneca", logo: logoAstraZeneca },
      { name: "Daiichi-Sankyo", logo: logoDaiichiSankyo },
    ],
  },
];

export function Sponsors({ className }: { className?: string }) {
  return (
    <aside
      aria-label="Patrocinadores"
      className={cn("flex flex-col items-start gap-3 lg:items-end", className)}
    >
      {TIERS.map(({ tier, size, brands }) => (
        <div
          key={tier}
          className="flex max-w-full flex-col items-start gap-1 lg:flex-row lg:items-start lg:gap-3"
        >
          {/*
            No mobile o rótulo vai acima das marcas: lado a lado, o wordmark da
            J&J passa da largura da tela e a marca seria cortada.

            `lg:pt-1` alinha o rótulo com a primeira marca da categoria, já que a
            coluna pode ter mais de uma linha e `items-start` encosta tudo no topo.
          */}
          <span className="label-mono shrink-0 text-muted-foreground lg:pt-1">{tier}</span>
          <div className="flex max-w-full flex-col items-start gap-2 lg:items-end">
            {brands.map(({ name, logo }) => (
              <img
                key={name}
                src={logo}
                alt={name}
                className={cn("max-w-full brightness-0 invert", size)}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
