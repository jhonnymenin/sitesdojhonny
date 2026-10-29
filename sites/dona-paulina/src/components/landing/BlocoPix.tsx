import { useEffect, useRef, useState } from "react";
import { Check, Copy, QrCode } from "lucide-react";
import { PIX } from "@/lib/pix";

/*
 * O bloco da chave Pix — usado no Simpósio e na Campanha Laços que Protegem.
 *
 * O botão COPIA O FORMATO E.164 (+55 e DDD), não o número com parênteses: ver o
 * comentário em lib/pix.ts.
 *
 * O `document.execCommand` continua aí de propósito. `navigator.clipboard` só
 * existe em contexto seguro e, em navegador embutido do Instagram e do WhatsApp
 * — de onde vem boa parte do público desta página —, ele falha calado. Sem o
 * caminho antigo, o botão não faria nada e a pessoa não teria como saber.
 */
export function BlocoPix({
  titulo = "Contribuição por Pix",
  compacto = false,
  rodape,
}: {
  titulo?: string;
  compacto?: boolean;
  /** Texto abaixo da chave. Omitido quando `compacto`. */
  rodape?: string;
}) {
  const [copiado, setCopiado] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copiar() {
    const texto = PIX.chave;
    let deu = false;
    try {
      await navigator.clipboard.writeText(texto);
      deu = true;
    } catch {
      try {
        const campo = document.createElement("textarea");
        campo.value = texto;
        campo.setAttribute("readonly", "");
        campo.style.position = "fixed";
        campo.style.opacity = "0";
        document.body.appendChild(campo);
        campo.select();
        deu = document.execCommand("copy");
        document.body.removeChild(campo);
      } catch {
        deu = false;
      }
    }
    // Sem cópia, o número fica selecionável na tela — por isso ele é texto, e
    // não imagem. O aviso evita a pessoa achar que copiou e colar coisa errada.
    if (!deu) {
      window.alert(`Copie a chave Pix manualmente: ${texto}`);
      return;
    }
    setCopiado(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopiado(false), 2500);
  }

  return (
    <div
      className={`rounded-2xl border border-primary/20 bg-primary-soft/60 ${
        compacto ? "px-4 py-3" : "px-5 py-4"
      }`}
    >
      <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-[color:var(--primary-dark)] uppercase">
        <QrCode size={14} className="shrink-0" /> {titulo}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
        <p className="min-w-0">
          <span className="block text-[11px] font-semibold text-charcoal/55 uppercase">
            Chave {PIX.tipo}
          </span>
          <span className="block font-display text-lg font-bold text-charcoal tabular-nums select-all">
            {PIX.exibicao}
          </span>
        </p>

        <button
          type="button"
          onClick={copiar}
          className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/40 px-4 py-2 text-xs font-bold text-[color:var(--primary-dark)] transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          {copiado ? <Check size={14} /> : <Copy size={14} />}
          {copiado ? "Chave copiada" : "Copiar chave"}
        </button>
      </div>

      {!compacto && rodape && (
        <p className="mt-3 text-sm leading-relaxed text-charcoal/65">{rodape}</p>
      )}
    </div>
  );
}
