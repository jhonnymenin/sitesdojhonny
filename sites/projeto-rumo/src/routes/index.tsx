import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail, ArrowRight, Menu, X } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import logoFullColor from "@/assets/logo-full-color.png";
import logoMark from "@/assets/logo-mark.png";
import photoHero from "@/assets/br-hero.jpg";
import photoHands from "@/assets/br-hands.jpg";
import photoMentor from "@/assets/br-mentor.jpg";
import photoCorridor from "@/assets/br-corridor.jpg";
import photoGraduation from "@/assets/br-graduation.jpg";
import photoGroup from "@/assets/br-group.jpg";
import { useReveal } from "@/hooks/use-reveal";

// og:url e canonical precisam ser absolutos — crawlers não resolvem caminhos relativos.
const SITE_URL = "https://projetorumo.org";
const WHATSAPP_NUMBER = "5511970687422";
const WHATSAPP_SUPPORT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de apoiar o Projeto Rumo.")}`;
const WHATSAPP_DONOR_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Tenho interesse em ser doador(a) do Projeto Rumo.")}`;

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Projeto Rumo — Apoio para quem quer chegar até o fim" },
      {
        name: "description",
        content:
          "Apoiamos estudantes de Medicina a superarem os desafios da graduação com auxílio financeiro, mentorias e acompanhamento contínuo.",
      },
      { property: "og:title", content: "Projeto Rumo — Apoio para quem quer chegar até o fim" },
      {
        property: "og:description",
        content:
          "Muitos conseguem entrar em Medicina. O desafio é permanecer. Apoie quem precisa para ir mais longe.",
      },
      { property: "og:url", content: SITE_URL },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NGO",
          name: "Associação Projeto Rumo",
          alternateName: "Projeto Rumo",
          description:
            "Apoio financeiro, mentoria e acompanhamento para estudantes de Medicina permanecerem na graduação.",
          url: "/",
          taxID: "66.744.628/0001-00",
          foundingDate: "2015-04",
          foundingLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressCountry: "BR",
            },
          },
        }),
      },
    ],
  }),
});

/* -------------------------------------------------------------------------- */

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre o projeto" },
  { href: "#impacto", label: "Impacto" },
  { href: "#como-ajudar", label: "Como ajudar" },
];

/* -------------------------------- BUTTONS -------------------------------- */

function PrimaryCTA({
  href = WHATSAPP_SUPPORT_URL,
  children = "Quero apoiar",
  className = "",
}: {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-primary/90 sm:text-[0.8rem] ${className}`}
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function SecondaryCTA({
  href = WHATSAPP_DONOR_URL,
  children = "Quero ser um doador",
  onDark = false,
  className = "",
}: {
  href?: string;
  children?: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  const colorCls = onDark
    ? "border-dark-foreground/35 text-dark-foreground hover:border-primary hover:text-primary"
    : "border-foreground/25 text-foreground hover:border-foreground hover:bg-foreground hover:text-background";
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-xs font-bold uppercase tracking-[0.12em] transition-colors sm:text-[0.8rem] ${colorCls} ${className}`}
    >
      {children}
    </a>
  );
}

