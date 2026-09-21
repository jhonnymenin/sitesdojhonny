import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/site/Logo";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";
import { LogoMark } from "@/components/site/LogoMark";
import { useReveal } from "@/hooks/use-reveal";
import mama from "@/assets/mama.jpg";
import elevationLogo from "@/assets/elevation-logo-black.png";
import drHero from "@/assets/dr-hero-transparente.png";
import drSobre from "@/assets/foto-dr-sobre.png";
import procedimentosRosto from "@/assets/procedimentos-rosto.png";
import fotoClinica from "@/assets/foto-clinica.jpg";
import baBlefaro from "@/assets/ba-blefaroplastia.png";
import baFacetite from "@/assets/ba-facetite.png";
import baPapada from "@/assets/ba-papada.png";

const beforeAfterCases: { src: string; label: string }[] = [
  { src: baBlefaro, label: "Blefaroplastia" },
  { src: baFacetite, label: "FaceTite" },
  { src: baPapada, label: "Papada" },
];





export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Luís Felipe Lopez — Cirurgião Plástico · MÉTODO ELEVATION®" },
      {
        name: "description",
        content:
          "Cirurgia plástica com naturalidade, elegância e segurança. MÉTODO ELEVATION® — atendimento exclusivo no Jardim América, São Paulo.",
      },
      { property: "og:title", content: "Dr. Luís Felipe Lopez — MÉTODO ELEVATION®" },
      {
        property: "og:description",
        content: "Cirurgia plástica facial, mamária e corporal com rigor técnico e sensibilidade.",
      },
    ],
  }),
  component: Landing,
});

/* ───────── Conteúdo ───────── */

const stats = [
  { icon: "shield", t: "Membro da", b: "Sociedade Brasileira de Cirurgia Plástica" },
  { icon: "star", t: "Atendimento", b: "Personalizado" },
  { icon: "hospital", t: "Hospitais de", b: "Excelência em São Paulo" },
  { icon: "people", t: "Mais de 1.000", b: "pacientes atendidos" },
];

const specialties = [
  {
    key: "face",
    name: "Face",
    items: ["Deep Plane", "Blefaroplastia", "Rejuvenescimento Facial"],
  },
  {
    key: "mama",
    name: "Mama",
    items: ["Prótese", "Mastopexia", "Redução Mamária"],
  },
  {
    key: "corpo",
    name: "Corpo",
    items: ["Lipoaspiração", "Abdominoplastia", "Contorno Corporal"],
  },
  {
    key: "esteticos",
    name: "Procedimentos Estéticos",
    items: ["Botox", "Preenchimento", "Bioestimuladores"],
  },
] as const;

const differentials = [
  {
    icon: "clock",
    t: "Consulta sem pressa",
    d: "Cada paciente possui necessidades únicas e merece atenção total.",
  },
  {
    icon: "plan",
    t: "Planejamento individualizado",
    d: "Indicação baseada em critérios médicos e no que faz sentido para você.",
  },
  {
    icon: "leaf",
    t: "Resultados naturais",
    d: "Harmonia, leveza e equilíbrio acima de exageros.",
  },
  {
    icon: "heart",
    t: "Acompanhamento próximo",
    d: "Do pré ao pós-operatório, você não está sozinho.",
  },
];

const testimonials = [
  {
    q: "Me senti segura desde a primeira consulta. Resultado natural e além do que eu esperava.",
    a: "Paciente · Face",
  },
  {
    q: "Resultado extremamente natural e elegante. Superou minhas expectativas!",
    a: "Paciente · Mama",
  },
  {
    q: "Atendimento humano e muito acolhedor. Recomendo de olhos fechados!",
    a: "Paciente · Blefaroplastia",
  },
];

