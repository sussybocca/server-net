import React from "react";
import ReactDOM from "react-dom/client";
import ServerList from "./components/ServerList.jsx";
import ServerJoin from "./components/ServerJoin.jsx";
import ServerManager from "./components/ServerManager.jsx";
import ServerSettings from "./components/ServerSettings.jsx";

const App = () => {
  return (
    <div>
      <h1>Servers.net</h1>
      <ServerList />
      <ServerJoin />
      <ServerManager />
      <ServerSettings />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
