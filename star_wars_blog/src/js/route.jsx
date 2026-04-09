import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import CharDetail from "./pages/CharacterDetail";
import PlanetDetail from "./pages/PlanetDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chardetail",
    element: <CharDetail />,
  },
  {
    path: "/planetdetail",
    element: <PlanetDetail />,
  },
]);
