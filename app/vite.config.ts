import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import preact from "@preact/preset-vite";
import { injectCSSPlugin } from "./scripts/inject-css";

export default defineConfig({
  plugins: [
    preact(),
    injectCSSPlugin(),
    // dts({
    //   insertTypesEntry: true,
    //   tsConfigFilePath: path.resolve(__dirname, "./tsconfig.json"),
    // }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
      "~/styled-system": path.resolve(__dirname, "./styled-system"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.tsx"),
      name: "Open Previews",
      formats: ["es", "cjs"],
      fileName: (format) => {
        return `index.${format === "es" ? "js" : "cjs"}`;
      },
    },
    rollupOptions: {
      treeshake: "smallest",
    },
  },

  optimizeDeps: {
    include: [
      "@wundergraph/sdk/client",
      "rangy",
      "rangy/lib/rangy-classapplier",
      "rangy/lib/rangy-serializer",
    ],
    esbuildOptions: {
      target: "es2020",
    },
  },
});
