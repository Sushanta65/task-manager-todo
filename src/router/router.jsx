import { createBrowserRouter } from "react-router-dom";

import Todos from "../components/Todos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Todos></Todos>,
  },
]);

export default router;