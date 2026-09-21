import { createFileRoute } from "@tanstack/react-router";
import {
  Calendar, MapPin, Users, Flame, Network, Award, Gem,
  Stethoscope, ClipboardList, GitBranch, Activity, Mail, MessageCircle,
  Handshake, Layers, ArrowUpRight, Quote, Navigation,
} from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Reveal } from "@/components/Reveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import heroImg from "@/assets/hero-doctors.jpg";
import logoCitaAsset from "@/assets/logo-grupo-cita.png";
import logoHeaderAsset from "@/assets/logo-header-unificado-v2.png";
import logoIbisAsset from "@/assets/logo-ibis.png";
import logoCliagenAsset from "@/assets/logo-cliagen.png";
import logoNovaimunoAsset from "@/assets/logo-novaimuno.png";
import logoEvcitiAsset from "@/assets/logo-evciti.png";
import logoWorldMed from "@/assets/logo-worldmed.png";
import sponsorJj from "@/assets/sponsors/LOGOTIPO_J_J.svg";
import sponsorLilly from "@/assets/sponsors/LOGOTIPO_LILLY.svg";
import sponsorAbbvie from "@/assets/sponsors/LOGOTIPO_ABBVIE.svg";
import sponsorCls from "@/assets/sponsors/LOGOTIPO_CLS.svg";
import sponsorFresenius from "@/assets/sponsors/LOGOTIPO_FRESENIUS_KABI.svg";
import sponsorGsk from "@/assets/sponsors/LOGOTIPO_GSK.png";
import sponsorNovartis from "@/assets/sponsors/LOGOTIPO_NOVARTIS.svg";
import sponsorCelltrion from "@/assets/sponsors/LOGOTIPO_CELLTRION.svg";
import sponsorGrifols from "@/assets/sponsors/LOGOTIPO_GRIFOLS.svg";
import venueHall from "@/assets/venue-real-hall.jpg";
import venueAuditorium from "@/assets/venue-real-auditorium.jpg";
import venuePlenary from "@/assets/venue-real-plenary.jpg";

const logoCita = logoCitaAsset;
const logoHeader = logoHeaderAsset;
const logoIbis = logoIbisAsset;
const logoCliagen = logoCliagenAsset;
const logoNovaimuno = logoNovaimunoAsset;
const logoEvciti = logoEvcitiAsset;

const CLINICAS = [
  { name: "IBIS Imunoterapia", src: logoIbis, scale: 1 },
  { name: "Novaimuno", src: logoNovaimuno, scale: 1 },
  { name: "EV Citi Terapia Assistida", src: logoEvciti, scale: 1.5 },
  { name: "Cliagen Saúde Digestiva", src: logoCliagen, scale: 1 },
];

export const Route = createFileRoute("/")({
  component: Index,
});

const SPONSOR_TIERS = [
  {
    label: "Diamante",
    logos: [
      { name: "Janssen / Johnson & Johnson", src: sponsorJj },
      { name: "Lilly", src: sponsorLilly },
    ],
  },
  {
    label: "Bronze",
    logos: [
      { name: "AbbVie", src: sponsorAbbvie },
      { name: "CSL Behring", src: sponsorCls },
      { name: "Fresenius Kabi", src: sponsorFresenius },
      { name: "GSK", src: sponsorGsk },
      { name: "Novartis", src: sponsorNovartis },
    ],
  },
  {
    label: "Apoio",
    logos: [
      { name: "Celltrion", src: sponsorCelltrion },
      { name: "Grifols", src: sponsorGrifols },
    ],
  },
];

const CTA_HREF = "mailto:daniel@worldmedacademy.com?subject=I%20Simpósio%20CITA%20de%20Doenças%20Imunomediadas";
const WHATSAPP_HREF = "https://wa.me/5511970687422";
const REGISTRATION_HREF = "https://www.sympla.com.br/evento/i-simposio-cita-de-doenCas-imunomediadas/3588188?token=cdaa024744712982a8ec2a16ea4c4f19";

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#E6ECEF] text-[#004D5C] selection:bg-[#6BBE7A] selection:text-white">
      <Header />
      <Hero />
      <HeroLogos />
      <Marquee />
      <About />
      <GrupoCita />
      <Highlights />
      <Audience />
      <Committee />
      <Agenda />
      <Venue />
      <Sponsors />
      <Inscription />
      <SponsorForm />
      <FooterCTA />
    </div>
  );
}

function SectionIndex({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4 sm:gap-6">
      <span className="editorial-num text-5xl text-[#004D5C]/10 sm:text-7xl md:text-8xl">{num}</span>
      <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#0E7C86] sm:text-[10px] sm:tracking-[0.45em]">{label}</span>
    </div>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full px-3 py-2 sm:px-6 sm:py-5 md:px-12 md:py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl border border-white/40 bg-white/75 px-4 py-2 shadow-[0_8px_30px_-12px_rgba(0,77,92,0.25)] backdrop-blur-xl sm:gap-6 sm:rounded-full sm:px-6 sm:py-3">
        <a href="#top" className="flex min-w-0 items-center">
          <img
            src={logoHeader}
            alt="I Simpósio CITA de Doenças Imunomediadas — Grupo CITA"
            width={1200}
            height={250}
            className="h-10 w-auto object-contain sm:h-12 md:h-14 lg:h-16"
          />
        </a>
        <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
          <a href="#sobre" className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#004D5C] transition-colors hover:text-[#0E7C86]">Sobre</a>
          <a href="#comissao" className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#004D5C] transition-colors hover:text-[#0E7C86]">Comissão</a>
          <a href="#agenda" className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#004D5C] transition-colors hover:text-[#0E7C86]">Agenda</a>
          <a href="#local" className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#004D5C] transition-colors hover:text-[#0E7C86]">Local</a>
          <a href="#inscricao" className="rounded-full bg-[#004D5C] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#0E7C86]">Inscreva-se</a>
        </nav>
      </div>
    </header>
  );
}

