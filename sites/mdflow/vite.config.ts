import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

/*
 * Config vanilla, no lugar do @lovable.dev/vite-tanstack-config.
 *
 * O preset do Lovable traz o alvo Cloudflare fixo no código e não dá para
 * trocar por configuração — por isso a troca, e não um ajuste.
 */
export default defineConfig({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      // src/server.ts embrulha o entry do TanStack com página de erro própria.
      // Sem esta linha o build procura um entry padrão e quebra.
      server: { entry: "server" },
    }),
    // O Nitro detecta a Vercel sozinho pela env VERCEL no build; local cai no
    // preset node-server.
    nitro(),
    viteReact(),
  ],
});
