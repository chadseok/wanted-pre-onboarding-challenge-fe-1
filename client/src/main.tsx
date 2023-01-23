import React from "react";
import ReactDOM from "react-dom/client";
import PageRouter from "./pages";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PageRouter />
  </React.StrictMode>
);
