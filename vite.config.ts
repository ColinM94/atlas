import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [
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
      constants: resolve(__dirname, "src/constants"),
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
  css: {
    preprocessorMaxWorkers: true,
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "styles/vars.scss";
        `,
      },
    },
  },
});
