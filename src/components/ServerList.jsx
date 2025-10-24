import React, { useState, useEffect } from "react";
import localforage from "localforage";

const ServerList = () => {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    localforage.getItem("servers").then((data) => {
      if (data) setServers(data);
    });
  }, []);

  return (
    <div>
      <h2>Available Servers</h2>
      <ul>
        {servers.map((s, i) => (
          <li key={i}>{s.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServerList;
