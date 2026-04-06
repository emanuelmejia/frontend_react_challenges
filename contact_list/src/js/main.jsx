import React from "react";
import { createRoot } from "react-dom/client";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// index.css'
import "../styles/index.css";

// components
import App from "./App.jsx";
import { StoreProvider } from "./context/StoreProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StoreProvider>
    <App />,
  </StoreProvider>,
);

// import { createRoot } from 'react-dom/client'
//
// import App from './App.jsx'
// import { StoreProvider } from './context/StoreProvider.jsx'
//
// createRoot(document.getElementById('root')).render(
//   <StoreProvider>
//     <App />
//   </StoreProvider>
// )
