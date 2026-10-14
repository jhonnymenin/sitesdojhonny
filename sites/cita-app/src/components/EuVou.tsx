import { useCallback, useEffect, useRef, useState } from "react";
import { Download, ImagePlus, Minus, Plus, RotateCcw, Check } from "lucide-react";
import moldura from "@/assets/euvou-moldura.webp";

/*
 * Moldura #EUVOU: a pessoa escolhe uma foto, encaixa no círculo e baixa a arte
 * pronta para publicar nos stories.
 *
 * GEOMETRIA. A arte é 1080x1920 e o disco da foto tem centro (540, 776) e raio
 * 331 — medido no arquivo, não estimado. A moldura é um WebP com esse disco
 * **vazado**: no arquivo original ele era cinza opaco e cobriria a foto. A
 * composição é foto embaixo, moldura por cima.
 *
 * O PROBLEMA QUE ISSO RESOLVE. Sem ajuste, quem sobe um close de rosto acaba com
 * só o nariz dentro do círculo. Então:
 *
 *  - A foto entra com o **menor zoom que ainda cobre o disco inteiro**, centrada.
 *    É o enquadramento que acerta na maioria dos casos sem ninguém tocar em nada.
 *  - Enquanto posiciona, a moldura fica **semitransparente**: dá para ver o que
 *    está fora do círculo e decidir o corte. Ao confirmar, ela volta a 100%.
 *  - Arrastar move, os botões −/+ e o controle deslizante dão o zoom. O zoom
 *    mínimo nunca deixa sobrar buraco: é sempre ≥ o que cobre o disco.
 *
 * O arquivo final é gerado em 1080x1920 num canvas fora da tela, não no tamanho
 * da prévia — o que a pessoa baixa tem a resolução da arte original.
 */

const ARTE_W = 1080;
const ARTE_H = 1920;
const CIRCULO = { cx: 540, cy: 776, r: 331 };

type Transform = { escala: number; x: number; y: number };

