import { useEffect } from "react";
import {
  initMetaPixel,
  novoEventId,
  obterPageViewEventId,
  pixelEnabled,
  trackContact,
  trackInitiateCheckout,
  trackOfertaSelecionada,
  trackViewContent,
} from "@/lib/meta-pixel";
import { enviarEventoCapi, type EntradaCapi } from "@/lib/meta-capi";
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
 * Manda o mesmo evento pelo servidor, com o mesmo event_id.
 *
 * Dispara e esquece, de propósito: o clique da pessoa não pode esperar uma
 * chamada de rede, e uma falha na medição nunca deve atrapalhar a navegação.
 * O `catch` vazio é intencional — falha de medição não vira erro no console da
 * pessoa nem quebra a página.
 */
function espelharNoServidor(entrada: EntradaCapi): void {
  if (!pixelEnabled()) return;
  void enviarEventoCapi({ data: entrada }).catch(() => {});
}

/**
 * Carrega o Meta Pixel e mede as conversões da landing, pelos dois caminhos.
 *
 * Cada evento sai do navegador (pixel) e do servidor (Conversions API) com o
 * mesmo `event_id`, e o Meta conta uma vez só. O caminho do servidor existe
 * porque bloqueador de anúncio e ITP do Safari derrubam boa parte dos eventos do
 * navegador.
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

    // O PageView do navegador já saiu dentro do init; aqui vai o par dele.
    const pageViewId = obterPageViewEventId();
    if (pageViewId) {
      espelharNoServidor({ nome: "PageView", eventId: pageViewId, url: location.href });
    }

    const aoClicar = (evento: MouseEvent) => {
      const alvo = evento.target;
      if (!(alvo instanceof Element)) return;

      const link = alvo.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";

      if (href.includes("wa.me/")) {
        const eventId = novoEventId();
        trackContact(eventId);
        espelharNoServidor({ nome: "Contact", eventId, url: location.href });
        return;
      }

      // Só os links que realmente saem para comprar. As âncoras internas
      // (#inscricao) rolam a página e não são início de checkout nenhum —
      // contá-las inflaria o evento e faria a campanha otimizar para scroll.
      if (!DESTINOS_DE_COMPRA.some((d) => href.includes(d))) return;

      const { produto, valor } = produtoDoLink(href);

      const idCheckout = novoEventId();
      trackInitiateCheckout({ produto, valor, eventId: idCheckout });
      espelharNoServidor({
        nome: "InitiateCheckout",
        eventId: idCheckout,
        url: location.href,
        produto,
        valor,
      });

      // O evento personalizado só nos três cards de preço, que foi o que o MOC
      // pediu. Os outros botões que levam ao checkout ficam só com o padrão:
      // ali a pessoa não escolheu entre as opções, foi levada direto.
      if (link.closest(PRICING_ANCHOR)) {
        const idOferta = novoEventId();
        trackOfertaSelecionada({
          produto,
          valor,
          plano: link.textContent?.replace(/\s+/g, " ").trim() ?? "",
          eventId: idOferta,
        });
        espelharNoServidor({
          nome: "OfertaSelecionada",
          eventId: idOferta,
          url: location.href,
          produto,
          valor,
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
            const eventId = novoEventId();
            trackViewContent(eventId);
            espelharNoServidor({ nome: "ViewContent", eventId, url: location.href });
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
