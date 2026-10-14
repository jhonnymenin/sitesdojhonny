import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      // src/server.ts envolve o entry do TanStack; sem apontar o entry aqui o
      // build quebra procurando o padrão.
      server: { entry: "server" },
    }),
    // O Nitro detecta a Vercel sozinho pela env VERCEL em tempo de build, e cai
    // no preset node-server portátil quando roda local.
    nitro(),
    viteReact(),
  ],
});
