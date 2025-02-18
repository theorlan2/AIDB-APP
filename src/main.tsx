import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

//
import App from "./app";
import "./main.css";
import { CommandsProvider } from "./context/commandsContexts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CommandsProvider>
        <App />
      </CommandsProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
