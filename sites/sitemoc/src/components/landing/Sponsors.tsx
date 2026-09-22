import { cn } from "@/lib/utils";
import logoJohnsonJohnson from "@/assets/sponsors/johnson-johnson.svg";
import logoAstraZeneca from "@/assets/sponsors/astrazeneca.svg";

/*
 * Patrocinadores (item 2 da revisão).
 *
 * A referência (print 02) empilha as marcas à direita, cada uma precedida do
 * tipo de patrocínio, com a Diamante maior que a Ouro. É o que `height`
 * controla — a largura sai da proporção de cada arte.
 *
 * As duas marcas têm proporções bem diferentes (J&J ≈ 10,7:1, AstraZeneca ≈ 7:1),
 * então alturas iguais dariam larguras muito distintas. As alturas abaixo já
 * levam isso em conta: a J&J fica visivelmente maior sem esticar demais o bloco.
 *
 * Para incluir um patrocinador novo, basta acrescentar uma entrada aqui.
 *
 * ATENÇÃO: os SVGs em src/assets/sponsors/ vieram do Wikimedia (domínio público
 * como logotipo tipográfico) e foram passados para branco, que é a versão reversa
 * usada sobre fundo escuro. Servem para validar o layout — substitua pelos
 * arquivos oficiais da pasta compartilhada antes de publicar.
 */
const SPONSORS = [
  {
    tier: "Patrocínio Diamante",
    name: "Johnson & Johnson",
    logo: logoJohnsonJohnson,
    height: "h-5 md:h-6",
  },
  {
    tier: "Patrocínio Ouro",
    name: "AstraZeneca",
    logo: logoAstraZeneca,
    height: "h-4 md:h-[18px]",
  },
];

export function Sponsors({ className }: { className?: string }) {
  return (
    <aside
      aria-label="Patrocinadores"
      className={cn("flex flex-col items-start gap-3 lg:items-end", className)}
    >
      {SPONSORS.map(({ tier, name, logo, height }) => (
        // No mobile o rótulo vai acima da marca: lado a lado, a J&J (wordmark de
        // ~10,7:1) mais o rótulo passam da largura da tela e a marca seria cortada.
        <div
          key={name}
          className="flex max-w-full flex-col items-start gap-1 lg:flex-row lg:items-center lg:gap-3"
        >
          <span className="label-mono shrink-0 text-muted-foreground">{tier}</span>
          <img
            src={logo}
            alt={name}
            className={cn("max-w-full w-auto", height)}
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </aside>
  );
}
