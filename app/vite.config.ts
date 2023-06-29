import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { injectCSSPlugin } from "./scripts/inject-css";

import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    injectCSSPlugin(),
    // dts({
    //   insertTypesEntry: true,
    //   tsConfigFilePath: path.resolve(__dirname, "./tsconfig.json"),
    //   // rollupTypes: true,
    // }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
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
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      "@wundergraph/sdk",
      "rangy",
      "rangy/lib/rangy-classapplier",
      "rangy/lib/rangy-serializer",
    ],
    esbuildOptions: {
      target: "es2020",
    },
  },
});