/* ───────── Ícones lineares (stroke gold) ───────── */
const stroke = {
  stroke: "var(--color-gold)",
  strokeWidth: 1.1,
  fill: "none" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Icon({ name, size = 26 }: { name: string; size?: number }) {
  const s = size;
  switch (name) {
    case "shield":
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" {...stroke}>
          <path d="M16 4 L26 8 V16 C26 22 21 27 16 28 C11 27 6 22 6 16 V8 Z" />
        </svg>
      );
    case "star":
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" {...stroke}>
          <path d="M16 5 L19 13 L27 13.5 L21 19 L23 27 L16 23 L9 27 L11 19 L5 13.5 L13 13 Z" />
        </svg>
      );
    case "hospital":
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" {...stroke}>
          <path d="M6 28 V12 H26 V28 Z" />
          <path d="M16 16 V22 M13 19 H19" />
          <path d="M13 10 V4 H19 V10" />
        </svg>
      );
    case "people":
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" {...stroke}>
          <circle cx="11" cy="12" r="3.5" />
          <circle cx="21" cy="12" r="3.5" />
          <path d="M4 25 C4 21 7 19 11 19 C15 19 18 21 18 25" />
          <path d="M14 25 C14 21 17 19 21 19 C25 19 28 21 28 25" />
        </svg>
      );
    case "clock":
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" {...stroke}>
          <circle cx="16" cy="16" r="11" />
          <path d="M16 9 V16 L20 19" />
        </svg>
      );
    case "plan":
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" {...stroke}>
          <rect x="6" y="5" width="20" height="22" />
          <path d="M10 11 H22 M10 16 H22 M10 21 H18" />
        </svg>
      );
    case "leaf":
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" {...stroke}>
          <path d="M6 26 C6 14 14 6 26 6 C26 18 18 26 6 26 Z" />
          <path d="M6 26 L20 12" />
        </svg>
      );
    case "heart":
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" {...stroke}>
          <path d="M16 26 C7 20 4 15 4 11 C4 8 7 5 10 5 C12 5 14 6 16 9 C18 6 20 5 22 5 C25 5 28 8 28 11 C28 15 25 20 16 26 Z" />
        </svg>
      );
    case "face":
      return (
        <svg width={s + 8} height={s + 8} viewBox="0 0 40 40" {...stroke}>
          <path d="M20 6 C12 6 9 12 9 18 C9 25 13 32 20 32 C27 32 31 25 31 18 C31 12 28 6 20 6 Z" />
          <path d="M14 18 Q15 17 16 18 M24 18 Q25 17 26 18" />
          <path d="M18 24 Q20 26 22 24" />
          <path d="M9 14 C12 9 16 8 20 9" />
        </svg>
      );
    case "mama":
      return (
        <svg width={s + 8} height={s + 8} viewBox="0 0 40 40" {...stroke}>
          <path d="M6 14 C10 12 14 12 16 14 C18 16 18 22 14 25 C10 28 6 25 6 20 Z" />
          <path d="M34 14 C30 12 26 12 24 14 C22 16 22 22 26 25 C30 28 34 25 34 20 Z" />
          <circle cx="12" cy="19" r="1.2" fill="var(--color-gold)" stroke="none" />
          <circle cx="28" cy="19" r="1.2" fill="var(--color-gold)" stroke="none" />
        </svg>
      );
    case "corpo":
      return (
        <svg width={s + 8} height={s + 8} viewBox="0 0 40 40" {...stroke}>
          <path d="M14 6 C14 10 14 12 12 14 C10 16 10 20 12 22 C10 26 12 32 14 34" />
          <path d="M26 6 C26 10 26 12 28 14 C30 16 30 20 28 22 C30 26 28 32 26 34" />
        </svg>
      );
    case "esteticos":
      return (
        <svg width={s + 8} height={s + 8} viewBox="0 0 40 40" {...stroke}>
          <path d="M20 8 C14 8 11 13 11 19 C11 25 14 30 20 30 C26 30 29 25 29 19 C29 13 26 8 20 8 Z" />
          <path d="M16 20 L20 24 L26 16" />
        </svg>
      );
    case "phone":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
          <path d="M5 4 H8 L10 9 L8 11 C9 14 11 16 14 17 L16 15 L21 17 V20 C21 21 20 22 19 22 C11 22 2 13 2 5 C2 4 3 3 4 3 Z" />
        </svg>
      );
    case "pin":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
          <path d="M12 22 C7 16 4 12 4 9 C4 5 8 2 12 2 C16 2 20 5 20 9 C20 12 17 16 12 22 Z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      );
    case "ig":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.7" fill="var(--color-gold)" stroke="none" />
        </svg>
      );
    case "wa":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
          <path d="M3 21 L5 16 C3.5 13 4 9 6.5 6.5 C10 3 15 3 18 6 C21 9 21 14 17.5 17.5 C15 20 11 20.5 8 19 Z" />
          <path d="M9 10 C9 12 12 15 14 15" />
        </svg>
      );
    case "arrow":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
          <path d="M5 12 H19 M14 7 L19 12 L14 17" />
        </svg>
      );
    default:
      return null;
  }
}

