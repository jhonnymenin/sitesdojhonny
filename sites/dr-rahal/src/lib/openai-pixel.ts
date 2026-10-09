import { emProducao } from "./dominios";

/*
 * Measurement Pixel do OpenAI Ads.
 *
 * O ID não é segredo — aparece no HTML de qualquer site que roda o pixel —, mas
 * o carregamento é preso aos domínios de produção (ver dominios.ts). Em
 * localhost e em preview da Vercel nada é baixado e nada é enviado: sem isso, um
 * `npm run dev` registraria conversão na conta de anúncios real e sujaria a
 * otimização da campanha.
 *
 * Antes o ID vinha só de env, sem valor padrão. A trava por domínio faz o mesmo
 * trabalho sem depender de alguém lembrar de configurar variável, e é o mesmo
 * tratamento do GTM neste site.
 */

/** Fonte de dados do Dr. Rahal, enviada pelo Victor em 08/10/2026. */
const PIXEL_ID = "CziZEESMDxgWnP8w6YFdbC";

/**
 * `VITE_OPENAI_PIXEL_ID` tem prioridade: serve para testar com um ID falso e
 * para desligar o pixel em produção sem deploy (basta definir vazio no painel).
 *
 * **Atenção ao trocar de fonte de dados:** variável `VITE_` é embutida no bundle
 * em tempo de build, então um valor antigo ainda configurado na Vercel vence o
 * ID daqui e o pixel errado continua recebendo os eventos, calado.
 */
const ID_DO_ENV = (import.meta.env["VITE_OPENAI_PIXEL_ID"] as string | undefined) ?? "";

function idParaEsteAmbiente(): string {
  if (ID_DO_ENV !== "") return ID_DO_ENV;
  return emProducao() ? PIXEL_ID : "";
}

type OaiqFn = ((...args: unknown[]) => void) & { q?: unknown[] };

declare global {
  interface Window {
    oaiq?: OaiqFn;
  }
}

/**
 * Carrega o pixel e mede a visualização da página.
 *
 * Seguro para chamar mais de uma vez — o `window.oaiq` já existente barra a
 * segunda execução, que acontece em navegação client-side.
 */
export function initOpenAiPixel(): void {
  const id = idParaEsteAmbiente();
  if (id === "" || typeof window === "undefined" || window.oaiq) return;

  // Fila própria enquanto o SDK não carrega — é o snippet que o painel entrega.
  const oaiq: OaiqFn = function (...args: unknown[]) {
    (oaiq.q = oaiq.q || []).push(args);
  };
  window.oaiq = oaiq;

  /*
   * Sem `debug: true`, que vinha no snippet do painel. Ele existe para conferir
   * a instalação e despeja log no console de quem visita o site; o Victor
   * consegue validar pelo fluxo de eventos do próprio painel.
   */
  oaiq("init", { pixelId: id });

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://bzrcdn.openai.com/sdk/oaiq.min.js";
  document.head.appendChild(script);

  trackPageViewed();
}

/**
 * Evento de conversão configurado no painel: `page_viewed`.
 *
 * O payload é exatamente o que o Ads Manager gerou — `{ type: "contents" }`.
 * Campos fora do esquema da OpenAI não são enviados: um evento rejeitado some
 * sem aviso, e aqui isso significaria campanha otimizando às cegas.
 *
 * **Isto mede acesso, não interesse.** Até 09/10/2026 o site media
 * `lead_created` no clique de WhatsApp, que é quando a pessoa de fato procura o
 * consultório; o Jhonny optou por medir só a visualização. Se um dia a campanha
 * precisar do sinal de conversão de volta, é reativar aquele disparo no clique
 * dos links `wa.me` — o histórico está no git.
 */
function trackPageViewed(): void {
  window.oaiq?.("measure", "page_viewed", { type: "contents" });
}
