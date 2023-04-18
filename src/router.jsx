import App from "./templates/App";
import Auth from "./templates/Auth";

import EntregasAgendadas from "./pages/EntregasAgendadas";
import Home from "./pages/Home";

import Entrada from "./pages/etapas/Entrada";
import Qualitativa from "./pages/etapas/Qualitativa";
import Quantitativa from "./pages/etapas/Quantitativa";
import RecusaQuantitativa from "./pages/etapas/RecusaQuantitativa";
import ConferenciaRealizada from "./pages/etapas/ConferenciaRealizada";
import RecusaEntrada from "./pages/etapas/RecusaEntrada";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <EntregasAgendadas />,
      },
      {
        path: "/:id/entrada",
        element: <Entrada />,
      },
      {
        path: "/:id/qualitativa",
        element: <Qualitativa />,
      },
      {
        path: "/:id/quantitativa" /* criando a rota qualitativa  */,
        element: <Quantitativa /> /* chamando a pagina qualitativa */,
      },
      {
        path: "/:id/recusa-quantitativa",
        element: <RecusaQuantitativa />,
      },
      {
        path: "/:id/conferencia-realizada",
        element: <ConferenciaRealizada />,
      },
      {
        path: "/:id/recusa-entrada",
        element: <RecusaEntrada />,
      },
    ],
  },
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
];

export default routes;
