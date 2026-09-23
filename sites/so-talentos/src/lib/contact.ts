/** Central contact data used across the site. */
export const WHATSAPP_NUMBER = "5511999672525";
export const WHATSAPP_DISPLAY = "+55 11 99967-2525";
export const INSTAGRAM_HANDLE = "agencia_so_talentos";
export const INSTAGRAM_URL = "https://instagram.com/agencia_so_talentos";

/** Builds a wa.me link with a pre-filled message. */
export const whatsappLink = (message: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá! Gostaria de contratar um artista para o meu evento.";
