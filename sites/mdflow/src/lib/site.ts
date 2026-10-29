/*
 * Origem pública do site. og:url, canonical e og:image precisam ser absolutos —
 * crawler nenhum resolve caminho relativo, e o Lovable emitia os dois como "/".
 *
 * `lp.mdflow.com.br` é onde esta página de vendas está no ar hoje, servida pelo
 * Lovable. **Não confundir com os outros dois domínios da MDFlow:**
 * `mdflow.com.br` é outro site ("Estude para o ENAMED") e `app.mdflow.com.br` é
 * o produto, que tem projeto próprio na Vercel, em outro repositório.
 *
 * Se o cutover para a Vercel apontar esta landing para outro endereço, trocar
 * aqui resolve o site inteiro.
 */
export const SITE_URL = "https://lp.mdflow.com.br";

export const siteUrl = (path = "/") => `${SITE_URL}${path}`;