export function EuVou() {
  const [foto, setFoto] = useState<HTMLImageElement | null>(null);
  const [molduraImg, setMolduraImg] = useState<HTMLImageElement | null>(null);
  const [t, setT] = useState<Transform>({ escala: 1, x: 0, y: 0 });
  const [escalaMin, setEscalaMin] = useState(1);
  const [confirmado, setConfirmado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const palcoRef = useRef<HTMLDivElement>(null);
  const arrasto = useRef<{ ativo: boolean; px: number; py: number; ox: number; oy: number }>({
    ativo: false,
    px: 0,
    py: 0,
    ox: 0,
    oy: 0,
  });
  // Distância entre os dois dedos no início da pinça, para o zoom proporcional.
  const pinca = useRef<{ dist: number; escala: number } | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setMolduraImg(img);
    img.src = moldura;
  }, []);

  /** Menor escala que ainda cobre o disco inteiro — nunca sobra buraco. */
  const escalaDeCobertura = useCallback(
    (img: HTMLImageElement) => (CIRCULO.r * 2) / Math.min(img.naturalWidth, img.naturalHeight),
    [],
  );

  function aoEscolher(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    setErro(null);

    if (!arquivo.type.startsWith("image/")) {
      setErro("Escolha um arquivo de imagem.");
      return;
    }

    const url = URL.createObjectURL(arquivo);
    const img = new Image();
    img.onload = () => {
      const base = escalaDeCobertura(img);
      setEscalaMin(base);
      setT({ escala: base, x: 0, y: 0 });
      setFoto(img);
      setConfirmado(false);
    };
    img.onerror = () => {
      setErro("Não consegui abrir essa imagem. Tente outra.");
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  /*
   * Mantém a foto sempre cobrindo o disco: limita o deslocamento ao quanto
   * sobra de imagem além do círculo. Sem isso, arrastar demais abriria um vazio
   * branco dentro da moldura.
   */
  const limitar = useCallback((tr: Transform, img: HTMLImageElement): Transform => {
    const larg = img.naturalWidth * tr.escala;
    const alt = img.naturalHeight * tr.escala;
    const folgaX = Math.max(0, larg / 2 - CIRCULO.r);
    const folgaY = Math.max(0, alt / 2 - CIRCULO.r);
    return {
      escala: tr.escala,
      x: Math.max(-folgaX, Math.min(folgaX, tr.x)),
      y: Math.max(-folgaY, Math.min(folgaY, tr.y)),
    };
  }, []);

  const mudarEscala = useCallback(
    (nova: number) => {
      if (!foto) return;
      setT((atual) => limitar({ ...atual, escala: Math.max(escalaMin, Math.min(escalaMin * 4, nova)) }, foto));
    },
    [foto, escalaMin, limitar],
  );

  /** Converte pixels da tela em pixels da arte — a prévia é menor que 1080px. */
  const fator = () => (palcoRef.current ? ARTE_W / palcoRef.current.clientWidth : 1);

  function aoTocar(e: React.PointerEvent) {
    if (!foto || confirmado) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    arrasto.current = { ativo: true, px: e.clientX, py: e.clientY, ox: t.x, oy: t.y };
  }
  function aoMover(e: React.PointerEvent) {
    if (!arrasto.current.ativo || !foto) return;
    const f = fator();
    const nx = arrasto.current.ox + (e.clientX - arrasto.current.px) * f;
    const ny = arrasto.current.oy + (e.clientY - arrasto.current.py) * f;
    setT((atual) => limitar({ ...atual, x: nx, y: ny }, foto));
  }
  function aoSoltar() {
    arrasto.current.ativo = false;
  }

  function aoTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 2 && foto) {
      const [a, b] = [e.touches[0], e.touches[1]];
      pinca.current = {
        dist: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY),
        escala: t.escala,
      };
    }
  }
  function aoTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 2 && pinca.current && foto) {
      const [a, b] = [e.touches[0], e.touches[1]];
      const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      mudarEscala(pinca.current.escala * (d / pinca.current.dist));
    }
  }
  function aoTouchEnd() {
    pinca.current = null;
  }

  /** Desenha a arte final em 1080x1920, independente do tamanho da prévia. */
  function compor(): HTMLCanvasElement | null {
    if (!foto || !molduraImg) return null;
    const c = document.createElement("canvas");
    c.width = ARTE_W;
    c.height = ARTE_H;
    const ctx = c.getContext("2d");
    if (!ctx) return null;

    // Fundo branco: a moldura tem áreas translúcidas nas bordas da arte.
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, ARTE_W, ARTE_H);

    ctx.save();
    ctx.beginPath();
    ctx.arc(CIRCULO.cx, CIRCULO.cy, CIRCULO.r, 0, Math.PI * 2);
    ctx.clip();
    const larg = foto.naturalWidth * t.escala;
    const alt = foto.naturalHeight * t.escala;
    ctx.drawImage(foto, CIRCULO.cx - larg / 2 + t.x, CIRCULO.cy - alt / 2 + t.y, larg, alt);
    ctx.restore();

    ctx.drawImage(molduraImg, 0, 0, ARTE_W, ARTE_H);
    return c;
  }

  function baixar() {
    const c = compor();
    if (!c) return;
    c.toBlob((blob) => {
      if (!blob) {
        setErro("Não consegui gerar a imagem. Tente de novo.");
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "euvou-simposio-cita.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      // Sem o revoke o blob fica na memória até a aba fechar.
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    }, "image/png");
  }

  const pct = foto ? Math.round((t.escala / escalaMin) * 100) : 100;

  return (
    <div>
      {/* Palco: a prévia é um retângulo na proporção da arte (9:16). */}
      <div
        ref={palcoRef}
        className="relative mx-auto w-full max-w-[22rem] overflow-hidden rounded-2xl bg-white shadow-sm"
        // `touchAction: none` para o arraste não virar rolagem da página no celular.
        style={{ aspectRatio: `${ARTE_W} / ${ARTE_H}`, touchAction: "none" }}
        onPointerDown={aoTocar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
        onTouchStart={aoTouchStart}
        onTouchMove={aoTouchMove}
        onTouchEnd={aoTouchEnd}
      >
        {foto ? (
          <div
            className="absolute"
            style={{
              left: `${(CIRCULO.cx / ARTE_W) * 100}%`,
              top: `${(CIRCULO.cy / ARTE_H) * 100}%`,
              width: `${((CIRCULO.r * 2) / ARTE_W) * 100}%`,
              height: `${((CIRCULO.r * 2) / ARTE_H) * 100}%`,
              transform: "translate(-50%, -50%)",
              borderRadius: "9999px",
              overflow: "hidden",
            }}
          >
            <img
              src={foto.src}
              alt=""
              draggable={false}
              className="absolute top-1/2 left-1/2 max-w-none select-none"
              style={{
                width: `${(foto.naturalWidth * t.escala * 100) / (CIRCULO.r * 2)}%`,
                transform: `translate(calc(-50% + ${(t.x / (CIRCULO.r * 2)) * 100}%), calc(-50% + ${(t.y / (CIRCULO.r * 2)) * 100}%))`,
              }}
            />
          </div>
        ) : null}

        <img
          src={moldura}
          alt="Moldura #EuVou do I Simpósio CITA"
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full select-none transition-opacity duration-300"
          // Semitransparente enquanto posiciona, 100% depois de confirmar: é o
          // que deixa a pessoa ver o que está sendo cortado.
          style={{ opacity: !foto || confirmado ? 1 : 0.55 }}
        />

        {!foto ? (
          <div className="absolute inset-0 flex items-end justify-center p-5">
            <p className="rounded-full bg-[#004D5C]/90 px-4 py-2 text-center text-xs font-medium text-white">
              Escolha uma foto para começar
            </p>
          </div>
        ) : null}
      </div>

      {erro ? (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {erro}
        </p>
      ) : null}

      <div className="mt-5 space-y-3">
        <label className="app-card flex cursor-pointer items-center justify-center gap-2 p-4 text-sm font-semibold text-[#004D5C]">
          <ImagePlus size={18} strokeWidth={1.75} />
          {foto ? "Trocar a foto" : "Escolher uma foto"}
          <input type="file" accept="image/*" className="sr-only" onChange={aoEscolher} />
        </label>

        {foto && !confirmado ? (
          <>
            <div className="app-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wide text-[#004D5C] uppercase">
                  Aproximar
                </span>
                <span className="text-xs text-slate-500">{pct}%</span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => mudarEscala(t.escala / 1.15)}
                  aria-label="Diminuir o zoom"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 text-[#004D5C]"
                >
                  <Minus size={18} />
                </button>
                <input
                  type="range"
                  min={escalaMin}
                  max={escalaMin * 4}
                  step={escalaMin / 100}
                  value={t.escala}
                  onChange={(e) => mudarEscala(Number(e.target.value))}
                  aria-label="Zoom da foto"
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#004D5C]"
                />
                <button
                  type="button"
                  onClick={() => mudarEscala(t.escala * 1.15)}
                  aria-label="Aumentar o zoom"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 text-[#004D5C]"
                >
                  <Plus size={18} />
                </button>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                Arraste a foto para posicionar. No celular, dois dedos também aproximam.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => foto && setT({ escala: escalaDeCobertura(foto), x: 0, y: 0 })}
                className="app-card flex flex-1 items-center justify-center gap-2 p-4 text-sm font-semibold text-slate-600"
              >
                <RotateCcw size={16} strokeWidth={1.75} />
                Recomeçar
              </button>
              <button
                type="button"
                onClick={() => setConfirmado(true)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#004D5C] p-4 text-sm font-semibold text-white"
              >
                <Check size={16} strokeWidth={2} />
                Está bom
              </button>
            </div>
          </>
        ) : null}

        {foto && confirmado ? (
          <>
            <button
              type="button"
              onClick={baixar}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#004D5C] p-4 text-sm font-semibold text-white"
            >
              <Download size={18} strokeWidth={1.75} />
              Baixar minha arte
            </button>
            <button
              type="button"
              onClick={() => setConfirmado(false)}
              className="app-card flex w-full items-center justify-center gap-2 p-4 text-sm font-semibold text-slate-600"
            >
              Ajustar de novo
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
