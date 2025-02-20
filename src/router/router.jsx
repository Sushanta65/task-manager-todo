import { createBrowserRouter } from "react-router-dom";

import Todos from "../components/Todos";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Todos></Todos>,
  },
  {
    path: 'login',
    element: <Login></Login>
  }
]);

export default router;