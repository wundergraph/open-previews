import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import { injectCSSPlugin } from "./scripts/inject-css";

const outDir = path.resolve(__dirname, "../packages/react/dist");

export default defineConfig({
  plugins: [
    react(),
    injectCSSPlugin({
      dist: outDir,
    }),
    dts({
      insertTypesEntry: true,
      tsConfigFilePath: path.resolve(__dirname, "./tsconfig.json"),
    }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
      "~/styled-system": path.resolve(__dirname, "./styled-system"),
      // workaround for treeshaking not working properly
      "@wundergraph/sdk/internal": "@wundergraph/sdk/dist/utils/serialize",
    },
  },
  build: {
    outDir,
    lib: {
      entry: path.resolve(__dirname, "src/index-react.tsx"),
      name: "Open Previews",
      formats: ["es", "cjs"],
      fileName: (format) => {
        return `index.${format === "es" ? "js" : "cjs"}`;
      },
    },
    rollupOptions: {
      treeshake: "smallest",
      external: ["react", "react-dom"],
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
