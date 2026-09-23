import { ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Chip, CtaButton, Reveal, Section, SectionTitle } from "./primitives";
import { checkoutUrl } from "@/lib/checkout";

const INCLUDED = [
  {
    name: "X Curso Intensivo de Oncologia",
    items: [
      "Cerca de 140 aulas atualizadas",
      "5 encontros on-line ao vivo",
      "Participação de +60 especialistas do Brasil",
      "Acesso por 1 ano",
      "Certificado MOC",
    ],
  },
  {
    name: "Banco de Questões",
    items: ["350 questões comentadas", "Simulado com 50 questões", "Certificado de conclusão"],
  },
  {
    name: "Onco IA",
    items: [
      "13 aulas e mais de 11 horas",
      "Workshop ao vivo",
      "Materiais complementares",
      "Certificação WorldMed Academy + MOC",
    ],
  },
];

const LOTS = [
  {
    period: "Lançamento — 30% de desconto",
    detail: "De 1º a 30 de setembro.",
    intensivo: "R$ 2.030",
    oncoia: "R$ 699",
    total: "R$ 2.729",
    current: true,
  },
  {
    period: "Condição especial — 15% de desconto",
    detail: "De 1º a 31 de outubro.",
    intensivo: "R$ 2.465",
    oncoia: "R$ 799",
    total: "R$ 3.264",
    current: false,
  },
  {
    period: "Valor regular",
    detail: "A partir de 1º novembro.",
    intensivo: "R$ 2.900",
    oncoia: "R$ 899",
    total: "R$ 3.799",
    current: false,
  },
];

const COLUMN = "X Curso Intensivo de Oncologia + Banco de Questões";

/*
 * As duas ofertas da seção. Os valores são os que o carrinho da EAD Plataforma
 * cobra com o cupom do lote vigente — conferidos abrindo cada checkout. Ao trocar
 * de lote, atualizar aqui e o cupom em src/lib/checkout.ts.
 */
const OFFERS = [
  {
    product: "comboCompleto" as const,
    placement: "precos" as const,
    name: "Combo completo",
    includes: "X Curso Intensivo de Oncologia + Banco de Questões + Onco IA.",
    from: "De R$ 3.799,00",
    price: "R$ 2.659",
    cents: ",30",
    installments: "ou 2x de R$ 1.329,65",
    cta: "Garantir o combo completo",
    featured: true,
  },
  {
    product: "comboIntensivo" as const,
    placement: "precos-intensivo" as const,
    name: "Intensivo + Banco de Questões",
    includes: "X Curso Intensivo de Oncologia + Banco de Questões, sem o Onco IA.",
    from: "De R$ 2.900,00",
    price: "R$ 2.030",
    cents: ",00",
    installments: "ou 2x de R$ 1.015,00",
    cta: "Garantir esta condição",
    featured: false,
  },
];

