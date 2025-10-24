import React, { useState } from "react";
import { joinServer } from "../utils/userManagement.js";

const ServerJoin = () => {
  const [username, setUsername] = useState("");
  const [userNumber, setUserNumber] = useState(null);
  const serverId = "default"; // example server id

  const handleJoin = () => {
    const num = joinServer({ name: username, serverId });
    setUserNumber(num);
  };

  return (
    <div>
      <h2>Join Server</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <button onClick={handleJoin}>Join</button>
      {userNumber && <p>Your user number: {userNumber}</p>}
    </div>
  );
};

export default ServerJoin;
