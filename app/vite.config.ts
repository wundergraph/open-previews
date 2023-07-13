import path from "node:path";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { injectCSSPlugin } from "./scripts/inject-css";

export default defineConfig({
  plugins: [
    preact({
      devToolsEnabled: false,
    }),
    injectCSSPlugin(),
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
    // minify: false,
    // sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "Open Previews",
      formats: ["es", "cjs"],
      fileName: (format) => {
        return `[name].${format}.js`;
      },
    },
    rollupOptions: {
      treeshake: "smallest",
      
    },
  },
  define: {
    "process.env.NODE_ENV": "'production'",
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
