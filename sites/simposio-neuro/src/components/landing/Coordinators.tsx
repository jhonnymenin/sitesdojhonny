import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import gil from "@/assets/coord-gil.png";
import busse from "@/assets/coord-busse.png";
import { SplitText } from "./SplitText";

const coords = [
  {
    name: "Profa. Dra. Gislaine Gil",
    title: "Coordenação Científica",
    photo: gil,
    bio: [
      "Doutora em Ciências Médicas pela USP",
      "Mestre em Gerontologia Social pela PUC-SP",
      "Docente de Neurociência e Geriatria — Faculdade Sírio-Libanês",
      "Coordenadora da Pós-Graduação em Gerontologia e Empreendedorismo",
    ],
  },
  {
    name: "Dr. Alexandre L. Busse",
    title: "Coordenação Científica",
    photo: busse,
    bio: [
      "Doutorado em Medicina na FMUSP — Memória e Atividade Física",
      "Professor Livre-Docente de Geriatria — FMUSP",
      "Especialista em Geriatria (SBGG 2001) e Gerontologia (SBGG 2010)",
      "Médico no Serviço de Geriatria do HC-FMUSP",
    ],
  },
];

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}

export function Coordinators() {
  return (
    <section id="coordenacao" className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(at_50%_0%,rgba(139,92,246,0.18),transparent_60%)]" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">— Coordenação Científica</span>
          <SplitText
            text="Os nomes por trás da curadoria."
            className="mt-5 text-balance text-4xl leading-[1.05] tracking-tight text-white md:text-6xl"
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {coords.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
              style={{ perspective: 1200 }}
            >
              <TiltCard>
                <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card p-8 shadow-card backdrop-blur transition-colors hover:border-accent/40">
                  <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="flex items-start gap-6">
                    <div className="relative h-28 w-28 shrink-0">
                      <div className="absolute -inset-1 rounded-full bg-violet-gradient opacity-70 blur-md" />
                      <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-white/20">
                        <img src={c.photo} alt={c.name} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">{c.title}</div>
                      <h3 className="mt-1 text-2xl text-white md:text-3xl">{c.name}</h3>
                    </div>
                  </div>
                  <ul className="mt-7 space-y-3 border-t border-white/10 pt-6 text-sm text-white/70">
                    {c.bio.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-2 h-1 w-3 shrink-0 rounded-full bg-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
