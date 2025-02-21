import { createBrowserRouter } from "react-router-dom";

import Todos from "../components/Todos";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>
  },
  {
    path: "/todos",
    element: <PrivateRoute><Todos></Todos></PrivateRoute>,
  },
  {
    path: 'login',
    element: <Login></Login>
  }
]);

export default router;