export function Pricing() {
  return (
    <Section id="inscricao">
      <Reveal className="max-w-3xl">
        <SectionTitle>Escolha entre um curso ou o pacote completo</SectionTitle>
        <p className="mt-4 font-display text-lg font-semibold text-foreground">
          X Curso Intensivo de Oncologia + Banco de Questões + Onco IA
        </p>
        <p className="mt-3 max-w-2xl text-base leading-[1.6] text-muted-foreground md:text-lg">
          Matricule-se no curso do seu interesse ou adquira o pacote completo, com acesso aos três
          cursos X Curso Intensivo de Oncologia, Banco de Questões e Onco IA.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {INCLUDED.map((block) => (
          <Reveal key={block.name} className="glass rounded-lg p-5 sm:p-6">
            <h3 className="font-display text-lg font-semibold text-foreground">{block.name}</h3>
            <ul className="mt-4 space-y-2.5">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-[1.55] text-muted-foreground">
                  <CheckCircle2 size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-cyan" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal className="relative mt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 -inset-y-6 rounded-lg bg-cyan/20 blur-[90px]"
        />
        <div className="glass glow-cyan relative rounded-lg p-6 sm:p-8 md:p-10">
          <Chip>Lote atual • Lançamento 30% OFF</Chip>
          <SectionTitle className="mt-5 max-w-2xl">
            Garanta a sua inscrição com desconto exclusivo
          </SectionTitle>

          {/*
            Os dois combos lado a lado, cada um com o preço que a plataforma
            realmente cobra e o link do seu próprio checkout. Antes havia um bloco
            só: anunciava R$ 2.030 (que é o combo sem Onco IA) e o botão levava ao
            combo de três produtos, a R$ 2.659,30 — a pessoa via um valor e pagava
            outro, R$ 629,30 maior.
          */}
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {OFFERS.map((offer) => (
              <div
                key={offer.product}
                // A seção roda no tema azul, onde --cyan é branco: `bg-cyan/10`
                // dava um azul lavado e fazia o card secundário, de fundo sólido,
                // parecer o principal. O destaque vem do fundo sólido com borda
                // clara; o secundário recua para fundo transparente.
                className={cn(
                  "flex flex-col rounded-lg border p-6 sm:p-7",
                  offer.featured
                    ? "border-cyan bg-surface-container shadow-[0_18px_44px_-24px_rgb(0_0_0/0.55)]"
                    : "border-border bg-transparent",
                )}
              >
                {offer.featured ? <Chip>Mais completo</Chip> : null}
                <h3
                  className={cn(
                    "font-display text-xl font-semibold text-foreground",
                    offer.featured ? "mt-4" : "",
                  )}
                >
                  {offer.name}
                </h3>
                <p className="mt-2 text-sm leading-[1.55] text-muted-foreground">
                  {offer.includes}
                </p>

                <p className="mt-6 text-sm text-muted-foreground line-through">{offer.from}</p>
                <p className="mt-1 font-display text-[38px] leading-none font-bold text-cyan md:text-[46px]">
                  {offer.price}
                  <span className="text-2xl">{offer.cents}</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{offer.installments}</p>

                <div className="mt-6 flex-1" />
                <CtaButton
                  href={checkoutUrl(offer.product, offer.placement)}
                  variant={offer.featured ? "primary" : "outline"}
                  className="w-full"
                >
                  {offer.cta} <ArrowRight size={18} />
                </CtaButton>
              </div>
            ))}
          </div>

          <p className="label-mono mt-6 flex items-center gap-2 text-muted-foreground">
            <Lock size={14} strokeWidth={1.5} /> Inscrição em ambiente seguro • Condição válida até
            30 de setembro
          </p>

          <ul className="mt-8 grid gap-4 md:hidden">
            {LOTS.map((lot) => (
              <li
                key={lot.period}
                className={cn(
                  "rounded-lg border border-border p-5",
                  lot.current ? "bg-cyan/10" : "",
                )}
              >
                <p className="font-display text-base font-semibold text-foreground">{lot.period}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{lot.detail}</p>
                <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
                  {[
                    [COLUMN, lot.intensivo],
                    ["Onco IA", lot.oncoia],
                    ["Total", lot.total],
                  ].map(([k, v]) => (
                    <div key={k} className="min-w-0">
                      <dt className="label-mono text-[10px] leading-tight text-muted-foreground">
                        {k}
                      </dt>
                      <dd className="mt-1 text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>

          <div className="mt-10 hidden md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  {["Lote", COLUMN, "Onco IA", "Total"].map((h) => (
                    <th key={h} className="label-mono py-3 pr-4 text-muted-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LOTS.map((lot) => (
                  <tr
                    key={lot.period}
                    className={cn(
                      "border-b border-border/60 text-sm",
                      lot.current ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    <td className="py-4 pr-4">
                      <span className="font-display font-semibold">{lot.period}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">{lot.detail}</span>
                    </td>
                    <td className="py-4 pr-4">{lot.intensivo}</td>
                    <td className="py-4 pr-4">{lot.oncoia}</td>
                    <td className="py-4 pr-4">{lot.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            Compra em ambiente seguro. Após a confirmação, enviamos as instruções de acesso por
            e-mail.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
