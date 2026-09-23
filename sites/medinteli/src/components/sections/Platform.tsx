import { motion } from "framer-motion";
import { ReactNode } from "react";
import dashboardCliente from "@/assets/dashboard-cliente-anonimizado.png";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  LayoutDashboard,
  UserPlus,
  MessagesSquare,
  FileText,
  CalendarDays,
  Stethoscope,
  FileImage,
  FileCheck2,
  ArrowUpRight,
  Check,
} from "lucide-react";

type PlatformFeature = {
  icon: typeof UserPlus;
  title: string;
  description: string;
  gradient: string;
  tag: string;
  span: string;
  visual: ReactNode;
};

// Mini visuals — cada card mostra uma prévia visual diferente do recurso
const PatientsVisual = () => (
  <div className="flex items-center gap-2">
    <div className="flex -space-x-2">
      {[
        "",
        "",
        "",
        "",
      ].map((g, i) => (
        <div
          key={i}
          className={`w-8 h-8 rounded-full bg-brand-tint ${g} ring-2 ring-card flex items-center justify-center text-[10px] font-semibold text-brand`}
        >
          {["AM", "JS", "RP", "LC"][i]}
        </div>
      ))}
    </div>
    <div className="text-xs text-muted-foreground">+1.247</div>
  </div>
);

const ChatVisual = () => (
  <div className="space-y-1.5">
    <div className="flex justify-start">
      <div className="px-2.5 py-1.5 rounded-lg rounded-bl-sm bg-muted text-[11px] text-foreground/90 max-w-[80%]">
        Posso remarcar pra quinta?
      </div>
    </div>
    <div className="flex justify-end">
      <div className="px-2.5 py-1.5 rounded-lg rounded-br-sm bg-brand-tint text-[11px] text-foreground max-w-[80%]">
        Confirmado, 14h ✓
      </div>
    </div>
  </div>
);

const DocsVisual = () => (
  <div className="flex items-center gap-2">
    {[
      { Icon: FileText, label: "Exame", color: "text-brand" },
      { Icon: FileImage, label: "Raio-X", color: "text-brand-light" },
      { Icon: FileCheck2, label: "Receita", color: "text-brand" },
    ].map(({ Icon, label, color }, i) => (
      <div
        key={i}
        className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-md bg-muted/60 border border-border"
      >
        <Icon className={`w-4 h-4 ${color}`} />
        <span className="text-[9px] text-muted-foreground">{label}</span>
      </div>
    ))}
  </div>
);

const AgendaVisual = () => {
  const slots = [
    { time: "09:00", state: "done" },
    { time: "10:30", state: "now" },
    { time: "11:00", state: "open" },
    { time: "14:00", state: "done" },
    { time: "15:30", state: "now" },
    { time: "16:00", state: "open" },
  ];
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {slots.map((s, i) => (
        <div
          key={i}
          className={`px-1.5 py-1 rounded text-[10px] text-center border ${ s.state === "done" ? "bg-brand/20 border-brand/40 text-brand" : s.state === "now" ? "bg-gradient-to-r border-brand/50 text-foreground" : "bg-muted/50 border-border text-muted-foreground" }`}
        >
          {s.time}
        </div>
      ))}
    </div>
  );
};

