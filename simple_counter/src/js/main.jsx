import React from "react";
import ReactDOM from "react-dom/client";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// index.css'
import "../styles/index.css";

// components
import SimpleCounter from "./components/counter.jsx";

let seconds = 0;

setInterval(() => {
  seconds++;

  ReactDOM.createRoot(document.getElementById("root")).render(
    <SimpleCounter
      hundredthousands={Math.floor(seconds / 100000) % 10}
      tenthousands={Math.floor(seconds / 10000) % 10}
      thousands={Math.floor(seconds / 1000) % 10}
      hundreds={Math.floor(seconds / 100) % 10}
      tenths={Math.floor(seconds / 10) % 10}
      units={seconds % 10}
    />,
  );
}, 1000);
