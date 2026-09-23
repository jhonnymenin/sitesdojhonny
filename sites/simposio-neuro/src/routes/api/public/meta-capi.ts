import { createFileRoute } from "@tanstack/react-router";

/**
 * Endpoint da Meta Conversions API (server-side).
 *
 * Fica sob `/api/public/*` porque é chamado pelo navegador sem sessão.
 * Não recebe nem devolve PII: apenas nome do evento, event_id (para
 * deduplicação com o Pixel) e os identificadores de navegador da Meta
 * (`_fbp` / `_fbc`). IP e user-agent são lidos do próprio request.
 */

const GRAPH_API_VERSION = "v21.0";
const PIXEL_ID = "553465707797085";

const ALLOWED_EVENTS = new Set([
  "PageView",
  "ViewContent",
  "InitiateCheckout",
  "Contact",
  "Lead",
  "FindLocation",
  "Schedule",
  "ScrollDepth",
  "ViewSchedule",
  "ViewPricing",
  "ViewSpeakers",
  "PreLead",
]);

interface CapiBody {
  event_name: string;
  event_id: string;
  event_source_url?: string;
  action_source?: string;
  custom_data?: Record<string, unknown>;
  fbp?: string;
  fbc?: string;
}

function isSafeString(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= maxLength;
}

/** Valida o corpo da requisição; retorna null quando inválido. */
function parseBody(raw: unknown): CapiBody | null {
  if (typeof raw !== "object" || raw === null) return null;
  const body = raw as Record<string, unknown>;

  if (!isSafeString(body["event_name"], 64) || !ALLOWED_EVENTS.has(body["event_name"])) {
    return null;
  }
  if (!isSafeString(body["event_id"], 128)) return null;

  return {
    event_name: body["event_name"],
    event_id: body["event_id"],
    event_source_url: isSafeString(body["event_source_url"], 2048)
      ? body["event_source_url"]
      : undefined,
    action_source: "website",
    custom_data:
      typeof body["custom_data"] === "object" && body["custom_data"] !== null
        ? (body["custom_data"] as Record<string, unknown>)
        : undefined,
    fbp: isSafeString(body["fbp"], 256) ? body["fbp"] : undefined,
    fbc: isSafeString(body["fbc"], 256) ? body["fbc"] : undefined,
  };
}

export const Route = createFileRoute("/api/public/meta-capi")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Token lido dentro do handler: em Workers o env é injetado por request.
        const accessToken = process.env["META_CAPI_ACCESS_TOKEN"];
        if (!accessToken) {
          console.error("[meta-capi] META_CAPI_ACCESS_TOKEN ausente");
          // 204 para não poluir o console do visitante com erros de tracking.
          return new Response(null, { status: 204 });
        }

        let json: unknown;
        try {
          json = await request.json();
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const body = parseBody(json);
        if (!body) return new Response("Invalid payload", { status: 400 });

        // O IP do visitante melhora a taxa de correspondência da Meta, então vale
        // pegar o header certo de cada plataforma. `cf-connecting-ip` era o da
        // Cloudflare, onde este projeto rodava antes; na Vercel o IP real vem em
        // `x-real-ip`, com `x-forwarded-for` como alternativa (nele o visitante é
        // o primeiro da lista — os demais são proxies).
        const ip =
          request.headers.get("x-real-ip") ??
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          undefined;
        const userAgent = request.headers.get("user-agent") ?? undefined;

        const payload = {
          data: [
            {
              event_name: body.event_name,
              event_time: Math.floor(Date.now() / 1000),
              event_id: body.event_id,
              event_source_url: body.event_source_url,
              action_source: "website",
              user_data: {
                client_ip_address: ip,
                client_user_agent: userAgent,
                fbp: body.fbp,
                fbc: body.fbc,
              },
              custom_data: body.custom_data,
            },
          ],
        };

        try {
          const res = await fetch(
            `https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(accessToken)}`,
            {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(payload),
            },
          );

          if (!res.ok) {
            // Log server-side apenas; nunca devolvemos o erro do provedor ao cliente.
            console.error("[meta-capi] Graph API error", res.status, await res.text());
          }
        } catch (error) {
          console.error("[meta-capi] envio falhou", error);
        }

        return new Response(null, { status: 204 });
      },
    },
  },
});
