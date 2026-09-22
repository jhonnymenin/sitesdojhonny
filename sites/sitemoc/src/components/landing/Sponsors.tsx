import { cn } from "@/lib/utils";
import logoJohnsonJohnson from "@/assets/sponsors/johnson-johnson.png";
import logoAstraZeneca from "@/assets/sponsors/astrazeneca.png";

/*
 * Patrocinadores (item 2 da revisão).
 *
 * Referência (print 02): marcas empilhadas à direita, cada uma precedida do tipo
 * de patrocínio, com a Diamante maior que a Ouro. É o que `height` controla — a
 * largura sai da proporção de cada arte, e elas são bem diferentes
 * (J&J ≈ 10,7:1, AstraZeneca ≈ 4:1).
 *
 * TRATAMENTO DE COR: os arquivos são os oficiais, em cores de marca. Sobre o
 * azul-marinho do hero, o roxo da AstraZeneca fica ilegível, então as marcas são
 * exibidas na versão reversa (branco) — que é o tratamento da referência e o
 * padrão de manual de marca sobre fundo escuro. A reversão é feita no CSS, com
 * `brightness(0) invert(1)`, de propósito: os arquivos originais ficam intactos,
 * e trocar de tratamento é remover uma classe.
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
    height: "h-7 md:h-8",
  },
];

export function Sponsors({ className }: { className?: string }) {
  return (
    <aside
      aria-label="Patrocinadores"
      className={cn("flex flex-col items-start gap-3 lg:items-end", className)}
    >
      {SPONSORS.map(({ tier, name, logo, height }) => (
        // No mobile o rótulo vai acima da marca: lado a lado, o wordmark da J&J
        // passa da largura da tela e a marca seria cortada.
        <div
          key={name}
          className="flex max-w-full flex-col items-start gap-1 lg:flex-row lg:items-center lg:gap-3"
        >
          <span className="label-mono shrink-0 text-muted-foreground">{tier}</span>
          <img
            src={logo}
            alt={name}
            className={cn("w-auto max-w-full brightness-0 invert", height)}
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </aside>
  );
}
