import { useEffect } from "react";
import { initMetaPixel, trackContact, trackInitiateCheckout } from "@/lib/meta-pixel";

/**
 * Carrega o Meta Pixel e mede os cliques de conversão da landing.
 *
 * Os botões que levam ao checkout estão espalhados por vários componentes, e
 * alguns deles o MOC aprovou print a print. Em vez de pôr um onClick em cada um
 * — mexendo em arquivo revisado por cliente —, os eventos saem de um listener
 * único no documento, na fase de captura.
 *
 * Duas consequências boas: nenhum componente existente foi tocado, e qualquer
 * botão de checkout acrescentado no futuro já nasce medido.
 *
 * O listener não interfere na navegação: só observa.
 */
export function MetaPixel() {
  useEffect(() => {
    initMetaPixel();

    const aoClicar = (evento: MouseEvent) => {
      const alvo = evento.target;
      if (!(alvo instanceof Element)) return;

      const link = alvo.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";

      if (href.includes("wa.me/")) {
        trackContact();
        return;
      }

      // Só os links que realmente abrem o carrinho. As âncoras internas
      // (#inscricao) rolam a página e não são início de checkout nenhum —
      // contá-las inflaria o evento e faria a campanha otimizar para scroll.
      if (href.includes("eadplataforma.app")) {
        const produto = href.includes("/combo/16/")
          ? "Combo completo"
          : href.includes("/combo/20/")
            ? "Intensivo + Banco de Questões"
            : "Banco de Questões";
        const valor = href.includes("/combo/16/")
          ? 2729
          : href.includes("/combo/20/")
            ? 2030
            : 510;
        trackInitiateCheckout({ produto, valor });
      }
    };

    document.addEventListener("click", aoClicar, { capture: true });
    return () => document.removeEventListener("click", aoClicar, { capture: true });
  }, []);

  return null;
}
