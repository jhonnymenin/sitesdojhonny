import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";

/*
 * Conversions API do Meta — o lado servidor da medição.
 *
 * Por que existe, já que o pixel do navegador manda os mesmos eventos: bloqueador
 * de anúncio, ITP do Safari e quem recusa cookie derrubam boa parte dos eventos do
 * navegador. O que sai do servidor não depende do navegador da pessoa, então a
 * campanha enxerga conversões que de outro jeito sumiriam.
 *
 * **Deduplicação.** Cada clique gera um `event_id` no navegador, que vai nos dois
 * caminhos: no `fbq` como `eventID` e aqui no payload. O Meta usa esse par
 * (event_name + event_id) para entender que é o mesmo evento chegando duas vezes
 * e contar uma só. Sem isso, toda conversão contaria em dobro e a campanha
 * otimizaria em cima de número inflado.
 *
 * **O token nunca chega ao navegador.** Ele mora em `META_CAPI_TOKEN`, sem o
 * prefixo VITE_ — variável com esse prefixo é embutida no bundle, e este
 * repositório é público. Quem tivesse o token poderia forjar conversões na conta
 * do MOC. Este arquivo roda só no servidor: o TanStack Start remove o corpo do
 * handler do bundle do cliente.
 */

const VERSAO_API = "v23.0";

/** O mesmo pixel do navegador. Aqui não é segredo, mas o token é. */
const PIXEL_ID = "28806691242248179";

/** Eventos que a landing sabe enviar. Restringir evita evento inventado no payload. */
const EVENTOS_ACEITOS = [
  "PageView",
  "ViewContent",
  "InitiateCheckout",
  "Contact",
  "OfertaSelecionada",
] as const;

type EventoAceito = (typeof EVENTOS_ACEITOS)[number];

export type EntradaCapi = {
  nome: EventoAceito;
  eventId: string;
  url: string;
  // `| undefined` explícito porque o projeto roda com exactOptionalPropertyTypes:
  // sem isso, omitir o campo e passá-lo como undefined seriam tipos diferentes.
  produto?: string | undefined;
  valor?: number | undefined;
};

/**
 * Valida o que veio do navegador.
 *
 * O endpoint é público — qualquer pessoa pode chamá-lo. A validação não impede
 * alguém de forjar um evento, mas impede que o payload chegue malformado ao Meta
 * e limita o estrago ao conjunto de eventos que a própria landing usa.
 */
function validar(entrada: unknown): EntradaCapi {
  const e = entrada as Partial<EntradaCapi> | null;
  if (!e || typeof e !== "object") throw new Error("payload inválido");
  if (!EVENTOS_ACEITOS.includes(e.nome as EventoAceito)) throw new Error("evento não aceito");
  if (typeof e.eventId !== "string" || e.eventId.length < 8 || e.eventId.length > 100) {
    throw new Error("event_id inválido");
  }
  if (typeof e.url !== "string" || !e.url.startsWith("http")) throw new Error("url inválida");
  return {
    nome: e.nome as EventoAceito,
    eventId: e.eventId,
    url: e.url.slice(0, 500),
    produto: typeof e.produto === "string" ? e.produto.slice(0, 120) : undefined,
    valor: typeof e.valor === "number" && Number.isFinite(e.valor) ? e.valor : undefined,
  };
}

/**
 * IP de quem está acessando.
 *
 * `getRequestIP` voltou vazio na Vercel, e o Meta **recusa o evento inteiro** se
 * não houver IP — user-agent sozinho não satisfaz o requisito de dado de
 * identificação. Por isso a busca é manual e em cascata pelos cabeçalhos que a
 * Vercel põe na requisição.
 *
 * O `x-forwarded-for` vem como lista separada por vírgula, do cliente até o
 * último proxy; o primeiro item é o visitante. Pegar o último pegaria o IP da
 * própria infraestrutura e estragaria o match.
 */
function ipDoVisitante(): string | undefined {
  const encadeado = getRequestHeader("x-forwarded-for");
  if (encadeado) {
    const primeiro = encadeado.split(",")[0]?.trim();
    if (primeiro) return primeiro;
  }
  for (const cabecalho of ["x-vercel-forwarded-for", "x-real-ip", "cf-connecting-ip"]) {
    const valor = getRequestHeader(cabecalho);
    if (valor) return valor.split(",")[0]?.trim();
  }
  return getRequestIP({ xForwardedFor: true });
}

export const enviarEventoCapi = createServerFn({ method: "POST" })
  .inputValidator(validar)
  .handler(async ({ data }) => {
    const token = process.env["META_CAPI_TOKEN"] ?? "";
    // Sem token configurado o servidor simplesmente não mede. Não é erro: em
    // desenvolvimento é justamente o que se quer, e em produção o pixel do
    // navegador continua funcionando sozinho.
    if (token === "") return { enviado: false, motivo: "sem token" };

    const ip = ipDoVisitante();
    const userAgent = getRequestHeader("user-agent");

    // O Meta recusa o evento inteiro quando não há nenhum dado de identificação,
    // e user-agent sozinho não conta. Sem IP não adianta gastar a chamada: o
    // pixel do navegador continua medindo por conta dele.
    if (!ip) {
      console.error("[CAPI] sem IP do visitante — evento não enviado");
      return { enviado: false, motivo: "sem ip" };
    }

    const evento: Record<string, unknown> = {
      event_name: data.nome,
      event_time: Math.floor(Date.now() / 1000),
      event_id: data.eventId,
      event_source_url: data.url,
      action_source: "website",
      // Sem formulário no site, não há e-mail nem telefone para enviar. IP e
      // user-agent são o que dá para mandar, e é o mínimo que o Meta usa para
      // casar o evento com a pessoa que viu o anúncio.
      user_data: {
        client_ip_address: ip,
        client_user_agent: userAgent,
      },
    };

    if (data.produto || data.valor !== undefined) {
      evento["custom_data"] = {
        content_name: data.produto,
        value: data.valor,
        currency: "BRL",
      };
    }

    try {
      const resposta = await fetch(
        `https://graph.facebook.com/${VERSAO_API}/${PIXEL_ID}/events`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ data: [evento], access_token: token }),
        },
      );
      const corpo = (await resposta.json()) as Record<string, unknown>;
      if (!resposta.ok) {
        // Só a mensagem, nunca o corpo inteiro: a resposta de erro do Graph
        // ecoa parte da requisição, e o log da Vercel é lido por mais gente.
        const erro = corpo["error"] as { message?: string } | undefined;
        console.error("[CAPI] Meta recusou o evento:", erro?.message ?? resposta.status);
        return { enviado: false, motivo: "recusado" };
      }
      return { enviado: true, recebidos: corpo["events_received"] ?? 0 };
    } catch (erro) {
      // Medição nunca pode quebrar a página. Se o Meta estiver fora do ar, o
      // clique da pessoa segue normalmente e só o evento se perde.
      console.error("[CAPI] falha ao enviar:", erro instanceof Error ? erro.message : erro);
      return { enviado: false, motivo: "exceção" };
    }
  });
