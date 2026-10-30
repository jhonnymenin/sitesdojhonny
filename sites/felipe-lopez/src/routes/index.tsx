import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/site/Logo";
import { LogoMark } from "@/components/site/LogoMark";
import { useReveal } from "@/hooks/use-reveal";
import elevationLogo from "@/assets/elevation-logo-black.png";
import drHero from "@/assets/dr-hero-transparente.png";
import drPerfil from "@/assets/centro-cirurgico-perfil.webp";
import drOperando from "@/assets/centro-cirurgico-operando.webp";

/*
 * Landing page do Método Elevation.
 *
 * Até 30/10/2026 esta home era um site amplo de cirurgia plástica — Face, Mama,
 * Corpo, Procedimentos Estéticos, antes/depois, clínica e depoimentos. A partir
 * do briefing "Landing Page | Método Elevation — O Novo Deep Plane" ela passou
 * a ter um assunto só: rejuvenescimento facial, em quatro blocos.
 *
 * O que saiu do ar está registrado no README, junto do que precisaria voltar
 * caso o Dr. queira as outras especialidades de novo.
 */

/* O número é o mesmo do rodapé; a mensagem muda conforme o botão, para que a
 * conversa já comece sabendo de onde o paciente veio. */
const WHATS = "https://wa.me/5511983348888";
const whats = (assunto: string) => `${WHATS}?text=${encodeURIComponent(assunto)}`;

/*
 * A composição de vídeo / antes e depois da paciente Márcia pedida no briefing
 * depende de autorização dela e ainda não chegou. Enquanto for `null`, a dobra
 * mostra só o retrato do Dr. — preferível a um espaço vazio marcado como
 * "em breve", que é o tipo de buraco que acaba indo ao ar.
 */
const MIDIA_PACIENTE: { src: string; alt: string } | null = null;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Método Elevation® — Além do Deep Plane · Dr. Luís Felipe Lopez" },
      {
        name: "description",
        content:
          "Método Elevation: abordagem autoral do Dr. Luís Felipe Lopez que integra técnicas de cirurgia facial para rejuvenescer respeitando a identidade de cada paciente.",
      },
      { property: "og:title", content: "Método Elevation® — Além do Deep Plane" },
      {
        property: "og:description",
        content:
          "Um novo conceito de rejuvenescimento facial, por Dr. Luís Felipe Lopez. Porque rejuvenescer não significa mudar quem você é.",
      },
    ],
  }),
  component: Landing,
});

/* ───────── Conteúdo ───────── */

