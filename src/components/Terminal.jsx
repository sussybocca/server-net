import React, { useState } from "react";
import { parseCommand } from "../utils/userManagement.js";

const Terminal = ({ serverId }) => {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState([]);

  const handleCommand = () => {
    parseCommand(input, serverId);
    setLogs(prev => [...prev, `> ${input}`]);
    setInput("");
  };

  return (
    <div style={{ background: "#111", color: "#0f0", padding: "10px" }}>
      <div>{logs.map((l, i) => <div key={i}>{l}</div>)}</div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleCommand()}
        style={{ width: "100%", background: "#111", color: "#0f0", border: "none" }}
      />
    </div>
  );
};

export default Terminal;
