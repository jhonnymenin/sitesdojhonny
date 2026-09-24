import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Differentials } from "@/components/Differentials";
import { SocialProof } from "@/components/SocialProof";
import { Press } from "@/components/Press";
import { Blog } from "@/components/Blog";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Antonio Rahal | Ablação de Tireoide sem Cirurgia | São Paulo" },
      {
        name: "description",
        content:
          "Pioneiro no Brasil em ablação de tireoide por radiofrequência. Tratamento de nódulos sem cirurgia, sem cicatriz e sem internação. Agende sua consulta em São Paulo.",
      },
      { property: "og:title", content: "Dr. Antonio Rahal | Tratamento de Tireoide sem Cirurgia" },
      {
        property: "og:description",
        content:
          "Ablação de tireoide por radiofrequência com o pioneiro no Brasil. Sem cortes, sem cicatriz, sem internação.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Problem />
        <Solution />
        <About />
        <Services />
        <Portfolio />
        <Differentials />
        <SocialProof />
        <Press />
        <Blog />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
