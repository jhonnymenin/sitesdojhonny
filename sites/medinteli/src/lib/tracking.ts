import { pixelEnabled } from "./analytics";

type TrackPayload = {
  event_name: string;
  custom_data?: Record<string, unknown>;
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : undefined;
}

export async function trackEvent({ event_name, custom_data }: TrackPayload) {
  if (typeof window === "undefined") return;
  // Espelho com o Pixel desligado: não dispara nada, nem no navegador nem na
  // Conversions API. Ver src/lib/analytics.ts.
  if (!pixelEnabled) return;

  const eventId = `${event_name}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq === "function") {
    fbq("track", event_name, custom_data ?? {}, { eventID: eventId });
  }

  if (!SUPABASE_URL) return;

  try {
    await fetch(`${SUPABASE_URL}/functions/v1/fb-conversions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(SUPABASE_KEY ? { apikey: SUPABASE_KEY } : {}),
      },
      keepalive: true,
      body: JSON.stringify({
        event_name,
        event_id: eventId,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: window.location.href,
        custom_data: custom_data ?? {},
        user_data: {
          client_user_agent: navigator.userAgent,
          fbp: getCookie("_fbp"),
          fbc: getCookie("_fbc"),
        },
      }),
    });
  } catch (err) {
    console.error("tracking error", err);
  }
}

export function trackQuizClick(origin = "lp") {
  void trackEvent({
    event_name: "Lead",
    custom_data: { content_name: "diagnostico_gratuito", origem: origin },
  });
}

export function trackWhatsappClick(origin = "lp") {
  void trackEvent({
    event_name: "Contact",
    custom_data: { content_name: "falar_com_especialista", origem: origin },
  });
}

const firedSections = new Set<string>();

export function trackSectionOnce(section: string) {
  if (firedSections.has(section)) return;
  firedSections.add(section);
  void trackEvent({ event_name: "ViewContent", custom_data: { section } });
}

export function buildQuizUrl(base: string): string {
  if (typeof window === "undefined") return base;
  try {
    const url = new URL(base);
    const params = new URLSearchParams(window.location.search);

    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"].forEach((key) => {
      const value = params.get(key);
      if (value) url.searchParams.set(key, value);
    });

    const fbp = getCookie("_fbp");
    const fbc = getCookie("_fbc");
    if (fbp) url.searchParams.set("fbp", fbp);
    if (fbc) url.searchParams.set("fbc", fbc);

    url.searchParams.set("origem", "lp");
    return url.toString();
  } catch {
    return base;
  }
}