const DoctorsVisual = () => (
  <div className="space-y-2">
    {[
      { name: "Dr. Silva", spec: "Cardiologia", color: "bg-green-500" },
      { name: "Dra. Costa", spec: "Dermatologia", color: "bg-brand" },
      { name: "Dr. Lima", spec: "Ortopedia", color: "bg-brand-light" },
    ].map((d, i) => (
      <div key={i} className="flex items-center gap-2">
        <div className="relative">
          <div className="w-6 h-6 rounded-full bg-brand-tint" />
          <div
            className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full ${d.color} ring-2 ring-card`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-medium text-foreground truncate">{d.name}</div>
          <div className="text-[9px] text-muted-foreground truncate">{d.spec}</div>
        </div>
      </div>
    ))}
  </div>
);

const DashboardVisual = () => {
  const stats = [
    { label: "Agendamentos", value: "+42%", trend: true },
    { label: "Faltas", value: "-31%", trend: true },
    { label: "Retornos", value: "+58%", trend: true },
  ];
  const bars = [40, 65, 50, 80, 70, 95, 85];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-1.5">
        {stats.map((s, i) => (
          <div key={i} className="rounded-md bg-muted/60 border border-border px-1.5 py-1.5">
            <div className="text-[8px] text-muted-foreground leading-tight mb-0.5">
              {s.label}
            </div>
            <div className="flex items-center gap-0.5 text-[11px] font-semibold text-brand">
              <ArrowUpRight className="w-2.5 h-2.5" />
              {s.value}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-end justify-between gap-1 h-10">
        {bars.map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className="flex-1 rounded-sm bg-brand-tint"
          />
        ))}
      </div>
    </div>
  );
};

const platformFeatures: PlatformFeature[] = [
  {
    icon: UserPlus,
    title: "Cadastro de Pacientes",
    description:
      "Cadastre manualmente ou puxe os dados direto da conversa do WhatsApp. Histórico completo em um só lugar.",
    gradient: "",
    tag: "PACIENTES",
    span: "lg:col-span-2",
    visual: <PatientsVisual />,
  },
  {
    icon: MessagesSquare,
    title: "Conversa Centralizada",
    description:
      "Responda seus pacientes direto pela plataforma. Toda a comunicação do WhatsApp onde sua equipe trabalha.",
    gradient: "",
    tag: "INBOX",
    span: "lg:col-span-2",
    visual: <ChatVisual />,
  },
  {
    icon: CalendarDays,
    title: "Agenda Integrada",
    description:
      "O que a automação agenda no WhatsApp aparece aqui na hora, sincronizado em tempo real.",
    gradient: "",
    tag: "AGENDA",
    span: "lg:col-span-2",
    visual: <AgendaVisual />,
  },
  {
    icon: FileText,
    title: "Documentos do Paciente",
    description:
      "Exames, receitas e arquivos do WhatsApp salvos automaticamente no cadastro. Nada se perde.",
    gradient: "",
    tag: "ARQUIVOS",
    span: "lg:col-span-2",
    visual: <DocsVisual />,
  },
  {
    icon: Stethoscope,
    title: "Cadastro de Médicos",
    description:
      "Cada profissional com sua agenda, horários e pacientes. Gestão multi-médico simples.",
    gradient: "",
    tag: "EQUIPE",
    span: "lg:col-span-2",
    visual: <DoctorsVisual />,
  },
  {
    icon: LayoutDashboard,
    title: "Visão Completa",
    description:
      "Agendamentos, conversas, faltas, retornos e desempenho. Decisões com dados, não com achismo.",
    gradient: "",
    tag: "DASHBOARD",
    span: "lg:col-span-2",
    visual: <DashboardVisual />,
  },
];

export const Platform = () => {
  return (
    <section id="platform" className="relative py-12 sm:py-16 md:py-20 bg-surface-alt overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* PARTE 1: CABEÇALHO */}
        <ScrollReveal>
          <SectionTitle
            badge={{
              icon: <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand" />,
              text: "A plataforma",
            }}
            title={
              <>
                Tudo que acontece no WhatsApp,
                <br />
                <span className="text-brand shimmer-text">
                  organizado em um só lugar
                </span>
              </>
            }
            subtitle="Cadastros, conversas, documentos e agenda reunidos na plataforma onde sua equipe trabalha."
          />
        </ScrollReveal>

        {/* PARTE 2: DASHBOARD REAL ANONIMIZADO */}
        <ScrollReveal delay={0.1}>
          <div className="relative max-w-6xl mx-auto mb-8 sm:mb-12">
            <div className="relative rounded-xl overflow-x-auto border border-border bg-card shadow-lg">
              <a href={dashboardCliente} target="_blank" rel="noopener noreferrer" aria-label="Abrir imagem ampliada do painel da MedInteli">
                <img
                  src={dashboardCliente}
                  alt="Painel real da MedInteli com dados fictícios e identidade do cliente anonimizada"
                  loading="lazy"
                  className="block w-full min-w-[760px] sm:min-w-0 h-auto"
                />
              </a>
            </div>
            <p className="mt-3 text-xs text-muted-foreground text-center">Ambiente real anonimizado. Nomes e indicadores foram substituídos para preservar a privacidade.</p>
          </div>
        </ScrollReveal>


        {/* PARTE 3: BENTO GRID DE 6 RECURSOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5 mb-8 sm:mb-10 max-w-6xl mx-auto">
          {platformFeatures.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={index * 0.05} className={item.span}>
                <div className="group relative h-full rounded-2xl overflow-hidden bg-card border border-border shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-300 hover:border-brand/40 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)] hover:-translate-y-1">
                  {/* Barra superior de destaque no hover */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />


                  {/* Cabeçalho: ícone + tag mono */}
                  <div className="flex items-start justify-between p-5 sm:p-6 pb-3">
                    <motion.div
                      whileHover={{ rotate: -6, scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className={`inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-brand-tint ${item.gradient} shadow-sm`}
                    >
                      <Icon className="w-5 h-5 text-brand" />
                    </motion.div>
                    <span className="text-[10px] tracking-wider text-muted-foreground/70 mt-2">
                      {item.tag}
                    </span>
                  </div>

                  {/* Conteúdo textual */}
                  <div className="px-5 sm:px-6">
                    <h3 className="font-heading font-bold text-base sm:text-lg text-foreground mb-1.5 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[13px] sm:text-sm text-muted-foreground leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Mini visualização — preview real do recurso */}
                  <div className="mx-5 sm:mx-6 mb-5 sm:mb-6 mt-auto rounded-lg bg-muted/60 border border-border p-3 sm:p-3.5">
                    {item.visual}
                  </div>

                  {/* Linha de "ativo" piscante */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-center gap-1.5 px-5 sm:px-6 pb-2 opacity-60">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-brand"
                    />
                    <div className="flex items-center gap-1 text-[9px] text-muted-foreground/60">
                      <Check className="w-2.5 h-2.5" />
                      sincronizado
                    </div>
                  </div>

                  {/* Glow no hover */}
                  <div className={`pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-brand-tint ${item.gradient} blur-2xl -z-10`} />
                </div>
              </ScrollReveal>
            );
          })}
        </div>


        {/* PARTE 4: FRASE DE FECHAMENTO EM FAIXA ESCURA */}
        <ScrollReveal>
          <div className="surface-deep max-w-4xl mx-auto rounded-2xl border border-white/10 px-6 py-8 sm:px-10 sm:py-10">
            <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
              <p className="text-lg sm:text-xl font-heading font-medium text-white/70 leading-snug">
                A automação trabalha por você no WhatsApp.
              </p>
              <div className="flex items-center gap-3">
                <span className="hidden sm:block h-10 w-px bg-white/15" />
                <p className="text-lg sm:text-xl font-heading font-bold text-white leading-snug">
                  A plataforma coloca o controle nas suas mãos.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
