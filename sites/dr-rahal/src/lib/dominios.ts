/*
 * Os domínios em que este site responde.
 *
 * São **quatro**: `.com` e `.com.br`, cada um com o apex devolvendo 308 para o
 * www. Os apex entram na lista mesmo redirecionando, para nada parar em silêncio
 * caso algum deles passe a servir o site direto.
 *
 * A lista vive aqui, num lugar só, porque o GTM e o pixel da OpenAI dependem
 * dela para decidir se podem disparar. Na primeira versão do GTM cada um teria a
 * sua cópia, e o `.com.br` acabou ficando de fora de uma delas: o container
 * simplesmente não carregava naquele domínio, sem erro nenhum aparecendo.
 *
 * **Ao acrescentar domínio na Vercel, acrescentar aqui.** É o único lugar.
 */
export const HOSTS_DE_PRODUCAO = [
  "www.drrahaltireoide.com",
  "drrahaltireoide.com",
  "www.drrahaltireoide.com.br",
  "drrahaltireoide.com.br",
];

/**
 * True quando o código está rodando num domínio de produção.
 *
 * Sempre false no servidor e em qualquer ambiente que não seja um dos domínios
 * acima — localhost e os previews da Vercel incluídos. É o que impede que um
 * `npm run dev` mande evento para a conta de anúncios real do cliente.
 */
export function emProducao(): boolean {
  if (typeof window === "undefined") return false;
  return HOSTS_DE_PRODUCAO.includes(window.location.hostname);
}
