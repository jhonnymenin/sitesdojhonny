import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { RahalMascot } from "./RahalMascot";

const stats = [
  { end: 2000, suffix: "+", label: "Tratamentos ablativos térmicos em tireoide, linfonodos e paratireoides" },
  { end: 10000, suffix: "+", label: "Biópsias e punções em tireoide e pescoço" },
  { end: 300, suffix: "+", label: "Aulas e palestras em congressos no Brasil e exterior" },
  { end: 60, suffix: "+", label: "Artigos científicos publicados em revistas indexadas" },
];

export function TrustStrip() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <section ref={ref} className="overflow-hidden border-y hairline bg-surface/40">
      <div className="mx-auto grid max-w-7xl items-end px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-10">
        <RahalMascot pose="think" size="md" className="mx-auto lg:mx-0" />
        <div className="grid grid-cols-2 py-12 lg:grid-cols-4 lg:py-16">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center px-2 py-6 sm:px-4 ${i < stats.length - 1 ? "lg:border-r lg:hairline" : ""} ${i < 2 ? "border-b lg:border-b-0 hairline" : ""}`}
            >
              <div className="font-display font-light text-[30px] sm:text-[48px] lg:text-[58px] leading-none gradient-gold tracking-tight whitespace-nowrap">

                {inView ? (
                  <CountUp end={s.end} duration={2.4} suffix={s.suffix} />
                ) : (
                  <span>0{s.suffix ?? ""}</span>
                )}
              </div>
              <div className="mt-4 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
