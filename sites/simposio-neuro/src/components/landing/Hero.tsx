import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { NeuralCanvas } from "./NeuralCanvas";
import logoSimposio from "@/assets/logo-simposio-mono.png";

function useCountdown(target: Date) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const cd = useCountdown(new Date("2026-12-05T09:00:00-03:00"));

  return (
    <section id="top" ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-hero-gradient grain">
      {/* Conic mesh blob */}
      <motion.div
        style={{ y: y1 }}
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full opacity-40 blur-3xl mesh-rotate bg-mesh-gradient"
      />
      <motion.div
        style={{ y: y2 }}
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,#FF6B1A_0%,transparent_70%)] opacity-25 blur-3xl"
      />

      {/* Neural canvas */}
      <div className="absolute inset-0 z-0 opacity-90">
        <NeuralCanvas />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,1,24,0.85)_100%)]" />

      <motion.div style={{ opacity }} className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pt-24 pb-16 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-white/80 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
          </span>
          1º Simpósio · 05 Dez 2026
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative mx-auto w-full max-w-3xl"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 mx-auto h-full w-full rounded-[40%] bg-violet-gradient opacity-30 blur-3xl" />
          <img
            src={logoSimposio}
            alt="1º Simpósio Técnico e Prático de Neurociência da Memória"
            className="mx-auto h-auto w-full max-w-[640px] drop-shadow-[0_10px_40px_rgba(139,92,246,0.45)]"
          />
          <h1 className="sr-only">1º Simpósio Técnico e Prático de Neurociência da Memória</h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-7 max-w-2xl text-center text-pretty text-base text-white/70 md:text-lg"
        >
          1 dia de imersão científica e prática sobre memória, envelhecimento e cognição —
          conduzidos pelos maiores nomes da geriatria e da neurociência clínica do país.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/70"
        >
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-accent" /> 5 de Dezembro de 2026</span>
          <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
          <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Centro de Convenções Millenium · São Paulo</span>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto mt-10 grid w-full max-w-md grid-cols-4 gap-2"
        >
          {[
            { v: cd.d, l: "dias" },
            { v: cd.h, l: "horas" },
            { v: cd.m, l: "min" },
            { v: cd.s, l: "seg" },
          ].map((c) => (
            <div key={c.l} className="rounded-2xl border border-white/10 bg-white/[0.04] px-2 py-3 text-center backdrop-blur">
              <div className="text-3xl tabular-nums text-white md:text-4xl">{String(c.v).padStart(2, "0")}</div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-white/50">{c.l}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mx-auto mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="shine group h-auto w-full bg-ember-gradient px-8 py-6 text-base font-bold text-[--ember-foreground] shadow-glow-ember transition-transform hover:-translate-y-0.5 hover:brightness-110 sm:w-auto md:text-lg"
          >
            <a href="#inscricao">
              GARANTA SUA VAGA · R$ 250
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <a href="#programacao" className="group inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white">
            Ver programação completa
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>

        <p className="mt-4 text-center text-xs text-white/50">1º lote · Apenas 100 vagas no total</p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute inset-x-0 bottom-6 z-10 mx-auto flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Role</span>
        <span className="h-8 w-px bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
}
