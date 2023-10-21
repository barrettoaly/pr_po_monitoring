import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ControllerProvider } from "./Context/DataContext";
import "./Style/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ControllerProvider>
      <App />
    </ControllerProvider>
  </BrowserRouter>
);
