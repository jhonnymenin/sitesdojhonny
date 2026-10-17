import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarDays,
  Users,
  FileText,
  Info,
  UtensilsCrossed,
  Car,
  BadgeCheck,
  Award,
  MessageCircle,
  MapPin,
  Clock,
  ArrowRight,
  User,
  Camera,
} from "lucide-react";
import logoHeaderAsset from "@/assets/logo-header-unificado-v2.png";
import { eventData } from "@/data/eventData";
import { agendaData } from "@/data/agendaData";
import { speakersData } from "@/data/speakersData";
import { sponsorsData } from "@/data/sponsorsData";
import { SectionTitle } from "@/components/app/AppPage";
import { CitaClinics } from "@/components/app/CitaClinics";
import { SponsorLogo } from "@/components/app/SponsorLogo";
import { useRelogioDoEvento } from "@/lib/relogio";
import { cn } from "@/lib/utils";
import { InstallBanner } from "@/components/app/InstallApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "I Simpósio CITA de Doenças Imunomediadas — App do evento" },
      {
        name: "description",
        content:
          "Aplicativo oficial do I Simpósio CITA de Doenças Imunomediadas: agenda, palestrantes, materiais e informações práticas. 17/10/2026, São Paulo.",
      },
      { property: "og:title", content: "I Simpósio CITA de Doenças Imunomediadas — App do evento" },
      {
        property: "og:description",
        content: "Agenda, palestrantes, materiais e informações práticas do simpósio.",
      },
    ],
  }),
  component: HomePage,
});

const quickAccess = [
  {
    to: "/euvou",
    title: "#EuVou",
    desc: "Monte a sua arte e compartilhe",
    icon: Camera,
    tone: "leaf" as const,
  },
  { to: "/agenda", icon: CalendarDays, title: "Agenda", desc: "Confira a programação completa", tone: "navy" },
  { to: "/palestrantes", icon: Users, title: "Palestrantes", desc: "Conheça os especialistas", tone: "leaf" },
  { to: "/materiais", icon: FileText, title: "Materiais", desc: "Acesse apresentações e conteúdos", tone: "teal" },
  { to: "/informacoes", icon: Info, title: "Informações práticas", desc: "Tudo o que você precisa saber", tone: "navy" },
  { to: "/informacoes", icon: UtensilsCrossed, title: "Alimentação", desc: "Local de almoço e coffee breaks", tone: "leaf" },
  { to: "/informacoes", icon: Car, title: "Estacionamento", desc: "Informações e acessos", tone: "teal" },
  { to: "/informacoes", icon: BadgeCheck, title: "Credenciamento", desc: "Horários e procedimentos", tone: "navy" },
  { to: "/patrocinadores", icon: Award, title: "Patrocinadores", desc: "Conheça nossos patrocinadores", tone: "leaf" },
  { to: "/contato", icon: MessageCircle, title: "Fale conosco", desc: "Dúvidas ou atendimento", tone: "teal" },
];

const toneClass: Record<string, string> = {
  navy: "bg-navy text-white",
  leaf: "bg-leaf text-white",
  teal: "bg-teal text-white",
};

