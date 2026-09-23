import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SplitText } from "./SplitText";

const items = [
  { n: "01", title: "Público altamente qualificado", text: "250 participantes selecionados entre profissionais e estudantes engajados na vanguarda da neurociência." },
  { n: "02", title: "Entrega de diplomas", text: "Cerimônia da Pós-Graduação em Neurociência da Memória integrada à programação." },
  { n: "03", title: "Networking com prescritores", text: "Conexões diretas com profissionais da saúde, lideranças clínicas e indústria." },
  { n: "04", title: "Científico de alto nível", text: "Especialistas de referência nacional discutindo evidências, prática clínica e novos protocolos." },
  { n: "05", title: "Estrutura premium", text: "Centro de Convenções Millenium em São Paulo — auditório, áreas de exposição e coffee breaks inclusos." },
];

function Row({ item, i, total }: { item: typeof items[number]; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 30%"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.3, 1, 1, 0.4]);
  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="grid items-center gap-8 border-t border-white/10 py-12 md:grid-cols-[160px_1fr] md:py-20"
    >
      <div className="text-7xl leading-none text-gradient-violet md:text-9xl">{item.n}</div>
      <div>
        <h3 className="text-3xl text-white md:text-4xl">{item.title}</h3>
        <p className="mt-3 max-w-xl text-base text-white/65 md:text-lg">{item.text}</p>
        <div className="mt-4 text-xs uppercase tracking-[0.3em] text-white/30">
          {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>
    </motion.div>
  );
}

export function Differentials() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">— Diferenciais</span>
          <SplitText
            text="Cinco razões para estar presente."
            className="mt-5 text-balance text-4xl leading-[1.05] tracking-tight text-white md:text-6xl"
          />
        </div>
        <div className="border-b border-white/10">
          {items.map((it, i) => (
            <Row key={it.n} item={it} i={i} total={items.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
