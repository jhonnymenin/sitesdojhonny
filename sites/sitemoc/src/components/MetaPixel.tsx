import { useEffect } from "react";
import {
  initMetaPixel,
  trackContact,
  trackInitiateCheckout,
  trackOfertaSelecionada,
  trackViewContent,
} from "@/lib/meta-pixel";
import { PRICING_ANCHOR } from "@/lib/checkout";

/*
 * Domínios que significam "saiu da landing para comprar". São dois porque o MOC
 * usa a EAD Plataforma para os combos e um domínio próprio para a página do
 * Banco de Questões.
 */
const DESTINOS_DE_COMPRA = ["eadplataforma.app", "cursos.mocbrasil.com"];

/** Nome e valor do produto a partir da URL, para o evento não sair genérico. */
function produtoDoLink(href: string): { produto: string; valor: number } {
  if (href.includes("/combo/16/")) return { produto: "Combo completo", valor: 2729 };
  if (href.includes("/combo/20/")) return { produto: "Intensivo + Banco de Questões", valor: 2030 };
  return { produto: "Banco de Questões", valor: 510 };
}

/**
 * Carrega o Meta Pixel e mede as conversões da landing.
 *
 * Os botões de conversão estão em sete componentes, e o MOC os aprovou print a
 * print. Em vez de pôr um onClick em cada um — mexendo em arquivo revisado por
 * cliente —, os eventos saem de um listener único no documento, em fase de
 * captura. Nenhum componente existente foi tocado, e qualquer botão acrescentado
 * no futuro já nasce medido.
 *
 * O listener só observa: não interfere na navegação.
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

      // Só os links que realmente saem para comprar. As âncoras internas
      // (#inscricao) rolam a página e não são início de checkout nenhum —
      // contá-las inflaria o evento e faria a campanha otimizar para scroll.
      if (!DESTINOS_DE_COMPRA.some((d) => href.includes(d))) return;

      const { produto, valor } = produtoDoLink(href);
      trackInitiateCheckout({ produto, valor });

      // O evento personalizado só nos três cards de preço, que foi o que o MOC
      // pediu. Os outros botões que levam ao checkout ficam só com o padrão:
      // ali a pessoa não escolheu entre as opções, foi levada direto.
      if (link.closest(PRICING_ANCHOR)) {
        trackOfertaSelecionada({
          produto,
          valor,
          plano: link.textContent?.replace(/\s+/g, " ").trim() ?? "",
        });
      }
    };

    document.addEventListener("click", aoClicar, { capture: true });

    /*
     * ViewContent quando a seção de preços entra na tela, uma vez só. Usa
     * IntersectionObserver em vez de listener de scroll para não rodar código a
     * cada pixel rolado; `disconnect` logo no primeiro disparo garante o "uma
     * vez só" mesmo que a pessoa suba e desça a página.
     */
    const secao = document.querySelector(PRICING_ANCHOR);
    let observer: IntersectionObserver | undefined;
    if (secao && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entradas) => {
          if (entradas.some((e) => e.isIntersecting)) {
            trackViewContent();
            observer?.disconnect();
          }
        },
        { threshold: 0.25 },
      );
      observer.observe(secao);
    }

    return () => {
      document.removeEventListener("click", aoClicar, { capture: true });
      observer?.disconnect();
    };
  }, []);

  return null;
}