/* ───────── Página ───────── */
function Landing() {
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: "#metodo", label: "Técnica" },
    { href: "#especialidades", label: "Procedimentos" },
    { href: "#sobre", label: "Sobre" },
  ];

  const elevationFilter = "none";

  return (
    <main className="relative bg-paper-cream" style={{ position: "relative", zIndex: 2 }}>


      {/* ───────── TOPBAR ───────── */}
      <header
        className="fixed top-0 inset-x-0 z-40 px-4 md:px-8 lg:px-14 py-3 md:py-4 grid grid-cols-[auto_1fr_auto] gap-3 md:gap-6 items-center"
        style={{
          background: "color-mix(in oklab, var(--beige-soft) 92%, transparent)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid color-mix(in oklab, var(--color-gold) 18%, transparent)",
        }}
      >
        <div className="flex items-center gap-3 md:gap-4 min-w-0 shrink-0">
          <Logo compact tone="dark" />
          <span
            className="hidden sm:block h-7 w-px shrink-0"
            style={{ background: "color-mix(in oklab, var(--color-gold) 50%, transparent)" }}
          />
          <img
            src={elevationLogo}
            alt="Método Elevation"
            className="hidden sm:block w-auto shrink-0"
            style={{ height: 26, filter: elevationFilter }}
            draggable={false}
          />
        </div>

        <nav
          className="hidden md:flex items-center justify-center gap-6 lg:gap-9 font-sans min-w-0"
          style={{ fontSize: 10.5, letterSpacing: "0.28em", textTransform: "uppercase" }}
        >
          {navItems.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="transition-colors whitespace-nowrap"
              style={{ color: "var(--brown-ink)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--brown-ink)")}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3 shrink-0 justify-end">
          <a href="#contato" className="btn-dark hidden sm:inline-flex whitespace-nowrap">
            Agendar consulta
            <span className="arrow">→</span>
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            className="md:hidden inline-flex flex-col gap-1.5 p-2 shrink-0"
          >
            <span className="block w-6 h-px" style={{ background: "var(--brown-ink)" }} />
            <span className="block w-6 h-px" style={{ background: "var(--brown-ink)" }} />
            <span className="block w-4 h-px ml-auto" style={{ background: "var(--brown-ink)" }} />
          </button>
        </div>
      </header>

      {/* mobile drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden flex flex-col items-center justify-center gap-8 px-6"
          style={{ background: "var(--beige-soft)" }}
          onClick={() => setMenuOpen(false)}
        >
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
            className="absolute top-6 right-6 font-display text-4xl"
            style={{ color: "var(--brown-ink)" }}
          >
            ×
          </button>
          <img
            src={elevationLogo}
            alt="Método Elevation"
            style={{ height: 32, filter: elevationFilter }}
          />
          <nav className="flex flex-col items-center gap-6 text-center">
            {navItems.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="font-display font-light text-3xl"
                style={{ color: "var(--brown-ink)" }}
              >
                {n.label}
              </a>
            ))}
            <div className="gold-rule w-32 my-4" />
            <a href="#contato" onClick={() => setMenuOpen(false)} className="btn-dark">
              Agendar consulta <span className="arrow">→</span>
            </a>
          </nav>
        </div>
      )}

      {/* ───────── HERO ───────── */}
      <section
        id="inicio"
        className="relative pt-28 lg:pt-32 pb-20 lg:pb-24 overflow-hidden"
      >
        <LogoMark
          size={620}
          opacity={0.07}
          tone="gold"
          className="absolute -right-32 top-10 hidden md:block"
        />
        <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">

          {/* Texto */}
          <div className="relative pt-6 lg:pt-12 max-w-3xl">
            <h1
              className="font-display font-light leading-[1.05]"
              style={{ fontSize: "clamp(2.1rem, 6vw, 4.4rem)", color: "var(--brown-ink)" }}
            >
              Cirurgia Plástica
              <br />
              com <span className="italic-gold">Naturalidade,</span>
              <br />
              Elegância e Segurança
            </h1>

            <div className="gold-rule mt-8 max-w-[140px]" />

            <p
              className="mt-8 font-body text-base md:text-lg leading-relaxed max-w-lg"
              style={{ color: "var(--brown-soft)" }}
            >
              Transformando autoestima com resultados que respeitam sua anatomia
              e valorizam sua beleza individual.
            </p>

            <a href="#contato" className="btn-dark mt-10">
              Agendar consulta <span className="arrow">→</span>
            </a>

            {/* Selos */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
              {stats.map((s) => (
                <div key={s.t} className="flex flex-col gap-3">
                  <div
                    className="w-11 h-11 grid place-items-center rounded-full"
                    style={{
                      border: "1px solid color-mix(in oklab, var(--color-gold) 45%, transparent)",
                    }}
                  >
                    <Icon name={s.icon} size={20} />
                  </div>
                  <div
                    className="font-sans leading-snug"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.06em",
                      color: "var(--brown-ink)",
                    }}
                  >
                    {s.t}
                    <br />
                    <span style={{ color: "var(--brown-soft)" }}>{s.b}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Retrato Dr. (recorte sem fundo) */}
          <div className="relative order-first lg:order-last mx-auto w-full max-w-[420px] lg:max-w-none">
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-[6%] w-[78%] aspect-square rounded-full"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--color-gold) 16%, transparent) 0%, transparent 70%)",
              }}
              aria-hidden
            />
            <img
              src={drHero}
              alt="Dr. Luís Felipe Lopez"
              className="relative w-full h-auto object-contain"
              style={{ maxHeight: 640 }}
              loading="eager"
            />
          </div>

        </div>
      </section>


      {/* ───────── SOBRE ───────── */}
      <section id="sobre" className="relative section-dark py-0 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[460px] lg:min-h-[640px] overflow-hidden">
            <img
              src={drSobre}
              alt="Dr. Luís Felipe Lopez"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "50% 25%" }}
            />

          </div>
          <div className="bg-paper-cream px-8 md:px-14 lg:px-20 py-14 lg:py-18 flex flex-col justify-center reveal">
            <div className="flex items-center gap-4">
              <span className="eyebrow">Sobre o Dr. Luís Felipe</span>
              <span
                className="block h-px flex-1 max-w-[80px]"
                style={{ background: "var(--color-gold)", opacity: 0.5 }}
              />
            </div>
            <h2
              className="font-display font-light mt-8 leading-[1.05]"
              style={{ fontSize: "clamp(2.2rem, 3.6vw, 3.4rem)", color: "var(--brown-ink)" }}
            >
              A beleza começa
              <br />
              pelo <span className="italic-gold">cuidado.</span>
            </h2>
            <p className="mt-8 font-body text-base md:text-lg leading-relaxed max-w-xl" style={{ color: "var(--brown-soft)" }}>
              Dr. Luís Felipe Lopez é cirurgião plástico formado pela
              PUC-Campinas, com residência em Cirurgia Geral e Cirurgia
              Plástica, atuando nos principais hospitais de São Paulo.
            </p>
            <p className="mt-6 font-body text-base md:text-lg leading-relaxed max-w-xl" style={{ color: "var(--brown-soft)" }}>
              Seu trabalho combina técnica, segurança e uma abordagem humanizada
              voltada para resultados naturais e duradouros.
            </p>
            <a href="#metodo" className="btn-dark mt-10 self-start">
              Conheça minha história <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ───────── ESPECIALIDADES ───────── */}
      <section
        id="especialidades"
        className="bg-paper-cream relative overflow-hidden px-6 md:px-10 lg:px-14 py-16 md:py-20 reveal scroll-mt-20"
      >



        <div className="text-center max-w-3xl mx-auto">
          <span className="eyebrow eyebrow-gold">Especialidades</span>
          <h2
            className="font-display font-light mt-6 leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 3.4vw, 3rem)", color: "var(--brown-ink)" }}
          >
            Procedimentos para realçar
            <br />
            sua <span className="italic-gold">melhor versão</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1280px] mx-auto">
          {specialties.map((s) => (
            <article key={s.key} className="card-light p-8 flex flex-col">
              <div
                className="w-14 h-14 grid place-items-center shrink-0 rounded-full"
                style={{ border: "1px solid color-mix(in oklab, var(--color-gold) 45%, transparent)" }}
              >
                <Icon name={s.key} size={28} />
              </div>

              <h3
                className="font-sans mt-4"
                style={{
                  fontSize: 12,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "var(--brown-ink)",
                }}
              >
                {s.name}
              </h3>
              <ul className="mt-6 space-y-2 font-body text-sm" style={{ color: "var(--brown-soft)" }}>
                {s.items.map((i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span style={{ color: "var(--color-gold)" }}>•</span>
                    {i}
                  </li>
                ))}
              </ul>
              <a
                href="#contato"
                className="mt-8 font-sans inline-flex items-center gap-2 self-start"
                style={{
                  fontSize: 10.5,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--brown-ink)",
                  borderBottom: "1px solid var(--color-gold)",
                  paddingBottom: 4,
                }}
              >
                Saiba mais <Icon name="arrow" size={14} />
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ───────── DIFERENCIAIS ───────── */}
      <section className="bg-paper-ivory relative px-6 md:px-10 lg:px-14 py-16 reveal">
        <div className="text-center max-w-3xl mx-auto">
          <span className="eyebrow eyebrow-gold">Diferenciais</span>
          <h2
            className="font-display font-light mt-6 leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 3.2vw, 2.8rem)", color: "var(--brown-ink)" }}
          >
            Uma experiência pensada
            <br />
            em <span className="italic-gold">cada detalhe</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-10 max-w-[1180px] mx-auto">
          {differentials.map((d) => (
            <div key={d.t} className="text-center">
              <div
                className="w-14 h-14 mx-auto grid place-items-center rounded-full"
                style={{ border: "1px solid color-mix(in oklab, var(--color-gold) 45%, transparent)" }}
              >
                <Icon name={d.icon} size={22} />
              </div>
              <h3
                className="font-display font-light mt-5 text-xl md:text-2xl"
                style={{ color: "var(--brown-ink)" }}
              >
                {d.t}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed" style={{ color: "var(--brown-soft)" }}>
                {d.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── ANTES & DEPOIS ───────── */}
      <section
        id="antes-depois"
        className="bg-paper-cream relative px-6 md:px-10 lg:px-14 py-16 md:py-20 reveal scroll-mt-20"
      >
        <div className="text-center max-w-3xl mx-auto">
          <span className="eyebrow eyebrow-gold">Antes &amp; Depois</span>
          <h2
            className="font-display font-light mt-6 leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 3.4vw, 3rem)", color: "var(--brown-ink)" }}
          >
            Resultados que <span className="italic-gold">revelam</span>
            <br />— nunca denunciam
          </h2>
          <p className="mt-6 font-body text-base md:text-lg leading-relaxed" style={{ color: "var(--brown-soft)" }}>
            Casos reais conduzidos pelo Dr. Luís Felipe Lopez. Cada resultado
            preserva traços únicos e respeita a anatomia individual.
          </p>
        </div>

        <BeforeAfterSlider cases={beforeAfterCases} />


        {/* Procedimento em destaque — imagem editorial com anotações embutidas */}
        <div className="mt-20 md:mt-24 max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
          <div>
            <span className="eyebrow eyebrow-gold">Procedimento em destaque</span>
            <h3
              className="font-display font-light mt-6 leading-[1.05]"
              style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", color: "var(--brown-ink)" }}
            >
              O olhar renovado,
              <br />
              com <span className="italic-gold">naturalidade</span>
            </h3>
            <p className="mt-6 font-body text-base md:text-lg leading-relaxed max-w-md" style={{ color: "var(--brown-soft)" }}>
              Cada detalhe da face é tratado de forma integrada — sobrancelha,
              olhar e lábios harmonizados para revelar a beleza individual sem
              denunciar intervenção.
            </p>
            <a href="#contato" className="btn-dark mt-10">
              Quero avaliar <span className="arrow">→</span>
            </a>
          </div>
          <div className="relative">
            <img
              src={procedimentosRosto}
              alt="Mapa facial — onde cada procedimento atua no rosto"
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
        </div>
      </section>



      {/* ───────── MÉTODO ELEVATION ───────── */}
      <section id="metodo" className="bg-paper-cream relative reveal scroll-mt-20 overflow-hidden">

        <div className="grid grid-cols-1 lg:grid-cols-2 relative">

          <div className="relative min-h-[420px] lg:min-h-[600px] overflow-hidden">
            <img
              src={mama}
              alt="Método Elevation"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "50% 35%" }}
            />
          </div>
          <div className="px-8 md:px-14 lg:px-20 py-14 lg:py-18 flex flex-col justify-center">
            <div className="flex items-center gap-4">
              <span className="eyebrow">Exclusivo</span>
              <span className="block h-px w-20" style={{ background: "var(--color-gold)", opacity: 0.5 }} />
            </div>
            <h2
              className="font-display font-light mt-8 leading-[1.05]"
              style={{ fontSize: "clamp(2.2rem, 3.6vw, 3.4rem)", color: "var(--brown-ink)" }}
            >
              MÉTODO <span className="italic-gold">ELEVATION</span>
            </h2>
            <p className="mt-8 font-body text-base md:text-lg leading-relaxed max-w-xl" style={{ color: "var(--brown-soft)" }}>
              Uma abordagem que busca reposicionar, sustentar e valorizar os
              contornos naturais da face e da mama — promovendo resultados
              sofisticados e duradouros.
            </p>
            <a href="#contato" className="btn-dark mt-10 self-start">
              Saiba mais <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ───────── DEPOIMENTOS ───────── */}
      <section className="bg-paper-ivory relative px-6 md:px-10 lg:px-14 py-16 reveal">
        <div className="text-center">
          <span className="eyebrow eyebrow-gold">Depoimentos</span>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1180px] mx-auto">
          {testimonials.map((t, i) => (
            <article key={i} className="card-light p-8 text-center flex flex-col">
              <div className="flex items-center justify-center gap-1 mb-5" style={{ color: "var(--color-gold)" }}>
                {"★★★★★".split("").map((s, k) => (
                  <span key={k} style={{ fontSize: 14, letterSpacing: 2 }}>{s}</span>
                ))}
              </div>
              <p
                className="font-display italic leading-snug"
                style={{ fontSize: "1.1rem", color: "var(--brown-ink)" }}
              >
                "{t.q}"
              </p>
              <p
                className="mt-6 font-sans"
                style={{ fontSize: 10.5, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--brown-soft)" }}
              >
                {t.a}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-2 h-2 rounded-full"
              style={{
                background: i === 0 ? "var(--color-gold)" : "color-mix(in oklab, var(--brown-ink) 18%, transparent)",
              }}
            />
          ))}
        </div>
      </section>

      {/* ───────── CLÍNICA ───────── */}
      <section id="clinica" className="bg-paper-cream relative reveal scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[420px] lg:min-h-[580px] overflow-hidden">
            <img
              src={fotoClinica}
              alt="Clínica no Jardim América"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="px-8 md:px-14 lg:px-20 py-14 lg:py-18 flex flex-col justify-center">
            <div className="flex items-center gap-4">
              <span className="eyebrow">Clínica</span>
              <span className="block h-px w-20" style={{ background: "var(--color-gold)", opacity: 0.5 }} />
            </div>
            <h2
              className="font-display font-light mt-8 leading-[1.05]"
              style={{ fontSize: "clamp(2.2rem, 3.6vw, 3.2rem)", color: "var(--brown-ink)" }}
            >
              Atendimento no
              <br />
              <span className="italic-gold">Jardim América</span>
            </h2>
            <p className="mt-8 font-body text-base md:text-lg leading-relaxed max-w-xl" style={{ color: "var(--brown-soft)" }}>
              Consultório localizado em uma das regiões mais valorizadas de São
              Paulo, com estrutura moderna e acolhedora para receber você.
            </p>
            <a href="#contato" className="btn-dark mt-10 self-start">
              Como chegar <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ───────── CTA FINAL ───────── */}
      <section
        id="contato"
        className="bg-paper-ivory relative px-6 md:px-10 lg:px-14 py-16 md:py-20 scroll-mt-20"
        style={{ borderTop: "1px solid color-mix(in oklab, var(--color-gold) 28%, transparent)" }}
      >
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
          <div className="text-center md:text-left">
            <h2
              className="font-display font-light leading-[1.1]"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "var(--brown-ink)" }}
            >
              Sua melhor versão começa <span className="italic-gold">com uma conversa.</span>
            </h2>
            <p className="mt-3 font-body" style={{ color: "var(--brown-soft)" }}>
              Agende sua consulta e descubra qual é o tratamento mais indicado para você.
            </p>
            <a href="https://wa.me/5511983348888" className="btn-dark mt-8">
              Agendar consulta
              <span className="arrow">→</span>
            </a>
          </div>
          <img
            src={elevationLogo}
            alt="Elevation por Dr. Luís Felipe Lopez"
            className="h-20 md:h-24 w-auto mx-auto md:mx-0"
            loading="lazy"
          />
        </div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="bg-paper-cream px-6 md:px-10 lg:px-14 py-10">
        <div className="max-w-[1180px] mx-auto flex flex-col md:grid md:grid-cols-3 gap-5 md:gap-6 items-center">
          <a
            href="tel:+5511983348888"
            className="flex items-center gap-3 font-sans min-w-0"
            style={{ fontSize: 13, color: "var(--brown-ink)" }}
          >
            <Icon name="phone" size={18} /> (11) 98334-8888
          </a>
          <div
            className="flex items-center gap-3 font-sans justify-center text-center min-w-0"
            style={{ fontSize: 13, color: "var(--brown-ink)" }}
          >
            <Icon name="pin" size={18} />
            <span className="truncate">Av. Brasil, 2263 — Jardim América, São Paulo · SP</span>
          </div>
          <a
            href="https://instagram.com/drluisfelipelopez"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 font-sans md:justify-end min-w-0"
            style={{ fontSize: 13, color: "var(--brown-ink)" }}
          >
            <Icon name="ig" size={18} /> @drluisfelipelopez
          </a>
        </div>
        <div className="ink-rule mt-8 max-w-[1180px] mx-auto" />
        <p
          className="mt-6 font-sans text-center"
          style={{ fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--brown-soft)" }}
        >
          © 2026 Dr. Luís Felipe Lopez · Cirurgião Plástico · CRM SP
        </p>
      </footer>

      {/* WhatsApp flutuante */}
      <a
        href="https://wa.me/5511983348888"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full grid place-items-center shadow-lg"
        style={{
          background: "var(--ivory)",
          border: "1px solid color-mix(in oklab, var(--color-gold) 50%, transparent)",
        }}
      >
        <Icon name="wa" size={24} />
      </a>
    </main>
  );
}
