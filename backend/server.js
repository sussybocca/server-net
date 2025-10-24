import express from "express";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

const app = express();
app.use(express.json());

app.post("/deployServer", async (req, res) => {
  const { serverId, files } = req.body;
  const buildPath = path.join(__dirname, `../builds/${serverId}`);

  // Create folder
  if (!fs.existsSync(buildPath)) fs.mkdirSync(buildPath, { recursive: true });

  // Write files
  for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(buildPath, filePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content);
  }

  // Write basic package.json
  fs.writeFileSync(
    path.join(buildPath, "package.json"),
    JSON.stringify({ name: serverId, private: true, dependencies: { react: "^18.2.0", "react-dom": "^18.2.0" }, devDependencies: { vite: "^5.0.0", "@vitejs/plugin-react": "^3.2.0" }, scripts: { build: "vite build" } }, null, 2)
  );

  // Write vite.config.js
  fs.writeFileSync(
    path.join(buildPath, "vite.config.js"),
    `import { defineConfig } from 'vite'; import react from '@vitejs/plugin-react'; export default defineConfig({ plugins: [react()] });`
  );

  // Run Vite build
  exec(`cd ${buildPath} && npx vite build`, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    res.json({ url: `/servers/${serverId}` });
  });
});

// Serve built servers
app.use("/servers", express.static(path.join(__dirname, "../builds")));

app.listen(5174, () => console.log("Backend build server running on 5174"));
