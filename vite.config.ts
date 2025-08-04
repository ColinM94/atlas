import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
  ],
  resolve: {
    alias: {
      assets: resolve(__dirname, "src/assets"),
      components: resolve(__dirname, "src/components"),
      consts: resolve(__dirname, "src/consts"),
      hooks: resolve(__dirname, "src/hooks"),
      inits: resolve(__dirname, "src/inits"),
      layouts: resolve(__dirname, "src/layouts"),
      pages: resolve(__dirname, "src/pages"),
      services: resolve(__dirname, "src/services"),
      styles: resolve(__dirname, "src/styles"),
      stores: resolve(__dirname, "src/stores"),
      types: resolve(__dirname, "src/types"),
      utils: resolve(__dirname, "src/utils"),
    },
  },
});
