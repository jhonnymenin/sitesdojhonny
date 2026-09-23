import StickyNav from "@/components/StickyNav";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import ArtistsSection from "@/components/sections/ArtistsSection";
import AudienceSection from "@/components/sections/AudienceSection";
import DifferentialsSection from "@/components/sections/DifferentialsSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => (
  <>
    <StickyNav />
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <HowItWorksSection />
      <ArtistsSection />
      <AudienceSection />
      <DifferentialsSection />
      <FinalCTASection />
    </main>
    <Footer />
    <WhatsAppButton />
    <CookieBanner />
  </>
);

export default Index;
