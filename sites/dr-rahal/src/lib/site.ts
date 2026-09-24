/** WhatsApp do consultório, em formato internacional e só dígitos. */
const WHATSAPP_NUMERO = "5511998109000";

/** Mensagem que já vai preenchida ao abrir a conversa. */
const WHATSAPP_MENSAGEM = "Olá, gostaria de agendar uma consulta com o Dr. Rahal";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAGEM)}`;

export const INSTAGRAM_URL = "https://www.instagram.com/antoniorahal/";

/**
 * Origem pública do site. og:url, canonical e og:image precisam ser absolutos —
 * crawlers não resolvem caminhos relativos.
 *
 * **Com www, de propósito.** Na Vercel o domínio principal é
 * `www.drrahaltireoide.com`, e o apex (`drrahaltireoide.com`) responde 308
 * redirecionando para ele. O canonical precisa apontar para a URL final, que é a
 * que o visitante realmente acessa: declarar uma URL que redireciona faz o
 * buscador dar um salto a mais e abre espaço para ele escolher sozinho qual
 * versão indexar.
 *
 * Se um dia o apex virar o principal na Vercel, esta linha muda junto.
 */
export const SITE_URL = "https://www.drrahaltireoide.com";

export const siteUrl = (path = "/") => `${SITE_URL}${path}`;
