import { Reveal } from "./Reveal";
import {
  Stethoscope,
  MonitorSmartphone,
  ScanSearch,
  Activity,
  Waves,
  Syringe,
  Microscope,
  Flame,
  Snowflake,
  Layers,
  Eye,
  LineChart,
} from "lucide-react";

const items = [
  { icon: Stethoscope, title: "Consulta especializada e personalizada", desc: "Avaliação individual, criteriosa e sem pressa — presencial ou por teleconsulta." },
  { icon: MonitorSmartphone, title: "Teleconsulta", desc: "Segunda opinião e acompanhamento à distância, com a mesma profundidade da consulta presencial." },
  { icon: ScanSearch, title: "Avaliação de nódulos", desc: "Todos os tipos e variantes de nódulos na tireoide e na região cervical." },
  { icon: Activity, title: "Ultrassonografia multiparamétrica", desc: "Tireoide, paratireoides e linfonodos cervicais, com classificação TI-RADS e elastografia." },
  { icon: Waves, title: "Doppler da tireoide e cervical", desc: "Estudo vascular detalhado para caracterizar nódulos e estruturas do pescoço." },
  { icon: Syringe, title: "Biópsias e punções", desc: "Core biopsy de nódulos, biópsia de linfonodos e paratireoides, e P.A.A.F. guiada por ultrassom." },
  { icon: Microscope, title: "Patologia própria", desc: "Material de biópsia avaliado pela nossa própria equipe de patologistas." },
  { icon: Flame, title: "Ablação percutânea de nódulos", desc: "Nódulos benignos, malignos, tóxicos e bócios — tratados sem cirurgia." },
  { icon: Layers, title: "“The Iceberg Technique”", desc: "Ablação de bócios volumosos, inclusive mergulhantes, em etapas planejadas." },
  { icon: Snowflake, title: "Diferentes modalidades ablativas", desc: "Laser, radiofrequência, microondas, química e eletroporação — a técnica certa para cada caso." },
  { icon: Eye, title: "Second-look", desc: "Segunda leitura de exames de ultrassonografia cervical realizados em outros serviços." },
  { icon: LineChart, title: "Função e seguimento", desc: "Avaliação da performance tireoidiana e acompanhamento contínuo por imagem e laboratório." },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-32 bg-surface/40 border-y hairline">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="label-eyebrow text-[10px]">Portfólio</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display font-light text-4xl sm:text-5xl leading-[1.05]">
              Produtos de <span className="italic gradient-gold">excelência</span> da clínica.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-muted-foreground font-light leading-relaxed">
              Do diagnóstico por imagem ao tratamento minimamente invasivo — tudo em um único lugar,
              conduzido pessoalmente pelo Dr. Antonio Rahal.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3 border hairline">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={Math.min(i * 0.04, 0.3)}>
              <article className="h-full bg-background p-8 transition-colors duration-500 hover:bg-surface/60">
                <item.icon size={20} className="text-gold" strokeWidth={1.4} />
                <h3 className="mt-5 font-display text-lg leading-snug text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">{item.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
