import { useState } from "react";
import ReactDOM from "react-dom/client";
import CodeEditor from "./components/Editor";
import PreviewPane from "./components/PreviewPane";
import { buildUserServer } from "./utils/viteRunner";

function App() {
  const [output, setOutput] = useState("");

  const handleBuild = async (code) => {
    const files = {
      "index.html": `
        <!DOCTYPE html>
        <html><body><div id="root"></div>
        <script type="module" src="/src/main.jsx"></script>
        </body></html>`,
      "src/main.jsx": `
        import React from 'react'
        import ReactDOM from 'react-dom/client'
        import App from './App.jsx'
        ReactDOM.createRoot(document.getElementById('root')).render(<App />)`,
      "src/App.jsx": code,
    };

    const outputFiles = await buildUserServer(files);

    const htmlFile = outputFiles.find((f) => f.fileName.endsWith(".html"));
    setOutput(htmlFile.source);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">servers.net - Build your own server</h1>
      <CodeEditor onBuild={handleBuild} />
      <PreviewPane html={output} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