/* -------------------------------- HEADER --------------------------------- */

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="top"
      className={`fixed inset-x-0 top-0 z-30 transition-all duration-500 ${
        scrolled ? "bg-dark/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[92rem] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <a href="#top" className="flex items-center" aria-label="Projeto Rumo — início">
          <img
            src={logoWhite}
            alt="Projeto Rumo"
            width={180}
            height={64}
            className="hidden h-9 w-auto sm:block sm:h-10"
          />
          <img src={logoMark} alt="Projeto Rumo" width={48} height={48} className="h-8 w-8 sm:hidden" />
        </a>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Principal">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="label text-dark-foreground/70 transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={WHATSAPP_SUPPORT_URL}
            className="group hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-flex"
          >
            Apoiar agora
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full border border-dark-foreground/25 text-dark-foreground lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60"
          />
          <div className="surface-deep absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col p-6 text-dark-foreground">
            <div className="flex items-center justify-between">
              <img src={logoWhite} alt="Projeto Rumo" width={160} height={56} className="h-9 w-auto" />
              <button
                aria-label="Fechar menu"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-dark-foreground/25"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-12 flex flex-col" aria-label="Móvel">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rule py-4 text-2xl font-bold tracking-tight text-dark-foreground first:border-t-0 hover:text-primary"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3 pt-8">
              <PrimaryCTA>Quero apoiar</PrimaryCTA>
              <SecondaryCTA onDark>Quero ser um doador</SecondaryCTA>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* --------------------------------- HERO ---------------------------------- */

function Hero() {
  const textRef = useReveal<HTMLDivElement>();

  return (
    <section className="surface-deep relative isolate overflow-hidden text-dark-foreground">
      {/* Fotografia participando do layout, não recortada num card */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={photoHero}
          alt="Três estudantes de Medicina conversando no corredor aberto de uma universidade brasileira, no fim da tarde"
          width={1600}
          height={1104}
          fetchPriority="high"
          className="photo animate-slow-zoom h-full w-full object-cover object-[68%_center] opacity-90 md:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.04_154)] via-[oklch(0.19_0.04_154)]/80 to-[oklch(0.19_0.04_154)]/25 md:bg-gradient-to-r md:from-[oklch(0.17_0.04_154)] md:via-[oklch(0.19_0.04_154)]/70 md:to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[92svh] max-w-[92rem] flex-col justify-end px-5 pb-12 pt-36 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20 lg:pt-44">
        <div ref={textRef} className="reveal max-w-[46rem]">
          <span className="label text-primary">Associação Projeto Rumo · desde 2015</span>
          <h1 className="mt-5 text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-6xl xl:text-[4.6rem]">
            Muitos conseguem entrar em <span className="text-primary">Medicina</span>.
            <br className="hidden sm:block" /> O desafio é <span className="text-primary">permanecer</span>.
          </h1>
          <p className="measure mt-6 text-base leading-relaxed text-dark-foreground/80 md:text-lg">
            Apoiamos estudantes de Medicina a superarem os desafios da graduação e se tornarem
            profissionais de saúde que transformam o futuro.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PrimaryCTA>Quero apoiar</PrimaryCTA>
            <SecondaryCTA onDark>Quero ser um doador</SecondaryCTA>
          </div>
        </div>
      </div>

      {/* Faixa de números — tipografia, sem cards nem ícones */}
      <div className="relative border-t border-dark-foreground/15">
        <div className="mx-auto grid max-w-[92rem] grid-cols-1 gap-y-6 px-5 py-8 sm:grid-cols-3 sm:gap-x-10 sm:px-8 sm:py-10 lg:px-12">
          <HeroStat value="+71" label="estudantes apoiados" />
          <HeroStat value="+36" label="doadores engajados" />
          <HeroStat value="+R$ 1,9" label="milhão investidos" />
        </div>
      </div>
    </section>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3 sm:flex-col sm:items-start sm:gap-1">
      <div className="text-3xl font-extrabold tracking-tight text-primary md:text-4xl">{value}</div>
      <div className="label text-dark-foreground/60">{label}</div>
    </div>
  );
}

/* ------------------------------ CHALLENGE -------------------------------- */

const CHALLENGE_ITEMS = [
  "A rotina da faculdade é intensa e emocionalmente exigente.",
  "Muitos estudantes precisam escolher entre o trabalho para se manter ou investir nos estudos.",
  "É justamente nesse momento que oferecemos professores, força e apoio contínuo.",
];

function Challenge() {
  const headRef = useReveal<HTMLDivElement>();
  const listRef = useReveal<HTMLDivElement>();
  const imgRef = useReveal<HTMLDivElement>();

  return (
    <section id="sobre" className="scroll-mt-24 bg-background py-20 md:py-28 lg:py-36">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        <div ref={headRef} className="reveal max-w-4xl">
          <span className="label text-muted-foreground">O ponto de virada</span>
          <h2 className="mt-5 text-[2rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[3.7rem]">
            O maior desafio começa <span className="text-primary">após</span> a aprovação
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Lista editorial numerada — sem ícones, sem cards */}
          <div ref={listRef} className="reveal lg:col-span-7">
            <ol>
              {CHALLENGE_ITEMS.map((text, i) => (
                <li
                  key={text}
                  className="rule flex gap-6 py-7 text-foreground first:border-t-0 first:pt-0 sm:gap-10"
                >
                  <span className="w-8 shrink-0 pt-1 text-sm font-bold tabular-nums text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-xl text-lg leading-snug tracking-[-0.01em] text-foreground/90 sm:text-xl md:text-[1.4rem]">
                    {text}
                  </p>
                </li>
              ))}
            </ol>

            <div className="rule mt-10 pt-10">
              <p className="max-w-md text-2xl font-extrabold leading-tight tracking-[-0.02em] sm:text-3xl">
                Histórias reais.
                <br />
                Futuros que <span className="text-primary">transformam</span>.
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Apoio que dá tranquilidade para focar nos estudos e seguir em frente.
              </p>
              <a
                href="#impacto"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
              >
                Leia as histórias de estudantes
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Imagem alta atravessando discretamente o grid */}
          <div ref={imgRef} className="reveal reveal-delay-1 lg:col-span-5">
            <figure className="relative lg:-mt-24">
              <img
                src={photoHands}
                alt="Mãos de um estudante fazendo anotações à mão ao lado de um atlas de anatomia aberto"
                loading="lazy"
                width={1200}
                height={1504}
                className="photo aspect-[4/5] w-full object-cover lg:aspect-[3/4]"
              />
              <figcaption className="label mt-4 text-muted-foreground">
                Rotina de estudos — fim de tarde
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- HOW WE ACT ------------------------------ */

const ACT_ITEMS = [
  "Apoio financeiro para reduzir entraves e facilitar o foco nos estudos",
  "Acompanhamento e mentorias com profissionais",
  "Mentorias em habilidades e propósito",
  "Foco no desenvolvimento como estudante e como ser humano",
];

function HowWeAct() {
  const headRef = useReveal<HTMLDivElement>();
  const listRef = useReveal<HTMLDivElement>();

  return (
    <section className="surface-deep relative overflow-hidden text-dark-foreground">
      <img
        src={logoMark}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-24 top-16 hidden h-[26rem] w-[26rem] opacity-[0.05] animate-float-slow lg:block"
      />

      <div className="mx-auto grid max-w-[92rem] grid-cols-1 items-stretch lg:grid-cols-12">
        {/* Imagem sangrando até a borda esquerda */}
        <div className="relative order-2 min-h-[22rem] lg:order-1 lg:col-span-5 lg:min-h-[42rem]">
          <img
            src={photoMentor}
            alt="Uma médica mais experiente escuta um estudante durante uma conversa no pátio da universidade"
            loading="lazy"
            width={1408}
            height={1056}
            className="photo absolute inset-0 h-full w-full object-cover object-[60%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[oklch(0.24_0.045_153)]/70 lg:to-[oklch(0.24_0.045_153)]" />
        </div>

        <div className="order-1 px-5 py-20 sm:px-8 md:py-28 lg:order-2 lg:col-span-7 lg:py-36 lg:pl-16 lg:pr-12">
          <div ref={headRef} className="reveal">
            <span className="label text-primary">Como atuamos</span>
            <h2 className="mt-5 max-w-2xl text-[2rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[3.4rem]">
              Como o Projeto Rumo <span className="text-primary">atua</span>
            </h2>
          </div>

          <div ref={listRef} className="reveal reveal-delay-1 mt-12 lg:mt-16">
            <ol>
              {ACT_ITEMS.map((text, i) => (
                <li
                  key={text}
                  className="rule flex items-start gap-6 py-6 text-dark-foreground first:border-t-0 first:pt-0 sm:gap-10"
                >
                  <span className="w-8 shrink-0 pt-1.5 text-sm font-bold tabular-nums text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-lg text-lg leading-snug tracking-[-0.01em] text-dark-foreground/90 sm:text-xl">
                    {text}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-12 max-w-sm text-xl font-bold leading-snug tracking-[-0.02em] text-primary sm:text-2xl">
              Apoiamos hoje para transformar o amanhã.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- IMPACT -------------------------------- */

function Impact() {
  const headRef = useReveal<HTMLDivElement>();
  const numRef = useReveal<HTMLDivElement>();
  const listRef = useReveal<HTMLDivElement>();
  const mosaicRef = useReveal<HTMLDivElement>();

  return (
    <section id="impacto" className="scroll-mt-24 bg-background py-20 md:py-28 lg:py-36">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        <div ref={headRef} className="reveal">
          <span className="label text-muted-foreground">Números</span>
          <h2 className="mt-5 max-w-3xl text-[2rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[3.7rem]">
            <span className="text-primary">Impacto</span> gerado até aqui
          </h2>
        </div>

        {/* Números em escala tipográfica, sem cards */}
        <div ref={numRef} className="reveal mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-20 lg:gap-16">
          <div className="rule pt-8">
            <div className="text-[3.5rem] font-extrabold leading-none tracking-[-0.04em] sm:text-[5rem]">
              +71
            </div>
            <div className="label mt-3 text-muted-foreground">estudantes apoiados</div>
          </div>
          <div className="rule pt-8">
            <div className="text-[2.1rem] font-extrabold leading-none tracking-[-0.03em] tabular-nums sm:text-[3.4rem]">
              R$ 1.944.635,49
            </div>
            <div className="label mt-3 text-muted-foreground">valor total captado</div>
          </div>
        </div>

        {/* Mosaico fotográfico controlado + texto lateral */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-14">
          <div ref={mosaicRef} className="reveal grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-8">
            <figure className="col-span-2 sm:col-span-1 sm:mt-16">
              <img
                src={photoCorridor}
                alt="Estudante caminhando de costas por um corredor aberto de universidade, com sol da tarde no piso"
                loading="lazy"
                width={1200}
                height={1504}
                className="photo aspect-[3/4] w-full object-cover"
              />
            </figure>
            <figure className="col-span-2 sm:col-span-1">
              <img
                src={photoGraduation}
                alt="Formanda abraçando a mãe no dia da colação de grau"
                loading="lazy"
                width={1408}
                height={1056}
                className="photo aspect-[4/5] w-full object-cover"
              />
              <figcaption className="label mt-4 text-muted-foreground">
                Cuidar do presente para ter oportunidades no futuro
              </figcaption>
            </figure>
          </div>

          <div ref={listRef} className="reveal reveal-delay-1 lg:col-span-4 lg:pt-16">
            <h3 className="text-2xl font-extrabold tracking-[-0.02em]">Por que isso importa</h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Cada apoio contínuo gera impacto social que multiplica oportunidades.
            </p>
            <ul className="mt-8">
              {[
                "Mais estudantes inspirados e aptos",
                "Apoio a quem precisa para ir mais longe",
                "Cuidar do presente para ter oportunidades no futuro",
              ].map((item) => (
                <li key={item} className="rule py-4 text-base leading-snug text-foreground/90">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- FINAL CTA ------------------------------ */

function FinalCTA() {
  const textRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="como-ajudar"
      className="surface-deep scroll-mt-24 relative isolate overflow-hidden text-dark-foreground"
    >
      <div className="pointer-events-none absolute inset-0">
        <img
          src={photoGroup}
          alt="Grupo de estudantes sentados nas escadarias da universidade, conversando e rindo no fim da tarde"
          loading="lazy"
          width={1600}
          height={1008}
          className="photo h-full w-full object-cover object-[62%_center] opacity-80 md:opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.04_154)] via-[oklch(0.19_0.04_154)]/85 to-[oklch(0.18_0.04_154)]/70 md:bg-gradient-to-r md:from-[oklch(0.17_0.04_154)] md:via-[oklch(0.19_0.04_154)]/80 md:to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[92rem] px-5 py-24 sm:px-8 md:py-32 lg:px-12 lg:py-40">
        <div ref={textRef} className="reveal max-w-3xl">
          <span className="label text-primary">Como ajudar</span>
          <h2 className="mt-5 text-[2rem] font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-[3.9rem]">
            Apoiar o Projeto Rumo é ajudar alguém a{" "}
            <span className="text-primary">não desistir</span> no meio do caminho.
          </h2>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PrimaryCTA>Quero apoiar</PrimaryCTA>
            <SecondaryCTA onDark>Quero ser um doador</SecondaryCTA>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- FOOTER -------------------------------- */

function Footer() {
  return (
    <footer className="bg-background py-14">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <img src={logoFullColor} alt="Projeto Rumo" width={160} height={56} className="h-10 w-auto" />
            <p className="mt-5 max-w-xs text-sm text-muted-foreground">
              Apoie para quem quer <span className="font-semibold text-foreground">chegar até o fim</span>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <SocialLink href="#" label="Instagram" icon={<Instagram className="h-4 w-4" />} />
            <SocialLink href="#" label="LinkedIn" icon={<Linkedin className="h-4 w-4" />} />
            <SocialLink
              href="mailto:contato@projetorumo.org"
              label="E-mail"
              icon={<Mail className="h-4 w-4" />}
            />
          </div>
        </div>

        <div className="rule mt-12 pt-6 text-foreground">
          <p className="label">Associação Projeto Rumo</p>
          <div className="mt-3 flex flex-col flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground sm:flex-row">
            <span>CNPJ: 66.744.628/0001-00</span>
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <span>Início das atividades: Abril de 2015</span>
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <span>Institucionalização: 29 de abril de 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
    >
      {icon}
    </a>
  );
}

/* ---------------------------------- PAGE --------------------------------- */

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Challenge />
        <HowWeAct />
        <Impact />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