/* Os três princípios do Bloco 3 do briefing. */
const principios = [
  {
    icon: "face",
    t: "Conhecimento anatômico",
    d: "Entender as estruturas profundas da face antes de decidir qualquer conduta.",
  },
  {
    icon: "plan",
    t: "Planejamento individualizado",
    d: "Cada rosto envelhece de um jeito. O plano acompanha o seu, não um protocolo.",
  },
  {
    icon: "heart",
    t: "Respeito à identidade",
    d: "Valorizar as características que tornam cada pessoa única, em vez de substituí-las.",
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
    case "plan":
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" {...stroke}>
          <rect x="6" y="5" width="20" height="22" />
          <path d="M10 11 H22 M10 16 H22 M10 21 H18" />
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
        <svg width={s} height={s} viewBox="0 0 40 40" {...stroke}>
          <path d="M20 6 C12 6 9 12 9 18 C9 25 13 32 20 32 C27 32 31 25 31 18 C31 12 28 6 20 6 Z" />
          <path d="M14 18 Q15 17 16 18 M24 18 Q25 17 26 18" />
          <path d="M18 24 Q20 26 22 24" />
          <path d="M9 14 C12 9 16 8 20 9" />
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
    { href: "#metodo", label: "O Método" },
    { href: "#dr", label: "O Cirurgião" },
    { href: "#avaliacao", label: "Avaliação" },
  ];

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
            style={{ height: 26 }}
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
          {/*
            O `hidden` precisa estar no invólucro, não no <a>. A classe
            `.btn-dark` declara `display: inline-flex` e nasce depois das
            utilitárias do Tailwind no mesmo layer — com a mesma especificidade,
            quem vem por último vence, e o `hidden` do próprio botão era
            ignorado. No celular ele aparecia por cima do logotipo.
          */}
          <div className="hidden sm:block">
            <a href="#avaliacao" className="btn-dark whitespace-nowrap">
              Agendar avaliação
              <span className="arrow">→</span>
            </a>
          </div>
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
          <img src={elevationLogo} alt="Método Elevation" style={{ height: 32 }} />
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
            <a href="#avaliacao" onClick={() => setMenuOpen(false)} className="btn-dark">
              Agendar avaliação <span className="arrow">→</span>
            </a>
          </nav>
        </div>
      )}

      {/* ───────── BLOCO 1 · HERO ───────── */}
      <section
        id="inicio"
        className="traco-fundo relative pt-28 lg:pt-32 pb-20 lg:pb-24 overflow-hidden"
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
            {/*
              "7 cirurgias em 1 só" é a manchete do briefing. Fica acima do H1,
              em caixa alta e corpo pequeno: é o gancho, não o título da página —
              o que a página promete é o conceito, não o número.
            */}
            <span className="eyebrow eyebrow-gold">7 cirurgias em 1 só</span>

            <h1
              className="font-display font-light leading-[1.05] mt-6"
              style={{ fontSize: "clamp(2.1rem, 6vw, 4.4rem)", color: "var(--brown-ink)" }}
            >
              Além do <span className="italic-gold">Deep Plane.</span>
              <br />
              Um novo conceito de
              <br />
              rejuvenescimento facial.
            </h1>

            <div className="gold-rule mt-8 max-w-[140px]" />

            <p
              className="mt-8 font-sans"
              style={{
                fontSize: 11.5,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "var(--brown-ink)",
              }}
            >
              Naturalidade · Elegância · Segurança
            </p>

            <p
              className="mt-7 font-body text-base md:text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--brown-soft)" }}
            >
              Conheça o Método Elevation, uma abordagem autoral desenvolvida pelo Dr. Luís Felipe
              Lopez que integra técnicas avançadas de cirurgia facial para tratar os sinais do
              envelhecimento de maneira personalizada, respeitando a naturalidade e a identidade de
              cada paciente.
            </p>

            <p
              className="mt-8 font-display italic leading-snug max-w-lg"
              style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)", color: "var(--brown-ink)" }}
            >
              Porque rejuvenescer não significa mudar quem você é.
            </p>

            <a href="#metodo" className="btn-dark mt-10">
              Conheça o Método Elevation <span className="arrow">→</span>
            </a>
          </div>

          {/*
            Retrato do Dr. (recorte sem fundo) e, quando houver, a mídia da paciente.

            Sem `order-first` no celular: o retrato ocupa uma tela inteira, e com
            ele em cima a manchete e o botão só apareciam depois de rolar. Numa
            página de conversão, a primeira coisa a ser lida é a promessa, não a
            foto. No desktop as duas colunas cabem juntas e a foto volta para a
            direita.
          */}
          <div className="relative lg:order-last mx-auto w-full max-w-[420px] lg:max-w-none">
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
            {MIDIA_PACIENTE && (
              <div className="relative mt-6 overflow-hidden rounded-[24px]">
                <img
                  src={MIDIA_PACIENTE.src}
                  alt={MIDIA_PACIENTE.alt}
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ───────── BLOCO 2 · O MÉTODO ───────── */}
      <section id="metodo" className="relative section-dark reveal scroll-mt-20 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/*
            A foto do centro cirúrgico entra aqui e não no bloco do cirurgião:
            o assunto deste bloco é a técnica, e técnica se mostra operando.
            Cantos arredondados com respiro, como os outros blocos de imagem do
            site — colada na borda da tela, arredondar só um lado fica torto.
          */}
          <div className="relative flex min-h-[420px] p-5 md:p-8 lg:min-h-[640px] lg:p-12">
            <div className="relative w-full overflow-hidden rounded-[28px]">
              <img
                src={drOperando}
                alt="Dr. Luís Felipe Lopez em cirurgia"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: "50% 30%" }}
                loading="lazy"
              />
            </div>
          </div>

          <div className="px-8 md:px-14 lg:px-20 py-14 lg:py-18 flex flex-col justify-center">
            <div className="flex items-center gap-4">
              <span className="eyebrow eyebrow-gold">O Método</span>
              <span
                className="block h-px flex-1 max-w-[80px]"
                style={{ background: "var(--color-gold)", opacity: 0.5 }}
              />
            </div>

            <h2
              className="font-display font-light mt-8 leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 3.4vw, 3.2rem)" }}
            >
              Seu rosto é único.
              <br />
              Seu <span className="italic-gold">rejuvenescimento</span>
              <br />
              também deve ser.
            </h2>

            <p
              className="mt-8 font-body text-base md:text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              O Deep Plane reposiciona estruturas profundas. Mas o rejuvenescimento pode ir além.
            </p>
            <p
              className="mt-5 font-body text-base md:text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              Desenvolvi o Método Elevation para integrar técnicas conforme as necessidades de cada
              paciente, com um olhar para o rosto como um todo.
            </p>
            <p
              className="mt-5 font-body text-base md:text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              Mais do que rejuvenescer, o objetivo é preservar o que faz você ser você.
            </p>

            <div className="gold-rule mt-10 max-w-[140px]" />

            <p
              className="mt-8 font-display font-light leading-tight"
              style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}
            >
              Elevation. <span className="italic-gold">Além do Deep Plane.</span>
            </p>
          </div>
        </div>

        {/*
          A pergunta do briefing fecha o bloco em faixa própria, centralizada.
          Dentro da coluna de texto ela viraria mais um parágrafo; sozinha, ela
          faz o que foi escrita para fazer — parar a leitura.
        */}
        <div
          className="px-6 md:px-10 lg:px-14 py-14 md:py-16 text-center"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <p
            className="font-display font-light italic leading-snug max-w-3xl mx-auto"
            style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)" }}
          >
            Qual região do seu rosto você sente que mais mudou com o tempo?
          </p>
          <a
            href={whats(
              "Olá! Vim pela página do Método Elevation e gostaria de agendar uma avaliação.",
            )}
            target="_blank"
            rel="noreferrer"
            className="btn-gold mt-9"
          >
            Conversar sobre o meu caso <Icon name="arrow" size={14} />
          </a>
        </div>
      </section>

      {/* ───────── BLOCO 3 · AUTORIDADE ───────── */}
      <section id="dr" className="bg-paper-cream relative reveal scroll-mt-20 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="px-8 md:px-14 lg:px-20 py-14 lg:py-18 flex flex-col justify-center order-last lg:order-first">
            <div className="flex items-center gap-3">
              <Icon name="shield" size={22} />
              <span className="eyebrow" style={{ color: "var(--brown-ink)" }}>
                Membro da Sociedade Brasileira de Cirurgia Plástica
              </span>
            </div>

            <h2
              className="font-display font-light mt-8 leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 3.4vw, 3.2rem)", color: "var(--brown-ink)" }}
            >
              Dr. Luís Felipe <span className="italic-gold">Lopez</span>
            </h2>

            <p
              className="mt-8 font-body text-base md:text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--brown-soft)" }}
            >
              Sou cirurgião plástico, membro da Sociedade Brasileira de Cirurgia Plástica, com
              título de especialista reconhecido pelo MEC e pela AMB.
            </p>
            <p
              className="mt-5 font-body text-base md:text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--brown-soft)" }}
            >
              Há mais de dez anos, atuo como assistente do Dr. Charles Yamaguchi, experiência que
              contribui para o aprimoramento contínuo da minha prática cirúrgica.
            </p>
            <p
              className="mt-5 font-body text-base md:text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--brown-soft)" }}
            >
              Minha atuação em rejuvenescimento facial é orientada por três princípios. Foi a partir
              dessa filosofia que desenvolvi o Método Elevation.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-7">
              {principios.map((p) => (
                <div key={p.t}>
                  <div
                    className="w-12 h-12 grid place-items-center rounded-full"
                    style={{
                      border: "1px solid color-mix(in oklab, var(--color-gold) 45%, transparent)",
                    }}
                  >
                    <Icon name={p.icon} size={20} />
                  </div>
                  <h3
                    className="font-sans mt-4"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--brown-ink)",
                    }}
                  >
                    {p.t}
                  </h3>
                  <p
                    className="mt-3 font-body text-sm leading-relaxed"
                    style={{ color: "var(--brown-soft)" }}
                  >
                    {p.d}
                  </p>
                </div>
              ))}
            </div>

            <div className="gold-rule mt-12 max-w-[140px]" />

            <p
              className="mt-8 font-display font-light leading-tight"
              style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)", color: "var(--brown-ink)" }}
            >
              Um rejuvenescimento bem planejado não cria um novo rosto —
              <span className="italic-gold"> valoriza o que já é seu.</span>
            </p>
          </div>

          <div className="relative flex min-h-[420px] p-5 md:p-8 lg:min-h-[640px] lg:p-12">
            <div className="relative w-full overflow-hidden rounded-[28px]">
              <img
                src={drPerfil}
                alt="Dr. Luís Felipe Lopez no centro cirúrgico"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: "60% 30%" }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fecho do Bloco 3, em faixa escura para separar da conversão */}
      <section className="section-dark px-6 md:px-10 lg:px-14 py-16 md:py-20 text-center reveal">
        <p
          className="font-display font-light leading-tight max-w-3xl mx-auto"
          style={{ fontSize: "clamp(1.8rem, 3.4vw, 3rem)" }}
        >
          Resultados que <span className="italic-gold">revelam</span>
          <br />— nunca denunciam.
        </p>
      </section>

      {/* ───────── BLOCO 4 · CONVERSÃO ───────── */}
      <section
        id="avaliacao"
        className="bg-paper-ivory relative px-6 md:px-10 lg:px-14 py-16 md:py-24 reveal scroll-mt-20"
      >
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center">
          <div>
            <span className="eyebrow eyebrow-gold">Avaliação personalizada</span>
            <h2
              className="font-display font-light mt-6 leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 3.4vw, 3.2rem)", color: "var(--brown-ink)" }}
            >
              Seu rosto é único.
              <br />
              Seu <span className="italic-gold">planejamento</span>
              <br />
              também deve ser.
            </h2>

            <p
              className="mt-8 font-body text-base md:text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--brown-soft)" }}
            >
              O envelhecimento facial envolve mudanças na pele, nos volumes e nas estruturas
              profundas do rosto. Por isso, compreender essas alterações é fundamental antes de
              definir qualquer abordagem cirúrgica.
            </p>
            <p
              className="mt-5 font-body text-base md:text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--brown-soft)" }}
            >
              Durante a consulta, avalio individualmente a anatomia facial, os sinais do
              envelhecimento, as expectativas e as possibilidades de tratamento. É nesse momento que
              identificamos se o Método Elevation é indicado para o seu caso e quais técnicas podem
              fazer parte do planejamento.
            </p>

            <p
              className="mt-8 font-display italic leading-snug max-w-lg"
              style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)", color: "var(--brown-ink)" }}
            >
              O primeiro passo para um rejuvenescimento natural é uma avaliação criteriosa.
            </p>

            <a
              href={whats(
                "Olá! Vim pela página do Método Elevation e gostaria de agendar minha avaliação personalizada.",
              )}
              target="_blank"
              rel="noreferrer"
              className="btn-dark mt-10"
            >
              Agende sua avaliação <span className="arrow">→</span>
            </a>
          </div>

          {/* Assinatura — o cartão de visita que o briefing fecha */}
          <div
            className="p-10 md:p-12 flex flex-col items-center text-center"
            style={{
              background: "var(--ivory)",
              border: "1px solid color-mix(in oklab, var(--color-gold) 30%, transparent)",
            }}
          >
            <img
              src={elevationLogo}
              alt="Método Elevation"
              className="h-16 md:h-20 w-auto"
              loading="lazy"
            />
            <div className="gold-rule my-8 max-w-[120px]" />
            <p
              className="font-display font-light"
              style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)", color: "var(--brown-ink)" }}
            >
              Dr. Luís Felipe Lopez
            </p>
            <p
              className="mt-3 font-sans leading-relaxed"
              style={{
                fontSize: 10.5,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--brown-soft)",
              }}
            >
              Cirurgião Plástico
              <br />
              Criador do Método Elevation
            </p>
            <p
              className="mt-7 font-body text-sm leading-relaxed"
              style={{ color: "var(--brown-soft)" }}
            >
              Av. Brasil, 583 — Jardim Paulista
              <br />
              São Paulo · SP
            </p>
          </div>
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
            <span className="truncate">Av. Brasil, 583 — Jardim Paulista, São Paulo · SP</span>
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
          style={{
            fontSize: 10.5,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--brown-soft)",
          }}
        >
          © 2026 Dr. Luís Felipe Lopez · Cirurgião Plástico · CRM SP
        </p>
      </footer>

      {/* WhatsApp flutuante */}
      <a
        href={whats("Olá! Vim pela página do Método Elevation.")}
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
