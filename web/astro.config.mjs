import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://openpreviews.com/",
  output: "server",
  adapter: process.env.VERCEL
    ? vercel()
    : node({
        mode: "standalone",
      }),
  integrations: [
    tailwind(),
    react(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
  vite: {
    ssr: {
      external: ["svgo"],
      noExternal: ["@radix-ui/react-dialog"],
    },
  },
});
