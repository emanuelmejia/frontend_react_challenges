import React from "react";
import { createRoot } from "react-dom/client";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// index.css'
import "../styles/index.css";

// components
import App from "./App.jsx";
import { SWProvider } from "./context/SWProvider.jsx";

createRoot(document.getElementById("root")).render(
  <SWProvider>
    <App />,
  </SWProvider>,
);
