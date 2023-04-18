import App from "./templates/App";
import Auth from "./templates/Auth";

import EntregasAgendadas from "./pages/EntregasAgendadas";

import Home from "./pages/admin/Home";
import PedidosAdmin from "./pages/admin/PedidosAdmin";
 
import Entrada from "./pages/etapas/Entrada";
import Qualitativa from "./pages/etapas/Qualitativa";

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
    ],
  },
];

export default routes;
