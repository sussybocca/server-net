// src/utils/viteRunner.js
import * as vite from "vite"; // actually uses browser-vite

export async function buildUserServer(files) {
  // files = { "src/main.jsx": "code...", "index.html": "<!DOCTYPE html>..." }

  const viteConfig = {
    root: "/",
    build: {
      outDir: "/dist",
      write: false, // we don’t want to write to disk in browser
    },
  };

  const server = await vite.createServer(viteConfig);

  // Load user files virtually
  for (const [path, content] of Object.entries(files)) {
    server.moduleGraph.setModuleSource(path, content);
  }

  // Build bundle
  const result = await server.build();

  // Return the output bundle files
  return result.output;
}
