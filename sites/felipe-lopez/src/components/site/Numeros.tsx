import { useEffect, useRef, useState } from "react";

/*
 * Faixa de números, no mesmo desenho da do Dr. Rahal: valor grande em fonte
 * display, rótulo em caixa alta com tracking largo e um fio separando as
 * colunas. Os números contam do zero quando a faixa entra na tela.
 *
 * A contagem é escrita aqui em vez de usar o `react-countup` do Rahal. São duas
 * dependências (contador e observador de viewport) para ~30 linhas de código, e
 * este site não tem nenhuma das duas instaladas — cada site do monorepo carrega
 * o próprio `package.json`, então acrescentar pacote aqui é custo real.
 *
 * `prefers-reduced-motion` pula a animação e mostra o valor final: contador
 * correndo é exatamente o tipo de movimento que incomoda quem pediu para
 * reduzir.
 */
const NUMEROS = [
  {
    ate: 1500,
    rotulo: "Procedimentos faciais realizados com foco em resultados naturais",
  },
  {
    ate: 2000,
    rotulo: "Pacientes atendidos em 10 anos de experiência",
  },
];

const DURACAO = 1800;

function formatar(n: number) {
  return n.toLocaleString("pt-BR");
}

function useContagem(ate: number, ativo: boolean) {
  const [valor, setValor] = useState(0);

  useEffect(() => {
    if (!ativo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValor(ate);
      return;
    }
    let frame = 0;
    const inicio = performance.now();
    const passo = (agora: number) => {
      const t = Math.min(1, (agora - inicio) / DURACAO);
      // Desaceleração no fim: o número "assenta" em vez de parar de supetão.
      const suave = 1 - Math.pow(1 - t, 3);
      setValor(Math.round(ate * suave));
      if (t < 1) frame = requestAnimationFrame(passo);
    };
    frame = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(frame);
  }, [ate, ativo]);

  return valor;
}

export function Numeros() {
  const ref = useRef<HTMLElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Sem IntersectionObserver (navegador antigo), mostra o número direto em vez
    // de deixar a faixa zerada para sempre.
    if (typeof IntersectionObserver === "undefined") {
      setVisivel(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisivel(true);
          obs.disconnect(); // conta uma vez só
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Números do consultório"
      className="bg-paper-cream relative scroll-mt-20"
    >
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 px-6 sm:grid-cols-2 md:px-10 lg:px-14">
        {NUMEROS.map((n, i) => (
          <Celula key={n.rotulo} {...n} ativo={visivel} primeira={i === 0} />
        ))}
      </div>
    </section>
  );
}

function Celula({
  ate,
  rotulo,
  ativo,
  primeira,
}: {
  ate: number;
  rotulo: string;
  ativo: boolean;
  primeira: boolean;
}) {
  const valor = useContagem(ate, ativo);
  return (
    <div
      className={[
        "px-4 py-14 text-center md:py-20",
        // O fio fica entre as colunas: embaixo quando empilhado, ao lado quando
        // lado a lado — nunca sobrando na borda do bloco.
        primeira ? "border-b sm:border-r sm:border-b-0" : "",
      ].join(" ")}
      style={primeira ? { borderColor: "var(--gold-soft)" } : undefined}
    >
      <p
        className="font-display leading-none font-light"
        style={{ fontSize: "clamp(3rem, 7vw, 5.2rem)", color: "var(--brown-ink)" }}
      >
        {formatar(valor)}
        <span style={{ color: "var(--color-gold)" }}>+</span>
      </p>
      <p
        className="mx-auto mt-6 max-w-[16rem] text-[10px] leading-relaxed tracking-[0.26em] uppercase"
        style={{ color: "var(--brown-soft)" }}
      >
        {rotulo}
      </p>
    </div>
  );
}
