import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { RahalMascot } from "./RahalMascot";
import formal from "@/assets/dr-rahal-formal.jpeg";

interface Testimonial {
  initials: string;
  name: string;
  city: string;
  text: string;
}

const testimonials: Testimonial[] = [
  { initials: "M.S.", name: "Maria S.", city: "São Paulo", text: "Tinha medo de cirurgia há anos. Em um procedimento de uma hora, sem dor e sem internação, meu nódulo foi tratado. Não acredito que esperei tanto tempo." },
  { initials: "C.M.", name: "Carlos M.", city: "Campinas", text: "Resultado acima de qualquer expectativa. Profissional extraordinário, explica tudo com calma. Meu nódulo reduziu mais de oitenta por cento." },
  { initials: "A.P.", name: "Ana P.", city: "Rio de Janeiro", text: "Fui indicada à cirurgia por outro médico. O Dr. Rahal me apresentou a ablação. Hoje estou recuperada, sem cicatriz, sem drama." },
  { initials: "R.F.", name: "Renata F.", city: "Santo André", text: "Cheguei apavorada com o laudo. Saí da consulta entendendo cada linha do exame. Só isso já valeu a viagem." },
  { initials: "J.B.", name: "João B.", city: "Guarulhos", text: "Voltei a trabalhar no dia seguinte. Nenhum ponto, nenhum curativo aparente. Meus colegas nem perceberam." },
  { initials: "L.T.", name: "Luciana T.", city: "São Paulo", text: "O nódulo apertava minha garganta quando eu deitava. Depois da ablação, dormi a noite inteira pela primeira vez em anos." },
  { initials: "P.C.", name: "Paulo C.", city: "Sorocaba", text: "Pesquisei muito antes de escolher. A quantidade de casos que ele já tratou me deu a segurança que faltava." },
  { initials: "F.A.", name: "Fernanda A.", city: "Belo Horizonte", text: "Viajei de outro estado para ser atendida. Fui recebida com uma atenção que eu não encontrava há muito tempo na medicina." },
  { initials: "D.R.", name: "Daniela R.", city: "Osasco", text: "Minha tireoide continua funcionando normalmente. Não tomo hormônio, não dependo de remédio para o resto da vida." },
  { initials: "S.N.", name: "Sérgio N.", city: "São Bernardo", text: "A punção foi muito mais rápida e tranquila do que eu imaginava. Praticamente não senti." },
  { initials: "V.L.", name: "Vera L.", city: "São Paulo", text: "Já tinha feito duas biópsias em outro serviço, ambas inconclusivas. Aqui, resultado claro logo na primeira." },
  { initials: "M.O.", name: "Marcos O.", city: "Curitiba", text: "Ele desenhou no papel o que ia fazer. Entrei no procedimento sabendo exatamente o que esperar." },
  { initials: "T.G.", name: "Tatiana G.", city: "Ribeirão Preto", text: "O incômodo para engolir sumiu em poucas semanas. Voltei a comer sem pensar no pescoço." },
  { initials: "E.S.", name: "Eduardo S.", city: "São Paulo", text: "Marca no pescoço era o que mais me travava. Hoje não existe absolutamente nada visível." },
  { initials: "B.M.", name: "Bianca M.", city: "Niterói", text: "Fiz a primeira consulta por telemedicina e me senti acolhida na tela como se estivesse na sala dele." },
  { initials: "H.C.", name: "Helena C.", city: "São Paulo", text: "Tenho 68 anos e temia anestesia geral. A ablação resolveu sem nada disso." },
  { initials: "A.V.", name: "André V.", city: "Jundiaí", text: "Acompanhamento impecável. Recebi retorno de mensagens em plena véspera de feriado." },
  { initials: "N.P.", name: "Nádia P.", city: "Santos", text: "O controle de seis meses mostrou redução muito maior do que eu esperava. Saí da sala emocionada." },
  { initials: "R.A.", name: "Rodrigo A.", city: "Brasília", text: "Segunda opinião que mudou meu tratamento inteiro. A cirurgia que me indicaram não era necessária." },
  { initials: "C.L.", name: "Cristina L.", city: "São Paulo", text: "Nunca um médico me explicou TI-RADS de forma tão simples. Saí entendendo meu próprio exame." },
  { initials: "G.M.", name: "Gustavo M.", city: "Campinas", text: "Ambulatorial mesmo: entrei de manhã, almocei em casa." },
  { initials: "I.S.", name: "Isabel S.", city: "Porto Alegre", text: "Sou professora e vivo da voz. A preocupação com as cordas vocais foi levada a sério do início ao fim." },
  { initials: "W.T.", name: "Wagner T.", city: "São Paulo", text: "Equipe pontual, sala organizada, tudo explicado antes. Zero improviso." },
  { initials: "K.R.", name: "Karina R.", city: "Barueri", text: "Cisto grande que voltava sempre. Alcoolização resolveu de vez, sem cirurgia." },
  { initials: "L.F.", name: "Leandro F.", city: "São José dos Campos", text: "Aceitei o procedimento porque ele foi honesto sobre o que a técnica podia e não podia fazer." },
  { initials: "M.C.", name: "Marina C.", city: "São Paulo", text: "Ansiedade altíssima no dia. A calma dele durante o exame me estabilizou por completo." },
  { initials: "O.D.", name: "Otávio D.", city: "Vitória", text: "Vim do Espírito Santo, fiquei dois dias em São Paulo e voltei tratado." },
  { initials: "P.M.", name: "Patrícia M.", city: "São Paulo", text: "Redução do volume que eu podia sentir com a mão depois de alguns meses." },
  { initials: "F.B.", name: "Fábio B.", city: "Mogi das Cruzes", text: "Um médico que atende no horário marcado já é raro. E ainda conversa sem pressa." },
  { initials: "S.A.", name: "Simone A.", city: "São Paulo", text: "Cinco anos convivendo com o nódulo por medo. Uma tarde resolveu." },
  { initials: "J.P.", name: "Júlio P.", city: "Salvador", text: "Marquei achando que teria de operar. Saí com um plano completamente diferente." },
  { initials: "A.M.", name: "Alessandra M.", city: "São Paulo", text: "Ele acompanhou meu pós por meses, sempre atento a cada detalhe do controle." },
  { initials: "R.S.", name: "Rafael S.", city: "Diadema", text: "Sem cicatriz nenhuma. Ninguém consegue apontar onde o procedimento foi feito." },
  { initials: "T.C.", name: "Thaís C.", city: "São Paulo", text: "A ultrassonografia foi minuciosa. Ele mediu tudo com uma paciência impressionante." },
  { initials: "V.M.", name: "Vinícius M.", city: "Recife", text: "Consulta on-line antes e depois. Não precisei viajar mais do que uma vez." },
  { initials: "L.C.", name: "Lúcia C.", city: "Taubaté", text: "Rouquidão intermitente que me acompanhava há tempos melhorou muito." },
  { initials: "E.P.", name: "Elaine P.", city: "São Paulo", text: "Levei meus exames antigos e ele comparou um a um antes de decidir qualquer coisa." },
  { initials: "N.R.", name: "Nelson R.", city: "Piracicaba", text: "Achei que doeria. Anestesia local e conversa o tempo todo — foi tranquilo." },
  { initials: "C.S.", name: "Camila S.", city: "São Paulo", text: "Estava planejando engravidar e o tema foi tratado com todo cuidado que merecia." },
  { initials: "D.A.", name: "Diego A.", city: "Guarujá", text: "Voltei a treinar em poucos dias, exatamente como ele havia previsto." },
  { initials: "M.F.", name: "Mônica F.", city: "São Paulo", text: "Não vendeu procedimento. Disse que no meu caso o certo era acompanhar. Confiança total." },
  { initials: "A.B.", name: "Antônia B.", city: "Fortaleza", text: "Cheguei do Nordeste com o exame na mão e fui tratada com um respeito que emociona." },
  { initials: "R.C.", name: "Ricardo C.", city: "São Caetano", text: "Bócio grande que atrapalhava a respiração deitado. Hoje respiro normalmente." },
  { initials: "J.M.", name: "Joana M.", city: "São Paulo", text: "Já indiquei para três pessoas da minha família. Todas voltaram satisfeitas." },
  { initials: "P.R.", name: "Priscila R.", city: "Uberlândia", text: "O relatório do exame veio detalhado e compreensível até para quem não é da área." },
  { initials: "G.F.", name: "Gabriel F.", city: "São Paulo", text: "Nódulo funcionante, TSH desregulado. Depois do tratamento, exames de sangue normalizaram." },
  { initials: "S.M.", name: "Sandra M.", city: "Bauru", text: "Tratamento sério, sem promessa milagrosa. Foi exatamente o que ele disse que seria." },
  { initials: "L.A.", name: "Lucas A.", city: "São Paulo", text: "Cheguei desconfiado com a técnica. Saí convencido pelos dados que ele me mostrou." },
  { initials: "B.T.", name: "Beatriz T.", city: "Florianópolis", text: "Vim de Santa Catarina só para essa consulta e faria tudo de novo." },
  { initials: "H.S.", name: "Henrique S.", city: "São Paulo", text: "Depois de anos evitando o assunto, resolvi em uma tarde. Meu único arrependimento é a demora." },
  { initials: "Y.L.", name: "Yara L.", city: "Goiânia", text: "Explicou cada risco com franqueza. Decidi com informação, não com medo." },
  { initials: "Z.P.", name: "Zilda P.", city: "São Paulo", text: "Sinto que fui tratada como pessoa, não como um nódulo em uma imagem." },
];

