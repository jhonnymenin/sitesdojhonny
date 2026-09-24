import { useEffect } from "react";
import { initOpenAiPixel, trackLeadCreated } from "@/lib/openai-pixel";

/**
 * Carrega o pixel do OpenAI Ads e dispara `lead_created` nos cliques de WhatsApp.
 *
 * O site não tem formulário: a conversão é a pessoa abrir a conversa. Os links de
 * WhatsApp estão em 8 lugares, espalhados por 7 componentes, então em vez de
 * colocar um onClick em cada um — mexendo em arquivos que o cliente aprovou — o
 * evento sai de um listener único no documento.
 *
 * Duas consequências boas: nenhum componente existente foi tocado, e qualquer
 * link de WhatsApp acrescentado no futuro já nasce medido.
 *
 * O listener roda na fase de captura para disparar antes de qualquer handler que
 * o link venha a ter, e não interfere na navegação — só observa.
 */
export function OpenAiPixel() {
  useEffect(() => {
    initOpenAiPixel();

    const aoClicar = (evento: MouseEvent) => {
      const alvo = evento.target;
      if (!(alvo instanceof Element)) return;
      if (alvo.closest('a[href*="wa.me/"]')) trackLeadCreated();
    };

    document.addEventListener("click", aoClicar, { capture: true });
    return () => document.removeEventListener("click", aoClicar, { capture: true });
  }, []);

  return null;
}
