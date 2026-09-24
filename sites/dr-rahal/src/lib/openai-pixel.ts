/*
 * Measurement Pixel do OpenAI Ads.
 *
 * O ID vem de env **sem valor padrão, de propósito**. Com o ID embutido no
 * código, qualquer `npm run dev`, preview ou deploy de teste dispararia conversão
 * na conta de anúncios real e sujaria a otimização da campanha. Vazio, nada é
 * carregado e nada é enviado.
 *
 * Para ligar, defina `VITE_OPENAI_PIXEL_ID` — o valor está em `.env.example`.
 */

export const OPENAI_PIXEL_ID =
  (import.meta.env["VITE_OPENAI_PIXEL_ID"] as string | undefined) ?? "";

/** True quando o pixel está habilitado nesta build. */
export const pixelEnabled = OPENAI_PIXEL_ID !== "";

type OaiqFn = ((...args: unknown[]) => void) & { q?: unknown[] };

declare global {
  interface Window {
    oaiq?: OaiqFn;
  }
}

/** Injeta o snippet oficial uma única vez. Seguro para chamar mais de uma vez. */
export function initOpenAiPixel(): void {
  if (!pixelEnabled || typeof window === "undefined" || window.oaiq) return;

  // Fila própria enquanto o SDK não carrega — é o snippet que o Ads Manager entrega.
  const oaiq: OaiqFn = function (...args: unknown[]) {
    (oaiq.q = oaiq.q || []).push(args);
  };
  window.oaiq = oaiq;
  oaiq("init", { pixelId: OPENAI_PIXEL_ID });

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://bzrcdn.openai.com/sdk/oaiq.min.js";
  document.head.appendChild(script);
}

/** Identificador único do evento, para deduplicar caso a Conversions API entre depois. */
function novoEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Conversão do site: `lead_created`.
 *
 * O payload é exatamente o que o Ads Manager gerou para este evento —
 * `{ type: "customer_action" }`. Campos fora do esquema da OpenAI não são
 * enviados: um evento rejeitado some sem aviso, e aqui isso significaria campanha
 * otimizando às cegas.
 *
 * @returns o event_id usado, útil para enviar o mesmo evento pela Conversions API.
 */
export function trackLeadCreated(): string | undefined {
  if (!pixelEnabled || typeof window === "undefined") return undefined;
  const eventId = novoEventId();
  window.oaiq?.("measure", "lead_created", { type: "customer_action" }, { event_id: eventId });
  return eventId;
}
