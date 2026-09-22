import { createFileRoute } from "@tanstack/react-router";

import { UrgencyBar } from "@/components/landing/UrgencyBar";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";
import { Bonus } from "@/components/landing/Bonus";
import { LiveMeetings } from "@/components/landing/LiveMeetings";
import { Coordinators } from "@/components/landing/Coordinators";
import { OncoIA } from "@/components/landing/OncoIA";
import { QuestionBank } from "@/components/landing/QuestionBank";
import { WhyJourney } from "@/components/landing/WhyJourney";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA, Footer, MobileCtaBar } from "@/components/landing/FinalCTA";
import { SITE_URL } from "@/lib/site";

const TITLE = "MOC | X Curso Intensivo de Oncologia";
const DESCRIPTION =
  "X Curso Intensivo de Oncologia: cerca de 140 aulas, 5 encontros on-line ao vivo, 1 ano de acesso e certificado MOC. Lançamento com 30% OFF até 30/09.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          name: "X Curso Intensivo de Oncologia",
          description: DESCRIPTION,
          provider: {
            "@type": "Organization",
            name: "MOC — Manual de Oncologia Clínica do Brasil",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <UrgencyBar />
      <Header />
      <main>
        <div className="theme-dark">
          <Hero />
        </div>
        <div className="theme-light">
          <Coordinators />
          <About />
        </div>
        <div className="theme-blue">
          <LiveMeetings />
        </div>
        <div className="theme-light">
          <Bonus />
        </div>
        <div className="theme-blue">
          <QuestionBank />
        </div>
        <div className="theme-light">
          <OncoIA />
        </div>
        <div className="theme-blue">
          <Pricing />
        </div>
        <div className="theme-light">
          <WhyJourney />
          <FAQ />
        </div>
        <div className="theme-blue">
          <FinalCTA />
        </div>
      </main>

      <Footer />
      <MobileCtaBar />
    </div>
  );
}