const INITIAL_COUNT = 6;

export function SocialProof() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? testimonials : testimonials.slice(0, INITIAL_COUNT);
  const hidden = testimonials.length - INITIAL_COUNT;

  return (
    <section id="depoimentos" className="py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid lg:grid-cols-[40%_60%] gap-16 lg:gap-20 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -top-3 -left-3 h-10 w-10 border-t border-l border-gold/60 z-10" />
              <div className="absolute -bottom-3 -right-3 h-10 w-10 border-b border-r border-gold/60 z-10" />
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <img src={formal} alt="Dr. Antonio Rahal" className="absolute inset-0 w-full h-full object-cover my-0" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 65%, rgba(11,58,82,0.75) 100%)" }} />
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold" />
                <span className="label-eyebrow text-[10px]">Resultados</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display font-light text-4xl sm:text-5xl leading-[1.05]">
                Vidas transformadas <br />
                <span className="italic gradient-gold">sem bisturi</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-lg text-muted-foreground font-light leading-relaxed max-w-md">
              Mais de 2 mil pacientes tratados com redução média de 70 a 90% do volume do nódulo
              em doze meses — sem cortes, sem cicatrizes, sem internação.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <RahalMascot pose="think" size="sm" className="mt-8" />
            </Reveal>
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-px bg-[rgba(201,162,76,0.12)]">
          {visible.map((t, i) => (
            <motion.figure
              key={t.initials + t.name}
              initial={i < INITIAL_COUNT ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min((i - INITIAL_COUNT) * 0.02, 0.4) }}
              className="relative bg-background p-10 h-full flex flex-col"
            >
              <div className="font-display italic text-gold text-6xl leading-none">"</div>
              <blockquote className="mt-2 font-display italic text-xl sm:text-2xl text-foreground/95 leading-relaxed font-light">
                {t.text}
              </blockquote>
              <figcaption className="mt-auto pt-8 border-t hairline">
                <div className="text-[10px] uppercase tracking-[0.28em] text-gold">{t.initials}</div>
                <div className="mt-1 font-display text-lg text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground font-light">Paciente · {t.city}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {hidden > 0 && (
            <motion.div
              key="toggle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 text-center"
            >
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="text-gold font-light tracking-wide border-b border-gold/40 pb-1 hover:border-gold transition-colors"
              >
                {expanded ? "Ver menos depoimentos" : `Ver mais ${hidden} depoimentos`}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-8 text-center text-xs text-muted-foreground font-light max-w-2xl mx-auto">
          Relatos de pacientes atendidos pelo Dr. Antonio Rahal. As identidades são preservadas —
          apenas iniciais, primeiro nome e cidade são exibidos. Resultados variam conforme cada caso.
        </p>
      </div>
    </section>
  );
}
