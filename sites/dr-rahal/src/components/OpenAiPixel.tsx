import { useEffect } from "react";
import { initOpenAiPixel } from "@/lib/openai-pixel";

/**
 * Carrega o pixel do OpenAI Ads, só nos domínios de produção.
 *
 * Até 09/10/2026 este componente também ouvia os cliques nos links de WhatsApp
 * para disparar `lead_created`. O evento agora é `page_viewed`, que sai no
 * carregamento, então não há mais listener: o disparo inteiro mora no init.
 */
export function OpenAiPixel() {
  useEffect(() => {
    initOpenAiPixel();
  }, []);

  return null;
}
