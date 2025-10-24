import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext", // avoid transpiling
    rollupOptions: {
      external: [
        "fsevents",
        "fs",
        "path",
        "os",
        "child_process",
        "module",
      ],
    },
  },
});
