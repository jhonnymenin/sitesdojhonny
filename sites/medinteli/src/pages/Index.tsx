import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { CredibilityBar } from "@/components/sections/CredibilityBar";
import { PainPoints } from "@/components/sections/PainPoints";
import { DiagnosticBridge } from "@/components/sections/DiagnosticBridge";
import { Manifesto } from "@/components/sections/Manifesto";
import { AudienceFit } from "@/components/sections/AudienceFit";
import { Services } from "@/components/sections/Services";
import { Platform } from "@/components/sections/Platform";
import { Features } from "@/components/sections/Features";
import { SavingsCalculator } from "@/components/sections/SavingsCalculator";
import { BusinessIntelligence } from "@/components/sections/BusinessIntelligence";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { CustomSolutions } from "@/components/sections/CustomSolutions";
import { DataCare } from "@/components/sections/DataCare";
import { TwoPaths } from "@/components/sections/TwoPaths";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { InlineCTA } from "@/components/ui/InlineCTA";
import { MobileStickyCTA } from "@/components/ui/MobileStickyCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <Navbar />
      <main className="relative z-10 pb-20 md:pb-0">
        <Hero />
        <CredibilityBar />
        <PainPoints />
        <DiagnosticBridge />
        <Services />
        <Platform />

        <InlineCTA
          text="Viu como as duas pontas se conectam? Descubra onde a sua clínica pode ganhar."
          buttonLabel="Fazer diagnóstico gratuito"
          variant="quiz"
          tone="soft"
          origin="inline_platform"
        />

        <Features />
        <Manifesto />

        <InlineCTA
          text="Faz sentido pra você? Vamos conversar sobre a realidade da sua clínica."
          buttonLabel="Falar com especialista"
          variant="whatsapp"
          tone="plain"
          origin="inline_manifesto"
        />

        <SavingsCalculator />
        <BusinessIntelligence />
        <HowItWorks />

        <InlineCTA
          text="O processo é esse. O primeiro passo é gratuito e leva cerca de 90 segundos."
          buttonLabel="Começar meu diagnóstico"
          variant="quiz"
          tone="soft"
          origin="inline_howitworks"
        />

        <AudienceFit />
        <DataCare />
        <Pricing />
        <CustomSolutions />
        <TwoPaths />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default Index;
