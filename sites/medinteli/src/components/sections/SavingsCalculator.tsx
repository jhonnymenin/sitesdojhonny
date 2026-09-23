import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GradientButton } from "@/components/ui/GradientButton";
import {
  Calculator,
  TrendingDown,
  TrendingUp,
  RotateCcw,
  Clock,
  ArrowRight,
} from "lucide-react";
import { QUIZ_LINK } from "@/constants";
import { LucideIcon } from "lucide-react";
import { buildQuizUrl, trackQuizClick } from "@/lib/tracking";
import { trackSectionOnce } from "@/lib/tracking";

const useAnimatedNumber = (target: number, duration = 400) => {
  const [display, setDisplay] = useState(target);
  const prev = useRef(target);
  const frameRef = useRef<number>();

  useEffect(() => {
    const start = prev.current;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (target - start) * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(animate);
    prev.current = target;
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [target, duration]);

  return display;
};

interface CustomSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  formatValue: (v: number) => string;
  onChange: (v: number) => void;
  helperText?: string;
}

const CustomSlider = ({ label, value, min, max, step, formatValue, onChange, helperText }: CustomSliderProps) => {
  const percentage = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs sm:text-sm text-muted-foreground">{label}</span>
        <span className="text-xs sm:text-sm font-heading font-bold text-brand">{formatValue(value)}</span>
      </div>
      <div className="relative">
        <div
          className="absolute top-1/2 -translate-y-1/2 left-0 h-[4px] rounded-full bg-brand pointer-events-none transition-all duration-150"
          style={{ width: `${percentage}%` }}
        />
        <input
          type="range"
          className="calc-slider w-full relative z-10"
          min={min} max={max} step={step} value={value}
          aria-label={label}
          onChange={(e) => {
            trackSectionOnce("simulador");
            onChange(Number(e.target.value));
          }}
        />
      </div>
      {helperText && (
        <p className="text-[10px] sm:text-xs text-muted-foreground italic mt-0.5">{helperText}</p>
      )}
    </div>
  );
};

interface ResultRowProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  valueColor: string;
  detail: string;
}