function HeroLogos() {
  return (
    <section aria-label="Realização e Organização" className="relative mx-auto max-w-7xl px-5 pb-6 pt-2 sm:px-6 sm:pb-8 md:px-12">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-8 sm:gap-14">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#0E7C86] sm:text-[10px] sm:tracking-[0.45em]">Realização</span>
          <img src={logoCita} alt="Grupo CITA" className="h-12 w-auto sm:h-14 md:h-16" />
        </div>
        <span aria-hidden className="hidden h-10 w-px bg-[#004D5C]/15 sm:block" />
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#0E7C86] sm:text-[10px] sm:tracking-[0.45em]">Organização</span>
          <img src={logoWorldMed} alt="WorldMed Academy" className="h-9 w-auto sm:h-11 md:h-12" />
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate min-h-screen overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 lg:pt-40">
      {/* Background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-[#0E7C86]/20 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-[#6BBE7A]/20 blur-[160px] animate-float-slow" />
        <div className="dot-cluster absolute inset-0 opacity-[0.08]" />
      </div>

      {/* Giant watermark */}
      <div
        aria-hidden
        className="editorial-num pointer-events-none absolute -left-3 top-1/3 -translate-y-1/2 select-none text-[10rem] leading-none text-[#004D5C]/[0.05] sm:text-[14rem] md:-left-4 md:text-[20rem] lg:text-[26rem]"
      >
        17
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-12 gap-8 px-5 sm:px-6 md:gap-10 md:px-12">
        {/* Left column */}
        <div className="col-span-12 flex flex-col justify-center lg:col-span-7">
          <Reveal>
            <div className="mb-8 flex items-center gap-4 md:mb-10 md:gap-5">
              <span className="h-px w-10 bg-[#6BBE7A] md:w-14" />
              <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#0E7C86] sm:text-[10px] sm:tracking-[0.5em]">
                Edição Inaugural · São Paulo 2026
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="font-display text-[2.5rem] font-extrabold leading-[0.95] tracking-[-0.03em] text-[#004D5C] sm:text-6xl md:text-7xl lg:text-[5.25rem]">
              O futuro
              <br />
              começa pela
              <br />
              <span className="text-gradient-brand">integração.</span>
            </h1>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-[1.3fr_1fr] sm:items-start sm:gap-10">
              <p className="border-l-2 border-[#6BBE7A] pl-5 text-base leading-relaxed text-[#004D5C]/80 sm:pl-6 sm:text-lg">
                A medicina imunomediada deixou de ser isolada. Um simpósio desenhado para conectar especialidades, terapias, controvérsias e a prática médica real em torno da jornada do paciente.
              </p>
              <div className="grid grid-cols-3 gap-4 sm:flex sm:flex-col sm:gap-6">
                <Stat value={<AnimatedCounter to={250} />} label="Médicos convidados" color="#0E7C86" />
                <Stat value="SP" label="Espaço Millenium" color="#6BBE7A" />
                <Stat value="17.Out" label="2026 · Sábado" color="#004D5C" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={380}>
            <div className="mt-10 flex flex-wrap items-center gap-5 sm:mt-12 sm:gap-6">
              <a href="#sobre" className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#004D5C]/70 hover:text-[#0E7C86] sm:tracking-[0.36em]">
                ↓ Conheça o programa
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right column */}
        <div className="col-span-12 mt-10 lg:col-span-5 lg:mt-0">
          <Reveal delay={300}>
            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#004D5C]/5 shadow-[0_30px_80px_-20px_rgba(0,77,92,0.45)]">
              <img
                src={heroImg}
                alt="Médicos especialistas reunidos em discussão clínica multidisciplinar"
                className="h-full w-full scale-110 object-cover grayscale-[0.15] transition-all duration-[1200ms] ease-out group-hover:scale-100 group-hover:grayscale-0"
                width={1280}
                height={1600}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#004D5C]/40 via-transparent to-transparent" />

              {/* Floating glass card */}
              <div className="absolute bottom-5 left-4 right-4 max-w-[280px] border border-white/50 bg-white/55 p-5 shadow-2xl backdrop-blur-2xl transition-transform duration-500 hover:-translate-y-1 sm:bottom-10 sm:p-7 md:left-6 md:right-6 md:max-w-[320px] lg:left-8 lg:right-auto lg:max-w-[300px]">
                <Quote className="mb-3 h-4 w-4 text-[#6BBE7A] sm:mb-4" />
                <p className="text-[11px] font-medium leading-relaxed text-[#004D5C] sm:text-xs">
                  “Conectar especialidades, experiências clínicas e decisões reais — essa é a medicina imunomediada que defendemos.”
                </p>
                <div className="mt-4 flex items-center gap-3 sm:mt-5">
                  <span className="h-px w-6 bg-[#6BBE7A]" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#0E7C86]">Comissão Científica</span>
                </div>
              </div>

              {/* corner dots */}
              <div className="absolute right-4 top-4 flex flex-col gap-2 sm:right-6 sm:top-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6BBE7A]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#0E7C86]/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#E6ECEF]" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label, color }: { value: React.ReactNode; label: string; color: string }) {
  return (
    <div>
      <div className="editorial-num text-3xl sm:text-4xl md:text-5xl" style={{ color }}>{value}</div>
      <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#004D5C]/60 sm:text-[10px] sm:tracking-[0.3em]">{label}</div>
    </div>
  );
}

