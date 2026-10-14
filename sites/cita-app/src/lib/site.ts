/*
 * Origem pública do app. og:url, canonical e og:image precisam ser absolutos —
 * crawler nenhum resolve caminho relativo.
 *
 * **PROVISÓRIO: endereço da Vercel.** Trocar pelo domínio final assim que ele
 * existir. O app tem o próprio `public/og-image.png`; antes da migração o
 * og:image apontava para `simposiocita.com.br`, que é o site institucional do
 * evento — outro projeto, outra arte.
 */
export const SITE_URL = "https://cita-app.vercel.app";

export const siteUrl = (path = "/") => `${SITE_URL}${path}`;
