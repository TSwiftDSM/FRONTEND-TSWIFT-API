import App from "./templates/App";
import Auth from "./templates/Auth";

import EntregasAgendadas from "./pages/EntregasAgendadas";

import Home from "./pages/admin/Home";
import PedidosAdmin from "./pages/admin/PedidosAdmin";
import Relatorio from "./pages/admin/Relatorio";

import Entrada from "./pages/etapas/Entrada";
import Qualitativa from "./pages/etapas/Qualitativa";
import Quantitativa from "./pages/etapas/Quantitativa";
import RecusaQuantitativa from "./pages/etapas/RecusaQuantitativa";
import ConferenciaRealizada from "./pages/etapas/ConferenciaRealizada";
import RecusaEntrada from "./pages/etapas/RecusaEntrada";
import RecusaQualitativa from "./pages/etapas/RecusaQualitativa";
import RecusaEntrega from "./pages/etapas/RecusaEntrega";



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
      {
        path: "/:id/recusa-qualitativa",
        element: <RecusaQualitativa />,
      },
      {
        path: "/:id/recusa-entrega",
        element: <RecusaEntrega />,
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
      {
        path: "/admin/pedidos",
        element: <PedidosAdmin />,
      },
      {
        path: "/admin/pedidos/:id",
        element: <Relatorio />,
      },
    ],
  },
];

export default routes;
