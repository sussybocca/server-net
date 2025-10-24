import React, { useState, useEffect } from "react";
import Terminal from "./Terminal.jsx";
import PythonEditor from "./PythonEditor.jsx";
import { socket } from "../utils/socket.js";

const ServerManager = () => {
  const [showPython, setShowPython] = useState(false);
  const [serverUsers, setServerUsers] = useState([]);

  useEffect(() => {
    socket.on("userJoined", user => setServerUsers(prev => [...prev, user]));
    socket.on("userKicked", ({ id }) => setServerUsers(prev => prev.filter(u => u.id !== id)));
  }, []);

  return (
    <div>
      <h2>Server Manager</h2>
      <Terminal serverId="default" />
      <button onClick={() => setShowPython(!showPython)}>
        {showPython ? "Hide Python Editor" : "Show Python Editor"}
      </button>
      {showPython && <PythonEditor />}
      <h3>Users in Server:</h3>
      <ul>{serverUsers.map(u => <li key={u.id}>{u.name} ({u.id})</li>)}</ul>
    </div>
  );
};

export default ServerManager;
