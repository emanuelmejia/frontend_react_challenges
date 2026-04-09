import React from "react";
import { RouterProvider } from "react-router-dom"; // requiere npm install react-router-dom
import { router } from "./route";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
