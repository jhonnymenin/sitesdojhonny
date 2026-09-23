import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Check, Tag, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadCaptureDialog } from "./LeadCaptureDialog";
import { trackPreLead } from "@/lib/meta-pixel";


const included = [
  "1 dia de evento presencial completo",
  "Coffee breaks inclusos",
  "Certificado de participação",
  "Acesso a todas as palestras e práticas",
  "Material do congressista",
];

function Counter({ to, duration = 1.4 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());
  useEffect(() => {
    if (!inView) return;
    const c = animate(mv, to, { duration, ease: [0.2, 0.7, 0.2, 1] });
    return c.stop;
  }, [inView, mv, to, duration]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function PurchaseCard() {
  const [leadOpen, setLeadOpen] = useState(false);
  return (

    <section id="inscricao" className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(at_50%_50%,rgba(192,38,211,0.15),transparent_60%)]" />
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">— Inscrição</span>
          <h2 className="mt-5 text-balance text-4xl leading-[1.05] tracking-tight text-white md:text-6xl">
            Garanta sua vaga <em className="text-gradient-ember">agora</em>.
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          className="conic-border p-[2px]"
        >
          <div className="relative overflow-hidden rounded-[1.35rem] bg-card p-8 md:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-ember/20 blur-3xl" />

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-ember-gradient px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[--ember-foreground]">
              <Tag className="h-3.5 w-3.5" />
              1º Lote · Vagas Limitadas
            </div>

            <div className="mb-2 flex items-baseline gap-3">
              <span className="text-sm text-white/60">por apenas</span>
            </div>
            <div className="mb-8 flex items-baseline gap-2">
              <span className="text-2xl text-white/60">R$</span>
              <span className="text-7xl text-white md:text-8xl">
                <Counter to={250} />
              </span>
              <span className="text-xl text-white/60">,00</span>
            </div>

            <ul className="mb-8 grid gap-3">
              {included.map((i, idx) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  className="flex items-start gap-3 text-white/85"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-gradient">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                  <span className="text-sm md:text-base">{i}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mb-7 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-white/80">Vagas do 1º lote</span>
                <span className="font-mono text-sm font-bold text-accent">
                  <Counter to={50} />/100
                </span>
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "50%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
                  className="relative h-full overflow-hidden rounded-full bg-ember-gradient"
                >
                  <div className="shimmer absolute inset-0" />
                </motion.div>
              </div>
              <p className="mt-3 text-xs text-white/50">Apenas 50 vagas restantes — não deixe para depois.</p>
            </div>

            <Button
              type="button"
              size="lg"
              onClick={() => {
                // Primeiro clique do funil: registra intenção antes do formulário.
                trackPreLead("purchase_card");
                setLeadOpen(true);
              }}
              className="shine group h-auto w-full bg-ember-gradient py-6 text-base font-bold text-[--ember-foreground] shadow-glow-ember transition-transform hover:-translate-y-0.5 hover:brightness-110 md:text-lg"
            >
              INSCREVA-SE AGORA
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>


            <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-white/60">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Inscrições processadas com segurança pela plataforma On Educação.
            </p>
          </div>
        </motion.div>
      </div>
      <LeadCaptureDialog open={leadOpen} onOpenChange={setLeadOpen} source="purchase_card" />
    </section>

  );
}
