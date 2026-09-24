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
 * O site vai responder por mais de um domínio. Este é o canônico: é o que os
 * buscadores devem indexar e o que aparece nos previews de compartilhamento. Os
 * outros devem **redirecionar** para cá, não servir o mesmo conteúdo — dois
 * domínios entregando a mesma página sem canonical dividem a autoridade de SEO.
 */
export const SITE_URL = "https://drrahaltireoide.com";

export const siteUrl = (path = "/") => `${SITE_URL}${path}`;
