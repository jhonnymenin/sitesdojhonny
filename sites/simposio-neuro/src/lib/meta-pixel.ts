/**
 * Meta Pixel (browser) + Conversions API (servidor) — camada única de tracking.
 *
 * Cada evento é disparado DUAS vezes de propósito:
 *  1. via `fbq()` no navegador (Pixel);
 *  2. via `/api/public/meta-capi` (Conversions API, server-side).
 *
 * Ambos compartilham o mesmo `event_id`, o que permite à Meta deduplicar
 * o par e contabilizar apenas uma conversão. Isso aumenta a taxa de
 * correspondência mesmo quando o navegador bloqueia o pixel.
 */

/** ID público do Pixel — pode ficar no bundle do cliente com segurança. */
export const META_PIXEL_ID = "553465707797085";

/** Eventos padrão da Meta usados nesta landing page. */
export type MetaStandardEvent =
  | "PageView"
  | "ViewContent"
  | "InitiateCheckout"
  | "Contact"
  | "Lead"
  | "FindLocation"
  | "Schedule";

/** Eventos customizados desta página (aparecem como "Custom" no Gerenciador). */
export type MetaCustomEvent =
  | "ScrollDepth"
  | "ViewSchedule"
  | "ViewPricing"
  | "ViewSpeakers"
  | "PreLead";

export type MetaEventName = MetaStandardEvent | MetaCustomEvent;

const CUSTOM_EVENTS: ReadonlySet<string> = new Set<MetaCustomEvent>([
  "ScrollDepth",
  "ViewSchedule",
  "ViewPricing",
  "ViewSpeakers",
  "PreLead",
]);

export interface MetaEventParams {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
  /** Parâmetros livres para eventos customizados. */
  [key: string]: unknown;
}

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean };
    _fbq?: unknown;
  }
}

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

/** Gera um event_id único e compartilhado entre Pixel e CAPI. */
function newEventId(): string {
  if (isBrowser() && typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function readCookie(name: string): string | undefined {
  if (!isBrowser()) return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

/**
 * Injeta o snippet oficial do Pixel uma única vez.
 * Seguro para ser chamado múltiplas vezes (idempotente).
 */
export function initMetaPixel(): void {
  if (!isBrowser() || window.fbq) return;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const fbq: any = function (...args: unknown[]) {
    // Enquanto o script oficial não carrega, os eventos ficam na fila.
    fbq.callMethod ? fbq.callMethod.apply(fbq, args) : fbq.queue.push(args);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", META_PIXEL_ID);
}

/** Envia o evento para a Conversions API (falha silenciosamente — tracking nunca quebra a UI). */
function sendToConversionsApi(
  eventName: MetaEventName,
  eventId: string,
  params: MetaEventParams,
): void {
  if (!isBrowser()) return;

  const payload = JSON.stringify({
    event_name: eventName,
    event_id: eventId,
    event_source_url: window.location.href,
    action_source: "website",
    custom_data: params,
    fbp: readCookie("_fbp"),
    fbc: readCookie("_fbc") ?? fbclidToFbc(),
  });

  try {
    // `keepalive` garante o envio mesmo se o clique navegar para outra página.
    void fetch("/api/public/meta-capi", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    /* tracking é best-effort */
  }
}

/** Constrói o parâmetro `fbc` a partir do `fbclid` da URL quando o cookie ainda não existe. */
function fbclidToFbc(): string | undefined {
  if (!isBrowser()) return undefined;
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
}

/**
 * Dispara um evento no Pixel e na CAPI com deduplicação por `event_id`.
 * @returns o event_id usado (útil para logs/debug).
 */
export function trackMetaEvent(
  eventName: MetaEventName,
  params: MetaEventParams = {},
): string {
  const eventId = newEventId();
  if (!isBrowser()) return eventId;

  const method = CUSTOM_EVENTS.has(eventName) ? "trackCustom" : "track";
  window.fbq?.(method, eventName, params, { eventID: eventId });
  sendToConversionsApi(eventName, eventId, params);
  return eventId;
}

/** Dados do produto reutilizados nos eventos de conversão. */
export const EVENT_PRODUCT = {
  content_name: "1º Simpósio Técnico e Prático de Neurociência da Memória",
  content_category: "Evento presencial",
  content_ids: ["simposio-neurociencia-memoria-2026"],
  content_type: "product",
  value: 250,
  currency: "BRL",
} as const satisfies MetaEventParams;

/** Atalho para os CTAs de inscrição. `source` identifica qual botão converteu. */
export function trackInitiateCheckout(source: string): void {
  trackMetaEvent("InitiateCheckout", { ...EVENT_PRODUCT, source });
}

/** Primeiro clique em "Inscreva-se agora" — antes do formulário de dados. */
export function trackPreLead(source: string): void {
  trackMetaEvent("PreLead", { ...EVENT_PRODUCT, source });
}

/** Envio do formulário com nome e telefone (clique em "Ir para o pagamento"). */
export function trackLead(source: string): void {
  trackMetaEvent("Lead", { ...EVENT_PRODUCT, source });
}

/** Atalho para o clique no WhatsApp. */
export function trackContact(source: string): void {
  trackMetaEvent("Contact", { content_name: EVENT_PRODUCT.content_name, source });
}
