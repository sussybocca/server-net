import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import localforage from "localforage";

export default function CodeEditor({ onBuild }) {
  const [code, setCode] = useState("");

  useEffect(() => {
    (async () => {
      const saved = await localforage.getItem("userCode");
      if (saved) setCode(saved);
    })();
  }, []);

  const handleChange = (value) => {
    setCode(value);
    localforage.setItem("userCode", value);
  };

  return (
    <div className="flex flex-col h-full">
      <Editor
        height="70vh"
        language="javascript"
        value={code}
        onChange={handleChange}
        theme="vs-dark"
      />
      <button
        className="bg-blue-600 text-white mt-2 rounded p-2"
        onClick={() => onBuild(code)}
      >
        Build & Run
      </button>
    </div>
  );
}
