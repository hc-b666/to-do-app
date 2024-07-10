import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@services": path.resolve(__dirname, "src/services"),
      "@app": path.resolve(__dirname, "src/app"),
      "@context": path.resolve(__dirname, "src/context"),
    },
  },
  server: {
    port: 6969,
  },
});
