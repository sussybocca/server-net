import React, { useState, useEffect } from "react";
import localforage from "localforage";

const ServerSettings = () => {
  const [env, setEnv] = useState({});

  useEffect(() => {
    localforage.getItem("serverEnv").then(data => data && setEnv(data));
  }, []);

  const saveEnv = () => localforage.setItem("serverEnv", env);

  return (
    <div>
      <h3>Server Settings</h3>
      <textarea value={JSON.stringify(env, null, 2)} onChange={e => setEnv(JSON.parse(e.target.value))} />
      <button onClick={saveEnv}>Save Settings</button>
    </div>
  );
};

export default ServerSettings;
