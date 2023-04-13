import App from "./templates/App";
import Auth from "./templates/Auth";

import Home from "./pages/Home";

import Entrada from "./pages/etapas/Entrada";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:id/entrada",
        element: <Entrada />,
      },
    ],
  },
  {
    path: "/login",
    element: <Auth />,
  },
];

export default routes;
