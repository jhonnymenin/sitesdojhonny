import { useCallback, useEffect, useRef, useState } from "react";
import { Download, ImagePlus, Minus, Plus, RotateCcw, Check, Share2 } from "lucide-react";
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
const NOME_ARQUIVO = "euvou-simposio-cita.png";

type Transform = { escala: number; x: number; y: number };

export function EuVou() {
  const [foto, setFoto] = useState<HTMLImageElement | null>(null);
  const [molduraImg, setMolduraImg] = useState<HTMLImageElement | null>(null);
  const [t, setT] = useState<Transform>({ escala: 1, x: 0, y: 0 });
  const [escalaMin, setEscalaMin] = useState(1);
  const [confirmado, setConfirmado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  /*
   * Detalhe técnico do que falhou. Aparece só quando dá erro, em letra miúda.
   * Serve para quando a falha acontece num aparelho que não temos em mãos: o
   * print de quem reclamou passa a dizer o motivo, em vez de só "não deu".
   */
  const [detalhe, setDetalhe] = useState<string | null>(null);
  /** URL da arte pronta. Fica na tela para dar o caminho do toque longo no iOS. */
  const [resultado, setResultado] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);
  const [podeCompartilhar, setPodeCompartilhar] = useState(false);

  const palcoRef = useRef<HTMLDivElement>(null);
  const resultadoRef = useRef<HTMLDivElement>(null);
  const arrasto = useRef<{ ativo: boolean; id: number; px: number; py: number; ox: number; oy: number }>({
    ativo: false,
    id: -1,
    px: 0,
    py: 0,
    ox: 0,
    oy: 0,
  });
  /** Dedos encostados no palco. Mais de um = pinça, e aí ninguém arrasta. */
  const dedos = useRef<Set<number>>(new Set());
  // Distância entre os dois dedos no início da pinça, para o zoom proporcional.
  const pinca = useRef<{ dist: number; escala: number } | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setMolduraImg(img);
    img.src = moldura;

    // Só no cliente, e com um arquivo de mentira: `canShare` responde conforme o
    // tipo, então perguntar sem arquivo daria true em aparelho que não manda
    // imagem nenhuma.
    try {
      const teste = new File([new Blob()], "t.png", { type: "image/png" });
      setPodeCompartilhar(Boolean(navigator.canShare?.({ files: [teste] })));
    } catch {
      setPodeCompartilhar(false);
    }
  }, []);

  /** Menor escala que ainda cobre o disco inteiro — nunca sobra buraco. */
  const escalaDeCobertura = useCallback(
    (img: HTMLImageElement) => (CIRCULO.r * 2) / Math.min(img.naturalWidth, img.naturalHeight),
    [],
  );

  /*
   * Abrir a foto que a pessoa escolheu — a parte que mais quebrava no Android.
   *
   * TRÊS COISAS DAVAM CÍRCULO VAZIO, e nenhuma delas avisava:
   *
   * 1. O tipo do arquivo era usado como porteiro (`type.startsWith("image/")`).
   *    No Android o seletor devolve muita foto com `type` vazio ou
   *    `application/octet-stream` — típico de imagem vinda do Google Fotos ou do
   *    Drive. A foto era boa e ficava de fora. Agora quem decide é a decodificação:
   *    se abrir, é imagem.
   *
   * 2. Imagem que carrega mas mede 0x0 deixava a escala em Infinity, e a largura
   *    da prévia virava `Infinity%` — ou seja, nada na tela, sem erro nenhum.
   *
   * 3. Foto de celular moderno tem 12, 50, 108 megapixels. O disco final tem 662
   *    pixels. Carregar o arquivo inteiro na memória para mostrar num círculo
   *    desse tamanho é desperdício que o iPhone aguenta e o Android intermediário
   *    não: a imagem decodifica e simplesmente não pinta. Agora a foto é reduzida
   *    para no máximo 1600px do lado maior antes de qualquer coisa — sem perda
   *    visível, porque é mais que o dobro do que o círculo usa.
   */
  const LADO_MAXIMO = 1600;

  /** Decodifica o arquivo. `createImageBitmap` é o caminho que menos falha no
   *  Android; o `<img>` fica de reserva para quem não tiver. Os dois já aplicam
   *  a rotação do EXIF, então a foto nunca sai deitada. */
  async function decodificar(arquivo: Blob): Promise<ImageBitmap | HTMLImageElement> {
    if (typeof createImageBitmap === "function") {
      try {
        return await createImageBitmap(arquivo, { imageOrientation: "from-image" });
      } catch (e) {
        passos.current.push(`bitmap:${(e as Error)?.name ?? "falhou"}`);
      }
    } else {
      passos.current.push("bitmap:indisponível");
    }
    const url = URL.createObjectURL(arquivo);
    try {
      return await new Promise<HTMLImageElement>((ok, falha) => {
        const img = new Image();
        img.onload = () => ok(img);
        img.onerror = () => falha(new Error("decode"));
        img.src = url;
      });
    } finally {
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    }
  }

  /** Converte o que foi decodificado numa <img> já reduzida, pronta para usar. */
  async function prepararFoto(arquivo: Blob): Promise<HTMLImageElement> {
    const fonte = await decodificar(arquivo);
    const lw = "width" in fonte ? fonte.width : (fonte as HTMLImageElement).naturalWidth;
    const lh = "height" in fonte ? fonte.height : (fonte as HTMLImageElement).naturalHeight;
    if (!lw || !lh) throw new Error("vazia");

    const reducao = Math.min(1, LADO_MAXIMO / Math.max(lw, lh));
    const c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(lw * reducao));
    c.height = Math.max(1, Math.round(lh * reducao));
    const ctx = c.getContext("2d");
    if (!ctx) throw new Error("canvas");
    ctx.drawImage(fonte as CanvasImageSource, 0, 0, c.width, c.height);
    if ("close" in fonte) fonte.close();

    const blob = await new Promise<Blob | null>((ok) => c.toBlob(ok, "image/jpeg", 0.92));
    if (!blob) throw new Error("blob");

    const url = URL.createObjectURL(blob);
    const img = await new Promise<HTMLImageElement>((ok, falha) => {
      const el = new Image();
      el.onload = () => ok(el);
      el.onerror = () => falha(new Error("recarregar"));
      el.src = url;
    });
    if (!img.naturalWidth || !img.naturalHeight) throw new Error("vazia");
    return img;
  }

  /** Rastro do caminho percorrido, para a mensagem de erro. */
  const passos = useRef<string[]>([]);

  async function aoEscolher(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    passos.current = [];
    // O valor é limpo para que escolher a MESMA foto de novo volte a disparar o
    // evento — sem isso, quem tenta de novo depois de um erro não consegue.
    e.target.value = "";
    if (!arquivo) return;
    setErro(null);
    setDetalhe(null);
    setOcupado(true);
    const kb = Math.round(arquivo.size / 1024);
    try {
      const img = await prepararFoto(arquivo);
      const base = escalaDeCobertura(img);
      setEscalaMin(base);
      setT({ escala: base, x: 0, y: 0 });
      setFoto(img);
      setConfirmado(false);
      setResultado((a) => {
        if (a) URL.revokeObjectURL(a);
        return null;
      });
    } catch (e) {
      setErro("Não consegui abrir essa foto. Tente outra, ou tire uma nova pela câmera.");
      setDetalhe(
        `${(e as Error)?.message ?? "erro"} · tipo "${arquivo.type || "(vazio)"}" · ${kb} KB` +
          (passos.current.length ? ` · ${passos.current.join(" ")}` : ""),
      );
    } finally {
      setOcupado(false);
    }
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
    // Só o primeiro dedo arrasta. Sem isso o segundo dedo da pinça reiniciava o
    // arrasto na posição dele e a foto saltava enquanto a pessoa dava zoom.
    if (dedos.current.size > 0) {
      arrasto.current.ativo = false;
      dedos.current.add(e.pointerId);
      return;
    }
    dedos.current.add(e.pointerId);
    (e.target as Element).setPointerCapture?.(e.pointerId);
    arrasto.current = { ativo: true, id: e.pointerId, px: e.clientX, py: e.clientY, ox: t.x, oy: t.y };
  }
  function aoMover(e: React.PointerEvent) {
    if (!arrasto.current.ativo || !foto) return;
    if (e.pointerId !== arrasto.current.id || dedos.current.size > 1) return;
    const f = fator();
    const nx = arrasto.current.ox + (e.clientX - arrasto.current.px) * f;
    const ny = arrasto.current.oy + (e.clientY - arrasto.current.py) * f;
    setT((atual) => limitar({ ...atual, x: nx, y: ny }, foto));
  }
  function aoSoltar(e: React.PointerEvent) {
    dedos.current.delete(e.pointerId);
    if (e.pointerId === arrasto.current.id) arrasto.current.ativo = false;
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

  /*
   * Salvar no celular não é baixar.
   *
   * O caminho antigo era só `<a download>`, que é o jeito do desktop. No iPhone
   * o Safari ignora o atributo em blob: a arte abria numa aba e morria ali, sem
   * ir para o Fotos — foi o "no mobile não funcionou". O caminho certo no
   * celular é a folha de compartilhamento do próprio sistema, que já traz
   * "Salvar em Fotos", Instagram e WhatsApp, que é para onde a arte vai mesmo.
   *
   * Ordem: compartilhar (se o aparelho souber mandar arquivo), senão baixar. E,
   * dê certo ou não, a arte final fica visível na tela: no iPhone dá para
   * segurar o dedo na imagem e salvar, que é a saída que funciona em qualquer
   * navegador, inclusive o de dentro do Instagram.
   */
  async function gerar(): Promise<Blob | null> {
    const c = compor();
    if (!c) return null;
    return new Promise((resolve) => c.toBlob((b) => resolve(b), "image/png"));
  }

  function baixarBlob(blob: Blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = NOME_ARQUIVO;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // Sem o revoke o blob fica na memória até a aba fechar.
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  async function salvar() {
    setErro(null);
    setOcupado(true);
    try {
      const blob = await gerar();
      if (!blob) {
        setErro("Não consegui gerar a imagem. Tente de novo.");
        return;
      }

      // A arte vai para a tela antes de qualquer tentativa: se o compartilhar
      // falhar, a pessoa já tem a imagem ali para segurar o dedo e salvar.
      setResultado((anterior) => {
        if (anterior) URL.revokeObjectURL(anterior);
        return URL.createObjectURL(blob);
      });

      // A arte pronta nasce abaixo da dobra; sem isso a dica de segurar o dedo
      // fica numa parte da tela que a pessoa não viu.
      requestAnimationFrame(() =>
        resultadoRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
      );

      const arquivo = new File([blob], NOME_ARQUIVO, { type: "image/png" });
      if (navigator.canShare?.({ files: [arquivo] })) {
        try {
          await navigator.share({ files: [arquivo], title: "#EuVou — I Simpósio CITA" });
          return;
        } catch (e) {
          // Cancelar não é erro: a pessoa fechou a folha de propósito.
          if ((e as DOMException)?.name === "AbortError") return;
        }
      }
      baixarBlob(blob);
    } finally {
      setOcupado(false);
    }
  }

  const pct = foto ? Math.round((t.escala / escalaMin) * 100) : 100;

  return (
    /*
      Prévia e controles como duas células: empilhadas no retrato, lado a lado
      quando a tela é larga e baixa (celular deitado). Ver `.euvou-layout`.
    */
    <div className="euvou-layout">
      {/* Palco: a prévia é um retângulo na proporção da arte (9:16). */}
      <div
        ref={palcoRef}
        // `palco-euvou` manda na altura; a largura sai da proporção. Dimensionar
        // pela largura fazia a prévia ocupar a tela inteira do Android e empurrar
        // o botão de escolher a foto para fora dela.
        className="palco-euvou relative mx-auto overflow-hidden rounded-2xl bg-white shadow-sm"
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
            {/*
              O deslocamento vai em `left`/`top`, não dentro do `transform`.

              Porcentagem em `translate()` é relativa ao **próprio elemento**, e
              não ao container: `translate(10%)` desloca 10% da largura da
              imagem. Como a imagem é sempre maior que o círculo, o arrasto na
              prévia andava mais do que o arrasto real — a arte baixada saía com
              um enquadramento diferente do que a pessoa tinha ajustado. Em
              `left`/`top` a porcentagem é relativa ao container (o círculo), que
              é o que queremos. O `translate(-50%, -50%)` fica, porque aí 50% do
              próprio tamanho é exatamente o que centra a imagem.
            */}
            <img
              src={foto.src}
              alt=""
              draggable={false}
              className="absolute max-w-none -translate-x-1/2 -translate-y-1/2 select-none"
              style={{
                width: `${(foto.naturalWidth * t.escala * 100) / (CIRCULO.r * 2)}%`,
                left: `${50 + (t.x / (CIRCULO.r * 2)) * 100}%`,
                top: `${50 + (t.y / (CIRCULO.r * 2)) * 100}%`,
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

      <div className="euvou-controles">
        {erro ? (
          <div className="mb-3 rounded-lg bg-red-50 px-4 py-3 text-red-700" role="alert">
            <p className="text-sm">{erro}</p>
            {detalhe ? (
              <p className="mt-1.5 font-mono text-[10px] leading-snug break-all text-red-700/70">
                {detalhe}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="space-y-3">
        {/*
          Abrir a foto agora é assíncrono (decodifica e reduz antes de mostrar).
          Em foto grande isso leva um instante, e sem aviso o toque parece ter
          falhado — foi assim que o círculo vazio passou por "não funcionou".
        */}
        <label className="app-card flex cursor-pointer items-center justify-center gap-2 p-4 text-sm font-semibold text-[#004D5C]">
          <ImagePlus size={18} strokeWidth={1.75} />
          {ocupado && !foto ? "Abrindo a foto…" : foto ? "Trocar a foto" : "Escolher uma foto"}
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
              onClick={salvar}
              disabled={ocupado}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#004D5C] p-4 text-sm font-semibold text-white disabled:opacity-60"
            >
              {podeCompartilhar ? <Share2 size={18} strokeWidth={1.75} /> : <Download size={18} strokeWidth={1.75} />}
              {ocupado ? "Gerando…" : podeCompartilhar ? "Salvar e compartilhar" : "Baixar minha arte"}
            </button>

            {resultado ? (
              <div ref={resultadoRef} className="app-card p-4">
                <p className="text-xs leading-relaxed text-slate-500">
                  Pronto! Se a sua arte não foi para a galeria,{" "}
                  <strong className="font-semibold text-[#004D5C]">
                    toque e segure na imagem abaixo
                  </strong>{" "}
                  e escolha salvar.
                </p>
                {/*
                  A arte fica aqui como imagem de verdade, e não como canvas: é o
                  toque longo que salva no iPhone, inclusive dentro do navegador
                  do Instagram, onde compartilhar e baixar não funcionam.
                */}
                <img
                  src={resultado}
                  alt="Sua arte #EuVou pronta para salvar"
                  className="mt-3 w-full rounded-xl"
                />
                <a
                  href={resultado}
                  download={NOME_ARQUIVO}
                  className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-slate-200 p-3 text-sm font-semibold text-slate-600"
                >
                  <Download size={16} strokeWidth={1.75} />
                  Baixar de novo
                </a>
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => {
                setConfirmado(false);
                // A arte mostrada é de um enquadramento que deixou de valer.
                setResultado((a) => {
                  if (a) URL.revokeObjectURL(a);
                  return null;
                });
              }}
              className="app-card flex w-full items-center justify-center gap-2 p-4 text-sm font-semibold text-slate-600"
            >
              Ajustar de novo
            </button>
          </>
        ) : null}
        </div>
      </div>
    </div>
  );
}
