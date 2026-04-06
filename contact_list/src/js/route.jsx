import { createBrowserRouter } from "react-router-dom";
import Agenda from "./pages/Agenda";
import AddContact from "./pages/AddContact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Agenda />,
  },
  {
    path: "/addcontact",
    element: <AddContact />,
  },
]);