const ResultRow = ({ icon: Icon, iconBg, iconColor, label, value, valueColor, detail }: ResultRowProps) => (
  <div className="flex items-center gap-2.5 sm:gap-3 py-2.5 sm:py-3 border-b border-border last:border-0">
    <div className={`p-1.5 sm:p-2 rounded-lg ${iconBg} flex-shrink-0`}>
      <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${iconColor}`} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">{label}</p>
      <p className={`text-base sm:text-xl font-heading font-bold ${valueColor} leading-tight`}>{value}</p>
    </div>
    <p className="text-[10px] sm:text-xs text-muted-foreground text-right max-w-[100px] sm:max-w-[140px] leading-tight hidden sm:block">{detail}</p>
  </div>
);

export const SavingsCalculator = () => {
  const [pacientes, setPacientes] = useState(300);
  const [valorConsulta, setValorConsulta] = useState(250);
  const [taxaFaltas, setTaxaFaltas] = useState(20);
  const [horasManuais, setHorasManuais] = useState(4);
  const [reducaoFaltas, setReducaoFaltas] = useState(20);

  const results = useMemo(() => {
    const faltasMes = Math.round(pacientes * (taxaFaltas / 100));
    const perdaFaltas = faltasMes * valorConsulta;
    const faltasRecuperadas = Math.max(faltasMes >= 2 ? 1 : 0, Math.round(faltasMes * (reducaoFaltas / 100)));
    const receitaRecuperada = faltasRecuperadas * valorConsulta;
    // Retornos: pacientes que esqueceriam de remarcar mas voltam com follow-up automático (~5% do total de pacientes)
    const retornosRecuperados = Math.max(pacientes >= 10 ? 1 : 0, Math.round(pacientes * 0.05));
    const receitaRetornos = retornosRecuperados * valorConsulta;
    // Reduz ~60% das horas manuais (proporcionalmente ao volume)
    const horasEconomizadasDia = Math.round(horasManuais * 0.60 * 10) / 10;
    const horasEconomizadasMes = Math.round(horasEconomizadasDia * 22);
    const economiaTotalMes = receitaRecuperada + receitaRetornos;
    return { faltasMes, perdaFaltas, faltasRecuperadas, receitaRecuperada, retornosRecuperados, receitaRetornos, horasEconomizadasDia, horasEconomizadasMes, economiaTotalMes };
  }, [pacientes, valorConsulta, taxaFaltas, horasManuais, reducaoFaltas]);

  const animatedPerdaFaltas = useAnimatedNumber(results.perdaFaltas);
  const animatedReceitaRecuperada = useAnimatedNumber(results.receitaRecuperada);
  const animatedReceitaRetornos = useAnimatedNumber(results.receitaRetornos);
  const animatedTotal = useAnimatedNumber(results.economiaTotalMes);

  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <ScrollReveal>
          <SectionTitle
            badge={{
              icon: <Calculator className="w-4 h-4 text-brand" />,
              text: "Simulação",
            }}
            title={
              <>
                Simule o cenário da{" "}
                <span className="text-brand shimmer-text">sua clínica</span>
              </>
            }
            subtitle="Ajuste os valores e as premissas para estimar o impacto de reduzir faltas e recuperar retornos. Os percentuais são hipóteses que você define."
            mobileSubtitle=""
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {/* Inputs */}
          <ScrollReveal direction="left">
            <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full">
              <h3 className="text-sm sm:text-base font-heading font-bold text-foreground mb-4 sm:mb-5">
                Dados da sua clínica
              </h3>
              <div className="space-y-5 sm:space-y-6">
                <CustomSlider label="Pacientes / mês" value={pacientes} min={5} max={1500} step={5} formatValue={(v) => v.toString()} onChange={setPacientes} />
                <CustomSlider label="Valor médio da consulta" value={valorConsulta} min={50} max={2000} step={10} formatValue={(v) => "R$ " + v.toLocaleString("pt-BR")} onChange={setValorConsulta} />
                <CustomSlider label="Taxa de faltas atual" value={taxaFaltas} min={5} max={50} step={1} formatValue={(v) => v + "%"} onChange={setTaxaFaltas} helperText="Média no Brasil: 20% a 30%" />
                <CustomSlider label="Horas manuais / dia" value={horasManuais} min={0.5} max={10} step={0.5} formatValue={(v) => v + "h"} onChange={setHorasManuais} helperText="Ligações, confirmações, remarcações" />
                <CustomSlider label="Redução de faltas considerada na simulação" value={reducaoFaltas} min={5} max={60} step={5} formatValue={(v) => v + "%"} onChange={setReducaoFaltas} helperText="Premissa que você define para esta simulação" />
              </div>
            </div>
          </ScrollReveal>

          {/* Results */}
          <ScrollReveal direction="right">
            <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full flex flex-col">
              <h3 className="text-sm sm:text-base font-heading font-bold text-foreground mb-3 sm:mb-4">
                Resultado estimado
              </h3>

              <div className="flex-1">
                <ResultRow icon={TrendingDown} iconBg="bg-destructive/10" iconColor="text-destructive" label="Estimativa de perda com faltas" value={`R$ ${animatedPerdaFaltas.toLocaleString("pt-BR")}`} valueColor="text-destructive" detail={`${results.faltasMes} consultas perdidas`} />
                <ResultRow icon={TrendingUp} iconBg="bg-brand/10" iconColor="text-brand" label="Cenário de recuperação" value={`R$ ${animatedReceitaRecuperada.toLocaleString("pt-BR")}`} valueColor="text-brand" detail={`${results.faltasRecuperadas} faltas a menos`} />
                <ResultRow icon={RotateCcw} iconBg="bg-brand/10" iconColor="text-brand" label="Cenário de retornos" value={`R$ ${animatedReceitaRetornos.toLocaleString("pt-BR")}`} valueColor="text-brand" detail={`${results.retornosRecuperados} pacientes voltam`} />
                <ResultRow icon={Clock} iconBg="bg-brand-light/10" iconColor="text-brand" label="Tempo economizado" value={`${results.horasEconomizadasMes}h / mês`} valueColor="text-brand" detail={`${results.horasEconomizadasDia}h livres por dia`} />
              </div>

              {/* Total highlight */}
              <motion.div
                className="relative mt-4 p-3 sm:p-4 rounded-xl overflow-hidden text-center"
                key={results.economiaTotalMes}
                initial={{ scale: 1.03 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.25 }}
              >
                <div className="absolute inset-0 bg-brand-tint rounded-xl" />
                <div className="absolute inset-0 border border-brand/15 rounded-xl pointer-events-none" />

                <p className="relative z-10 text-[10px] sm:text-xs text-muted-foreground mb-0.5">Total no cenário simulado</p>
                <p className="relative z-10 text-xl sm:text-3xl md:text-4xl font-heading font-bold text-brand">
                  R$ {animatedTotal.toLocaleString("pt-BR")}
                </p>
                <p className="relative z-10 text-[10px] sm:text-xs text-muted-foreground">por mês</p>

                <a href={buildQuizUrl(QUIZ_LINK)} onClick={() => trackQuizClick("savingscalculator")} target="_blank" rel="noopener noreferrer" className="relative z-10 inline-block mt-3">
                  <GradientButton size="sm" className="text-xs sm:text-sm">
                    Fazer diagnóstico completo
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </GradientButton>
                </a>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>

        <p className="text-[10px] sm:text-xs text-muted-foreground/60 text-center max-w-2xl mx-auto mt-4 sm:mt-6 px-4">
          Esta é uma simulação baseada em premissas que você mesmo define. Os valores são estimativas para apoiar sua análise e não representam garantia de resultado. Resultados reais variam conforme a operação, o perfil dos pacientes e a rotina de cada clínica.
        </p>
      </div>
    </section>
  );
};
