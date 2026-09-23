import { SilverRibbon } from "@/components/silver-ribbon";

export function Pause() {
  return (
    <section id="pausa" className="relative overflow-hidden bg-paper py-32 md:py-48">
      <SilverRibbon
        className="pointer-events-none absolute left-[-10%] top-1/2 h-[150px] w-[120%] -translate-y-1/2"
        intensity={0.35}
        flip
      />
      <div className="shell relative">
        <h2 className="display-lg reveal max-w-[18ch] text-ink" data-reveal="">
          Viver mais é uma conquista.
        </h2>
        <p
          className="reveal-slow mt-10 max-w-[42ch] font-serif text-[clamp(1.35rem,2.2vw,1.9rem)] leading-[1.35] text-deep-silver md:ml-[38%]"
          data-reveal=""
        >
          Mas viver mais não é apenas acrescentar anos à vida.
        </p>
      </div>
    </section>
  );
}
