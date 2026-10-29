/*
 * Destino de todos os CTAs da landing.
 *
 * O app está em app.mdflow.com.br e é lá que a pessoa cria a conta — não há
 * formulário nesta página, e nenhum lugar para guardar lead se houvesse.
 *
 * Os parâmetros UTM vão junto de propósito. O brief pede acompanhamento de
 * cliques e cadastros, e **não há nenhuma ferramenta de analytics instalada
 * aqui** (nem pixel, nem GA, nem tag manager). Sem um rastreador, a única forma
 * honesta de atribuir um cadastro à landing é o próprio app ler a origem. Se
 * depois entrar uma ferramenta de verdade, os UTMs continuam valendo.
 */
const DESTINO = "https://app.mdflow.com.br";

export function cadastroUrl(local: string): string {
  const p = new URLSearchParams({
    utm_source: "lp",
    utm_medium: "site",
    utm_campaign: "enamed-teste-gratuito",
    utm_content: local,
  });
  return `${DESTINO}/?${p.toString()}`;
}
