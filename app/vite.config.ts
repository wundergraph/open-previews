import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
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
      external: [
        "react",
        "react-dom",
        // "@wundergraph/swr",
        // "swr",
        // Having this external causes the Astro app to fail when imported.
        // This does add a lot of bloat to the bundle, but it works untill we optimize this.
        // "@wundergraph/sdk/client",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  optimizeDeps: {
    include: ["@wundergraph/sdk"],
    esbuildOptions: {
      target: "es2020",
    },
  },
});
