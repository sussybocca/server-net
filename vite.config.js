import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Ignore native modules that cause Netlify builds to fail
      external: ["fsevents", "fs", "path", "os", "child_process"],
    },
  },
});
