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
 *
 * A capa é a arte oficial da chamada, que já traz o nome do curso, o ano e a
 * marca do MOC. Por isso a sobreposição aqui é mínima: só o botão de play e a
 * duração. O véu escuro e a legenda que havia antes foram desenhados para um
 * frame cru do vídeo — sobre uma arte clara e já titulada, escureciam a peça e
 * repetiam em texto o que a imagem diz.
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
            {/* Escurece só no hover, de leve: a arte é clara e precisa continuar legível. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[#144590]/0 transition-colors duration-300 group-hover:bg-[#144590]/15"
            />
            {/*
              O play fica sobre o quadro do Buzaid, não no centro geométrico.
              Centralizado ele cobria a palavra "ONCOLOGIA" do título da arte —
              e, num vídeo, o lugar onde se espera clicar é sobre a pessoa.

              Os 68% são medidos nesta arte (título à esquerda, quadro à
              direita). Se a peça mudar de composição, este número muda junto.
            */}
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-[68%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#144590] text-white shadow-[0_10px_30px_-8px_rgb(0_0_0/0.5)] ring-4 ring-white/80 transition-transform duration-300 group-hover:scale-110 md:h-[72px] md:w-[72px]"
            >
              <Play size={22} strokeWidth={2} className="ml-0.5 md:h-7 md:w-7" fill="currentColor" />
            </span>
            {/* A duração não está na arte, e saber que é curto aumenta o play. */}
            <span className="absolute right-3 bottom-3 rounded-full bg-black/65 px-3 py-1 text-xs font-medium text-white md:right-4 md:bottom-4">
              1min39
            </span>
          </button>
        )}
      </div>
    </figure>
  );
}
