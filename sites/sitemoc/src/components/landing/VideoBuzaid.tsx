import { useState } from "react";
import { Play } from "lucide-react";
import capa from "@/assets/buzaid-video-capa.jpg";

/*
 * Chamada do curso com o Dr. Antonio Carlos Buzaid (1min39).
 *
 * **Carrega só no clique.** Até lá o que existe é uma imagem e um botão; o
 * player do Vimeo são centenas de KB de JavaScript de terceiro, e esta página
 * veio de uma reclamação de peso e lentidão. Quem não assiste não paga por ele.
 *
 * **16:9, não 4:3.** O snippet que o Vimeo entrega vem com `padding-top: 75%`,
 * que é proporção 4:3; o vídeo é 1920x1080. Com os 75% ele apareceria com tarja
 * preta em cima e embaixo. `aspect-video` resolve sem número mágico.
 *
 * `autoplay=1` só é acrescentado depois do clique — a pessoa pediu para ver, e
 * sem isso ela teria que dar um segundo play dentro do player.
 */
const VIDEO_ID = "1235628027";
const VIDEO_HASH = "767b837d0f";

export function VideoBuzaid({ className = "" }: { className?: string }) {
  const [tocando, setTocando] = useState(false);

  return (
    <figure className={className}>
      <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-black shadow-[0_24px_60px_-28px_rgb(0_0_0/0.7)]">
        {tocando ? (
          <iframe
            src={`https://player.vimeo.com/video/${VIDEO_ID}?h=${VIDEO_HASH}&autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479`}
            title="Chamada do X Curso Intensivo de Oncologia com o Dr. Antonio Carlos Buzaid"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setTocando(true)}
            aria-label="Assistir à chamada do curso com o Dr. Antonio Carlos Buzaid"
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            <img
              src={capa}
              alt=""
              width={1280}
              height={720}
              // A capa é o que a pessoa vê primeiro nesta coluna: carrega junto
              // com o hero, sem lazy, para não piscar em branco.
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
            />
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#144590] shadow-lg transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20"
            >
              <Play size={26} strokeWidth={2} className="ml-1 md:h-8 md:w-8" fill="currentColor" />
            </span>
            <span className="absolute inset-x-0 bottom-0 p-4 text-left md:p-5">
              <span className="label-mono block text-white/70">Assista · 1min39</span>
              <span className="mt-1 block font-display text-base font-semibold text-white md:text-lg">
                Dr. Antonio Carlos Buzaid convida você
              </span>
            </span>
          </button>
        )}
      </div>
    </figure>
  );
}
