import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Este projeto usa o server entry padrão do TanStack Start — não há src/server.ts,
// então tanstackStart() vai sem a opção `server`.
export default defineConfig({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart(),
    // Nitro auto-detects the Vercel preset from the VERCEL env var at build time,
    // and falls back to the portable node-server preset locally.
    nitro(),
    viteReact(),
  ],
});
