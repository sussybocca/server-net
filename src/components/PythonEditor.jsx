import React, { useState, useEffect } from "react";
import { loadPyodide } from "pyodide";
import { registerPythonCommand } from "../utils/userManagement.js";

const PythonEditor = () => {
  const [pyodide, setPyodide] = useState(null);
  const [code, setCode] = useState("def my_function(args):\n    return 'Hello ' + str(args)\n");
  const [output, setOutput] = useState("");

  useEffect(() => {
    loadPyodide().then(p => setPyodide(p));
  }, []);

  const runPython = async () => {
    if (!pyodide) return;
    try {
      await pyodide.runPythonAsync(code);
      registerPythonCommand("my_python_cmd", async args => await pyodide.runPythonAsync(`my_function(${JSON.stringify(args)})`));
      setOutput("Command registered!");
    } catch (err) {
      setOutput(err.toString());
    }
  };

  return (
    <div>
      <h3>Python Editor (Pyodide)</h3>
      <textarea value={code} onChange={e => setCode(e.target.value)} style={{ width: "100%", height: "200px" }} />
      <button onClick={runPython}>Run/Register</button>
      <pre>{output}</pre>
    </div>
  );
};

export default PythonEditor;
