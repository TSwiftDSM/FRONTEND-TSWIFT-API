import App from "./templates/App";
import Auth from "./templates/Auth";

import Home from "./pages/Home";

import Entrada from "./pages/etapas/Entrada";
import Qualitativa from "./pages/etapas/Qualitativa";

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
      {
        path: "/qualitativa" /* criando a rota qualitativa  */,
        element: <Qualitativa /> /* chamando a pagina qualitativa */,
      },
    ],
  },
  {
    path: "/login",
    element: <Auth />,
  },
];

export default routes;