function Marquee() {
  const items = [
    "Reumatologia", "Dermatologia", "Gastroenterologia", "Alergologia & Imunologia",
    "Pneumologia", "Clínica Médica", "Pediatria", "Medicina de Família",
  ];
  const line = items.join("  ·  ");
  return (
    <section aria-hidden className="relative overflow-hidden border-y border-[#004D5C]/10 bg-white/60 py-4 backdrop-blur sm:py-5">
      <div className="flex whitespace-nowrap">
        <div className="animate-marquee flex shrink-0 items-center gap-16 pr-16">
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#004D5C]/45 sm:text-[10px] sm:tracking-[0.55em]">{line}</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#0E7C86]/55 sm:text-[10px] sm:tracking-[0.55em]">{line}</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#004D5C]/45 sm:text-[10px] sm:tracking-[0.55em]">{line}</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#0E7C86]/55 sm:text-[10px] sm:tracking-[0.55em]">{line}</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  const items = [
    { icon: <Stethoscope />, text: "Casos clínicos reais e multidisciplinares" },
    { icon: <Flame />, text: "Hot Topics & controvérsias da prática" },
    { icon: <ClipboardList />, text: "Discussões aplicáveis ao consultório" },
    { icon: <Activity />, text: "Atualização em terapias imunomediadas" },
    { icon: <GitBranch />, text: "Interfaces entre especialidades" },
    { icon: <Network />, text: "Networking altamente qualificado" },
  ];
  return (
    <section id="sobre" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 md:px-12 md:py-28 lg:py-36">
      <Reveal>
        <SectionIndex num="01" label="Sobre o Simpósio" />
      </Reveal>

      <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-12 md:gap-16">
        <Reveal delay={120} className="md:col-span-5">
          <h2 className="font-display text-3xl font-bold leading-tight text-[#004D5C] sm:text-4xl md:text-5xl">
            O paciente imunomediado <span className="italic text-[#0E7C86]">não pertence</span> a apenas uma especialidade.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[#004D5C]/70 md:mt-8 md:text-lg">
            O simpósio propõe uma visão integrada e prática sobre as doenças imunomediadas, conectando especialistas e médicos da linha de frente em torno da experiência real do paciente.
          </p>
        </Reveal>

        <div className="md:col-span-7">
          <ol className="divide-y divide-[#004D5C]/10 border-y border-[#004D5C]/10">
            {items.map((it, i) => (
              <Reveal key={it.text} delay={i * 80}>
                <li className="group flex items-center gap-4 py-5 transition-all duration-500 hover:bg-white/50 hover:pl-3 sm:gap-8 sm:py-6">
                  <span className="editorial-num w-8 text-xl text-[#0E7C86] sm:w-12 sm:text-3xl">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 text-[15px] font-medium text-[#004D5C] sm:text-base">{it.text}</span>
                  <span className="text-[#6BBE7A] transition-transform duration-500 group-hover:rotate-12">
                    <span className="block h-4 w-4 [&_svg]:h-4 [&_svg]:w-4">{it.icon}</span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  return <HighlightsImpl />;
}

function GrupoCita() {
  return (
    <section id="grupo-cita" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 md:px-12 md:py-28 lg:py-36">
      <Reveal>
        <SectionIndex num="02" label="Sobre o Grupo CITA" />
      </Reveal>

      <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-12 md:gap-16">
        <Reveal delay={120} className="md:col-span-5">
          <h2 className="font-display text-3xl font-bold leading-tight text-[#004D5C] sm:text-4xl md:text-5xl">
            Grupo CITA — <span className="italic text-[#0E7C86]">Centros Integrados de Terapia Assistida</span>.
          </h2>
          <div className="mt-8 flex items-center gap-5">
            <img src={logoCita} alt="Grupo CITA" loading="lazy" decoding="async" className="h-14 w-auto md:h-20" />
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {["Fundado em 2021", "BA + SP", "Doenças imunomediadas e raras"].map((t) => (
              <li key={t} className="rounded-full border border-[#004D5C]/15 bg-white/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0E7C86] backdrop-blur sm:text-[11px]">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={180} className="md:col-span-7">
          <div className="space-y-5 text-base leading-relaxed text-[#004D5C]/80 md:text-lg">
            <p>
              O <strong>Grupo CITA – Centros Integrados de Terapia Assistida</strong> é uma holding nacional de saúde
              especializada em doenças autoimunes, imunomediadas e raras. Atuamos de forma integrada em unidades
              localizadas em Salvador (BA) e São Paulo (SP), oferecendo um modelo inovador de atenção em saúde baseado
              em terapias avançadas, acolhimento, alta performance clínica e pesquisa científica.
            </p>
            <p>
              Criado em 2021, o Grupo CITA nasceu com a proposta de transformar a jornada do paciente imunomediado,
              promovendo acesso, inovação, humanização e sustentabilidade em saúde.
            </p>
          </div>

          <div className="mt-10 border-t border-[#004D5C]/10 pt-6">
            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#0E7C86] sm:text-[10px] sm:tracking-[0.45em]">
              Unidades do Grupo
            </span>
            <div className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-5 sm:gap-x-12 md:gap-x-16">
              {CLINICAS.map((c) => (
                <img
                  key={c.name}
                  src={c.src}
                  alt={c.name}
                  loading="lazy"
                  decoding="async"
                  className="h-10 w-auto opacity-90 transition-opacity hover:opacity-100 md:h-12"
                  style={{ transform: `scale(${c.scale})`, transformOrigin: "left center" }}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HighlightsImpl() {
  return (
    <section className="relative overflow-hidden bg-white/60 py-20 sm:py-24 md:py-28 lg:py-36">
      <div className="dot-cluster pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 md:gap-16 md:px-12 lg:grid-cols-2">
        <HighlightBlock
          icon={<Award />}
          word="ÚNICO."
          title="Por que este simpósio é único"
          body="A maioria dos simpósios ainda discute doenças sob a ótica isolada de cada especialidade. Aqui, propomos uma visão integrada da medicina imunomediada — conectando especialistas e clínicos em torno de decisões reais."
        />
        <HighlightBlock
          icon={<Gem />}
          word="VALOR."
          title="Proposta de valor"
          body="Transformar atualização científica em tomada de decisão clínica. Mais do que assistir aulas, o participante vivencia a jornada do paciente imunomediado sob múltiplas perspectivas."
        />
      </div>
    </section>
  );
}

function HighlightBlock({ icon, word, title, body }: { icon: React.ReactNode; word: string; title: string; body: string }) {
  return (
    <Reveal>
      <div className="group relative flex flex-col gap-5 border-l border-[#004D5C]/15 pl-5 transition-colors duration-500 hover:border-[#6BBE7A] sm:gap-6 sm:pl-8">
        <div className="flex items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#004D5C] text-white transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 [&_svg]:h-4 [&_svg]:w-4">
            {icon}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#0E7C86] sm:text-[10px] sm:tracking-[0.4em]">{title}</span>
        </div>
        <h3 className="editorial-num text-5xl text-[#004D5C] sm:text-6xl md:text-7xl">
          {word}
        </h3>
        <p className="max-w-md text-base leading-relaxed text-[#004D5C]/75">{body}</p>
      </div>
    </Reveal>
  );
}

function Audience() {
  const diffs = [
    { icon: <Network />, label: "Visão multidisciplinar real" },
    { icon: <ClipboardList />, label: "Discussão baseada em casos" },
    { icon: <Handshake />, label: "Clínicos + especialistas" },
    { icon: <Flame />, label: "Hot Topics & Controvérsias" },
    { icon: <Layers />, label: "Networking qualificado" },
  ];
  const audience = [
    "Reumatologia", "Dermatologia", "Gastroenterologia",
    "Alergologia & Imunologia", "Pneumologia", "Clínica Médica",
    "Pediatria", "Medicina de Família", "Residentes",
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 md:px-12 md:py-28 lg:py-36">
      <div className="grid gap-12 md:gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionIndex num="03" label="Para quem é o evento" />
          <h2 className="mt-8 font-display text-3xl font-bold leading-tight text-[#004D5C] sm:text-4xl md:mt-10">
            Um encontro pensado para quem vive a <span className="italic text-[#0E7C86]">prática real</span>.
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 md:mt-10">
            {audience.map((a) => (
              <li key={a} className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#004D5C]/80 sm:text-[11px] sm:tracking-[0.18em]">
                · {a}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150} className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-brand p-6 text-white sm:p-8 md:p-10 lg:p-14">
            <div className="dot-cluster pointer-events-none absolute inset-0 opacity-20" />
            <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[#6BBE7A]/30 blur-3xl" />
            <div className="relative">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#6BBE7A] sm:text-[10px] sm:tracking-[0.4em]">Diferenciais</span>
              <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
                O que torna este simpósio diferente.
              </h3>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:mt-12 md:gap-8 lg:grid-cols-3">
                {diffs.map((d, i) => (
                  <div key={d.label} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.08] sm:p-6">
                    <span className="editorial-num absolute -right-2 -top-3 text-5xl text-white/[0.07] transition-transform duration-500 group-hover:scale-110 sm:text-6xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[#6BBE7A] [&_svg]:h-5 [&_svg]:w-5">{d.icon}</span>
                    <p className="mt-4 text-[11px] font-semibold leading-snug text-white/90 sm:mt-5 sm:text-xs">{d.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Committee() {
  const photos = import.meta.glob("../assets/committee/*.jpg", { eager: true }) as Record<string, { default: string }>;
  const photoBy = (file: string) => {
    const entry = Object.entries(photos).find(([p]) => p.endsWith(`/${file}`));
    return entry?.[1].default;
  };
  const committee = [
    { name: "Dr. Alexandre Ibrahim", tag: "Reumatologia", photo: photoBy("Dr._Alexandre_Ibrahim.jpg") },
    { name: "Dra. Ana Teresa Amoedo", tag: "Reumatologia", photo: photoBy("Dra._Ana_Teresa_Amoedo.jpg") },
    { name: "Dr. Antonio Condino", tag: "Alergologia & Imunologia", photo: photoBy("Dr._Antonio_Condino.jpg") },
    { name: "Dra. Carla Saad", tag: "Reumatologia", photo: photoBy("Dra._Carla_Saad.jpg") },
    { name: "Dra. Genoile Silva", tag: "Gastroenterologia", photo: photoBy("Dra._Genoile_Silva.jpg") },
    { name: "Dr. Gleison Duarte", tag: "Dermatologia", photo: photoBy("Dr._Gleison_Duarte.jpg") },
    { name: "Dr. Júlio Bertacini", tag: "Reumatologia", photo: photoBy("Dr._Julio_Bertacini.jpg") },
    { name: "Dr. Rafael Carvalho", tag: "Reumatologia", photo: photoBy("Dr._Rafael_Carvalho.jpg") },
    { name: "Dra. Samira Apóstolos", tag: "Neurologia", photo: photoBy("Dra._Samila_Apostolo.jpg") },
  ];

  return (
    <section id="comissao" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 md:px-12 md:py-28 lg:py-36">
      <Reveal>
        <SectionIndex num="04" label="Comissão Científica" />
      </Reveal>

      <Reveal delay={100}>
        <h2 className="mt-8 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-[#004D5C] sm:text-5xl md:mt-10 md:text-6xl">
          Nove especialistas. <span className="text-gradient-brand">Uma visão integrada.</span>
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 md:mt-14 md:gap-7 lg:grid-cols-4">
        {committee.map((c, i) => (
          <Reveal key={c.name} delay={i * 70}>
            <article className="group relative flex h-full flex-col rounded-2xl border border-[#004D5C]/10 bg-white/75 p-6 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-[#6BBE7A]/60 hover:shadow-[0_30px_60px_-30px_rgba(0,77,92,0.3)] sm:p-7">
              {c.photo && (
                <div className="mb-5 overflow-hidden rounded-xl bg-[#004D5C]/5">
                  <img
                    src={c.photo}
                    alt={c.name}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
              <span className="inline-flex w-fit items-center rounded-full bg-[#0E7C86]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#0E7C86]">
                {c.tag}
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold leading-snug tracking-tight text-[#004D5C] sm:text-xl">
                {c.name}
              </h3>
              <span className="mt-4 block h-[2px] w-10 bg-[#6BBE7A] transition-all duration-500 group-hover:w-20" />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

type AgendaEntry =
  | { kind: "mesa"; title: string; note?: string }
  | { kind: "item"; time: string; title: string; sub?: string };

function Agenda() {
  const entries: AgendaEntry[] = [
    { kind: "item", time: "07h30", title: "Credenciamento e Welcome Coffee" },
    { kind: "item", time: "08h15", title: "Abertura Institucional", sub: "Carlos Cunha, CEO do Grupo CITA, e diretores médicos" },

    { kind: "mesa", title: "Mesa 1 — Integração do Cuidado e Jornada do Paciente" },
    { kind: "item", time: "08h30", title: "Jornada do Paciente como Instrumento de Eficiência", sub: "Dr. Júlio Moraes" },
    { kind: "item", time: "08h45", title: "Importância da Integração entre Médico Prescritor e Centro de Terapia Assistida", sub: "Dr. Rafael Carvalho" },
    { kind: "item", time: "09h00", title: "Acompanhamento de Desfechos e Experiência do Paciente", sub: "Dra. Ana Teresa Amoedo" },
    { kind: "item", time: "09h15", title: "Discussão" },
    { kind: "item", time: "09h30", title: "Simpósio Satélite I" },
    { kind: "item", time: "10h00", title: "Coffee Break" },

    { kind: "mesa", title: "Mesa 2 — Hot Topics em Doenças Imunomediadas" },
    { kind: "item", time: "10h30", title: "Papel dos Exames Genéticos no Diagnóstico e Manejo" },
    { kind: "item", time: "10h50", title: "Manejo de Comorbidades e Impacto nos Desfechos" },
    { kind: "item", time: "11h10", title: "Terapia Celular nas Doenças Imunomediadas", sub: "Dr. Henrique Dalmolin" },
    { kind: "item", time: "11h30", title: "Discussão" },
    { kind: "item", time: "12h00", title: "Simpósio Satélite II" },
    { kind: "item", time: "12h30", title: "Simpósio Satélite III" },
    { kind: "item", time: "13h00", title: "Almoço e Networking" },

    { kind: "mesa", title: "Mesa 3 — Controvérsias em Doenças Imunomediadas" },
    { kind: "item", time: "14h00", title: "Diagnóstico e Manejo das Imunodeficiências Primárias" },
    { kind: "item", time: "14h15", title: "Neuroimunologia: Diagnóstico Preciso e Tratamento Precoce", sub: "Dra. Samira Apóstolos" },
    { kind: "item", time: "14h30", title: "Desafios no Diagnóstico e Manejo da Hidradenite Supurativa" },
    { kind: "item", time: "14h45", title: "Discussão" },

    { kind: "mesa", title: "Mesa 4 — Aplicações Clínicas e Decisões Compartilhadas" },
    { kind: "item", time: "15h00", title: "Do Intestino às Articulações: Individualização do Tratamento" },
    { kind: "item", time: "15h15", title: "Dermatite Atópica: Impacto do Diagnóstico na Escolha do Tratamento" },
    { kind: "item", time: "15h30", title: "Lúpus em 2026: Estratégia para Cada Paciente" },
    { kind: "item", time: "15h45", title: "Discussão" },
    { kind: "item", time: "16h00", title: "Simpósio Satélite IV" },
    { kind: "item", time: "16h30", title: "Coffee Break" },

    { kind: "mesa", title: "Mesa 5 — Casos Clínicos Interativos", note: "Moderador: Dr. Fernando — EV CITI" },
    { kind: "item", time: "17h00", title: "Caso Clínico: Gastroenterologia, Dermatologia e Reumatologia" },
    { kind: "item", time: "17h30", title: "Caso Clínico: Neuroimunologia, Dermatologia, Imunologia e Reumatologia" },
    { kind: "item", time: "18h00", title: "Mensagens Finais e Encerramento", sub: "Carlos Cunha, CEO do Grupo CITA, e diretores médicos" },
  ];

  return (
    <section id="agenda" className="relative overflow-hidden bg-[#003a45] py-20 text-white sm:py-24 md:py-28 lg:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-1/4 h-[400px] w-[400px] rounded-full bg-[#0E7C86]/30 blur-[140px]" />
        <div className="absolute bottom-0 -left-32 h-[500px] w-[500px] rounded-full bg-[#6BBE7A]/15 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 md:px-12">
        <Reveal>
          <div className="flex items-baseline gap-4 sm:gap-6">
            <span className="editorial-num text-5xl text-white/10 sm:text-7xl md:text-8xl">05</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#6BBE7A] sm:text-[10px] sm:tracking-[0.45em]">Programa preliminar</span>
          </div>
          <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl md:mt-8 md:text-5xl">
            Um dia inteiro de <span className="italic text-[#6BBE7A]">imersão clínica</span>.
          </h2>
        </Reveal>

        <ol className="relative mt-12 border-l border-white/10 pl-6 md:mt-16 md:pl-12">
          {entries.map((e, i) =>
            e.kind === "mesa" ? (
              <Reveal key={`mesa-${e.title}`} delay={i * 20}>
                <li className="relative pt-8 pb-2">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-[#6BBE7A] sm:text-[11px] sm:tracking-[0.32em]">
                    {e.title}
                  </span>
                  {e.note ? (
                    <span className="mt-1.5 block text-[11px] font-medium text-white/50">{e.note}</span>
                  ) : null}
                </li>
              </Reveal>
            ) : (
              <Reveal key={`${e.time}-${e.title}`} delay={i * 20}>
                <li className="group relative grid grid-cols-[70px_1fr] items-baseline gap-x-4 gap-y-1 py-4 transition-all duration-500 hover:translate-x-1 sm:gap-x-6 sm:py-5 md:grid-cols-[120px_1fr_auto] md:gap-12">
                  <span className="absolute -left-[16px] top-6 h-2.5 w-2.5 rounded-full bg-[#6BBE7A] ring-4 ring-[#003a45] transition-transform duration-500 group-hover:scale-150 md:-left-[18px]" />
                  <span className="editorial-num text-xl text-white sm:text-2xl md:text-3xl">{e.time}</span>
                  <span className="font-display text-sm font-semibold leading-snug text-white sm:text-base md:text-lg">{e.title}</span>
                  {e.sub ? (
                    <span className="col-start-2 text-[9px] font-medium uppercase tracking-[0.25em] text-white/50 sm:text-[10px] sm:tracking-[0.3em] md:col-start-3 md:col-end-auto md:text-right">
                      {e.sub}
                    </span>
                  ) : null}
                </li>
              </Reveal>
            ),
          )}
        </ol>

        <Reveal>
          <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.25em] text-white/40">
            Programação preliminar sujeita a alterações.
          </p>
        </Reveal>
      </div>
    </section>
  );
}



function Sponsors() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 md:px-12 md:py-32">
      <Reveal>
        <SectionIndex num="06" label="Realização & Patrocínio" />
      </Reveal>

      <div className="mt-10 grid gap-12 md:mt-12 md:gap-16 lg:grid-cols-2">
        <Reveal delay={100}>
          <div>
            <h3 className="font-display text-2xl font-bold text-[#004D5C] sm:text-3xl md:text-4xl">Fale com o comercial.</h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#004D5C]/70">
              Patrocínios, simpósios satélites e espaços de relacionamento. Conecte sua marca a médicos e profissionais da saúde altamente selecionados.
            </p>
            <div className="mt-8 space-y-5 text-sm md:mt-10">
              <a href={CTA_HREF} className="group flex items-center gap-3 border-b border-[#004D5C]/15 pb-4 transition-colors hover:border-[#6BBE7A] sm:gap-4">
                <Mail className="h-4 w-4 shrink-0 text-[#0E7C86]" />
                <span className="flex-1 break-all text-[13px] text-[#004D5C] sm:break-normal sm:text-sm">daniel@worldmedacademy.com</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[#6BBE7A] transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 border-b border-[#004D5C]/15 pb-4 transition-colors hover:border-[#6BBE7A] sm:gap-4"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-[#6BBE7A]" />
                <span className="flex-1 text-[14px] text-[#004D5C] sm:text-base">WhatsApp · +55 11 97068-7422</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[#6BBE7A] transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <div className="flex items-center gap-3 sm:gap-4">
                <MapPin className="h-4 w-4 shrink-0 text-[#0E7C86]" />
                <span className="text-[14px] text-[#004D5C] sm:text-base">Espaço Millenium · São Paulo — SP</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-[#004D5C]/10 bg-white/60 p-6 backdrop-blur sm:p-8 md:gap-10 md:p-10">
            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#0E7C86] sm:text-[10px] sm:tracking-[0.45em]">Realização</span>
            <div className="flex flex-col gap-5 sm:gap-6">
              <div className="flex items-center gap-4">
                <span className="w-24 text-[10px] font-bold uppercase tracking-[0.3em] text-[#004D5C]/60">Realização</span>
                <img src={logoCita} alt="Grupo CITA" loading="lazy" decoding="async" className="h-8 w-auto sm:h-9" />
              </div>
              <div className="flex items-center gap-4">
                <span className="w-24 text-[10px] font-bold uppercase tracking-[0.3em] text-[#004D5C]/60">Organização</span>
                <img src={logoWorldMed} alt="WorldMed Academy" loading="lazy" decoding="async" className="h-7 w-auto sm:h-8" />
              </div>
            </div>
            <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#004D5C]/50 sm:text-[10px] sm:tracking-[0.45em]">
              São Paulo · Brasil · MMXXVI
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-14 space-y-10 md:mt-20 md:space-y-14">
        {SPONSOR_TIERS.map((tier, ti) => (
          <Reveal key={tier.label} delay={ti * 80}>
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#0E7C86] sm:text-[10px] sm:tracking-[0.45em]">
                {tier.label}
              </span>
              <span className="h-px flex-1 bg-[#004D5C]/10" />
            </div>
            <div
              className={
                tier.label === "Diamante"
                  ? "mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
                  : "mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
              }
            >
              {tier.logos.map((logo) => (
                <div
                  key={logo.name}
                  className={
                    "flex items-center justify-center rounded-2xl border border-[#004D5C]/10 bg-white p-6 transition-shadow duration-500 hover:shadow-[0_16px_40px_-20px_rgba(0,77,92,0.35)] " +
                    (tier.label === "Diamante" ? "min-h-36 sm:min-h-44" : "min-h-24")
                  }
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    loading="lazy"
                    className={
                      "w-auto object-contain " +
                      (tier.label === "Diamante" ? "max-h-16 sm:max-h-20" : "max-h-10 sm:max-h-12")
                    }
                  />
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FooterCTA() {
  return <FooterCTAImpl />;
}

function Inscription() {
  return (
    <section id="inscricao" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 md:px-12 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/4 h-[360px] w-[360px] rounded-full bg-[#6BBE7A]/15 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-[#0E7C86]/15 blur-[140px]" />
      </div>
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <SectionIndex num="09" label="Inscrição" />
          <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-[#004D5C] sm:text-4xl md:text-5xl">
            Garanta sua <span className="italic text-[#0E7C86]">vaga</span>.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#004D5C]/70">
            O cadastro agora é realizado em uma página externa oficial do evento. Clique no botão para continuar sua inscrição com segurança.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={REGISTRATION_HREF}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#004D5C] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.26em] text-white shadow-green-glow transition-all hover:-translate-y-0.5 hover:bg-[#0E7C86] sm:px-8"
            >
              Fazer inscrição
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#004D5C]/20 bg-white/55 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#004D5C] backdrop-blur transition-all hover:border-[#6BBE7A] hover:text-[#0E7C86] sm:px-7"
            >
              Dúvidas
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-6">
          <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/75 p-6 shadow-[0_24px_70px_-40px_rgba(0,77,92,0.65)] backdrop-blur sm:p-8 md:p-10">
            <div aria-hidden className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#6BBE7A]/25 blur-3xl" />
            <div aria-hidden className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#0E7C86]/20 blur-3xl" />
            <div className="relative">
              <span className="inline-flex items-center rounded-full border border-[#0E7C86]/20 bg-[#E6ECEF]/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#0E7C86]">
                Cadastro externo
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold leading-tight text-[#004D5C] sm:text-3xl">
                Inscrição rápida na plataforma oficial.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#004D5C]/70 sm:text-base">
                Você será direcionado para concluir o cadastro fora deste site, sem preencher dados médicos aqui.
              </p>
              <div className="mt-8 grid gap-3 text-sm text-[#004D5C]/75 sm:grid-cols-2">
                <div className="rounded-xl border border-[#004D5C]/10 bg-white/65 p-4">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-[#0E7C86]">Data</span>
                  <strong className="mt-2 block font-display text-lg text-[#004D5C]">17/10/2026</strong>
                </div>
                <div className="rounded-xl border border-[#004D5C]/10 bg-white/65 p-4">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-[#0E7C86]">Local</span>
                  <strong className="mt-2 block font-display text-lg text-[#004D5C]">Espaço Millenium</strong>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const sponsorSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  empresa: z.string().trim().min(2, "Informe a empresa").max(120),
  cargo: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("E-mail inválido").max(160),
  telefone: z.string().trim().min(8, "Informe o telefone").max(40),
  cota: z.string().min(1, "Selecione uma cota"),
  mensagem: z.string().trim().max(1000).optional().or(z.literal("")),
});

function SponsorForm() {
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; msg?: string }>({ type: "idle" });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as Record<string, string>;
    const parsed = sponsorSchema.safeParse(data);
    if (!parsed.success) {
      const first = parsed.error.issues[0]?.message ?? "Verifique os campos";
      setStatus({ type: "error", msg: first });
      return;
    }
    const v = parsed.data;
    const subject = `Interesse em patrocínio — I Simpósio CITA — ${v.empresa}`;
    const body = [
      `Nome: ${v.nome}`,
      `Empresa: ${v.empresa}`,
      v.cargo ? `Cargo: ${v.cargo}` : null,
      `E-mail: ${v.email}`,
      `Telefone/WhatsApp: ${v.telefone}`,
      `Cota de interesse: ${v.cota}`,
      "",
      "Mensagem:",
      v.mensagem || "(sem mensagem)",
    ].filter(Boolean).join("\n");
    const href = `mailto:daniel@worldmedacademy.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setStatus({ type: "success", msg: "Abrimos seu cliente de e-mail. Se não abrir, escreva para daniel@worldmedacademy.com." });
    e.currentTarget.reset();
  }

  const inputCls = "w-full rounded-lg border border-[#004D5C]/15 bg-white/80 px-4 py-3 text-sm text-[#004D5C] placeholder:text-[#004D5C]/40 outline-none transition focus:border-[#0E7C86] focus:ring-2 focus:ring-[#0E7C86]/20";
  const labelCls = "text-[10px] font-bold uppercase tracking-[0.25em] text-[#0E7C86]";

  return (
    <section id="patrocinar" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 md:px-12 md:py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionIndex num="08" label="Quero patrocinar" />
          <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-[#004D5C] sm:text-4xl md:text-5xl">
            Conecte sua marca a <span className="italic text-[#0E7C86]">250 médicos convidados</span>.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#004D5C]/70">
            Preencha o formulário e nosso time comercial entrará em contato com as opções de cotas, simpósios satélites
            e ativações de marca.
          </p>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          <form
            onSubmit={onSubmit}
            className="grid gap-5 rounded-2xl border border-[#004D5C]/10 bg-white/70 p-6 backdrop-blur sm:p-8 md:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className={labelCls}>Nome*</span>
                <input name="nome" required maxLength={100} className={inputCls} placeholder="Seu nome" />
              </label>
              <label className="flex flex-col gap-2">
                <span className={labelCls}>Empresa*</span>
                <input name="empresa" required maxLength={120} className={inputCls} placeholder="Nome da empresa" />
              </label>
              <label className="flex flex-col gap-2">
                <span className={labelCls}>Cargo</span>
                <input name="cargo" maxLength={120} className={inputCls} placeholder="Opcional" />
              </label>
              <label className="flex flex-col gap-2">
                <span className={labelCls}>E-mail*</span>
                <input name="email" type="email" required maxLength={160} className={inputCls} placeholder="voce@empresa.com" />
              </label>
              <label className="flex flex-col gap-2">
                <span className={labelCls}>Telefone / WhatsApp*</span>
                <input name="telefone" required maxLength={40} className={inputCls} placeholder="+55 (00) 00000-0000" />
              </label>
              <label className="flex flex-col gap-2">
                <span className={labelCls}>Cota de interesse*</span>
                <select name="cota" required defaultValue="" className={inputCls}>
                  <option value="" disabled>Selecione…</option>
                  <option value="Diamante">Diamante</option>
                  <option value="Ouro">Ouro</option>
                  <option value="Prata">Prata</option>
                  <option value="Apoio">Apoio</option>
                  <option value="Simpósio Satélite">Simpósio Satélite</option>
                  <option value="A definir">A definir</option>
                </select>
              </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className={labelCls}>Mensagem</span>
              <textarea name="mensagem" maxLength={1000} rows={4} className={inputCls} placeholder="Conte-nos um pouco sobre o interesse" />
            </label>
            {status.type !== "idle" && (
              <p className={`text-sm ${status.type === "success" ? "text-[#0E7C86]" : "text-red-600"}`}>{status.msg}</p>
            )}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="group inline-flex items-center gap-3 rounded-full bg-[#004D5C] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.3em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#0E7C86]"
              >
                <Mail className="h-4 w-4" />
                Enviar interesse
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <span className="text-[10px] text-[#004D5C]/55">Abriremos seu cliente de e-mail com os dados preenchidos.</span>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

const VENUE_NAME = "Espaço Millenium";
const VENUE_ADDRESS = "R. Dr. Bacelar, 1043 — Vila Clementino, São Paulo — SP";
const VENUE_QUERY = encodeURIComponent("Espaço Millenium, R. Dr. Bacelar, 1043, São Paulo, SP");

function Venue() {
  return (
    <section id="local" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 md:px-12 md:py-28 lg:py-36">
      <Reveal>
        <SectionIndex num="07" label="Onde acontece" />
      </Reveal>

      <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end md:gap-10">
        <Reveal delay={100} className="md:col-span-7">
          <h2 className="font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.02em] text-[#004D5C] sm:text-4xl md:text-5xl">
            <span className="text-gradient-brand">Espaço Millenium</span>
            <br />
            São Paulo · Brasil.
          </h2>
        </Reveal>
        <Reveal delay={180} className="md:col-span-5">
          <p className="text-base leading-relaxed text-[#004D5C]/75">
            Um centro de eventos pensado para encontros médicos de alto nível — auditório completo, áreas de coffee e
            networking integradas. Localização estratégica em São Paulo, fácil acesso e estrutura premium.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${VENUE_QUERY}`}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#004D5C] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#0E7C86] sm:justify-start sm:tracking-[0.3em]"
            >
              <Navigation className="h-3.5 w-3.5" />
              Ver no Google Maps
            </a>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${VENUE_QUERY}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#004D5C]/20 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#004D5C] transition-all hover:border-[#6BBE7A] hover:text-[#0E7C86] sm:justify-start sm:tracking-[0.3em]"
            >
              Como chegar
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </Reveal>
      </div>

      {/* Asymmetric gallery */}
      <Reveal delay={220}>
        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-12 md:grid-rows-2 md:gap-6">
          <figure className="group relative col-span-12 overflow-hidden rounded-2xl md:col-span-7 md:row-span-2">
            <img
              src={venueHall}
              alt="Auditório do local preparado para o simpósio"
              loading="lazy"
              className="h-[220px] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105 sm:h-[300px] md:h-full"
            />
            <figcaption className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-[#0E7C86] backdrop-blur sm:bottom-4 sm:left-4 sm:px-3 sm:tracking-[0.3em]">
              Auditório principal
            </figcaption>
          </figure>
          <figure className="group relative col-span-12 overflow-hidden rounded-2xl md:col-span-5">
            <img
              src={venueAuditorium}
              alt="Auditório completo do local"
              loading="lazy"
              className="h-[180px] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105 sm:h-[220px] md:h-full"
            />
            <figcaption className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-[#0E7C86] backdrop-blur sm:bottom-4 sm:left-4 sm:px-3 sm:tracking-[0.3em]">
              Auditório
            </figcaption>
          </figure>
          <figure className="group relative col-span-12 overflow-hidden rounded-2xl md:col-span-5">
            <img
              src={venuePlenary}
              alt="Plenário do local em evento"
              loading="lazy"
              className="h-[180px] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105 sm:h-[220px] md:h-full"
            />
            <figcaption className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-[#0E7C86] backdrop-blur sm:bottom-4 sm:left-4 sm:px-3 sm:tracking-[0.3em]">
              Plenário em evento
            </figcaption>
          </figure>
        </div>
      </Reveal>

      {/* Map */}
      <Reveal delay={280}>
        <div className="mt-8 grid gap-0 overflow-hidden rounded-2xl ring-1 ring-[#004D5C]/10 md:mt-10 lg:grid-cols-12">
          <div className="bg-gradient-brand p-6 text-white sm:p-8 lg:col-span-4 lg:p-10">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#6BBE7A] sm:text-[10px] sm:tracking-[0.4em]">Endereço</span>
            <h3 className="mt-3 font-display text-xl font-bold tracking-tight sm:mt-4 sm:text-2xl">{VENUE_NAME}</h3>
            <p className="mt-3 text-sm text-white/80">{VENUE_ADDRESS}</p>

            <div className="mt-6 space-y-4 border-t border-white/20 pt-6 text-sm md:mt-8">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 shrink-0 text-[#6BBE7A]" />
                <span className="text-[14px] text-white/90 sm:text-base">17 · Outubro · 2026 · Sábado</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-[#6BBE7A]" />
                <span className="text-[14px] text-white/90 sm:text-base">São Paulo — SP</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 shrink-0 text-[#6BBE7A]" />
                <span className="text-[14px] text-white/90 sm:text-base">Médicos e profissionais da saúde</span>
              </div>
            </div>
          </div>
          <div className="relative lg:col-span-8">
            <iframe
              title="Mapa do local"
              src={`https://maps.google.com/maps?q=${VENUE_QUERY}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[300px] w-full sm:h-[360px] lg:h-full lg:min-h-[480px]"
              style={{ border: 0, filter: "grayscale(0.2) contrast(1.05)" }}
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FooterCTAImpl() {
  return (
    <section className="relative overflow-hidden bg-[#003a45] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-[#0E7C86]/30 blur-[150px]" />
        <div className="absolute -bottom-40 right-0 h-[400px] w-[400px] rounded-full bg-[#6BBE7A]/20 blur-[140px]" />
        <div className="dot-cluster absolute inset-0 opacity-10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 md:px-12 md:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-7">
            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#6BBE7A] sm:text-[10px] sm:tracking-[0.45em]">17 · Outubro · 2026</span>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[0.95] sm:text-5xl md:mt-6 lg:text-7xl">
              A integração começa <span className="italic text-[#6BBE7A]">aqui</span>.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:mt-8 md:text-lg">
              I Simpósio CITA de Doenças Imunomediadas. Encontro para médicos e profissionais da saúde.
            </p>
          </div>

          <div className="flex flex-col items-start gap-6 lg:col-span-5 lg:items-end">
            <a
              href={CTA_HREF}
              className="group inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.3em] text-white/90 transition-colors hover:text-[#6BBE7A]"
            >
              <Mail className="h-4 w-4" />
              Falar com a organização
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 shrink-0 text-[#6BBE7A]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/70 sm:tracking-[0.4em]">
                Espaço Millenium · São Paulo
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-8 sm:gap-10 sm:pt-10 md:mt-20">
          <img
            src={logoHeader}
            alt="I Simpósio CITA de Doenças Imunomediadas — Grupo CITA"
            loading="lazy"
            decoding="async"
            className="h-12 w-auto object-contain brightness-0 invert sm:h-16"
          />
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 sm:text-[10px] sm:tracking-[0.4em]">
            © 2026 · Realização Grupo CITA · Organização WorldMed Academy
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/45 sm:text-[10px] sm:tracking-[0.45em]">
            Unidades do Grupo CITA
          </span>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 sm:gap-x-12 md:gap-x-14">
            {CLINICAS.map((c) => (
              <img
                key={c.name}
                src={c.src}
                alt={c.name}
                loading="lazy"
                decoding="async"
                className="h-7 w-auto opacity-80 brightness-0 invert transition-opacity hover:opacity-100 sm:h-8"
                style={{ transform: `scale(${c.scale})`, transformOrigin: "left center" }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}