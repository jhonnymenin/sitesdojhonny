import hero1 from "@/assets/hero-1.webp";
import hero2 from "@/assets/hero-2.webp";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Link } from "@tanstack/react-router";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import instalacao1 from "@/assets/instalacao-1.webp";
import instalacao2 from "@/assets/instalacao-2.webp";
import instalacao3 from "@/assets/instalacao-3.webp";
import instalacao4 from "@/assets/instalacao-4.webp";
import empregabilidade1 from "@/assets/empregabilidade-1.webp";
import empregabilidade2 from "@/assets/empregabilidade-2.webp";
import viva1 from "@/assets/viva-1.webp";
import viva2 from "@/assets/viva-2.webp";
import inclusao1 from "@/assets/inclusao-1.webp";
import inclusao2 from "@/assets/inclusao-2.webp";
import inclusao3 from "@/assets/inclusao-3.webp";
import inclusao5 from "@/assets/inclusao-5.webp";
import inclusao6 from "@/assets/inclusao-6.webp";
import inclusao8 from "@/assets/inclusao-8.webp";
import inclusao9 from "@/assets/inclusao-9.webp";
import { ArrowRight } from "lucide-react";
import logoImg from "@/assets/logo.webp";
import { articles } from "@/content/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import parceiroDentalMedSul from "@/assets/parceiro-dentalmedsul.webp";
import parceiroEcourbis from "@/assets/parceiro-ecourbis.webp";
import parceiroNovoOlhar from "@/assets/parceiro-novolhar.webp";
import parceiroRevistaAutismo from "@/assets/parceiro-revistaautismo.webp";
import parceiroMauricioDeSousa from "@/assets/parceiro-mauriciodesousa.webp";
import parceiroCaixaCultural from "@/assets/parceiro-caixacultural.webp";
import parceiroCacauShow from "@/assets/parceiro-cacaushow.webp";
import parceiroOtorrino from "@/assets/parceiro-otorrino.webp";
import parceiroAmem from "@/assets/parceiro-amem.webp";
import parceiroOggi from "@/assets/parceiro-oggi.webp";
import parceiroEcoenel from "@/assets/parceiro-ecoenel.webp";
import parceiroSaoPaulo from "@/assets/parceiro-saopaulo.webp";
import parceiroSesc from "@/assets/parceiro-sesc.webp";
import parceiroWellbe from "@/assets/parceiro-wellbe.webp";
import { Logo } from "./Logo";
import { WaveDivider } from "./Wave";

const WHATS = "https://wa.me/5511930352436?text=" + encodeURIComponent("Olá! Quero saber mais sobre as vagas da Fundação Dona Paulina de Souza Queiroz.");

