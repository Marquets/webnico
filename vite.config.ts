import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        sesiones: "sesiones/index.html",
        saberMas: "sesiones/saber-mas/index.html",
        encuentros: "encuentros/index.html",
        sobreMi: "sobre-mi/index.html",
        contacto: "contacto/index.html",
      },
    },
  },
  // Stops Vite from picking up a PostCSS config outside this project.
  css: { postcss: {} },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
  },
});
