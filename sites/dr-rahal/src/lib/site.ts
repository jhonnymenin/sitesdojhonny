/**
 * ATENÇÃO: o número abaixo é um placeholder — 5511999999999, nove noves. Veio
 * assim do projeto original. Enquanto não for trocado pelo WhatsApp real do
 * consultório, todos os CTAs de contato do site levam a um número inexistente.
 */
export const WHATSAPP_URL =
  "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20com%20o%20Dr.%20Rahal";

export const INSTAGRAM_URL = "https://www.instagram.com/antoniorahal";

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