function HomePage() {
  /*
   * A hora vem do relógio de quem abre, nunca do servidor. Antes isto era
   * `getNextActivity(new Date())` no corpo do componente: no SSR rodava com a
   * hora da máquina da Vercel e ia para o cache, de modo que o cartão mostrava
   * a atividade do momento do build para todo mundo, o dia inteiro.
   */
  const relogio = useRelogioDoEvento();
  const aoVivo = relogio.pronto && relogio.noDia;
  /*
   * Depois do encerramento não há "acontecendo" nem "a seguir". Sem este último
   * caso o cartão caía na primeira atividade do dia e dizia "ENCERRADO · 07h30
   * Credenciamento", que lê como se o credenciamento tivesse acabado agora.
   */
  const destaque = aoVivo
    ? (relogio.acontecendo ?? relogio.aSeguir ?? agendaData[agendaData.length - 1])
    : agendaData[0];
  const rotulo = !aoVivo
    ? "Programado"
    : relogio.terminou
      ? "Encerrado"
      : relogio.acontecendo
        ? "Acontecendo agora"
        : "A seguir";
  const highlights = agendaData.filter((a) => a.kind === "mesa");
  const featuredSpeakers = speakersData.filter((s) => s.photo).slice(0, 6);

  return (
    <div className="pb-4">
      <section className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-teal/40 blur-[90px]" />
          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-leaf/30 blur-[100px]" />
          <div className="dot-cluster absolute inset-0 opacity-20" />
        </div>

        <div className="relative px-5 pb-10 pt-8">
          <div className="mx-auto rounded-3xl bg-white px-5 py-4 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.6)]">
            <img
              src={logoHeaderAsset}
              alt={`${eventData.name} — ${eventData.presentedBy}`}
              className="mx-auto h-auto w-full max-w-[300px] object-contain"
            />
          </div>

          <p className="mt-6 text-center font-display text-[15px] font-medium leading-relaxed text-white/85">
            “{eventData.tagline}”
          </p>

          <div className="mt-6 grid gap-2 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays size={16} className="shrink-0 text-leaf" />
              <span className="font-medium">
                {eventData.dateLabel} · {eventData.weekdayLabel}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={16} className="shrink-0 text-leaf" />
              <span className="font-medium">
                {eventData.venue} — {eventData.city}
              </span>
            </div>
          </div>
        </div>

        <svg viewBox="0 0 600 40" preserveAspectRatio="none" className="block h-8 w-full fill-mist" aria-hidden>
          <path d="M0,40 C150,0 450,0 600,40 Z" />
        </svg>
      </section>

      {/*
        Convite de instalação acima de tudo: é a primeira tela, e no dia do
        evento o app precisa estar a um toque. Ele se esconde sozinho quando já
        está instalado ou quando a pessoa dispensa.
      */}
      <section className="px-4 pt-4">
        <InstallBanner />
      </section>

      <section className="px-4 pt-5">
        <SectionTitle>
          {relogio.acontecendo
            ? "Acontecendo agora"
            : relogio.terminou
              ? "Simpósio encerrado"
              : "Próxima atividade"}
        </SectionTitle>
        <div className="app-card overflow-hidden">
          <div className="flex items-start gap-4 p-5">
            <div className="flex shrink-0 flex-col items-center rounded-2xl bg-navy px-3 py-2 text-white">
              <Clock size={14} className="text-leaf" />
              <span className="mt-1 font-display text-base font-bold leading-none">{destaque.time}</span>
            </div>
            <div className="min-w-0">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.18em] uppercase",
                  relogio.acontecendo
                    ? "animate-pulse bg-leaf text-white"
                    : "bg-leaf/15 text-leaf",
                )}
              >
                {rotulo}
              </span>
              <h3 className="mt-2 font-display text-base font-bold uppercase tracking-[0.05em] text-navy">
                {destaque.session}
              </h3>
              {destaque.title && (
                <p className="text-[13px] leading-snug text-navy/70">{destaque.title}</p>
              )}
              <p className="mt-1 flex items-center gap-1 text-xs text-navy/55">
                <MapPin size={12} /> {eventData.venue}
              </p>
            </div>
          </div>
          <Link
            to="/agenda"
            className="app-tap flex items-center justify-center gap-2 bg-mist/70 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-navy"
          >
            Ver agenda completa <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <section className="px-4 pt-7">
        <SectionTitle>Acesso rápido</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          {quickAccess.map((item) => (
            <Link key={item.title} to={item.to} className="app-card app-tap flex flex-col gap-3 p-4">
              <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${toneClass[item.tone]}`}>
                <item.icon size={20} strokeWidth={1.7} />
              </span>
              <span className="font-display text-[13px] font-semibold leading-tight text-navy">
                {item.title}
              </span>
              <span className="text-[11px] leading-snug text-navy/55">{item.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 pt-7">
        <SectionTitle>Programação</SectionTitle>
        <ul className="space-y-2">
          {highlights.map((a) => (
            <li key={a.id} className="app-card flex items-center gap-3 p-3.5">
              <span
                className={`shrink-0 rounded-xl px-2.5 py-1.5 font-display text-[13px] font-bold text-white ${
                  a.period === "manha" ? "bg-leaf" : "bg-navy"
                }`}
              >
                {a.time}
              </span>
              <span className="min-w-0">
                <span className="block font-display text-[13px] font-bold uppercase tracking-[0.05em] text-navy">
                  {a.session}
                </span>
                <span className="block truncate text-[11px] text-navy/60">{a.title}</span>
              </span>
            </li>
          ))}
        </ul>
        <Link
          to="/agenda"
          className="app-tap mt-3 flex items-center justify-center gap-2 rounded-2xl bg-mist/70 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-navy"
        >
          Ver agenda completa <ArrowRight size={13} />
        </Link>
      </section>

      <section className="px-4 pt-7">
        <SectionTitle>Palestrantes</SectionTitle>
        <ul className="flex gap-3 overflow-x-auto pb-2">
          {featuredSpeakers.map((s) => (
            <li key={s.id} className="w-24 shrink-0">
              {s.photo ? (
                <img
                  src={s.photo}
                  alt={s.name}
                  loading="lazy"
                  className="aspect-square w-full rounded-2xl object-cover"
                />
              ) : (
                <span className="flex aspect-square w-full items-center justify-center rounded-2xl bg-mist text-navy/25">
                  <User size={26} strokeWidth={1.4} />
                </span>
              )}
              <span className="mt-1.5 block text-[11px] font-semibold leading-snug text-navy">{s.name}</span>
            </li>
          ))}
        </ul>
        <Link
          to="/palestrantes"
          className="app-tap mt-1 flex items-center justify-center gap-2 rounded-2xl bg-mist/70 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-navy"
        >
          Ver todos os palestrantes <ArrowRight size={13} />
        </Link>
      </section>

      <section className="px-4 pt-7">
        <SectionTitle>Clínicas Grupo CITA</SectionTitle>
        <CitaClinics />
      </section>

      <section className="px-4 pt-7">
        <SectionTitle>Patrocinadores</SectionTitle>
        <ul className="grid grid-cols-3 gap-2.5">
          {sponsorsData.map((s) => (
            <li key={s.id}>
              <SponsorLogo sponsor={s} size="sm" />
            </li>
          ))}
        </ul>
        <Link
          to="/patrocinadores"
          className="app-tap mt-3 flex items-center justify-center gap-2 rounded-2xl bg-mist/70 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-navy"
        >
          Ver todos os patrocinadores <ArrowRight size={13} />
        </Link>
      </section>

      <section className="px-4 pt-7">
        <SectionTitle>Informações essenciais</SectionTitle>
        <ul className="app-card divide-y divide-navy/8">
          {eventData.practical.slice(0, 4).map((card) => (
            <li key={card.key} className="flex items-start justify-between gap-3 px-4 py-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-teal">{card.title}</span>
              <span className="text-right text-xs leading-snug text-navy/70">{card.lines.join(" · ")}</span>
            </li>
          ))}
        </ul>
        <Link
          to="/informacoes"
          className="app-tap mt-3 flex items-center justify-center gap-2 rounded-2xl bg-mist/70 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-navy"
        >
          Ver informações práticas <ArrowRight size={13} />
        </Link>
      </section>

      <p className="px-4 pt-8 text-center text-[11px] text-navy/45">
        Realização {eventData.organizedBy} · Apresentado por {eventData.presentedBy}
      </p>
    </div>
  );
}
