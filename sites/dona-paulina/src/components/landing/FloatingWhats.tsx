const WHATS_URL =
  "https://wa.me/5511930352436?text=" +
  encodeURIComponent(
    "Olá! Quero saber mais sobre as vagas da Fundação Dona Paulina de Souza Queiroz.",
  );

export function FloatingWhats() {
  return (
    <a
      href={WHATS_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a equipe no WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full text-white shadow-card transition-transform hover:scale-110 animate-[pulse-ring_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
      style={{ backgroundColor: "var(--color-whatsapp)" }}
    >
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.057 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.992c-.003 5.45-4.437 9.886-9.885 9.886zM20.52 3.449C18.24 1.245 15.24.013 12.057 0 5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.555 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.52 3.45z" />
      </svg>
    </a>
  );
}
