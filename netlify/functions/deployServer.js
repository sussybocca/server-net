import fs from "fs";
import path from "path";
import { exec } from "child_process";

export const handler = async (event, context) => {
  try {
    const { serverId, files } = JSON.parse(event.body);

    const buildPath = path.join("/tmp", serverId); // Netlify Functions use /tmp for file writes

    // Create folder
    if (!fs.existsSync(buildPath)) fs.mkdirSync(buildPath, { recursive: true });

    // Write user files
    for (const [filePath, content] of Object.entries(files)) {
      const fullPath = path.join(buildPath, filePath);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, content);
    }

    // Write package.json
    fs.writeFileSync(
      path.join(buildPath, "package.json"),
      JSON.stringify({
        name: serverId,
        private: true,
        dependencies: { react: "^18.2.0", "react-dom": "^18.2.0" },
        devDependencies: { vite: "^5.0.0", "@vitejs/plugin-react": "^3.2.0" },
        scripts: { build: "vite build" }
      }, null, 2)
    );

    // Write vite.config.js
    fs.writeFileSync(
      path.join(buildPath, "vite.config.js"),
      `import { defineConfig } from 'vite'; import react from '@vitejs/plugin-react'; export default defineConfig({ plugins: [react()] });`
    );

    // Run Vite build (may fail if too slow)
    await new Promise((resolve, reject) => {
      exec(`cd ${buildPath} && npx vite build --outDir dist`, (err, stdout, stderr) => {
        if (err) return reject(stderr);
        resolve(stdout);
      });
    });

    // Return URL (will serve files in /tmp; for real deployment, use proper hosting)
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Server built!", url: `/tmp/${serverId}/dist` })
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.toString() }) };
  }
};
