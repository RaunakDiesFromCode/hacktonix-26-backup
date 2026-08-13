import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core React runtime
          if (
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react/")
          ) {
            return "vendor-react";
          }
          // Animation library (relatively large)
          if (id.includes("node_modules/framer-motion")) {
            return "vendor-framer";
          }
          // Smooth scrolling
          if (id.includes("node_modules/lenis")) {
            return "vendor-lenis";
          }
          // Marquee component
          if (id.includes("node_modules/react-fast-marquee")) {
            return "vendor-marquee";
          }
        },
      },
    },
    // Generate smaller chunks (default is 500kb)
    chunkSizeWarningLimit: 300,
  },
});
