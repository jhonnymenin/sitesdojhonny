import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import { SITE_URL, siteUrl } from "@/lib/site";

import "../styles.css";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Fundação Dona Paulina" },
      { name: "description", content: "Site Oficial de mais de 90 anos de história da Fundação Dona Paulina | Atendimento personalizado e qualidade para todos." },
      { name: "author", content: "Fundação Dona Paulina de Souza Queiroz" },
      { property: "og:title", content: "Fundação Dona Paulina" },
      { property: "og:description", content: "Site Oficial de mais de 90 anos de história da Fundação Dona Paulina | Atendimento personalizado e qualidade para todos." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Fundação Dona Paulina de Souza Queiroz" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Fundação Dona Paulina" },
      { name: "twitter:description", content: "Site Oficial de mais de 90 anos de história da Fundação Dona Paulina | Atendimento personalizado e qualidade para todos." },
      { property: "og:image", content: siteUrl("/og-image.png") },
      { name: "twitter:image", content: siteUrl("/og-image.png") },
    ],
    links: [
      // O favicon.ico existia mas não era declarado: o navegador o encontrava
      // sozinho na raiz, e as variantes de alta resolução e de iOS não existiam.
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon-192.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Advent+Pro:wght@500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
