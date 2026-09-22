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
      // src/server.ts wraps the TanStack server entry with branded error pages.
      server: { entry: "server" },
    }),
    // Nitro auto-detects the Vercel preset from the VERCEL env var at build time,
    // and falls back to the portable node-server preset locally.
    nitro(),
    viteReact(),
  ],
});
