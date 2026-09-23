import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { GradientButton } from "@/components/ui/GradientButton";
import { QuizLink } from "@/components/ui/TrackedLink";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Helmet>
        <title>Página não encontrada | MedInteli</title>
        <meta name="description" content="A página que você procura não existe ou foi movida. Volte para a página inicial da MedInteli." />
        <link rel="canonical" href="https://lp.medinteli.com.br/404" />
        <meta name="robots" content="noindex" />
        <meta property="og:title" content="Página não encontrada | MedInteli" />
        <meta property="og:description" content="A página que você procura não existe. Volte para a MedInteli." />
        <meta property="og:url" content="https://lp.medinteli.com.br/404" />
      </Helmet>

      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 pt-32 pb-20">
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold leading-[1.15] tracking-tight">
            Essa página não existe
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-4 leading-relaxed">
            O link pode estar desatualizado ou a página foi movida.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-8">
            <a href="/" className="w-full sm:w-auto">
              <GradientButton className="w-full sm:w-auto min-h-[52px]">
                Voltar para a página inicial
              </GradientButton>
            </a>
            <QuizLink className="w-full sm:w-auto" origin="404">
              <GradientButton variant="outline" className="w-full sm:w-auto min-h-[52px]">
                Fazer diagnóstico gratuito
              </GradientButton>
            </QuizLink>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