const Check = () => (
  <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="10" fill="var(--color-primary)" />
    <path d="M6 10.5l2.5 2.5L14 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- HERO ---------- */
function HeroCarousel() {
  const autoplay = useRef(Autoplay({ delay: 4500, stopOnInteraction: false }));
  const slides = [
    { src: hero1, alt: "Senhor sorridente segurando guarda-chuva no jardim da Fundação", eager: true },
    { src: hero2, alt: "Grupo de adultos atendidos pela Fundação posando juntos no jardim com uma caixa de limões" },
  ];
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-card">
      <Carousel
        opts={{ loop: true }}
        plugins={[autoplay.current]}
        className="absolute inset-0 [&>div]:h-full"
      >
        <CarouselContent className="ml-0 h-full">
          {slides.map((s) => (
            <CarouselItem key={s.src} className="pl-0">
              <div className="relative h-full w-full">
                <img
                  src={s.src}
                  alt={s.alt}
                  className="h-full w-full object-cover"
                  width={1024}
                  height={1280}
                  loading={s.eager ? "eager" : "lazy"}
                  decoding="async"
                  {...(s.eager ? { fetchPriority: "high" as const } : {})}
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "linear-gradient(180deg, transparent 55%, color-mix(in oklab, var(--color-primary-dark) 35%, transparent) 100%)" }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream leaf-pattern">
      {/* Banner Superior da Campanha */}
      <div className="bg-primary-dark py-4 px-6 text-center text-white border-b border-primary/20">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-8">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-ping shrink-0" />
            <span className="font-display font-bold tracking-[0.1em] text-white text-lg sm:text-xl lg:text-2xl uppercase">
              Campanha Laços que protegem
            </span>
          </div>
          <p className="text-sm sm:text-base font-medium text-white max-w-lg">
            Sua doação transforma vidas. Apoie nossa causa e ajude a manter nossa missão!
          </p>
          <a 
            href="#doacao" 
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs sm:text-sm font-bold text-primary-foreground transition-all hover:bg-white hover:text-primary-dark"
          >
            QUERO APOIAR
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Header / Nav area - Organização do Logo e Cabeçalho */}
        <div className="flex items-center justify-between py-6 md:py-10">
          <Logo />
        </div>

        <div className="grid grid-cols-1 items-center gap-10 pb-24 md:grid-cols-2 md:gap-14">
          <div className="reveal max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-primary-dark)]">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Mais de 90 anos de história
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.05] text-charcoal">
              Autonomia, inclusão e <span className="brush-underline">qualidade de vida</span> para todos.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              A Fundação Dona Paulina de Souza Queiroz promove a qualidade de vida de adultos com deficiência intelectual e TEA de suporte Nível 2 e 3, por meio de um programa que respeita a individualidade, estimulando a autonomia, projeto de vida e fortalecendo o social. Além do acolhimento das famílias.
            </p>

            <ul className="mt-7 flex flex-wrap gap-2">
              {[
                "Referência em São Paulo",
                "Vagas abertas",
                "Atendimento humanizado",
              ].map((b) => (
                <li
                  key={b}
                  className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-sm font-medium text-[color:var(--color-primary-dark)]"
                >
                  <Check /> {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#vagas"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-soft transition hover:scale-[1.02] hover:bg-primary-dark text-center"
              >
                Quero saber sobre as vagas
              </a>
              <a
                href={WHATS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-transparent px-7 py-4 font-semibold text-[color:var(--color-primary-dark)] transition hover:bg-primary hover:text-primary-foreground text-center"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>

          <div className="reveal relative">
            <HeroCarousel />
            <div className="absolute -bottom-6 -left-6 hidden rounded-3xl bg-card p-5 shadow-card md:block animate-[float_6s_ease-in-out_infinite]">
              <div className="font-display text-3xl font-bold text-[color:var(--color-primary-dark)]">+90</div>
              <div className="text-xs font-medium text-muted-foreground">anos de história</div>
            </div>
          </div>
        </div>
      </div>
      <WaveDivider fill="white" />
    </section>
  );
}

/* ---------- FAMILY ---------- */
export function Family() {
  const cards = [
    { i: "💡", q: "Como estimular mais autonomia no dia a dia?" },
    { i: "🌱", q: "Como oferecer oportunidades de inclusão ao longo da vida?" },
    { i: "🤝", q: "Como encontrar um espaço onde a inclusão aconteça de verdade?" },
    { i: "❤️", q: "Como garantir mais qualidade de vida ao longo do tempo?" },
  ];
  return (
    <section className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl text-center">
        <div className="reveal">
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-tight text-charcoal">
            Sabemos que essa decisão envolve muito mais do que <span className="brush-underline">escolher um serviço.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            É sobre encontrar um lugar seguro, preparado e acolhedor para todos.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {cards.map((c, idx) => (
            <article
              key={c.q}
              className="reveal group flex items-start gap-4 rounded-3xl border-l-4 border-primary bg-card p-7 text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              <span className="text-3xl">{c.i}</span>
              <p className="font-display text-xl font-semibold text-charcoal">{c.q}</p>
            </article>
          ))}
        </div>

        <p className="reveal mx-auto mt-12 max-w-2xl text-base italic text-muted-foreground">
          Essas perguntas fazem parte da jornada — e aqui, elas encontram escuta, orientação e caminhos possíveis.
        </p>
        <div className="reveal mt-8">
          <a
            href="#programas"
            className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-soft transition hover:scale-[1.02] hover:bg-primary-dark"
          >
            Quero entender qual programa é ideal
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- WHO WE ARE ---------- */
 export function WhoWeAre() {
   const partners = [
    { name: "Instituto Maurício de Sousa", logo: parceiroMauricioDeSousa },
    { name: "Oggi Sorvetes", logo: parceiroOggi },
    { name: "Ecoenel", logo: parceiroEcoenel },
    { name: "Sesc", logo: parceiroSesc },
    { name: "Novo Olhar - Fundação Dr. Marcelo Cunha", logo: parceiroNovoOlhar },
    { name: "EcoUrbis", logo: parceiroEcourbis },
    { name: "Cidade de São Paulo", logo: parceiroSaoPaulo },
    { name: "Clínica de Otorrino e Otoneuro - Dr. Roberto Alcântara Maia", logo: parceiroOtorrino },
    { name: "Instituto Cacau Show", logo: parceiroCacauShow },
    { name: "Caixa Cultural São Paulo", logo: parceiroCaixaCultural },
    { name: "Revista Autismo", logo: parceiroRevistaAutismo },
    { name: "Wellbe Gastronomia Funcional", logo: parceiroWellbe },
    { name: "Amém", logo: parceiroAmem },
    { name: "Dental Med Sul", logo: parceiroDentalMedSul },

   ];
   return (
     <section id="quem-somos" className="relative bg-primary-soft">
       <WaveDivider fill="white" flip />
       <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
         <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
           <div className="reveal">
             <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-tight text-brown">
               Quem Somos
             </h2>
             <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
               Criada por meio de legado deixado em testamento por Dona Paulina de Souza Queiroz para o cuidado e desenvolvimento de pessoas com deficiência intelectual e após 40 anos de inatividade, retornamos há 5 anos com o Projeto VIVAD+.
             </p>
             
              <div className="mt-10 aspect-video overflow-hidden rounded-[2rem] shadow-card bg-charcoal">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/xlNcuAZLezs"
                  title="Vídeo institucional da Fundação Dona Paulina de Souza Queiroz"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="mt-4 aspect-video overflow-hidden rounded-[2rem] shadow-card bg-charcoal flex items-center justify-center">
              <video
                controls
                preload="metadata"
                className="h-full w-full object-cover"
              >
                <source src="/videos/fundacao-1.mp4" type="video/mp4" />
              </video>
             </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {["/videos/fundacao-2.mp4", "/videos/fundacao-3.mp4"].map((src) => (
                <div key={src} className="aspect-video overflow-hidden rounded-2xl shadow-soft bg-charcoal">
                  <video controls preload="metadata" className="h-full w-full object-cover">
                    <source src={src} type="video/mp4" />
                  </video>
                </div>
              ))}
            </div>
           </div>
           
           <div className="reveal space-y-8">
             <div className="rounded-3xl bg-white p-8 shadow-soft">
               <h3 className="font-display text-2xl font-bold text-charcoal mb-4">Nossas Instalações</h3>
               <div className="grid grid-cols-2 gap-4">
                {[
                  { src: instalacao1, alt: "Refeitório da Fundação" },
                  { src: instalacao2, alt: "Jardim externo" },
                  { src: instalacao3, alt: "Quadra poliesportiva" },
                  { src: instalacao4, alt: "Horta de temperos" },
                ].map((i) => (
                  <div key={i.alt} className="aspect-square rounded-2xl bg-cream overflow-hidden">
                    <img src={i.src} alt={i.alt} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                ))}
               </div>
             </div>
 
             <div className="rounded-3xl bg-white p-8 shadow-soft">
               <h3 className="font-display text-xl font-bold text-charcoal mb-6">Nossos Parceiros</h3>
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center justify-items-center gap-6">
                 {partners.map((p) => (
                   <img
                     key={p.name}
                     src={p.logo}
                     alt={p.name}
                     className="h-14 w-auto max-w-[140px] object-contain transition hover:scale-105"
                     loading="lazy"
                   />
                 ))}
               </div>
             </div>
           </div>
         </div>
       </div>
       <WaveDivider fill="white" />
     </section>
   );
 }

/* ---------- PROGRAMS ---------- */
function ProgramCard({
  badge, title, sub, benefits, quote, cta, images,
}: {
  badge: string; title: string; sub: string; benefits: string[]; quote: string; cta: string;
  images?: { src: string; alt: string }[];
}) {
  return (
    <article className="reveal group flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-card">
      <div className="h-2 w-full bg-primary" />
      {images && images.length > 0 && (
        <div className={`grid gap-1 ${images.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
          {images.map((im) => (
            <div key={im.alt} className="aspect-[4/5] overflow-hidden bg-cream">
              <img src={im.src} alt={im.alt} loading="lazy" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-1 flex-col p-8 md:p-10">
        <span className="inline-flex w-fit items-center rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-primary-dark)]">
          {badge}
        </span>
        <h3 className="mt-4 font-display text-4xl font-bold text-charcoal">{title}</h3>
        <p className="mt-1 text-sm font-medium text-[color:var(--color-primary-dark)]">{sub}</p>
        <ul className="mt-6 flex flex-col gap-3">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-charcoal">
              <Check />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 border-l-2 border-primary pl-4 text-sm italic text-muted-foreground">
          {quote}
        </p>
        <a
          href={WHATS}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:scale-[1.02] hover:bg-primary-dark"
        >
          {cta}
        </a>
      </div>
    </article>
  );
}

export function Programs() {
  return (
    <section id="programas" className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-primary-dark)]">
            Nossos Programas
          </span>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-tight text-charcoal">
            Dois caminhos. <span className="brush-underline">Uma só missão.</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <ProgramCard
            badge="Qualidade de vida"
            title="Viva D+"
            sub="Para adultos a partir dos 35 anos"
            benefits={[
              "Estimula memória e funções cognitivas",
              "Atividades artísticas",
              "Fortalecimento de vínculos sociais",
              "Autonomia no dia a dia",
              "Atividades físicas",
            ]}
            quote="Um espaço de continuidade, pertencimento e cuidado."
            cta="Quero saber mais sobre o Viva D+"
            images={[
              { src: viva1, alt: "Participante mostrando pintura no Viva D+" },
              { src: viva2, alt: "Atividade de autonomia no dia a dia" },
            ]}
          />
          <ProgramCard
            badge="Inclusão no trabalho"
            title="Empregabilidade"
            sub="Para jovens e adultos a partir dos 18 anos"
            benefits={[
              "Orientação vocacional",
              "Treino de habilidades sociais e profissionais",
              "Preparação prática para o trabalho",
              "Emprego apoiado e acompanhamento",
            ]}
            quote="Porque trabalhar é um direito de todos."
            cta="Quero saber mais sobre Empregabilidade"
            images={[
              { src: empregabilidade1, alt: "Participante da Empregabilidade no brechó" },
              { src: empregabilidade2, alt: "Atendimento no brechó da Fundação" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- SOCIAL PROOF ---------- */
export function SocialProof() {
  const tests = [
    { q: "Meu filho ganhou mais autonomia e confiança.", a: "Família participante" },
    { q: "Aqui encontramos acolhimento de verdade.", a: "Familiar" },
    { q: "A evolução impactou toda a nossa família.", a: "Mãe de participante" },
  ];
  return (
    <section
      className="relative overflow-hidden px-6 py-24 md:py-32"
      style={{ backgroundColor: "var(--color-primary-dark)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-tight text-white">
            Na Fundação, a inclusão acontece <span className="text-white">todos os dias.</span>
          </h2>
        </div>

        <div className="reveal mt-14 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
          {[inclusao1, inclusao2, inclusao3, inclusao5, inclusao6, inclusao8, inclusao9].map((src, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-3xl shadow-card transition-transform hover:scale-[1.02] ${
                i % 2 === 1 ? "md:translate-y-6" : ""
              }`}
            >
              <img
                src={src}
                alt={`Participantes da Fundação ${i + 1}`}
                loading="lazy"
                width={1024}
                height={1024}
                className="aspect-square h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {tests.map((t, idx) => (
            <blockquote
              key={t.a}
              className="reveal glass-card rounded-3xl p-7 text-white"
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="font-display text-4xl text-white leading-none">"</div>
              </div>
              <p className="mt-3 font-display text-xl font-semibold leading-snug">{t.q}</p>
              <footer className="mt-4 text-sm text-white/80">— {t.a}</footer>
            </blockquote>
          ))}
        </div>

        <div className="reveal mt-12 text-center">
          <a
            href={WHATS}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border-2 border-white/80 bg-transparent px-7 py-4 font-semibold text-white transition hover:bg-white hover:text-[color:var(--color-primary-dark)]"
          >
            Quero conversar com a equipe
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- IMPACT ---------- */
 export function MissionVision() {
   const values = ["Ética", "Respeito à diversidade humana", "Transparência", "Valorização das pessoas"];
   return (
     <section id="missao" className="bg-cream px-6 py-24 md:py-32">
       <div className="mx-auto max-w-6xl">
         <div className="grid gap-10 md:grid-cols-3">
           <div className="reveal rounded-3xl bg-white p-8 shadow-soft">
             <span className="text-3xl mb-4 block">🎯</span>
             <h3 className="font-display text-2xl font-bold text-charcoal mb-4">Missão</h3>
             <p className="text-muted-foreground leading-relaxed">
               "Promover ações por intermédio do atendimento multidisciplinar, visando desenvolver integralmente as pessoas com Deficiência Intelectual, valorizando sua autonomia e independência para a vida adulta e durante o processo de envelhecimento."
             </p>
           </div>
           <div className="reveal rounded-3xl bg-white p-8 shadow-soft" style={{ transitionDelay: "100ms" }}>
             <span className="text-3xl mb-4 block">👁️</span>
             <h3 className="font-display text-2xl font-bold text-charcoal mb-4">Visão</h3>
             <p className="text-muted-foreground leading-relaxed">
               "Ser referência na causa da pessoa com Deficiência Intelectual na vida adulta e no processo de envelhecimento no Município de São Paulo."
             </p>
           </div>
           <div className="reveal rounded-3xl bg-primary text-white p-8 shadow-card" style={{ transitionDelay: "200ms" }}>
             <span className="text-3xl mb-4 block">💎</span>
             <h3 className="font-display text-2xl font-bold mb-4">Valores</h3>
             <ul className="space-y-3">
               {values.map((v) => (
                 <li key={v} className="flex items-center gap-2 font-medium">
                   <span className="h-1.5 w-1.5 rounded-full bg-white/60" /> {v}
                 </li>
               ))}
             </ul>
           </div>
         </div>
       </div>
     </section>
   );
 }
 
 export function History() {
   return (
     <section id="historia" className="bg-white px-6 py-24 md:py-32">
       <div className="mx-auto max-w-4xl text-center">
         <div className="reveal">
           <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-tight text-charcoal">
             Nossa <span className="brush-underline">História</span>
           </h2>
           <div className="mt-10 text-left space-y-6 text-lg text-muted-foreground leading-relaxed">
             <p>
               A Fundação Dona Paulina de Souza Queiroz nasceu com o propósito de transformar a realidade de pessoas com deficiência intelectual em São Paulo. Ao longo de mais de nove décadas, nossa instituição tem sido um farol de esperança e cuidado especializado.
             </p>
             <p>
               Originalmente focada no acolhimento, evoluímos para um modelo que privilegia a autonomia e a inclusão social efetiva. Nossa trajetória é marcada pela dedicação de gerações de profissionais e famílias que acreditam no potencial infinito de cada ser humano.
             </p>
             <p>
               Hoje, combinamos essa rica tradição com as mais modernas práticas de atendimento multidisciplinar, focando especialmente na vida adulta e no processo de envelhecimento, fases que exigem um olhar atento e humano.
             </p>
           </div>
         </div>
       </div>
     </section>
   );
 }
 
 export function Team() {
   const board = {
     curadores: [
       { p: "Presidente", n: "Maria Madalena Rodrigues Wu" },
       { p: "Membros", n: "Fernando de Oliveira Nunes, Mauro Sergio Sousa Campos Morellato, Marco Antonio Fernandes David, Maria Fernanda Gomes Martins, Thais Sousa Campos Leondarides" },
     ],
     diretoria: [
       { p: "Presidente", n: "João Leondarides" },
       { p: "Vice-presidente", n: "Daniel Souza Campos Miziara" },
       { p: "1º Diretor Financeiro", n: "Jornere Domingos Silva Tanajura" },
       { p: "2º Diretor Financeiro", n: "Dolores Molina Fidalgo" },
       { p: "Diretora de Relações Públicas", n: "Amália Angelides" },
       { p: "Diretora Secretária", n: "Eleuza Maria de Assis Saldanha Falluh" },
     ]
   };
 
    const techTeam = [
      { r: "Coordenadora Geral", n: "Maria Regina de Sousa Campos Leondarides" },
      { r: "Assistente Coordenação Geral", n: "Carla Barbosa de Lima" },
      { r: "Coordenadora Técnica", n: "Gisele Gasparotto" },
      { r: "Orientadora Empregabilidade", n: "Leila Cambui Ribeiro" },
      { r: "Orientadora Envelhecimento Ativo", n: "Deborah Inacio da Silva Boschetti" },
      { r: "Serviço Social", n: "Luciana Louro Ferreira Fortunato" },
      { r: "Arte-educadora", n: "Vanessa Araújo" },
      { r: "Arte-educador", n: "Mauricio Tura" },
      { r: "Arte-educadora", n: "Edilene Alves de Oliveira" },
      { r: "Arte-educadora", n: "Lethicia T. Soares Calvo" },
    ];

    const otherGroups = [
      { title: "Apoiadores", people: ["Sueli Coelho Macedo Miguel", "Marcio Reis da Silva"] },
      { title: "Funcionários Terceirizados", people: ["Eliel da Silva Prazeres", "Sueli Rodrigues Lopes"] },
      { title: "Voluntários", people: ["Deusa Matilde", "Vera Lucia Borges", "Valquiria Aoki"] },
      {
        title: "Outros",
        people: [
          "Agência de Marketing — On Digital",
          "Informática — Rani Informática",
          "Contador — FC Contabilidade",
        ],
      },
    ];
 
   return (
     <section id="dirigentes" className="bg-primary-soft px-6 py-24 md:py-32">
       <div className="mx-auto max-w-6xl">
         <div className="reveal text-center mb-16">
           <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-tight text-brown">
             Estrutura Organizacional
           </h2>
         </div>
 
         <div className="grid gap-8 md:grid-cols-2">
           <div className="reveal space-y-6">
             <div className="rounded-3xl bg-white p-8 shadow-soft">
               <h3 className="font-display text-xl font-bold text-primary mb-6">Conselho de Curadores</h3>
               <div className="space-y-4">
                 {board.curadores.map(c => (
                   <div key={c.p}>
                     <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">{c.p}</span>
                     <p className="text-charcoal font-medium">{c.n}</p>
                   </div>
                 ))}
                 <div className="pt-4 border-t border-cream">
                   <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Conselho Fiscal</span>
                   <p className="text-charcoal font-medium">Paulo Eduardo Cardinale Opdebreck, Fernando Ferreira Silva Telles, Thiago Zisleg Tavares</p>
                 </div>
               </div>
             </div>
             <div className="rounded-3xl bg-white p-8 shadow-soft">
               <h3 className="font-display text-xl font-bold text-primary mb-6">Diretoria</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {board.diretoria.map(d => (
                   <div key={d.p}>
                     <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">{d.p}</span>
                     <p className="text-charcoal text-sm font-medium">{d.n}</p>
                   </div>
                 ))}
               </div>
             </div>
           </div>
 
           <div className="reveal rounded-3xl bg-white p-8 shadow-soft">
             <h3 className="font-display text-xl font-bold text-primary mb-6">Equipe Técnica</h3>
             <div className="space-y-4">
               {techTeam.map(t => (
                 <div key={t.n} className="flex justify-between items-center gap-4 py-2 border-b border-cream last:border-0">
                   <span className="text-sm font-medium text-charcoal">{t.n}</span>
                    <span className="text-xs font-bold text-charcoal text-right">{t.r}</span>
                 </div>
               ))}
             </div>
              <div className="mt-8 space-y-6">
                {otherGroups.map(g => (
                  <div key={g.title} className="pt-6 border-t border-cream">
                    <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">{g.title}</span>
                    <div className="mt-2 space-y-1">
                      {g.people.map(p => (
                        <p key={p} className="text-sm font-medium text-charcoal">{p}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
           </div>
         </div>
       </div>
     </section>
   );
 }
 
 export function Transparency() {
   const reports = [
      { year: "2025", status: "Disponível", href: "/relatorios/relatorio-2025.pdf" },
      { year: "2024", status: "Disponível", href: "/relatorios/relatorio-2024.pdf" },
      { year: "2023", status: "Disponível", href: "/relatorios/relatorio-2023.pdf" },
      { year: "2022", status: "Disponível", href: "/relatorios/relatorio-2022.pdf" },
      { year: "2021", status: "Disponível", href: "/relatorios/relatorio-2021.pdf" },
   ];
   return (
     <section id="relatorios" className="bg-white px-6 py-24 md:py-32">
       <div className="mx-auto max-w-4xl">
         <div className="reveal text-center">
           <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-tight text-charcoal">
             Transparência
           </h2>
           <p className="mt-5 text-lg text-muted-foreground">
             Prestação de contas e relatórios de atividades anuais.
           </p>
         </div>
         <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {reports.map((r) =>
              r.href ? (
                <a
                  key={r.year}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reveal flex flex-col items-center gap-3 rounded-2xl border-2 border-cream p-6 transition hover:border-primary hover:shadow-soft"
                >
                  <span className="text-2xl">📄</span>
                  <span className="font-display font-bold text-charcoal">{r.year}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Baixar PDF</span>
                </a>
              ) : (
                <div key={r.year} className="reveal flex flex-col items-center gap-3 rounded-2xl border-2 border-cream p-6 opacity-70">
                  <span className="text-2xl">📄</span>
                  <span className="font-display font-bold text-charcoal">{r.year}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{r.status}</span>
                </div>
              ),
            )}
         </div>
       </div>
     </section>
   );
 }

/* ---------- OPEN SPOTS ---------- */
export function OpenSpots() {
  return (
    <section
      id="vagas"
      className="relative px-6 py-24 md:py-32"
      style={{ background: "var(--gradient-primary)" }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> Inscrições abertas
          </span>
          <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-tight text-brown">
            Estamos com vagas abertas
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white">
            Se você busca informação para entender qual programa é mais adequado, nossa equipe está pronta para acolher e orientar você.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={WHATS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 font-semibold text-brown shadow-soft transition hover:scale-[1.02]"
            >
              Quero saber sobre as vagas
            </a>
            <a
              href={WHATS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-white px-7 py-4 font-semibold text-white transition hover:bg-white hover:text-[color:var(--color-primary-dark)]"
            >
              Falar no WhatsApp agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- HOW TO JOIN ---------- */
export function HowToJoin() {
  const steps = [
    { t: "Contato telefônico", d: "Agendamento de visita" },
    { t: "Acolhimento", d: "Apresentação do espaço e programas" },
    { t: "Triagem", d: "Conversa com equipe técnica e família" },
    { t: "Análise da equipe", d: "Avaliação multidisciplinar" },
    { t: "Devolutiva", d: "Proposta apresentada à família" },
    { t: "Matrícula", d: "Assinatura do contrato e início do atendimento." },
  ];
  return (
    <section className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl text-center">
        <div className="reveal">
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-tight text-charcoal">
            Como funciona o <span className="brush-underline">processo de entrada</span>
          </h2>
        </div>
        <div className="mt-14 -mx-6 overflow-x-auto px-6 pb-4">
          <ol className="flex min-w-max gap-5 md:grid md:min-w-0 md:grid-cols-3 md:gap-6 lg:grid-cols-6">
            {steps.map((s, i) => (
              <li
                key={s.t}
                className="reveal flex w-56 flex-col items-center text-center md:w-auto"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary font-display text-xl font-bold text-brown shadow-soft">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-brown">{s.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
        <p className="reveal mx-auto mt-12 max-w-xl text-base text-muted-foreground">
          Quer entender como funciona para o seu caso?{" "}
          <a href={WHATS} target="_blank" rel="noopener noreferrer" className="font-semibold text-[color:var(--color-primary-dark)] underline decoration-primary decoration-2 underline-offset-4">
            Fale com nossa equipe.
          </a>
        </p>
      </div>
    </section>
  );
}

/* ---------- DONATION ---------- */
 export function Donation() {
   return DonationImpl();
}

/* ---------- BLOG PREVIEW ---------- */
export function BlogPreview() {
  const latest = articles.slice(0, 3);
  return (
    <section id="blog" className="bg-cream leaf-pattern px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-primary-dark)]">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Conteúdo e informação
          </span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-tight text-charcoal">
            Direto do nosso <span className="brush-underline">Blog</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Artigos baseados em evidências sobre deficiência intelectual, síndrome de Down,
            envelhecimento ativo e cuidado especializado.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((article) => (
            <div key={article.slug} className="reveal">
              <BlogCard article={article} />
            </div>
          ))}
        </div>

        <div className="reveal mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-7 py-4 font-semibold text-[color:var(--color-primary-dark)] transition hover:bg-primary hover:text-primary-foreground"
          >
            Ver todos os artigos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function DonationImpl() {
   return (
     <section id="doacao" className="relative bg-primary-soft">
      <WaveDivider fill="white" flip />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:gap-16 md:py-32">
        <div className="reveal">
          <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-primary-dark)]">
            <strong className="mr-1">CAMPANHA:</strong> Laços que protegem
          </span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-tight text-brown">
            Você pode fazer parte dessa <span className="brush-underline">transformação.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-charcoal/80">
            Cada gesto de apoio amplia nosso alcance e fortalece o cuidado oferecido às famílias. Sua participação garante que mais pessoas com deficiência intelectual e TEA nível de suporte 2 e 3 tenham um lugar de pertencimento.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {[
              "Mais vagas atendidas em nossos programas",
              "Equipe técnica especializada e capacitada",
              "Espaço acolhedor e adaptado",
              "Continuidade de uma missão de 90+ anos",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-charcoal">
                <Check />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-4 sm:grid-cols-1">
            <a
              href={WHATS + encodeURIComponent("\n\nAssunto: Como posso participar da Campanha Laços que Protegem?")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-card"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-2xl">❤️</span>
              <span className="font-display text-lg font-bold text-charcoal">Como posso participar?</span>
            </a>
            <a
              href={WHATS + encodeURIComponent("\n\nAssunto: Quero apoiar a Campanha com doação.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-card"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-2xl">💙</span>
              <span className="font-display text-lg font-bold text-charcoal">Apoiar a Campanha</span>
            </a>
            <a
              href={WHATS + encodeURIComponent("\n\nAssunto: Informações sobre Bazares e Festas.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-card"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-2xl">🎉</span>
              <span className="font-display text-lg font-bold text-charcoal">Bazares & Festas</span>
            </a>
          </div>
        </div>

        <div className="reveal relative flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-md">
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: "var(--gradient-primary)", opacity: 0.15 }}
            />
            <img
              src={logoImg}
              alt="Logo Fundação Dona Paulina de Souza Queiroz"
              className="absolute inset-0 m-auto h-full w-full object-contain p-6 animate-[float_6s_ease-in-out_infinite]"
            />
          </div>
        </div>
      </div>
      <WaveDivider fill="white" />
    </section>
  );
}

/* ---------- WHATSAPP CTA ---------- */
export function WhatsappCTA() {
  return (
    <section className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <div className="reveal">
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-tight text-charcoal">
            Fale com a nossa equipe
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Atendimento direto, acolhedor e preparado para tirar dúvidas sobre programas e matrículas.
          </p>
          <a
            href={WHATS}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center justify-center gap-3 rounded-full px-8 py-5 text-lg font-semibold text-white shadow-card transition hover:scale-[1.03]"
            style={{ backgroundColor: "var(--color-whatsapp)" }}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
              <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l.235.374-1.001 3.658 3.745-.991z" />
            </svg>
            Falar com a equipe no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- CLOSING ---------- */
export function Closing() {
  return (
    <section
      className="px-6 py-24 md:py-32"
      style={{ backgroundColor: "var(--color-charcoal)" }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <div className="reveal">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold leading-tight text-white">
            Cada pessoa merece ser <span className="text-primary">vista, respeitada</span> e estimulada a crescer.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            Cada família merece encontrar apoio, orientação e acolhimento. A Fundação Dona Paulina de Souza Queiroz está aqui para caminharmos juntos.
          </p>
          <a
            href={WHATS}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-card transition hover:scale-[1.03] hover:bg-primary-dark"
          >
            Quero falar com a equipe agora
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
 export function Footer() {
   const nav = [
    { l: "Programas", h: "/#programas" },
    { l: "Quem Somos", h: "/#quem-somos" },
    { l: "História", h: "/#historia" },
    { l: "Missão", h: "/#missao" },
    { l: "Dirigentes", h: "/#dirigentes" },
    { l: "Relatórios", h: "/#relatorios" },
    { l: "Blog", h: "/blog", internal: true },
    { l: "Vagas", h: "/#vagas" },
    { l: "Doações", h: "/#doacao" },
   ];
   return (
     <footer
       className="px-6 py-16"
       style={{ backgroundColor: "var(--color-primary-dark)" }}
     >
       <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
         <div>
           <Logo variant="light" />
           <p className="mt-4 max-w-xs text-sm text-white/70">
             Mais de 90 anos dedicados à autonomia, inclusão e qualidade de vida de pessoas com deficiência intelectual e TEA.
           </p>
         </div>
         <nav className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm" aria-label="Rodapé">
           <span className="col-span-2 font-display text-base font-semibold text-white mb-1">Navegação</span>
          {nav.map((n) =>
            n.internal ? (
              <Link key={n.l} to="/blog" className="text-white/70 transition hover:text-primary">
                {n.l}
              </Link>
            ) : (
              <a key={n.l} href={n.h} className="text-white/70 transition hover:text-primary">
                {n.l}
              </a>
            ),
          )}
         </nav>
         <div className="flex flex-col gap-3 text-sm text-white/70">
           <span className="font-display text-base font-semibold text-white">Contato</span>
           <span>São Paulo — SP</span>
           <a href={WHATS} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
             WhatsApp: +55 11 93035-2436
           </a>
           <a href="mailto:fdpsq@fdpsq.org.br" className="hover:text-primary">fdpsq@fdpsq.org.br</a>
           <div className="mt-2 flex gap-3">
             {["Instagram", "Facebook", "YouTube", "WhatsApp"].map((s) => (
               <a
                 key={s}
                 href="#"
                 aria-label={s}
                 className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-primary hover:text-[color:var(--color-primary-dark)]"
               >
                 <span className="text-xs font-semibold">{s[0]}</span>
               </a>
             ))}
           </div>
         </div>
       </div>
       <div className="mx-auto mt-12 max-w-6xl border-t border-white/15 pt-6 text-center text-xs text-white/60">
         © {new Date().getFullYear()} Fundação Dona Paulina de Souza Queiroz. Todos os direitos reservados.
       </div>
     </footer>
   );
 }
